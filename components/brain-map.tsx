"use client";
import {useState} from "react";
import {BrainCircuit,ExternalLink,Link2} from "lucide-react";
import {knowledge,researchReferences,type KnowledgeNote} from "../lib/knowledge";

const positions:Record<string,[number,number]>={nexus:[50,50],watch:[50,12],qbit:[80,20],codex:[89,48],cloud:[76,78],firebase:[50,88],memory:[20,76],method:[10,48],hardware:[21,20],projects:[35,35],agenda:[65,35],voice:[65,65]};
const featured=knowledge.filter(n=>positions[n.id]);
const colors:Record<KnowledgeNote["kind"],string>={visao:"#78e9ff",decisao:"#a9a0ff",arquitetura:"#72dfb1",projeto:"#ffc884",pendencia:"#ff9d9d"};

export function BrainMap({compact=false,onOpenMemory}:{compact?:boolean;onOpenMemory?:()=>void}){
  const[selected,setSelected]=useState("nexus");
  const note=knowledge.find(n=>n.id===selected)??knowledge[0];
  const edges=featured.flatMap(n=>n.links.filter(id=>positions[id]&&featured.some(other=>other.id===id)&&n.id<id).map(id=>[n.id,id] as const));
  return <section className={`brain-card ${compact?"compact":""}`}>
    <div className="brain-topline"><span><BrainCircuit size={15}/> MAPA VIVO DO NEXUS</span><span>{knowledge.length} memórias · {edges.length} conexões</span></div>
    <div className="brain-body">
      <div className="brain-sphere" aria-label="Mapa interativo das ideias do Nexus">
        <div className="brain-ring ring-one"/><div className="brain-ring ring-two"/><div className="brain-ring ring-three"/>
        <svg className="brain-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{edges.map(([a,b])=><line key={`${a}-${b}`} x1={positions[a][0]} y1={positions[a][1]} x2={positions[b][0]} y2={positions[b][1]} className={selected===a||selected===b?"active":""}/>)}</svg>
        {featured.map(n=><button key={n.id} type="button" onClick={()=>setSelected(n.id)} className={`brain-node ${n.id==="nexus"?"brain-core":""} ${selected===n.id?"selected":""}`} style={{left:`${positions[n.id][0]}%`,top:`${positions[n.id][1]}%`,"--node-color":colors[n.kind]} as React.CSSProperties} title={n.title}><span>{n.id==="nexus"?<BrainCircuit size={22}/>:n.title}</span></button>)}
      </div>
      <article className="brain-detail"><small>{note.kind.toUpperCase()} · {note.source}</small><h2>{note.title}</h2><strong>{note.summary}</strong><p>{note.detail}</p><div className="brain-related"><span><Link2 size={13}/> CONECTADO A</span>{note.links.slice(0,4).map(id=>{const linked=knowledge.find(n=>n.id===id);return linked?<button key={id} onClick={()=>setSelected(id)}>{linked.title}</button>:null})}</div>{onOpenMemory&&<button className="brain-open" onClick={onOpenMemory}>Explorar memória <ExternalLink size={14}/></button>}</article>
    </div>
    {!compact&&<div className="brain-research"><span>REFERÊNCIAS ESTUDADAS</span>{researchReferences.map(ref=><a key={ref.name} href={ref.url} target="_blank" rel="noreferrer" title={ref.lesson}>{ref.name}<ExternalLink size={12}/></a>)}</div>}
  </section>
}
