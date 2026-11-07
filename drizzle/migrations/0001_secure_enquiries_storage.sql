-- Keep customer enquiries private. Only trusted server-side code may read or
-- write this table; anonymous website visitors never receive direct access.
REVOKE ALL ON TABLE public.enquiries FROM anon, authenticated;
GRANT ALL ON TABLE public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Private storage for quotation drawings and photographs. The service-role
-- client uploads files after validating their type and size in the server fn.
INSERT INTO storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
VALUES (
  'enquiry-attachments',
  'enquiry-attachments',
  false,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;
