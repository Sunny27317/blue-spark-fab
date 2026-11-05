import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/site';
import { PageIntro, Breadcrumb, CtaBand } from '@/components/blue-spark/Shared';
export const Route = createFileRoute('/projects')({
  head: () => ({ meta: [
    {title:'Our Work | Blue Spark Metal Fabrication & Catering Equipment'},
    {name:'description',content:'Explore photographs of metal gates and commercial catering fabrication by Blue Spark.'},
  ]}),
  component: Projects,
});
function Projects() {
  const [filter,setFilter]=useState('All');
  const categories=['All','Gates','Catering Equipment'];
  const visible=projects.filter(p=>filter==='All'||p.category===filter);
  return <>
    <PageIntro eyebrow="OUR WORK / PROJECT GALLERY" title="Our Work" text="Explore photographs of fabricated gates and commercial catering equipment." />
    <Breadcrumb current="Our Work"/>
    <section className="section">
      <div className="container">
        <div className="work-filter" role="group" aria-label="Filter work gallery">
          {categories.map(c=><button key={c} type="button" aria-pressed={filter===c} className={filter===c?'selected':''} onClick={()=>setFilter(c)}>{c}</button>)}
        </div>
        <div className="work-gallery">
          {visible.map(p=><article className="work-card" key={p.slug}>
            <a href={p.image} target="_blank" rel="noreferrer" aria-label={`View full-size photo: ${p.title}`}>
              <img src={p.image} alt={p.description} loading="lazy" decoding="async" />
            </a>
            <div className="work-card-info"><span>{p.category}</span><h3>{p.title}</h3><p>{p.description}</p></div>
          </article>)}
        </div>
        <p className="work-note">Have a similar project in mind? <Link to="/quote">Request a free quote <ArrowUpRight size={16}/></Link></p>
      </div>
    </section>
    <CtaBand/>
  </>;
}
