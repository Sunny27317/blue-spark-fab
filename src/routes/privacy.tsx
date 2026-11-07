import { createFileRoute, Link } from '@tanstack/react-router';
import { Breadcrumb, PageIntro } from '@/components/blue-spark/Shared';

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: 'Privacy Policy | Blue Spark' },
      {
        name: 'description',
        content: 'How Blue Spark handles information sent through this website.',
      },
    ],
    links: [{ rel: 'canonical', href: '/privacy' }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageIntro
        eyebrow="INFORMATION / PRIVACY"
        title="Privacy Policy"
        text="How information submitted through the Blue Spark website is handled."
      />
      <Breadcrumb current="Privacy Policy" />
      <section className="content-section">
        <div className="container legal-copy">
          <p>Last updated: 5 November 2026</p>
          <h2>Information you provide</h2>
          <p>
            When you request a quote or contact Blue Spark, you may provide your name, business
            name, telephone number, email address, postcode, project details and attachments such
            as photographs, drawings or measurements.
          </p>
          <h2>How it is used</h2>
          <p>
            This information is used to review your enquiry, prepare or discuss a quotation,
            contact you about the work and keep appropriate business records. Blue Spark does not
            sell information submitted through this website.
          </p>
          <h2>Storage and access</h2>
          <p>
            Enquiry details and attachments are stored in access-controlled systems. Access is
            limited to people who need the information to respond to or manage your enquiry.
          </p>
          <h2>How long information is kept</h2>
          <p>
            Information is retained only for as long as reasonably needed for the enquiry,
            related work, legal obligations and business record-keeping, then deleted or
            anonymised where appropriate.
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask about the personal information Blue Spark holds about you or request a
            correction or deletion where applicable. Use the details on the{' '}
            <Link to="/contact">contact page</Link> to make a request.
          </p>
          <h2>Changes to this policy</h2>
          <p>
            This page may be updated when the website or its information-handling practices
            change. The latest revision date will appear above.
          </p>
        </div>
      </section>
    </>
  );
}
