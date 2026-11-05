import { createFileRoute } from '@tanstack/react-router';
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { Breadcrumb, PageIntro } from '@/components/blue-spark/Shared';
import { QuoteForm } from '@/components/blue-spark/QuoteForm';
import { address, imagery, phone, whatsapp } from '@/data/site';

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact Blue Spark | Metal Fabrication Leeds' },
      {
        name: 'description',
        content:
          'Contact Blue Spark in Leeds to discuss catering equipment, stainless-steel fabrication, gates, repairs or bespoke metalwork.',
      },
    ],
    links: [{ rel: 'canonical', href: '/contact' }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="CONTACT / LEEDS"
        title="Talk to us about your project."
        text="Call, send a WhatsApp message or tell us what you need using the form below."
        image={imagery.hero}
      />
      <Breadcrumb current="Contact" />
      <section className="content-section">
        <div className="container contact-grid">
          <div>
            <span className="eyebrow">GET IN TOUCH</span>
            <h2>Speak directly with Blue Spark.</h2>
            <p>
              Photographs, drawings and approximate measurements are useful, but an idea is
              enough to start the conversation.
            </p>
            <div className="contact-person">
              <strong>CALL</strong>
              <a href="tel:+447404092144">{phone}</a>
              <a href="tel:+447404092144">
                <Phone aria-hidden="true" size={15} /> Call Blue Spark
              </a>
            </div>
            <div className="contact-person">
              <strong>WHATSAPP</strong>
              <a href={whatsapp} target="_blank" rel="noreferrer">
                Send a message
              </a>
              <a href={whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" size={15} /> Open WhatsApp
              </a>
            </div>
            <div className="contact-person">
              <strong>WORKSHOP</strong>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noreferrer"
              >
                {address}
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noreferrer"
              >
                <MapPin aria-hidden="true" size={15} /> View on Google Maps
              </a>
            </div>
          </div>
          <QuoteForm compact source="contact" />
        </div>
      </section>
    </>
  );
}
