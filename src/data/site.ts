import hero from '@/assets/welding-hero.jpg';
import table from '@/assets/stainless-workshop.jpg';
import cooker from '@/assets/cooker.jpg';
import gate from '@/assets/gate.jpg';

export const imagery = { hero, table, cooker, gate };
export const phone = '07404 092144';
export const whatsapp = 'https://wa.me/447404092144';
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
  {slug:'driveway-metal-gates',title:'Driveway metal gates',category:'Gates',image:'/work/work-01.webp',description:'Steel driveway gates with vertical panels.',materials:'Steel',location:'',services:['Metal fabrication'],featured:true,date:''},
  {slug:'gate-installation',title:'Double-gate installation',category:'Gates',image:'/work/work-02.webp',description:'Wide double-leaf gate installation.',materials:'Steel',location:'',services:['Metal fabrication'],featured:true,date:''},
  {slug:'pedestrian-security-gate',title:'Pedestrian security gate',category:'Gates',image:'/work/work-03.webp',description:'Pedestrian access gate with secure frame.',materials:'Steel',location:'',services:['Metal fabrication'],featured:false,date:''},
  {slug:'side-entrance-gate',title:'Side entrance gate',category:'Gates',image:'/work/work-04.webp',description:'Custom steel access gate.',materials:'Steel',location:'',services:['Metal fabrication'],featured:false,date:''},
  {slug:'stainless-equipment',title:'Stainless kitchen equipment',category:'Catering Equipment',image:'/work/work-05.webp',description:'Stainless-steel catering fabrication.',materials:'Stainless steel',location:'',services:['Catering equipment'],featured:true,date:''},
  {slug:'commercial-cooker-workshop',title:'Commercial cooker fabrication',category:'Catering Equipment',image:'/work/work-06.webp',description:'Commercial cooker during workshop fabrication.',materials:'Steel',location:'',services:['Catering equipment'],featured:false,date:''},
  {slug:'commercial-cooker-detail',title:'Commercial cooker detail',category:'Catering Equipment',image:'/work/work-07.webp',description:'Another view of the cooking equipment.',materials:'Steel',location:'',services:['Catering equipment'],featured:false,date:''},
  {slug:'burner-assembly',title:'Burner assembly',category:'Catering Equipment',image:'/work/work-08.webp',description:'Close-up of a cooking burner assembly.',materials:'Steel',location:'',services:['Catering equipment'],featured:false,date:''},
  {slug:'cooker-pair',title:'Commercial catering units',category:'Catering Equipment',image:'/work/work-09.webp',description:'Two assembled cooking units in the workshop.',materials:'Steel',location:'',services:['Catering equipment'],featured:false,date:''},
  {slug:'single-cooker',title:'Single commercial cooker',category:'Catering Equipment',image:'/work/work-10.webp',description:'Stainless commercial cooking unit.',materials:'Stainless steel',location:'',services:['Catering equipment'],featured:false,date:''},
  {slug:'cooker-top',title:'Cooking burner top view',category:'Catering Equipment',image:'/work/work-11.webp',description:'Top view of a fabricated commercial cooking unit.',materials:'Steel',location:'',services:['Catering equipment'],featured:false,date:''},
  {slug:'garden-side-gate',title:'Garden side gate',category:'Gates',image:'/work/work-12.webp',description:'Steel gate for a narrow side entrance.',materials:'Steel',location:'',services:['Metal fabrication'],featured:false,date:''},
  {slug:'garden-gate-detail',title:'Installed garden gate',category:'Gates',image:'/work/work-13.webp',description:'Installed gate between brick walls.',materials:'Steel',location:'',services:['Metal fabrication'],featured:false,date:''},
  {slug:'steel-panel-gate',title:'Steel panel gate',category:'Gates',image:'/work/work-14.webp',description:'Fabricated steel gate panel.',materials:'Steel',location:'',services:['Metal fabrication'],featured:false,date:''},
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
