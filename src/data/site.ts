import hero from '@/assets/welding-hero.jpg';
import table from '@/assets/stainless-workshop.jpg';
import cooker from '@/assets/cooker.jpg';
import gate from '@/assets/gate.jpg';

export const imagery = { hero, table, cooker, gate };
export const phone = '07438 355784';
export const whatsapp = 'https://wa.me/447438355784';
export const address = 'Unit 5, 4 Playfair Road, Leeds LS10 2JP';
export const services = [
  { title: 'Commercial Catering Equipment', description: 'Practical, hard-working equipment made around the needs of your kitchen.', image: table, to: '/catering-equipment' },
  { title: 'Stainless Steel Tables', description: 'Made-to-measure prep tables and workstations for demanding daily use.', image: table, to: '/catering-equipment' },
  { title: 'Commercial Cookers & Grills', description: 'Heavy-duty cooking equipment for busy commercial environments.', image: cooker, to: '/catering-equipment' },
  { title: 'Bespoke Stainless Fabrication', description: 'Purpose-built steelwork shaped to your space and specifications.', image: hero, to: '/metal-fabrication' },
  { title: 'Gates & Fencing', description: 'Strong metal gates and fencing fabricated for your property.', image: gate, to: '/metal-fabrication' },
  { title: 'Security Grilles / Huks', description: 'Made-to-fit protective metalwork with strength in every detail.', image: gate, to: '/metal-fabrication' },
  { title: 'Kitchen Equipment Repairs', description: 'Get in touch to discuss repairs to your commercial kitchen equipment.', image: cooker, to: '/catering-equipment' },
  { title: 'Custom Metalwork', description: 'One-off pieces and unusual requirements: start with a sketch or photo.', image: hero, to: '/metal-fabrication' },
] as const;
export const projects = [
  { slug: 'stainless-preparation-tables', title: 'Stainless preparation tables', category: 'Tables', image: table, description: 'Illustrative example of made-to-measure preparation surfaces for working kitchens.', materials: 'Stainless steel', location: 'Leeds', services: ['Catering equipment', 'Stainless fabrication'], featured: true, date: '' },
  { slug: 'commercial-cooking-equipment', title: 'Commercial cooking equipment', category: 'Cookers', image: cooker, description: 'Illustrative example of robust cooker and grill fabrication for commercial use.', materials: 'Stainless steel', location: 'Leeds', services: ['Catering equipment'], featured: true, date: '' },
  { slug: 'bespoke-steel-gates', title: 'Bespoke steel gates', category: 'Gates', image: gate, description: 'Illustrative example of metal gates made to suit a property’s dimensions.', materials: 'Steel', location: 'Leeds', services: ['Metal fabrication'], featured: true, date: '' },
  { slug: 'workshop-fabrication', title: 'Bespoke workshop fabrication', category: 'Custom Metalwork', image: hero, description: 'Illustrative view of the fabrication process. Real project photographs can be added here.', materials: 'Made to specification', location: 'Leeds', services: ['Metal fabrication'], featured: false, date: '' },
] as const;
export const faqs = [
  ['Do you manufacture custom sizes?', 'Yes. Tell us the measurements and how the piece needs to work in your space.'],
  ['Can I send you a picture of what I need?', 'Yes. Photos, sketches and reference images are a useful starting point for a quotation.'],
  ['Can you work from measurements or drawings?', 'Yes. Send us the dimensions or drawings you have and we can discuss the details.'],
  ['Do you fabricate stainless-steel catering equipment?', 'Yes. We fabricate tables, benches, equipment stands and other bespoke kitchen equipment.'],
  ['Can you make one-off items?', 'Yes. We welcome individual made-to-measure projects as well as larger work.'],
  ['Do you manufacture gates and security grilles?', 'Yes. We make bespoke gates, fences, grilles and huks.'],
  ['Can you repair catering equipment?', 'Contact us with photographs and a description of the issue so we can discuss the repair.'],
  ['Where are you based?', 'Our workshop is at Unit 5, 4 Playfair Road, Leeds LS10 2JP.'],
  ['How do I request a quote?', 'Use the quote form, call us or send a WhatsApp message with a description of what you need.'],
  ['What information should I send for a quotation?', 'A description, approximate dimensions, quantity and photographs or drawings are all helpful.'],
] as const;
