import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { z } from 'zod';

const authorisedEmailHash = 'bdb463c27fb06a118a8baf6c2e350511a9c130fd11a9166e3768046be7ef4aa0';

async function hashEmail(email: string) {
  const bytes = new TextEncoder().encode(email.trim().toLowerCase());
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function isAuthorisedEmail(email: string | null | undefined) {
  return !!email && (await hashEmail(email)) === authorisedEmailHash;
}

async function requirePortalUser(accessToken: string) {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { data, error } = await supabaseAdmin.auth.getUser(accessToken);

  if (error || !data.user || !(await isAuthorisedEmail(data.user.email))) {
    throw new Error('Your portal session has expired. Please request a new sign-in link.');
  }

  return { supabaseAdmin, user: data.user };
}

export const sendPortalMagicLink = createServerFn({ method: 'POST' })
  .inputValidator((data) => z.object({ email: z.string().trim().email() }).parse(data))
  .handler(async ({ data }) => {
    // Always return the same response so this endpoint does not disclose which
    // email address is authorised to view customer enquiries.
    if (!(await isAuthorisedEmail(data.email))) return { sent: true };

    const request = getRequest();
    if (!request) throw new Error('The sign-in service is temporarily unavailable.');

    const redirectTo = new URL('/admin/enquiries', new URL(request.url).origin).toString();
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.auth.signInWithOtp({
      email: data.email.trim().toLowerCase(),
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: true,
      },
    });

    if (error) {
      console.error('[Client portal] Could not send magic link:', error.message);
      throw new Error('We could not send the sign-in link. Please try again shortly.');
    }

    return { sent: true };
  });

export const listPortalEnquiries = createServerFn({ method: 'POST' })
  .inputValidator((data) => z.object({ accessToken: z.string().min(20) }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin, user } = await requirePortalUser(data.accessToken);
    const { data: enquiries, error } = await supabaseAdmin
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) {
      console.error('[Client portal] Could not load enquiries:', error.message);
      throw new Error('We could not load the enquiries. Please try again.');
    }

    return { enquiries, viewerEmail: user.email ?? '' };
  });

export const getPortalAttachmentUrl = createServerFn({ method: 'POST' })
  .inputValidator((data) =>
    z.object({ accessToken: z.string().min(20), path: z.string().min(3).max(500) }).parse(data),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await requirePortalUser(data.accessToken);
    const { data: enquiry, error: lookupError } = await supabaseAdmin
      .from('enquiries')
      .select('id')
      .contains('file_paths', [data.path])
      .maybeSingle();

    if (lookupError || !enquiry) throw new Error('This attachment is not available.');

    const { data: signed, error } = await supabaseAdmin.storage
      .from('enquiry-attachments')
      .createSignedUrl(data.path, 300);

    if (error || !signed?.signedUrl) throw new Error('This attachment could not be opened.');
    return { signedUrl: signed.signedUrl };
  });
