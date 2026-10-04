import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const schema = z.object({
  source: z.enum(['quote', 'contact']), projectType: z.string().min(1).max(100),
  description: z.string().trim().min(10).max(5000), dimensions: z.string().max(250).optional(),
  quantity: z.number().int().min(1).max(10000).optional(), timeframe: z.string().max(100).optional(),
  name: z.string().trim().min(2).max(120), businessName: z.string().max(120).optional(),
  phone: z.string().trim().regex(/^[+\d\s()-]{7,25}$/), email: z.union([z.literal(''), z.string().email()]).optional(),
  postcode: z.string().max(30).optional(), preferredContact: z.enum(['Phone', 'WhatsApp', 'Email']).optional(),
  website: z.string().optional(),
  files: z.array(z.object({ name: z.string().max(160), type: z.enum(['image/jpeg', 'image/png', 'application/pdf']), data: z.string().max(14000000) })).max(3),
}).refine(v => v.preferredContact !== 'Email' || !!v.email, { message: 'Email is required for email contact', path: ['email'] });

export const submitEnquiry = createServerFn({ method: 'POST' }).inputValidator((data) => schema.parse(data)).handler(async ({ data }) => {
  if (data.website) return { success: true };
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const id = crypto.randomUUID();
  const filePaths: string[] = [];
  for (const file of data.files) {
    const raw = file.data.includes(',') ? file.data.split(',')[1] : file.data;
    if (!raw) throw new Error('Please try uploading the attachment again.');
    const bytes = Uint8Array.from(atob(raw), c => c.charCodeAt(0));
    if (bytes.length > 10 * 1024 * 1024) throw new Error('Each attachment must be under 10 MB.');
    const ext = file.type === 'application/pdf' ? 'pdf' : file.type === 'image/png' ? 'png' : 'jpg';
    const path = `${id}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabaseAdmin.storage.from('enquiry-attachments').upload(path, bytes, { contentType: file.type, upsert: false });
    if (error) throw new Error('Your attachment could not be uploaded. Please try again.');
    filePaths.push(path);
  }
  const { error } = await supabaseAdmin.from('enquiries').insert({ id, source: data.source, project_type: data.projectType, description: data.description, dimensions: data.dimensions || null, quantity: data.quantity || null, timeframe: data.timeframe || null, name: data.name, business_name: data.businessName || null, phone: data.phone, email: data.email || null, postcode: data.postcode || null, preferred_contact: data.preferredContact || null, file_paths: filePaths });
  if (error) throw new Error('We could not send your enquiry. Please try again or call us.');
  return { success: true };
});
