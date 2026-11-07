import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  Inbox,
  Loader2,
  LockKeyhole,
  LogOut,
  Mail,
  Paperclip,
  RefreshCw,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  getPortalAttachmentUrl,
  listPortalEnquiries,
  sendPortalMagicLink,
} from '@/lib/admin.functions';

const sessionKey = 'blue-spark-client-portal-session';

type StoredSession = {
  accessToken: string;
  expiresAt: number;
};

type PortalEnquiry = Awaited<ReturnType<typeof listPortalEnquiries>>['enquiries'][number];

export const Route = createFileRoute('/admin/enquiries')({
  head: () => ({
    meta: [
      { title: 'Client Enquiries | Blue Spark' },
      { name: 'robots', content: 'noindex, nofollow, noarchive' },
      {
        name: 'description',
        content: 'Private Blue Spark client portal for reviewing customer enquiries.',
      },
    ],
  }),
  component: ClientEnquiries,
});

function readStoredSession(): StoredSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const parsed = JSON.parse(localStorage.getItem(sessionKey) ?? 'null') as StoredSession | null;
    if (!parsed?.accessToken || !parsed.expiresAt || parsed.expiresAt <= Date.now()) {
      localStorage.removeItem(sessionKey);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(sessionKey);
    return null;
  }
}

function captureMagicLinkSession(): StoredSession | null {
  if (typeof window === 'undefined' || !window.location.hash) return null;
  const params = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = params.get('access_token');
  const expiresIn = Number(params.get('expires_in') ?? '3600');
  const errorDescription = params.get('error_description');

  window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
  if (errorDescription) throw new Error(errorDescription.replace(/\+/g, ' '));
  if (!accessToken) return null;

  const session = {
    accessToken,
    expiresAt: Date.now() + Math.max(60, expiresIn - 30) * 1000,
  };
  localStorage.setItem(sessionKey, JSON.stringify(session));
  return session;
}

