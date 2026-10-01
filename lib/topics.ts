export type Topic={id:string;name:string;origin:"Koziel"|"Nexus IA";description:string;keywords:string[]};

export const coreTopics:Topic[]=[
 {id:"relogio-nexus",name:"RELÓGIO NEXUS",origin:"Koziel",description:"Hardware, QBIT, interface de pulso, voz e conexão com o cérebro.",keywords:["relógio","qbit","t-watch","hardware","voz"]},
 {id:"nexus",name:"NEXUS",origin:"Koziel",description:"Painel, banco de memória e centro de comando dos trabalhos.",keywords:["nexus","painel","firebase","agenda"]},
 {id:"personalidade-de-decisao",name:"PERSONALIDADE DE DECISÃO",origin:"Koziel",description:"Motivos, critérios, padrões e princípios por trás das escolhas.",keywords:["decisão","método","princípio","escolha"]},
 {id:"espaco-fisico-galpao",name:"ESPAÇO FÍSICO GALPÃO",origin:"Koziel",description:"Ambiente físico, organização, estrutura e operações do galpão.",keywords:["galpão","espaço físico"]},
 {id:"processos-nucleo-criativo",name:"PROCESSOS NÚCLEO CRIATIVO",origin:"Koziel",description:"Fluxos, responsabilidades e formas de trabalhar do Núcleo Criativo.",keywords:["núcleo criativo","processo"]},
 {id:"sistema-detalha-skp",name:"SISTEMA DETALHA SKP",origin:"Koziel",description:"Conhecimento e decisões sobre o sistema Detalha SKP.",keywords:["detalha skp","skp"]},
 {id:"nc-app",name:"NC APP",origin:"Koziel",description:"Produto, decisões e desenvolvimento do NC App.",keywords:["nc app"]},
 {id:"comunicacao-visual",name:"COMUNICAÇÃO VISUAL",origin:"Koziel",description:"Linguagem, marca, peças e critérios de comunicação visual.",keywords:["comunicação visual","identidade visual"]},
];

// Propostas curadas pelo assistente a partir das memórias que já têm fonte.
export const inferredTopics:Topic[]=[
 {id:"ia-orquestracao",name:"IA E ORQUESTRAÇÃO",origin:"Nexus IA",description:"Papel do Codex, serviços especializados e fluxo de execução.",keywords:["codex","agente","orquestração","executor"]},
 {id:"memoria-conhecimento",name:"MEMÓRIA E CONHECIMENTO",origin:"Nexus IA",description:"Notas conectadas, fontes, histórico e recuperação de contexto.",keywords:["memória","nota","conhecimento","backlink"]},
 {id:"infraestrutura",name:"INFRAESTRUTURA",origin:"Nexus IA",description:"Hospedagem, Firebase, segurança e operação contínua.",keywords:["firebase","nuvem","banco","hospedagem"]},
];

export const initialTopics=[...coreTopics,...inferredTopics];

export const noteTopics:Record<string,string[]>={
 nexus:["nexus"],watch:["relogio-nexus","nexus"],qbit:["relogio-nexus"],codex:["nexus","ia-orquestracao"],cloud:["nexus","infraestrutura"],memory:["nexus","personalidade-de-decisao","memoria-conhecimento"],method:["personalidade-de-decisao","memoria-conhecimento"],firebase:["nexus","infraestrutura"],hardware:["relogio-nexus"],projects:["nexus"],agenda:["nexus"],voice:["relogio-nexus","ia-orquestracao"]
};
