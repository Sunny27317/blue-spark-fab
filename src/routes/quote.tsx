import { createFileRoute } from '@tanstack/react-router';
import { Breadcrumb, PageIntro } from '@/components/blue-spark/Shared';
import { QuoteForm } from '@/components/blue-spark/QuoteForm';
import { imagery } from '@/data/site';

export const Route = createFileRoute('/quote')({
  head: () => ({
    meta: [
      { title: 'Request a Free Quote | Blue Spark Leeds' },
      {
        name: 'description',
        content:
          'Request a free quote for bespoke catering equipment, stainless-steel fabrication, gates, repairs or custom metalwork in Leeds.',
      },
    ],
    links: [{ rel: 'canonical', href: '/quote' }],
  }),
  component: Quote,
});

function Quote() {
  return (
    <>
      <PageIntro
        eyebrow="FREE QUOTE / YOUR PROJECT"
        title="Tell us what you need built."
        text="Share the basics now. You can add photographs, drawings and measurements as you go."
        image={imagery.hero}
      />
      <Breadcrumb current="Request a Quote" />
      <section className="section quote-section">
        <div className="container quote-layout">
          <div className="quote-aside">
            <span className="eyebrow">BUILT AROUND YOUR REQUIREMENTS</span>
            <h2>Start with the idea.</h2>
            <p>
              Choose the closest type of work, describe the project and attach any useful
              reference files. Blue Spark will review the details and contact you to discuss the
              next step.
            </p>
            <div className="quote-aside-line" />
            <p>There is no obligation, and every enquiry is reviewed individually.</p>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
