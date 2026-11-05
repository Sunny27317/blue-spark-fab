import { createFileRoute } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { Breadcrumb, CtaBand, PageIntro } from '@/components/blue-spark/Shared';
import { faqs, imagery } from '@/data/site';

export const Route = createFileRoute('/faqs')({
  head: () => ({
    meta: [
      { title: 'Frequently Asked Questions | Blue Spark Leeds' },
      {
        name: 'description',
        content:
          'Answers about bespoke fabrication, catering equipment, gates, repairs and requesting a quote from Blue Spark in Leeds.',
      },
    ],
    links: [{ rel: 'canonical', href: '/faqs' }],
  }),
  component: Faqs,
});

function Faqs() {
  return (
    <>
      <PageIntro
        eyebrow="HELP / FREQUENTLY ASKED QUESTIONS"
        title="Questions before we get started?"
        text="Find straightforward answers about custom fabrication, quotations and working with Blue Spark."
        image={imagery.hero}
      />
      <Breadcrumb current="FAQs" />
      <section className="content-section">
        <div className="container faq-list">
          {faqs.map(([question, answer]) => (
            <details className="faq-item" key={question}>
              <summary>
                {question}
                <Plus aria-hidden="true" size={19} />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