function ClientEnquiries() {
  const [email, setEmail] = useState('');
  const [session, setSession] = useState<StoredSession | null>(null);
  const [enquiries, setEnquiries] = useState<PortalEnquiry[]>([]);
  const [viewerEmail, setViewerEmail] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingLink, setSendingLink] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [error, setError] = useState('');

  const loadEnquiries = async (activeSession: StoredSession) => {
    setLoading(true);
    setError('');
    try {
      const result = await listPortalEnquiries({ data: { accessToken: activeSession.accessToken } });
      setEnquiries(result.enquiries);
      setViewerEmail(result.viewerEmail);
    } catch (err) {
      localStorage.removeItem(sessionKey);
      setSession(null);
      setError(err instanceof Error ? err.message : 'Your session could not be verified.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const activeSession = captureMagicLinkSession() ?? readStoredSession();
      setSession(activeSession);
      if (activeSession) void loadEnquiries(activeSession);
      else setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The sign-in link could not be verified.');
      setLoading(false);
    }
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return enquiries;
    return enquiries.filter((item) =>
      [
        item.name,
        item.business_name,
        item.project_type,
        item.description,
        item.phone,
        item.email,
        item.postcode,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(needle)),
    );
  }, [enquiries, query]);

  const requestLink = async (event: FormEvent) => {
    event.preventDefault();
    setSendingLink(true);
    setError('');
    try {
      await sendPortalMagicLink({ data: { email } });
      setLinkSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not send the sign-in link.');
    } finally {
      setSendingLink(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem(sessionKey);
    setSession(null);
    setEnquiries([]);
    setViewerEmail('');
    setLinkSent(false);
  };

  const openAttachment = async (path: string) => {
    if (!session) return;
    setError('');
    try {
      const result = await getPortalAttachmentUrl({
        data: { accessToken: session.accessToken, path },
      });
      window.open(result.signedUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The attachment could not be opened.');
    }
  };

  if (loading) {
    return (
      <section className="portal-page portal-centred" aria-live="polite">
        <Loader2 className="portal-spinner" aria-hidden="true" />
        <p>Checking your secure session…</p>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="portal-page portal-login-page">
        <div className="portal-login-card">
          <div className="portal-lock"><LockKeyhole aria-hidden="true" /></div>
          <span className="eyebrow">PRIVATE CLIENT ACCESS</span>
          <h1>Blue Spark enquiries.</h1>
          <p>Enter the authorised email address and we’ll send a secure, one-time sign-in link.</p>
          {linkSent ? (
            <div className="portal-notice" role="status">
              <Mail aria-hidden="true" />
              <div><strong>Check your email.</strong><span>If the address is authorised, the sign-in link will arrive shortly.</span></div>
            </div>
          ) : (
            <form onSubmit={requestLink} className="portal-login-form">
              <label>Email address<input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
              <Button type="submit" disabled={sendingLink}>{sendingLink ? <><Loader2 className="animate-spin" /> Sending…</> : <>Email me a sign-in link <ArrowUpRight /></>}</Button>
            </form>
          )}
          {error && <p className="form-error" role="alert">{error}</p>}
          <p className="portal-help">Only the approved Blue Spark client account can open the enquiry dashboard.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="portal-page">
      <div className="container portal-dashboard">
        <div className="portal-dashboard-head">
          <div><span className="eyebrow">CLIENT PORTAL</span><h1>Customer enquiries</h1><p>Newest enquiries appear first. Customer information is visible only to the authorised account.</p></div>
          <div className="portal-account"><span>{viewerEmail}</span><Button type="button" variant="outline" onClick={signOut}><LogOut /> Sign out</Button></div>
        </div>
        <div className="portal-toolbar">
          <label className="portal-search"><Search aria-hidden="true" /><span className="sr-only">Search enquiries</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, project, phone or email" /></label>
          <Button type="button" variant="outline" onClick={() => void loadEnquiries(session)}><RefreshCw /> Refresh</Button>
          <span className="portal-count">{filtered.length} {filtered.length === 1 ? 'enquiry' : 'enquiries'}</span>
        </div>
        {error && <p className="form-error portal-error" role="alert">{error}</p>}
        {filtered.length === 0 ? (
          <div className="portal-empty"><Inbox aria-hidden="true" /><h2>No enquiries found.</h2><p>{query ? 'Try a different search.' : 'New website enquiries will appear here.'}</p></div>
        ) : (
          <div className="portal-enquiry-list">
            {filtered.map((item) => <EnquiryCard key={item.id} enquiry={item} onOpenAttachment={openAttachment} />)}
          </div>
        )}
      </div>
    </section>
  );
}

function EnquiryCard({ enquiry, onOpenAttachment }: { enquiry: PortalEnquiry; onOpenAttachment: (path: string) => void }) {
  const submitted = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(enquiry.created_at));
  return (
    <article className="portal-enquiry-card">
      <header><div><span className="portal-source">{enquiry.source === 'quote' ? 'Quote request' : 'Contact enquiry'}</span><h2>{enquiry.project_type}</h2></div><time dateTime={enquiry.created_at}>{submitted}</time></header>
      <div className="portal-enquiry-grid">
        <div><strong>Customer</strong><span>{enquiry.name}{enquiry.business_name ? ` · ${enquiry.business_name}` : ''}</span></div>
        <div><strong>Phone</strong><a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a></div>
        <div><strong>Email</strong>{enquiry.email ? <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a> : <span>Not provided</span>}</div>
        <div><strong>Preferred contact</strong><span>{enquiry.preferred_contact || 'Not specified'}</span></div>
        {enquiry.dimensions && <div><strong>Dimensions</strong><span>{enquiry.dimensions}</span></div>}
        {enquiry.quantity && <div><strong>Quantity</strong><span>{enquiry.quantity}</span></div>}
        {enquiry.timeframe && <div><strong>Timeframe</strong><span>{enquiry.timeframe}</span></div>}
        {enquiry.postcode && <div><strong>Postcode</strong><span>{enquiry.postcode}</span></div>}
      </div>
      <div className="portal-description"><strong>Project details</strong><p>{enquiry.description}</p></div>
      {enquiry.file_paths.length > 0 && <div className="portal-attachments"><strong><Paperclip aria-hidden="true" /> Attachments</strong>{enquiry.file_paths.map((path, index) => <Button type="button" variant="outline" key={path} onClick={() => onOpenAttachment(path)}>Open attachment {index + 1} <ArrowUpRight /></Button>)}</div>}
    </article>
  );
}
