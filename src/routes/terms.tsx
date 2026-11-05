import { createFileRoute, Link } from '@tanstack/react-router';
import { Breadcrumb, PageIntro } from '@/components/blue-spark/Shared';

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [
      { title: 'Website Terms | Blue Spark' },
      {
        name: 'description',
        content: 'Terms for using the Blue Spark website and requesting project quotations.',
      },
    ],
    links: [{ rel: 'canonical', href: '/terms' }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <>
      <PageIntro
        eyebrow="INFORMATION / WEBSITE TERMS"
        title="Website Terms"
        text="Important information about using this website and requesting a quotation."
      />
      <Breadcrumb current="Website Terms" />
      <section className="content-section">
        <div className="container legal-copy">
          <p>Last updated: 5 November 2026</p>
          <h2>Using this website</h2>
          <p>
            This website provides general information about Blue Spark and its fabrication and
            catering-equipment services. Please use it lawfully and do not attempt to disrupt,
            damage or gain unauthorised access to the website or its systems.
          </p>
          <h2>Project information and quotations</h2>
          <p>
            Sending an enquiry does not create a contract or guarantee that work can be accepted.
            Any quotation, scope, price, timing, delivery, installation and payment terms will be
            confirmed separately after the project requirements have been reviewed.
          </p>
          <h2>Accuracy of information</h2>
          <p>
            Blue Spark aims to keep the website accurate and available, but content may change
            and occasional errors or interruptions may occur. Project photographs are examples of
            work and do not guarantee an identical result for another project.
          </p>
          <h2>Website content</h2>
          <p>
            Unless stated otherwise, the text, branding and original photographs on this website
            may not be copied or reused commercially without permission.
          </p>
          <h2>External services</h2>
          <p>
            Links to services such as WhatsApp or Google Maps take you to third-party websites
            with their own terms and privacy practices. Blue Spark is not responsible for those
            external services.
          </p>
          <h2>Questions</h2>
          <p>
            If you have a question about these terms, please use the{' '}
            <Link to="/contact">contact page</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
