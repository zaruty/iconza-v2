// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SolidIcon3D } from "./components/solid-icon-3d";

function useIsMobile() {
  const [m, setM] = useState(typeof window !== "undefined" && window.innerWidth < 768);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return m;
}

// ═══════════════════════════════════════════════════════
// TOKENS
// ═══════════════════════════════════════════════════════
const T = {
  bg:"#EDEDF2", bgD:"#0E0E10",
  card:"#FFFFFF", cardD:"#141518",
  b:"rgba(0,0,0,0.06)", bD:"rgba(255,255,255,0.05)",
  sidebar:"rgba(255,255,255,0.88)", sidebarD:"rgba(14,14,16,0.95)",
  t1:"#0F0F0F", t1d:"#FFFFFF",
  t2:"#5A5A5A", t2d:"#94a3b8",
  t3:"#A0A0A0", t3d:"#64748b",
  acc:"#7A5CCF",
};
const c1 = d => d ? T.t1d : T.t1;
const c2 = d => d ? T.t2d : T.t2;
const c3 = d => d ? T.t3d : T.t3;
const cd = d => d ? T.cardD : T.card;
const cb = d => d ? T.bD : 'transparent';

// ═══════════════════════════════════════════════════════
// DADOS GLOBAIS
// ═══════════════════════════════════════════════════════
const UV = [
  { id:"iconmind",  label:"ICONMIND",  color:"#6B8FC7", bg:"#1A2E5C", tagline:"Mente & Consciência",  progress:68, aulas:12, total:18 },
  { id:"iconetnia", label:"ICONETNIA", color:"#52B87A", bg:"#0A2A14", tagline:"Identidade & Cultura",  progress:32, aulas:5,  total:16 },
  { id:"iconfood",  label:"ICONFOOD",  color:"#FF7A2E", bg:"#421800", tagline:"Alimentação & Ritual",  progress:0,  aulas:0,  total:14 },
  { id:"iconlove",  label:"ICONLOVE",  color:"#D4688A", bg:"#3D0A20", tagline:"Amor & Conexão",        progress:0,  aulas:0,  total:20 },
  { id:"iconart",   label:"ICONART",   color:"#7A5CCF", bg:"#2A0F5C", tagline:"Arte & Expressão",      progress:0,  aulas:0,  total:15 },
];

const NAV = [
  { id:"inicio",        label:"Início",       color:"#6B8FC7", iconKey:"home"     },
  { id:"perfil",        label:"Perfil",       color:"#D4688A", iconKey:"user"     },
  { id:"universos",     label:"Universos",    color:"#7A5CCF", iconKey:"planet"   },
  { id:"cerebro",       label:"Cérebro",      color:"#F43F5E", iconKey:"brain"    },
  { id:"iconplay",      label:"ICONPLAY",     color:"#8B5CF6", iconKey:"trophy"   },
  { id:"apoio",         label:"Eu Apoio",     color:"#E0A11B", iconKey:"heart"    },
  { id:"ia",            label:"IA ICONZA",    color:"#C26D8C", iconKey:"bot"      },
  { id:"cursos",        label:"Cursos",       color:"#52B87A", iconKey:"graduate" },
  { id:"colecoes",      label:"Coleções",     color:"#6B8FC7", iconKey:"bookmark" },
  { id:"marketplace",   label:"Marketplace",  color:"#D97832", iconKey:"bag"      },
  { id:"configuracoes", label:"Config",       color:"#8E99A8", iconKey:"settings" },
];

const AULAS = [
  { universo:"iconmind",  titulo:"Edição e Design Visual",   duracao:"22 min", aula:13, progress:68, tag:"Design"           },
  { universo:"iconetnia", titulo:"Descubra Seu Fenótipo",    duracao:"18 min", aula:6,  progress:32, tag:"Identidade"       },
  { universo:"iconfood",  titulo:"Utensílios de Cozinha",    duracao:"15 min", aula:1,  progress:0,  tag:"Culinária"        },
  { universo:"iconlove",  titulo:"Teste da Filha de Bode",   duracao:"20 min", aula:1,  progress:0,  tag:"Autoconhecimento" },
  { universo:"iconart",   titulo:"Introdução a Frida Kahlo", duracao:"25 min", aula:1,  progress:0,  tag:"Arte"             },
];

const BRAIN = [
  { label:"Emocional", score:85, color:"#D4688A", iconKey:"heart2"  },
  { label:"Criador",   score:92, color:"#8B5CF6", iconKey:"palette" },
  { label:"Racional",  score:45, color:"#6B8FC7", iconKey:"brain"   },
  { label:"Social",    score:78, color:"#52B87A", iconKey:"users"   },
  { label:"Executor",  score:60, color:"#E0A11B", iconKey:"bolt"    },
];

const POSTS = [
  { universo:"iconmind",  texto:"Acabei de entregar meu primeiro projeto de identidade visual! Obrigada ICONMIND ✨", likes:34, tempo:"2h" },
  { universo:"iconetnia", texto:"Descobri meu fenótipo melanodérmico tipo 4C e CHOREI. Ver minha ancestralidade sendo validada é transformador.", likes:91, tempo:"1d" },
  { universo:"iconlove",  texto:"Fiz o Teste da Filha de Bode e entendi por que repito certos padrões. Dói e liberta.", likes:57, tempo:"3d" },
];

const BLOG = [
  { universo:"iconmind",  tipo:"Artigo",   titulo:"Como o design influencia sua percepção de realidade", leitura:"5 min" },
  { universo:"iconetnia", tipo:"Reflexão", titulo:"Fenótipos e a política do cabelo natural",             leitura:"7 min" },
  { universo:"iconfood",  tipo:"Guia",     titulo:"Os 7 utensílios que toda cozinha ancestral tem",       leitura:"4 min" },
  { universo:"iconlove",  tipo:"Teste",    titulo:"Você reconhece um padrão de vínculo ansioso?",         leitura:"6 min" },
  { universo:"iconart",   tipo:"Perfil",   titulo:"Frida Kahlo: 5 obras que são cartas abertas",          leitura:"8 min" },
];

const CHECKLIST_VIDEOS = [
  {
    id:"painel",
    titulo:"Conhecendo o Painel do Aluno",
    desc:"Tour completo pela interface: sidebar, navegação e configurações iniciais.",
    duracao:"4:32", pagina:"inicio", color:"#6B8FC7",
    videoId:"dQw4w9WgXcQ",
    concluido:false,
    proximo:{ titulo:"Atalhos e navegação avançada", desc:"Zoom, dark mode e sidebar.", duracao:"2:48", videoId:"dQw4w9WgXcQ" }
  },
  {
    id:"perfil",
    titulo:"Configurando seu Perfil",
    desc:"Bio, título ativo, conquistas e sua identidade pública no ICONZA.",
    duracao:"3:15", pagina:"perfil", color:"#D4688A",
    videoId:"dQw4w9WgXcQ",
    concluido:false,
    proximo:{ titulo:"Sistema de XP, emblemas e títulos", desc:"Como ganhar pontos e subir de nível.", duracao:"2:50", videoId:"dQw4w9WgXcQ" }
  },
  {
    id:"universos",
    titulo:"Explorando os Universos",
    desc:"O que são os universos, como escolher o seu e iniciar sua primeira aula.",
    duracao:"5:10", pagina:"universos", color:"#7A5CCF",
    videoId:"dQw4w9WgXcQ",
    concluido:false,
    proximo:{ titulo:"Acompanhando seu progresso", desc:"Barras de evolução e planejamento.", duracao:"3:40", videoId:"dQw4w9WgXcQ" }
  },
  {
    id:"cerebro",
    titulo:"Entendendo a Matriz Cognitiva",
    desc:"Como a IA mapeia seu perfil e o que fazer com essas informações.",
    duracao:"4:00", pagina:"cerebro", color:"#F43F5E",
    videoId:"dQw4w9WgXcQ",
    concluido:false,
    proximo:{ titulo:"Usando seu perfil cognitivo", desc:"Aplique seus pontos fortes na criação.", duracao:"3:20", videoId:"dQw4w9WgXcQ" }
  },
  {
    id:"iconplay",
    titulo:"Participando do ICONPLAY",
    desc:"Como entrar nos desafios, subir no ranking e ganhar seu portfólio.",
    duracao:"3:45", pagina:"iconplay", color:"#8B5CF6",
    videoId:"dQw4w9WgXcQ",
    concluido:false,
    proximo:{ titulo:"Estratégias para vencer desafios", desc:"Dicas para se destacar no ICONPLAY.", duracao:"4:10", videoId:"dQw4w9WgXcQ" }
  },
  {
    id:"apoio",
    titulo:"Como Apoiar o Projeto",
    desc:"Doações, ranking de apoiadores e lista de desejos da plataforma.",
    duracao:"2:55", pagina:"apoio", color:"#E0A11B",
    videoId:"dQw4w9WgXcQ",
    concluido:false,
    proximo:{ titulo:"Benefícios exclusivos para apoiadores", desc:"O que você recebe ao apoiar regularmente.", duracao:"2:30", videoId:"dQw4w9WgXcQ" }
  },
  {
    id:"agenda",
    titulo:"Usando a Agenda Inteligente",
    desc:"Como se inscrever em mentorias, ativar lembretes e acompanhar eventos.",
    duracao:"3:20", pagina:"inicio", color:"#C26D8C",
    videoId:"dQw4w9WgXcQ",
    concluido:false,
    proximo:{ titulo:"Aproveitando ao máximo as mentorias", desc:"Como se preparar para uma sessão.", duracao:"3:55", videoId:"dQw4w9WgXcQ" }
  },
];


const CONQUISTAS = [
  { id:"a", label:"Primeiros Passos",  desc:"Concluiu sua primeira aula",            color:"#52B87A", iconKey:"sprout", xp:50,  desbloqueada:true,  data:"12 Jan 2026" },
  { id:"b", label:"Mente Aberta",      desc:"7 dias consecutivos de aprendizado",    color:"#E0A11B", iconKey:"fire",   xp:100, desbloqueada:true,  data:"20 Jan 2026" },
  { id:"c", label:"Designer Nato",     desc:"Completou o módulo de Edição & Design", color:"#6B8FC7", iconKey:"pencil", xp:150, desbloqueada:true,  data:"28 Jan 2026" },
  { id:"d", label:"Raiz Viva",         desc:"Iniciou ICONETNIA e descobriu fenótipo",color:"#52B87A", iconKey:"leaf",   xp:120, desbloqueada:true,  data:"05 Fev 2026" },
  { id:"e", label:"Alma Livre",        desc:"Complete 50% de qualquer universo",     color:"#7A5CCF", iconKey:"palette",xp:200, desbloqueada:false, data:null },
  { id:"f", label:"Guardiã do Lar",    desc:"Conclua ICONFOOD módulo 1",             color:"#E8711A", iconKey:"pot",    xp:150, desbloqueada:false, data:null },
  { id:"g", label:"Coração Aberto",    desc:"Faça o Teste da Filha de Bode",         color:"#D4688A", iconKey:"heart2", xp:120, desbloqueada:false, data:null },
  { id:"h", label:"Alma de Artista",   desc:"Conclua a introdução a Frida Kahlo",    color:"#7A5CCF", iconKey:"frame",  xp:180, desbloqueada:false, data:null },
];

const AGENDA = [
  { id:1, title:"Mentoria Individual: Identidade Visual com IA", tipo:"mentoria_individual", modalidade:"Online", time:"Hoje, 19:00",    duracao:"60 min", vagas:1,  preco:"R$ 197",   color:"#C26D8C", inscrito:true,  sino:false, email:false, foto:null },
  { id:2, title:"Mentoria em Grupo: Posicionamento Digital",     tipo:"mentoria_grupo",      modalidade:"Online", time:"Amanhã, 20:00", duracao:"90 min", vagas:8,  preco:"R$ 97",    color:"#7A5CCF", inscrito:true,  sino:true,  email:false, foto:null },
  { id:3, title:"Workshop Presencial: Culinária Ancestral",      tipo:"evento",              modalidade:"RJ",     time:"Sáb, 10:00",    duracao:"4h",     vagas:20, preco:"R$ 147",   color:"#FF7A2E", inscrito:false, sino:false, email:false, foto:null },
  { id:4, title:"Live: Meu Cérebro Criativo — Q&A Aberto",       tipo:"evento",              modalidade:"Online", time:"Dom, 18:00",    duracao:"2h",     vagas:999,preco:"Gratuito", color:"#52B87A", inscrito:false, sino:false, email:false, foto:null },
  { id:5, title:"Mentoria em Grupo: Ancestralidade e Fenótipo",  tipo:"mentoria_grupo",      modalidade:"Online", time:"Ter, 20:00",    duracao:"90 min", vagas:12, preco:"R$ 97",    color:"#6B8FC7", inscrito:false, sino:false, email:false, foto:null },
];

const PRODUTOS_AFILIADOS = [
  { id:1, nome:"Microfone Condensador USB Profissional", preco:"R$ 189,90", desconto:"28% OFF", estrelas:4.8, vendas:"2.3k", cor:"#6B8FC7", emoji:"🎙️", link:"#" },
  { id:2, nome:"Ring Light 18 polegadas com Tripé",     preco:"R$ 134,90", desconto:"35% OFF", estrelas:4.7, vendas:"5.1k", cor:"#E0A11B", emoji:"💡", link:"#" },
  { id:3, nome:"Mesa Digitalizadora Gráfica Wacom",     preco:"R$ 299,00", desconto:"22% OFF", estrelas:4.9, vendas:"890",  cor:"#8B5CF6", emoji:"🖊️", link:"#" },
  { id:4, nome:"Cadeira Ergonômica Home Office",        preco:"R$ 649,00", desconto:"15% OFF", estrelas:4.6, vendas:"3.2k", cor:"#52B87A", emoji:"🪑", link:"#" },
  { id:5, nome:"HD Externo SSD 1TB Portátil",           preco:"R$ 279,90", desconto:"20% OFF", estrelas:4.8, vendas:"1.8k", cor:"#C26D8C", emoji:"💾", link:"#" },
];

const NOTIFICACOES = [
  { id:1, tipo:"conquista", msg:"Desbloqueaste a conquista Raiz Viva!", tempo:"2h",  lida:false, icon:"🍃", color:"#52B87A" },
  { id:2, tipo:"aula",      msg:"Sua próxima aula em ICONMIND está pronta",tempo:"4h",  lida:false, icon:"▶️", color:"#6B8FC7" },
  { id:3, tipo:"evento",    msg:"Mentoria começa em 2 horas!",           tempo:"2h",  lida:false, icon:"🎙️", color:"#C26D8C" },
  { id:4, tipo:"social",    msg:"Amara Silva comentou no seu mural",     tempo:"1d",  lida:true,  icon:"💬", color:"#7A5CCF" },
  { id:5, tipo:"progresso", msg:"Você está a 32% do ICONETNIA. Continue!", tempo:"2d", lida:true,  icon:"🪐", color:"#E0A11B" },
];

const HISTORICO = [
  { id:1, tipo:"aula",      desc:"Concluiu Aula 12 — Edição e Design Visual",      universo:"iconmind",  tempo:"Hoje, 10:32",   xp:+45  },
  { id:2, tipo:"conquista", desc:"Desbloqueou conquista Raiz Viva",                 universo:"iconetnia", tempo:"Ontem, 18:14",  xp:+120 },
  { id:3, tipo:"aula",      desc:"Iniciou Aula 6 — Descubra Seu Fenótipo",          universo:"iconetnia", tempo:"Ontem, 17:50",  xp:+10  },
  { id:4, tipo:"social",    desc:"Publicou no mural da comunidade",                 universo:"iconmind",  tempo:"2 dias atrás",  xp:+15  },
  { id:5, tipo:"aula",      desc:"Concluiu Aula 11 — Tipografia Essencial",         universo:"iconmind",  tempo:"3 dias atrás",  xp:+40  },
  { id:6, tipo:"conquista", desc:"Desbloqueou conquista Designer Nato",              universo:"iconmind",  tempo:"4 dias atrás",  xp:+150 },
];

const TITULOS = [
  { id:"despertar",   label:"Exploradora Desperta",  desc:"Iniciou sua jornada ICONZA",      color:"#6B8FC7", desbloqueado:true,  ativo:true  },
  { id:"criadora",    label:"Criadora Colaborativa",  desc:"Perfil cognitivo dominante",      color:"#8B5CF6", desbloqueado:true,  ativo:false },
  { id:"raiz",        label:"Raiz Viva",              desc:"Conectada com ancestralidade",     color:"#52B87A", desbloqueado:true,  ativo:false },
  { id:"mestre",      label:"Mestre do Design",       desc:"Complete ICONMIND 100%",           color:"#E0A11B", desbloqueado:false, ativo:false },
];

// ═══════════════════════════════════════════════════════
// ICON 3D SVG
// ═══════════════════════════════════════════════════════
function Icon3D({ iconKey, size=20, color="currentColor" }) {
  const s = size;
  const id = `i${iconKey}${s}x`.replace(/[^a-zA-Z0-9]/g,"");

  if (iconKey === "home") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <path d="M3 10.5L12 3L21 10.5V20C21 20.6 20.6 21 20 21H15.5V15H8.5V21H4C3.4 21 3 20.6 3 20V10.5Z" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M10 21V17C10 16.4 10.4 16 11 16H13C13.6 16 14 16.4 14 17V21" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.7"/>
    </svg>
  );
  if (iconKey === "planet") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <circle cx="12" cy="12" r="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6"/>
      <ellipse cx="12" cy="12" rx="11" ry="4" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.55"/>
      <circle cx="9" cy="9" r="1.4" fill="currentColor" fillOpacity="0.6"/>
    </svg>
  );
  if (iconKey === "brain") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <path d="M12 5C10.5 5 9 5.8 8.2 7C7 7.2 6 8 5.5 9C4.5 9.4 4 10.4 4 11.5C4 13.5 5.5 15 7 15.5V17C7 18.1 7.9 19 9 19H15C16.1 19 17 18.1 17 17V15.5C18.5 15 20 13.5 20 11.5C20 10.4 19.5 9.4 18.5 9C18 8 17 7.2 15.8 7C15 5.8 13.5 5 12 5Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9 11C9 11 10 12 12 12C14 12 15 11 15 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7"/>
    </svg>
  );
  if (iconKey === "trophy") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <path d="M8 3H16V13C16 15.2 14.2 17 12 17C9.8 17 8 15.2 8 13V3Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M5 4H8V9C6.2 8.5 5 7 5 5.5V4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeOpacity="0.6"/>
      <path d="M19 4H16V9C17.8 8.5 19 7 19 5.5V4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeOpacity="0.6"/>
      <path d="M12 17V20M9 20H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
  if (iconKey === "heart" || iconKey === "heart2") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <path d="M12 21C12 21 3 15 3 8.5C3 5.4 5.4 3 8.5 3C10.2 3 11.7 3.8 12 5C12.3 3.8 13.8 3 15.5 3C18.6 3 21 5.4 21 8.5C21 15 12 21 12 21Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
  if (iconKey === "user") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <circle cx="12" cy="8" r="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M4 20C4 16.7 7.6 14 12 14C16.4 14 20 16.7 20 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
  if (iconKey === "settings") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 2V4.5M12 19.5V22M4.22 4.22L5.98 5.98M18.02 18.02L19.78 19.78M2 12H4.5M19.5 12H22M4.22 19.78L5.98 18.02M18.02 5.98L19.78 4.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
    </svg>
  );
  if (iconKey === "bot") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <rect x="3" y="8" width="18" height="13" rx="3" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="9" cy="14" r="1.5" fill="currentColor" fillOpacity="0.7"/>
      <circle cx="15" cy="14" r="1.5" fill="currentColor" fillOpacity="0.7"/>
      <path d="M12 8V5M9 5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  if (iconKey === "graduate") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <path d="M12 3L22 8L12 13L2 8Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M6 10.5V16C6 16 8.5 19 12 19C15.5 19 18 16 18 16V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  if (iconKey === "bookmark") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <path d="M5 3H19C19.6 3 20 3.4 20 4V21L12 17L4 21V4C4 3.4 4.4 3 5 3Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
  if (iconKey === "bag") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <rect x="3" y="8" width="18" height="13" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 8V6C8 4.3 9.3 3 11 3H13C14.7 3 16 4.3 16 6V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  if (iconKey === "bell") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="18" cy="5" r="3" fill="#F43F5E"/>
    </svg>
  );
  if (iconKey === "history") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C9.06 21 6.48 19.56 4.9 17.33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3 7V12H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  // 3D conquistas
  if (iconKey === "fire") return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <defs><linearGradient id={`${id}b`} x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#FF7A2A"/><stop offset="100%" stopColor="#B82800"/></linearGradient><linearGradient id={`${id}c`} x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#FFD83A"/><stop offset="100%" stopColor="#FF8030"/></linearGradient></defs>
      <path d="M24 5C13 14 7 23 10 33C12 41 18 45 24 45C30 45 36 41 38 33C41 23 35 14 24 5Z" fill={`url(#${id}b)`}/>
      <path d="M24 14C18 20 15 27 17 34C19 39 22 42 24 42C26 42 29 39 31 34C33 27 30 20 24 14Z" fill={`url(#${id}c)`}/>
      <path d="M24 24C21 27 20 31 22 35C23 37 23.5 38 24 38C24.5 38 25 37 26 35C28 31 27 27 24 24Z" fill="rgba(255,255,230,0.9)"/>
    </svg>
  );
  if (iconKey === "sprout") return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <defs><linearGradient id={`${id}b`} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#1E7A44"/><stop offset="100%" stopColor="#4FCE80"/></linearGradient><radialGradient id={`${id}c`} cx="32%" cy="28%" r="68%"><stop offset="0%" stopColor="#80E8A8"/><stop offset="100%" stopColor="#167038"/></radialGradient></defs>
      <path d="M24 39C24 31 22 25 19 17" stroke={`url(#${id}b)`} strokeWidth="2.8" strokeLinecap="round"/>
      <path d="M19 17C12 9 5 11 7 20C8 26 15 25 19 17Z" fill={`url(#${id}c)`}/>
      <path d="M19 17C21 9 30 6 33 14C34 20 27 22 19 17Z" fill={`url(#${id}c)`}/>
    </svg>
  );
  if (iconKey === "pencil") return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <defs><linearGradient id={`${id}a`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#4A90D9"/><stop offset="100%" stopColor="#2266B0"/></linearGradient></defs>
      <g transform="rotate(-42,24,24)"><rect x="9" y="14" width="30" height="21" rx="3" fill={`url(#${id}a)`}/><rect x="10" y="15" width="3.5" height="19" rx="1.5" fill="rgba(255,255,255,0.28)"/><polygon points="9,21 9,27 3,24" fill="#D9A06A"/></g>
    </svg>
  );
  if (iconKey === "leaf") return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <defs><radialGradient id={`${id}a`} cx="28%" cy="22%" r="72%"><stop offset="0%" stopColor="#96F0C0"/><stop offset="55%" stopColor="#24B862"/><stop offset="100%" stopColor="#084E22"/></radialGradient></defs>
      <path d="M25 43C11 36 4 20 8 8C15 4 32 2 42 13C49 22 42 39 25 43Z" fill={`url(#${id}a)`}/>
      <path d="M25 43C21 32 13 18 9 10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
  if (iconKey === "palette") return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <defs><radialGradient id={`${id}a`} cx="38%" cy="32%" r="68%"><stop offset="0%" stopColor="#EDE8FF"/><stop offset="100%" stopColor="#9080CC"/></radialGradient></defs>
      <path d="M7 26C5 13 14 5 24 5C34 5 45 14 42 25C40 31 36 33 32 31C27 28 28 33 24 35C17 37 9 35 7 26Z" fill={`url(#${id}a)`}/>
      {[{cx:13,cy:13,f:"#FF6060"},{cx:22,cy:8,f:"#FFD050"},{cx:32,cy:10,f:"#50D870"},{cx:40,cy:19,f:"#5090FF"},{cx:11,cy:22,f:"#C050D8"}].map((b,i) => <ellipse key={i} cx={b.cx} cy={b.cy} rx={4} ry={3.2} fill={b.f}/>)}
    </svg>
  );
  if (iconKey === "pot") return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <defs><linearGradient id={`${id}a`} x1="20%" y1="0%" x2="80%" y2="100%"><stop offset="0%" stopColor="#C87848"/><stop offset="100%" stopColor="#7A3818"/></linearGradient></defs>
      <path d="M8 29Q8 43 24 43Q40 43 40 29L38 15Q24 11 10 15Z" fill={`url(#${id}a)`}/>
      <ellipse cx="24" cy="15" rx="14" ry="5.5" fill="#180C04"/>
      <path d="M8 26Q1 26 1 32Q1 38 8 38" stroke="#E09050" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M40 26Q47 26 47 32Q47 38 40 38" stroke="#E09050" strokeWidth="4" fill="none" strokeLinecap="round"/>
    </svg>
  );
  if (iconKey === "frame") return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <defs><linearGradient id={`${id}a`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#C0A0F8"/><stop offset="100%" stopColor="#301870"/></linearGradient></defs>
      <rect x="5" y="5" width="38" height="38" rx="3.5" fill={`url(#${id}a)`}/>
      <rect x="5" y="5" width="38" height="3.5" rx="1.5" fill="rgba(255,255,255,0.38)"/>
      <rect x="10" y="10" width="28" height="28" rx="1.5" fill="#FFF8EC"/>
      <path d="M12 33Q17 20 24 26Q31 32 36 17" stroke="#7878FF" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <circle cx="17" cy="17" r="4.5" fill="#FF7878" opacity="0.72"/>
    </svg>
  );
  // stat icons
  if (iconKey === "streak") return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <defs><linearGradient id={`${id}g`} x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#FFD855"/><stop offset="100%" stopColor="#FF5500"/></linearGradient></defs>
      <path d="M16 3C9 10 6 17 9 23C11 28 14 30 16 30C18 30 21 28 23 23C26 17 23 10 16 3Z" fill={`url(#${id}g)`}/>
      <path d="M16 12C13 16 12 21 13.5 25C14.5 27 15.5 28 16 28C16.5 28 17.5 27 18.5 25C20 21 19 16 16 12Z" fill="rgba(255,255,230,0.75)"/>
    </svg>
  );
  if (iconKey === "clock") return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <defs><radialGradient id={`${id}g`} cx="36%" cy="30%" r="68%"><stop offset="0%" stopColor="#B0D4F8"/><stop offset="100%" stopColor="#1858A0"/></radialGradient></defs>
      <circle cx="16" cy="16" r="13" fill={`url(#${id}g)`}/>
      <path d="M16 16V8.5" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M16 16L22 19.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="16" cy="16" r="1.8" fill="white"/>
    </svg>
  );
  if (iconKey === "check") return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <defs><radialGradient id={`${id}g`} cx="36%" cy="30%" r="68%"><stop offset="0%" stopColor="#90EAB8"/><stop offset="100%" stopColor="#127840"/></radialGradient></defs>
      <circle cx="16" cy="16" r="13" fill={`url(#${id}g)`}/>
      <path d="M8.5 16L13.5 21.5L23.5 10.5" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (iconKey === "star") return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <defs><radialGradient id={`${id}g`} cx="36%" cy="26%" r="68%"><stop offset="0%" stopColor="#D8B4FF"/><stop offset="100%" stopColor="#4A18A0"/></radialGradient></defs>
      <path d="M16 3L18.9 11.6H28L20.5 16.8L23.4 25.4L16 20.2L8.6 25.4L11.5 16.8L4 11.6H13.1Z" fill={`url(#${id}g)`}/>
    </svg>
  );
  if (iconKey === "users") return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <defs><radialGradient id={`${id}g`} cx="36%" cy="30%" r="68%"><stop offset="0%" stopColor="#90F0B8"/><stop offset="100%" stopColor="#127840"/></radialGradient></defs>
      <circle cx="12" cy="11" r="5" fill={`url(#${id}g)`}/>
      <circle cx="22" cy="11" r="4" fill={`url(#${id}g)`} opacity="0.6"/>
      <path d="M3 26C3 21 7 18 12 18C17 18 21 21 21 26" stroke={`url(#${id}g)`} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
  if (iconKey === "bolt") return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <defs><linearGradient id={`${id}g`} x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#FFE055"/><stop offset="100%" stopColor="#E09010"/></linearGradient></defs>
      <path d="M18 4L6 18H15L14 28L26 14H17Z" fill={`url(#${id}g)`}/>
    </svg>
  );
  if (iconKey === "brain2") return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <defs><radialGradient id={`${id}a`} cx="36%" cy="30%" r="68%"><stop offset="0%" stopColor="#B0D4F8"/><stop offset="100%" stopColor="#1858A0"/></radialGradient></defs>
      <path d="M24 6C20 6 17 8 15.5 11C13 11.5 11 13 10 15C8 15.8 7 17.5 7 20C7 24 9.5 27 13 28V32C13 33.1 13.9 34 15 34H33C34.1 34 35 33.1 35 32V28C38.5 27 41 24 41 20C41 17.5 40 15.8 38 15C37 13 35 11.5 32.5 11C31 8 28 6 24 6Z" fill={`url(#${id}a)`}/>
      <ellipse cx="18" cy="16" rx="4" ry="6" fill="rgba(255,255,255,0.18)" transform="rotate(-20,18,16)"/>
    </svg>
  );
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4"/></svg>;
}

// ═══ PLANET 3D ═══
function Planet({ universo, size=44 }) {
  const u = UV.find(x => x.id === universo) || UV[0];
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", flexShrink:0, position:"relative", overflow:"hidden",
      background:`radial-gradient(circle at 30% 30%,${u.color},${u.bg} 70%,#000)`,
      boxShadow:`0 0 ${size*.5}px ${u.color}55,inset -${size*.12}px -${size*.12}px ${size*.24}px rgba(0,0,0,0.85)` }}>
      <div style={{ position:"absolute", top:"18%", left:"18%", width:size*.26, height:size*.26, borderRadius:"50%", background:"rgba(255,255,255,0.22)", filter:`blur(${size*.06}px)` }}/>
    </div>
  );
}

function Tag({ label, color }) {
  return <span style={{ display:"inline-flex", alignItems:"center", borderRadius:5, padding:"2px 7px", fontSize:9, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color, background:color+"18", border:`1px solid ${color}30` }}>{label}</span>;
}

function Bar({ pct, color }) {
  return (
    <div style={{ height:6, borderRadius:3, background:"rgba(0,0,0,0.07)" }}>
      <motion.div initial={{ width:0 }} animate={{ width:`${pct}%` }} transition={{ duration:1, ease:"easeOut" }}
        style={{ height:"100%", borderRadius:3, background:`linear-gradient(90deg,${color}80,${color})` }} />
    </div>
  );
}

function Toggle({ on, onToggle, color="#52B87A" }) {
  return (
    <div onClick={onToggle} style={{ width:46, height:26, borderRadius:13, padding:3, cursor:"pointer", background:on?color:"#94a3b8", display:"flex", alignItems:"center", transition:"background 0.3s", flexShrink:0 }}>
      <motion.div layout transition={{ type:"spring", stiffness:500, damping:30 }} style={{ width:20, height:20, borderRadius:"50%", background:"white", x:on?20:0 }} />
    </div>
  );
}

function NavIcon({ iconKey, color, isActive, size=18 }) {
  return (
    <div style={{ width:32, height:32, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
      background: isActive ? `linear-gradient(135deg,${color}28,${color}14)` : "transparent",
      boxShadow: isActive ? `inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 8px ${color}22` : "none",
      color: isActive ? color : "inherit", transition:"all 0.2s" }}>
      <Icon3D iconKey={iconKey} size={size} color={isActive ? color : "currentColor"} />
    </div>
  );
}

// ═══ INTRO SCREEN ═══
function IntroScreen({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 4000);
    return () => clearTimeout(t);
  }, []);
  return (
    <motion.div initial={{ opacity:1 }} exit={{ opacity:0, scale:0.97 }} transition={{ duration:0.5 }}
      style={{ position:"fixed", inset:0, zIndex:9999, background:"linear-gradient(145deg,#0A0A12 0%,#1A0F3C 60%,#0E0E10 100%)",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28 }}>
      <motion.div initial={{ scale:0.7, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ type:"spring", stiffness:260, damping:20, delay:0.2 }}
        style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
        <div style={{ width:72, height:72, borderRadius:22, background:"linear-gradient(135deg,#7A5CCF,#6B8FC7)",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"0 0 60px rgba(122,92,207,0.55), inset 0 1px 0 rgba(255,255,255,0.2)" }}>
          <span style={{ color:"white", fontWeight:900, fontSize:32, letterSpacing:"-0.04em" }}>I</span>
        </div>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontWeight:900, fontSize:38, color:"white", letterSpacing:"-0.05em", lineHeight:1 }}>ICONZA</div>
          <div style={{ fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginTop:7 }}>plataforma educacional</div>
        </div>
      </motion.div>
      <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}
        style={{ fontSize:13, color:"rgba(255,255,255,0.4)", textAlign:"center", maxWidth:260, lineHeight:1.6 }}>
        Construindo identidades cognitivas através de universos temáticos.
      </motion.p>
      <div style={{ width:200, height:3, borderRadius:2, background:"rgba(255,255,255,0.1)", overflow:"hidden" }}>
        <motion.div initial={{ width:0 }} animate={{ width:"100%" }} transition={{ duration:4, ease:"linear" }}
          style={{ height:"100%", background:"linear-gradient(90deg,#7A5CCF,#6B8FC7)", borderRadius:2 }} />
      </div>
      <motion.button initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }} onClick={onComplete}
        whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
        style={{ position:"absolute", bottom:36, right:36, padding:"10px 22px", borderRadius:12,
          border:"1px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.07)",
          color:"rgba(255,255,255,0.55)", fontSize:13, fontWeight:600, cursor:"pointer", backdropFilter:"blur(8px)" }}>
        Pular →
      </motion.button>
    </motion.div>
  );
}

// ═══ TOOLTIP CUSTOMIZADO ═══
function Tooltip({ text, children, side="right" }) {
  const [visible, setVisible] = useState(false);
  return (
    <div
      style={{ position:"relative", display:"inline-flex" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity:0, x: side==="right" ? -6 : 6, scale:0.92 }}
            animate={{ opacity:1, x:0, scale:1 }}
            exit={{ opacity:0, scale:0.92 }}
            transition={{ duration:0.14, ease:"easeOut" }}
            style={{
              position:"absolute",
              left: side==="right" ? "calc(100% + 10px)" : "auto",
              right: side==="left" ? "calc(100% + 10px)" : "auto",
              top:"50%", transform:"translateY(-50%)",
              background:"#FFFFFF",
              color:"#111111",
              fontSize:12,
              fontWeight:600,
              letterSpacing:"-0.01em",
              padding:"6px 11px",
              borderRadius:8,
              whiteSpace:"nowrap",
              boxShadow:"0 4px 16px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08)",
              border:"1px solid rgba(0,0,0,0.07)",
              pointerEvents:"none",
              zIndex:200,
            }}>
            {text}
            {/* seta */}
            <div style={{
              position:"absolute",
              top:"50%",
              left: side==="right" ? -5 : "auto",
              right: side==="left" ? -5 : "auto",
              width:8, height:8,
              background:"#FFFFFF",
              border:"1px solid rgba(0,0,0,0.07)",
              borderRight: side==="right" ? "none" : undefined,
              borderTop: side==="right" ? "none" : undefined,
              borderLeft: side==="left" ? "none" : undefined,
              borderBottom: side==="left" ? "none" : undefined,
              transform:"translateY(-50%) rotate(45deg)",
            }}/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══ SIDEBAR COLAPSÁVEL ═══
function Sidebar({ page, setPage, isDark, notifCount, collapsed, setCollapsed }) {
  const divB = "rgba(255,255,255,0.07)";

  // Fundo: grafite quando colapsado, sidebar normal quando aberto
  const bg = collapsed
    ? "#18181B"
    : isDark ? "#1E1E22" : "rgba(28,28,31,0.94)";

  const w = collapsed ? 64 : 230;

  return (
    <motion.aside
      animate={{ width: w }}
      transition={{ type:"spring", stiffness:340, damping:32 }}
      onClick={() => { if (collapsed) setCollapsed(false); }}
      style={{
        flexShrink:0, display:"flex", flexDirection:"column",
        height:"100vh", position:"sticky", top:0,
        background: bg,
        backdropFilter: collapsed ? "none" : "blur(24px) saturate(1.6)",
        WebkitBackdropFilter: collapsed ? "none" : "blur(24px) saturate(1.6)",
        borderRight: `1px solid ${divB}`,
        zIndex:50, overflow:"hidden",
        cursor: collapsed ? "pointer" : "default",
        transition:"background 0.3s",
        boxShadow: collapsed ? "2px 0 16px rgba(0,0,0,0.18)" : "none",
      }}>

      {/* Header — Crown como único gatilho expand/colapso */}
      <div style={{
        padding:"12px 0 10px",
        borderBottom:`1px solid ${divB}`,
        display:"flex", alignItems:"center",
        justifyContent: collapsed ? "center" : "space-between",
        paddingLeft: collapsed ? 0 : 16,
        paddingRight: collapsed ? 0 : 12,
        minHeight:56,
      }}>
        {/* Crown SVG — centralizada quando colapsada, à esquerda quando expandida */}
        <Tooltip text={collapsed ? "Expandir menu" : "Recolher menu"} side="right">
          <motion.button
            onClick={() => setCollapsed(c => !c)}
            whileHover={{ filter:"drop-shadow(0 0 8px #F59E0B)", scale:1.1 }}
            whileTap={{ scale:0.88 }}
            transition={{ type:"spring", stiffness:400, damping:18 }}
            style={{
              background:"none", border:"none", cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              padding:"6px", borderRadius:10, flexShrink:0,
            }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 17h20v2H2z" fill="#F59E0B" opacity="0.9"/>
              <path d="M3 10l3 5 6-8 6 8 3-5" stroke="#F59E0B" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="3"  cy="10" r="1.6" fill="#FCD34D"/>
              <circle cx="12" cy="2"  r="1.6" fill="#FCD34D"/>
              <circle cx="21" cy="10" r="1.6" fill="#FCD34D"/>
            </svg>
          </motion.button>
        </Tooltip>

        {/* Logo — só visível quando expandida */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
              exit={{ opacity:0, x:-8 }} transition={{ duration:0.16 }}
              style={{ flex:1, minWidth:0, marginLeft:10 }}>
              <div style={{ fontWeight:900, fontSize:16, color:"#FFFFFF", letterSpacing:"-0.04em", lineHeight:1 }}>ICONZA</div>
              <div style={{ fontSize:8, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(255,255,255,0.38)", marginTop:2 }}>plataforma</div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* X — só visível quando expandida, sutil com hover */}
        <AnimatePresence>
          {!collapsed && (
            <Tooltip text="Recolher menu" side="left">
              <motion.button
                initial={{ opacity:0, scale:0.8 }}
                animate={{ opacity:1, scale:1 }}
                exit={{ opacity:0, scale:0.8 }}
                transition={{ duration:0.15 }}
                onClick={(e) => { e.stopPropagation(); setCollapsed(true); }}
                whileHover={{ opacity:1, backgroundColor:"rgba(255,255,255,0.1)" }}
                style={{
                  background:"none", border:"none", cursor:"pointer",
                  width:28, height:28, borderRadius:8, flexShrink:0,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  opacity:0.45, transition:"opacity 0.18s",
                }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1.5" y="1.5" width="3" height="13" rx="1" fill="white" opacity="0.9"/>
                  <path d="M13 8H7M7 8L10 5M7 8L10 11" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </Tooltip>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:"10px 8px", display:"flex", flexDirection:"column", gap:2, overflowY:"auto", overflowX:"hidden" }}>
        {NAV.map(item => {
          const isActive = page === item.id;

          // ── regras de cor dinâmica ──────────────────────────────
          // Colapsada: ativo = cor do item, inativo = branco 50%
          // Expandida: ativo = cor do item (100%), inativo = branco 70%
          const iconColor = collapsed
            ? (isActive ? item.color          : "rgba(255,255,255,0.5)")
            : (isActive ? item.color          : "rgba(255,255,255,0.7)");

          // Label: ativo = branco puro, inativo = branco 65%
          const labelColor = isActive ? "#FFFFFF" : "rgba(255,255,255,0.65)";

          // Fundo do botão: ativo = cor com 18% opacidade, hover herdado
          const btnBg = isActive
            ? (collapsed ? item.color+"18" : item.color+"18")
            : "transparent";

          // Fundo do container do ícone: ativo = cor 28%, inativo = branco 6% (só expandida)
          const iconBg = isActive
            ? `linear-gradient(135deg,${item.color}40,${item.color}22)`
            : (!collapsed ? "rgba(255,255,255,0.06)" : "transparent");

          // Sombra do ícone ativo
          const iconShadow = isActive
            ? `0 0 12px ${item.color}55, inset 0 1px 0 rgba(255,255,255,0.18)`
            : "none";

          const btn = (
            <motion.button key={item.id}
              onClick={(e) => { e.stopPropagation(); setPage(item.id); }}
              whileHover={collapsed ? {} : { x:2, backgroundColor:"rgba(255,255,255,0.06)" }}
              whileTap={{ scale:0.96 }}
              style={{
                display:"flex", alignItems:"center",
                gap:10,
                padding: collapsed ? "8px 0" : "8px 10px",
                borderRadius:11, border:"none", width:"100%",
                justifyContent: collapsed ? "center" : "flex-start",
                textAlign:"left", cursor:"pointer",
                background: btnBg,
                transition:"background 0.15s",
              }}>
              {/* Ícone — contraste elevado no estado expandido */}
              <div style={{
                width:32, height:32, borderRadius:9,
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                background: iconBg,
                boxShadow: iconShadow,
                transition:"all 0.2s",
              }}>
                <Icon3D iconKey={item.iconKey} size={isActive ? 18 : 17} color={iconColor}/>
              </div>

              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity:0, x:-6 }} animate={{ opacity:1, x:0 }}
                    exit={{ opacity:0, x:-6 }} transition={{ duration:0.15 }}
                    style={{
                      fontSize:13,
                      fontWeight: isActive ? 700 : 450,
                      color: labelColor,
                      letterSpacing:"-0.01em",
                      flex:1,
                      whiteSpace:"nowrap",
                    }}>
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {!collapsed && item.id==="inicio" && notifCount>0 && (
                <span style={{ width:18, height:18, borderRadius:"50%", background:"#F43F5E", color:"white", fontSize:9, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center" }}>{notifCount}</span>
              )}
              {!collapsed && isActive && (
                <motion.div layoutId="sidebar-dot"
                  style={{ width:6, height:6, borderRadius:3, background:item.color, boxShadow:`0 0 6px ${item.color}` }}/>
              )}
            </motion.button>
          );
          return collapsed
            ? <Tooltip key={item.id} text={item.label} side="right">{btn}</Tooltip>
            : btn;
        })}
      </nav>

      {/* Divider */}
      <div style={{ height:1, background:divB, margin:"0 10px" }}/>

      {/* User + botão fechar (só quando expandido) */}
      <div style={{ padding:"10px 10px" }}>
        <div style={{
          display:"flex", alignItems:"center", gap:8, padding:"8px",
          borderRadius:11, justifyContent:collapsed?"center":"flex-start",
          background: collapsed ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg,rgba(122,92,207,0.1),rgba(91,143,212,0.06))",
          border:`1px solid ${collapsed?"rgba(255,255,255,0.08)":"rgba(122,92,207,0.12)"}`,
        }}>
          <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#7A5CCF,#6B8FC7)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:900, fontSize:12, flexShrink:0 }}>L</div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.15 }} style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, fontWeight:650, color:"#FFFFFF" }}>Liza</div>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <span style={{ fontSize:8, fontWeight:900, color:"white", background:"linear-gradient(90deg,#7A5CCF,#6B8FC7)", padding:"1px 6px", borderRadius:3 }}>PRO</span>
                  <span style={{ fontSize:9, color:"rgba(255,255,255,0.45)" }}>Exploradora Desperta</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>


      </div>
    </motion.aside>
  );
}

// ═══ TOPBAR — zoom (±) + dark mode ═══
function TopBar({ isDark, setIsDark, zoom, setZoom, notifCount, onAbrirNotif }) {
  const divB = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const MIN = 80; const MAX = 150; const STEP = 10;

  return (
    <div style={{
      height:52, display:"flex", alignItems:"center", gap:10, padding:"0 22px",
      background: isDark ? "rgba(10,10,12,0.82)" : "rgba(237,237,242,0.92)",
      backdropFilter:"blur(24px) saturate(2)",
      WebkitBackdropFilter:"blur(24px) saturate(2)",
      borderBottom:`1px solid ${divB}`,
      position:"sticky", top:0, zIndex:40, flexShrink:0,
    }}>
      {/* Breadcrumb */}
      <span style={{ fontSize:12, fontWeight:600, color:c2(isDark), letterSpacing:"-0.01em", flex:1 }}>
        ICONZA <span style={{ color:c3(isDark), fontWeight:400 }}>/ painel</span>
      </span>

      {/* Zoom compacto: − valor + */}
      <div style={{ display:"flex", alignItems:"center", gap:0, borderRadius:10, overflow:"hidden",
        border:`1px solid ${divB}`, background: isDark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)" }}>
        <button onClick={() => setZoom(z => Math.max(MIN, z - STEP))}
          style={{ width:30, height:30, border:"none", background:"transparent", cursor:"pointer",
            color:c2(isDark), fontSize:17, fontWeight:300, display:"flex", alignItems:"center", justifyContent:"center",
            borderRight:`1px solid ${divB}` }}>−</button>
        <span style={{ width:44, textAlign:"center", fontSize:11, fontWeight:700, color:c1(isDark) }}>{zoom}%</span>
        <button onClick={() => setZoom(z => Math.min(MAX, z + STEP))}
          style={{ width:30, height:30, border:"none", background:"transparent", cursor:"pointer",
            color:c2(isDark), fontSize:17, fontWeight:300, display:"flex", alignItems:"center", justifyContent:"center",
            borderLeft:`1px solid ${divB}` }}>+</button>
      </div>

      {/* Separador */}
      <div style={{ width:1, height:18, background:divB }}/>

      {/* Dark mode */}
      <motion.button onClick={() => setIsDark(d => !d)} whileTap={{ scale:0.88 }}
        title={isDark ? "Modo Claro" : "Modo Escuro"}
        style={{ padding:0, border:"none", background:"transparent", cursor:"pointer", display:"flex" }}>
        <SolidIcon3D
          iconKey={isDark ? "sun" : "moon"}
          accentColor={isDark ? "#EAB308" : "#6366F1"}
          size="xs"
          ariaLabel={isDark ? "Activar modo claro" : "Activar modo escuro"}
        />
      </motion.button>

      {/* Notificações */}
      <motion.button whileTap={{ scale:0.9 }} onClick={onAbrirNotif}
        style={{ position:"relative", padding:0, border:"none", background:"transparent", cursor:"pointer", display:"flex" }}>
        <SolidIcon3D
          iconKey="bell"
          accentColor={notifCount > 0 ? "#F43F5E" : "#7A5CCF"}
          size="xs"
          ariaLabel="Notificações"
        />
        {notifCount > 0 && (
          <span style={{ position:"absolute", top:-2, right:-2, width:15, height:15, borderRadius:"50%",
            background:"#FFFFFF", color:"#F43F5E", fontSize:8, fontWeight:900,
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }}>{notifCount}</span>
        )}
      </motion.button>
    </div>
  );
}

// ═══ PAINEL DE NOTIFICAÇÕES ═══
function PainelNotificacoes({ isDark, notifs, onLer, onClose }) {
  return (
    <motion.div initial={{ opacity:0, x:20, scale:0.97 }} animate={{ opacity:1, x:0, scale:1 }} exit={{ opacity:0, x:20, scale:0.97 }}
      style={{ position:"fixed", top:20, right:20, width:320, zIndex:200, borderRadius:22, overflow:"hidden",
        background:cd(isDark), border: isDark?"1px solid rgba(255,255,255,0.06)":"none", boxShadow:"0 20px 60px rgba(0,0,0,0.15)" }}>
      <div style={{ padding:"16px 18px 12px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:`1px solid ${cb(isDark)}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <Icon3D iconKey="bell" size={18} color="#7A5CCF"/>
          <span style={{ fontWeight:700, fontSize:14, color:c1(isDark) }}>Notificações</span>
        </div>
        <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:c3(isDark), fontSize:20, lineHeight:1 }}>×</button>
      </div>
      <div style={{ maxHeight:360, overflowY:"auto" }}>
        {notifs.map((n, i) => (
          <motion.div key={n.id} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.05 }}
            onClick={() => onLer(n.id)}
            style={{ display:"flex", gap:12, padding:"12px 16px", borderBottom:`1px solid ${cb(isDark)}`,
              background: n.lida ? "transparent" : isDark ? "rgba(122,92,207,0.06)" : "rgba(122,92,207,0.03)", cursor:"pointer" }}>
            <div style={{ width:36, height:36, borderRadius:10, background:n.color+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{n.icon}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:12.5, color:c1(isDark), lineHeight:1.4, marginBottom:3, fontWeight: n.lida ? 400 : 600 }}>{n.msg}</p>
              <span style={{ fontSize:10, color:c3(isDark) }}>{n.tempo}</span>
            </div>
            {!n.lida && <div style={{ width:8, height:8, borderRadius:"50%", background:"#7A5CCF", flexShrink:0, marginTop:4 }}/>}
          </motion.div>
        ))}
      </div>
      <div style={{ padding:"10px 16px" }}>
        <button onClick={() => notifs.forEach(n => onLer(n.id))}
          style={{ width:"100%", padding:"9px", borderRadius:10, border:`1px solid ${cb(isDark)}`, background:"transparent", color:T.acc, fontWeight:600, fontSize:12, cursor:"pointer" }}>
          Marcar todas como lidas
        </button>
      </div>
    </motion.div>
  );
}

// ═══ CHECK LIST DO USUÁRIO ═══
function CheckListUsuario({ isDark, glass, glassB, cardShadow }) {
  const [items, setItems] = useState(CHECKLIST_VIDEOS.map(v => ({...v})));
  const [page, setPage] = useState(0); // página atual (2 por vez)
  const [playing, setPlaying] = useState(null);

  const PER_PAGE = 2;
  const totalPages = Math.ceil(items.length / PER_PAGE);
  const visible = items.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const concluidos = items.filter(i => i.concluido).length;
  const pct = Math.round((concluidos / items.length) * 100);

  const concluir = (id) => {
    setItems(prev => prev.map(item =>
      item.id === id ? {...item, concluido:true, mostrarProximo:true} : item
    ));
    setPlaying(null);
  };

  return (
    <div style={{ borderRadius:22, overflow:"hidden", background:glass, backdropFilter:"blur(12px)",
      border: isDark?"1px solid rgba(255,255,255,0.08)":"none", boxShadow:cardShadow }}>

      {/* Header */}
      <div style={{ padding:"14px 16px 12px", borderBottom:`1px solid ${glassB}` }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7 }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:"#52B87A", boxShadow:"0 0 6px #52B87A" }}/>
            <span style={{ fontWeight:600, fontSize:9, color:c3(isDark), letterSpacing:"0.18em", textTransform:"uppercase" }}>CheckList do Usuário</span>
          </div>
          <span style={{ fontWeight:900, fontSize:20, color:"#52B87A", letterSpacing:"-0.04em", lineHeight:1 }}>{pct}%</span>
        </div>
        <div style={{ height:5, borderRadius:3, background:isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)", overflow:"hidden" }}>
          <motion.div initial={{ width:0 }} animate={{ width:`${pct}%` }} transition={{ duration:0.8, ease:"easeOut" }}
            style={{ height:"100%", borderRadius:3, background:"linear-gradient(90deg,#52B87A88,#52B87A)" }}/>
        </div>
        <p style={{ fontSize:9, color:c3(isDark), marginTop:5, letterSpacing:'0.04em' }}>{concluidos}/{items.length} concluídos</p>
      </div>

      {/* Vídeos visíveis — 2 por vez */}
      <div style={{ padding:"10px 12px", display:"flex", flexDirection:"column", gap:8 }}>
        <AnimatePresence mode="wait">
          <motion.div key={page}
            initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
            transition={{ duration:0.2 }}
            style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {visible.map((item, idx) => {
              const globalIdx = page * PER_PAGE + idx;
              const isLocked  = globalIdx > 0 && !items[globalIdx - 1].concluido;
              const isPlaying = playing === item.id;

              return (
                <div key={item.id}>
                  <div style={{
                    borderRadius:12, overflow:"hidden",
                    background: item.concluido
                      ? (isDark?"rgba(82,184,122,0.08)":"rgba(82,184,122,0.05)")
                      : (isDark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.7)"),
                    backdropFilter:"blur(12px)",
                    border: item.concluido ? "1px solid rgba(82,184,122,0.2)" : isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(0,0,0,0.05)",
                    boxShadow:"0 8px 32px rgba(0,0,0,0.08)",
                    opacity: isLocked ? 0.5 : 1,
                  }}>

                    {/* Thumb 16:9 — max-height controlada */}
                    <div onClick={() => !isLocked && !item.concluido && setPlaying(isPlaying ? null : item.id)}
                      style={{ width:"100%", paddingTop:"42%", maxHeight:160, position:"relative", overflow:"hidden",
                        background:`linear-gradient(145deg,${item.color}50,${item.color}18,#050508)`,
                        cursor: isLocked || item.concluido ? "default" : "pointer",
                        borderBottom:`1px solid ${item.color}20` }}>
                      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                        {/* Grid pattern */}
                        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.06 }}>
                          <defs><pattern id={`gp${item.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
                          </pattern></defs>
                          <rect width="100%" height="100%" fill={`url(#gp${item.id})`}/>
                        </svg>

                        {item.concluido ? (
                          <div style={{ width:32, height:32, borderRadius:"50%", background:"#52B87A",
                            display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 14px rgba(82,184,122,0.5)" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <path d="M4 12L9 17L20 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        ) : isLocked ? (
                          <div style={{ width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,0.1)",
                            display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <rect x="5" y="11" width="14" height="10" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8"/>
                              <path d="M8 11V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V11" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round"/>
                            </svg>
                          </div>
                        ) : (
                          <motion.div whileHover={{ scale:1.1 }} whileTap={{ scale:0.92 }}
                            style={{ width:34, height:34, borderRadius:"50%", background:"rgba(255,255,255,0.92)",
                              display:"flex", alignItems:"center", justifyContent:"center",
                              boxShadow:`0 0 20px ${item.color}60, 0 4px 12px rgba(0,0,0,0.3)` }}>
                            <svg width="13" height="13" viewBox="0 0 22 22" fill="none">
                              <path d="M5 3L19 11L5 19V3Z" fill={item.color}/>
                            </svg>
                          </motion.div>
                        )}

                        {/* Duração */}
                        {!item.concluido && !isLocked && (
                          <div style={{ position:"absolute", bottom:6, right:8, padding:"2px 6px", borderRadius:4,
                            background:"rgba(0,0,0,0.75)", backdropFilter:"blur(4px)" }}>
                            <span style={{ fontSize:10, fontWeight:700, color:"white" }}>{item.duracao}</span>
                          </div>
                        )}

                        {/* Badge */}
                        {item.concluido && (
                          <div style={{ position:"absolute", top:7, left:8, padding:"3px 9px", borderRadius:20,
                            background:"rgba(82,184,122,0.25)", backdropFilter:"blur(8px)",
                            border:"1px solid rgba(82,184,122,0.35)" }}>
                            <span style={{ fontSize:9, fontWeight:700, color:"#52B87A", letterSpacing:"0.04em" }}>✓ Concluído</span>
                          </div>
                        )}
                        {isLocked && (
                          <div style={{ position:"absolute", top:7, left:8, padding:"3px 9px", borderRadius:20,
                            background:"rgba(0,0,0,0.3)", backdropFilter:"blur(8px)",
                            border:"1px solid rgba(255,255,255,0.1)" }}>
                            <span style={{ fontSize:9, color:"rgba(255,255,255,0.55)", letterSpacing:"0.04em" }}>🔒 Bloqueado</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ padding:"10px 13px 12px", display:"flex", gap:9, alignItems:"flex-start" }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:3 }}>
                          <span style={{ fontSize:8, fontWeight:600, color:item.color,
                            letterSpacing:"0.14em", textTransform:"uppercase" }}>
                            {item.pagina === "inicio" ? "Painel" : item.pagina.charAt(0).toUpperCase() + item.pagina.slice(1)}
                          </span>
                        </div>
                        <p style={{ fontWeight:900, fontSize:14, color:c1(isDark), lineHeight:1.25, marginBottom:4,
                          letterSpacing:"-0.03em",
                          overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{item.titulo}</p>
                        <p style={{ fontSize:10.5, color:c3(isDark), lineHeight:1.45, fontWeight:400,
                          overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{item.desc}</p>
                      </div>
                      {!item.concluido && !isLocked && (
                        <motion.button whileTap={{ scale:0.94 }} onClick={() => concluir(item.id)}
                          style={{ flexShrink:0, marginTop:2, padding:"6px 10px", borderRadius:8,
                            border:`1px solid ${item.color}50`, background:`linear-gradient(135deg,${item.color}18,${item.color}08)`,
                            color:item.color, fontWeight:700, fontSize:10, cursor:"pointer", whiteSpace:"nowrap" }}>
                          ✓ Concluído
                        </motion.button>
                      )}
                    </div>

                    {/* Player expandido */}
                    <AnimatePresence>
                      {isPlaying && (
                        <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
                          exit={{ height:0, opacity:0 }} transition={{ duration:0.22 }}
                          style={{ overflow:"hidden", borderTop:`1px solid ${glassB}` }}>
                          <div style={{ padding:"10px 12px 12px" }}>
                            <div style={{ width:"100%", paddingTop:"56.25%", borderRadius:10, position:"relative", overflow:"hidden",
                              background:`linear-gradient(145deg,${item.color}20,rgba(0,0,0,0.5))` }}>
                              <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6 }}>
                                <div style={{ width:40, height:40, borderRadius:"50%", background:item.color, display:"flex", alignItems:"center", justifyContent:"center" }}>
                                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M5 3L17 10L5 17V3Z" fill="white"/></svg>
                                </div>
                                <p style={{ fontSize:10, color:"rgba(255,255,255,0.6)", textAlign:"center" }}>iframe YouTube: {item.videoId}</p>
                              </div>
                            </div>
                            <motion.button whileTap={{ scale:0.96 }} onClick={() => concluir(item.id)}
                              style={{ width:"100%", marginTop:8, padding:"9px", borderRadius:9, border:"none",
                                background:"linear-gradient(135deg,#52B87A,#3A9860)", color:"white", fontWeight:700,
                                fontSize:12, cursor:"pointer", boxShadow:"0 4px 12px rgba(82,184,122,0.3)" }}>
                              ✓ Marcar como concluído
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Próximo vídeo recomendado */}
                  <AnimatePresence>
                    {item.concluido && item.mostrarProximo && item.proximo && (
                      <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }}
                        exit={{ opacity:0, height:0 }} transition={{ duration:0.25 }}
                        style={{ overflow:"hidden", marginTop:4, marginLeft:10 }}>
                        <div style={{ borderRadius:10, padding:"8px 10px",
                          background: isDark?"rgba(82,184,122,0.08)":"rgba(82,184,122,0.06)",
                          border:"1px solid rgba(82,184,122,0.22)", display:"flex", alignItems:"center", gap:8 }}>
                          <div style={{ width:5, height:32, borderRadius:3, background:"linear-gradient(180deg,#52B87A,#52B87A44)", flexShrink:0 }}/>
                          <div style={{ flex:1, minWidth:0 }}>
                            <p style={{ fontSize:8, fontWeight:700, color:"#52B87A", marginBottom:2, textTransform:"uppercase", letterSpacing:"0.05em" }}>A seguir</p>
                            <p style={{ fontWeight:650, fontSize:11, color:c1(isDark), lineHeight:1.3 }}>{item.proximo.titulo}</p>
                          </div>
                          <span style={{ fontSize:9, color:c3(isDark), flexShrink:0 }}>{item.proximo.duracao}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegação por setas */}
      <div style={{ padding:"8px 14px 12px", borderTop:`1px solid ${glassB}`,
        display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <motion.button
          onClick={() => { setPage(p => Math.max(0, p-1)); setPlaying(null); }}
          disabled={page === 0}
          whileTap={{ scale:0.9 }}
          style={{ width:30, height:30, borderRadius:9, border:`1px solid ${glassB}`,
            background: page===0 ? "transparent" : (isDark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.05)"),
            display:"flex", alignItems:"center", justifyContent:"center", cursor: page===0?"default":"pointer",
            opacity: page===0 ? 0.3 : 1, transition:"all 0.15s" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 2L4 6L8 10" stroke={c1(isDark)} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>

        {/* Dots */}
        <div style={{ display:"flex", gap:5, alignItems:"center" }}>
          {Array.from({length: totalPages}).map((_,i) => (
            <motion.div key={i} onClick={() => { setPage(i); setPlaying(null); }}
              animate={{ width: i===page ? 16 : 6, background: i===page ? "#52B87A" : (isDark?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.15)") }}
              transition={{ type:"spring", stiffness:400, damping:28 }}
              style={{ height:5, borderRadius:3, cursor:"pointer" }}/>
          ))}
        </div>

        <motion.button
          onClick={() => { setPage(p => Math.min(totalPages-1, p+1)); setPlaying(null); }}
          disabled={page === totalPages-1}
          whileTap={{ scale:0.9 }}
          style={{ width:30, height:30, borderRadius:9, border:`1px solid ${glassB}`,
            background: page===totalPages-1 ? "transparent" : (isDark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.05)"),
            display:"flex", alignItems:"center", justifyContent:"center", cursor: page===totalPages-1?"default":"pointer",
            opacity: page===totalPages-1 ? 0.3 : 1, transition:"all 0.15s" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 2L8 6L4 10" stroke={c1(isDark)} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>
    </div>
  );
}


// ═══ PAGE: INÍCIO ═══
function PageInicio({ isDark, notifs, onAbrirNotif }) {
  const [idx, setIdx] = useState(0);
  const [agenda, setAgenda] = useState(AGENDA);
  const active = UV.filter(u => u.progress > 0);
  const locked = UV.filter(u => u.progress === 0);
  const aula = AULAS[idx];
  const u = UV.find(x => x.id === aula.universo);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % AULAS.length), 3800);
    return () => clearInterval(t);
  }, []);

  const tipoLabel = (tipo) => {
    if (tipo === "mentoria_individual") return { label:"Mentoria Individual", color:"#C26D8C" };
    if (tipo === "mentoria_grupo")      return { label:"Mentoria em Grupo",   color:"#7A5CCF" };
    return { label:"Evento", color:"#6B8FC7" };
  };
  const toggleSino  = (id) => setAgenda(prev => prev.map(e => e.id===id ? {...e, sino:!e.sino}   : e));
  const toggleEmail = (id) => setAgenda(prev => prev.map(e => e.id===id ? {...e, email:!e.email} : e));
  const inscrever   = (id) => setAgenda(prev => prev.map(e => e.id===id ? {...e, inscrito:true}  : e));

  // tokens visuais premium
  const glass = isDark
    ? "rgba(255,255,255,0.05)"
    : "rgba(255,255,255,0.85)";
  const glassB = isDark
    ? "rgba(255,255,255,0.08)"
    : "transparent";
  const cardShadow = isDark
    ? "0 8px 32px rgba(0,0,0,0.3)"
    : "0 20px 60px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04)";

  return (
    <motion.div key="inicio" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
      style={{ overflowY:"auto", flex:1, paddingBottom:60 }}>

      {/* ── HEADER ── */}
      <div style={{ padding:"28px 28px 20px" }}>
        <p style={{ fontSize:9, fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", color:c3(isDark), marginBottom:5, opacity:0.7 }}>Quinta-feira, 29 Mai</p>
        <h1 style={{ fontWeight:900, fontSize:28, color:c1(isDark), letterSpacing:"-0.045em", marginBottom:6, lineHeight:1.05 }}>Sua jornada, Liza ✦</h1>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:12, color:c2(isDark) }}>2 universos ativos</span>
          <span style={{ width:3, height:3, borderRadius:"50%", background:c3(isDark) }}/>
          <span style={{ fontSize:11, fontWeight:700, color:"#6B8FC7", padding:"3px 9px", borderRadius:7,
            background:"rgba(107,143,199,0.1)", border:"1px solid rgba(107,143,199,0.18)" }}>Exploradora Desperta</span>
        </div>
      </div>

      {/* ── STATS — grid minimalista, sem cards ── */}
      <div style={{
        padding:"0 28px 36px",
        display:"grid",
        gridTemplateColumns:"repeat(4,minmax(0,1fr))",
        gap:0,
      }}>
        {[
          {
            label:"Dias de Foco",
            value:7,
            accentColor:"#F97316",
            iconKey:"fire",
          },
          {
            label:"Tempo Total",
            value:"5.4h",
            accentColor:"#EAB308",
            iconKey:"bolt",
          },
          {
            label:"XP Acumulado",
            value:"1.2k",
            accentColor:"#6366F1",
            iconKey:"star",
          },
          {
            label:"Conexões",
            value:24,
            accentColor:"#10B981",
            iconKey:"users",
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:i * 0.08, duration:0.5, ease:[0.22, 1, 0.36, 1] }}
            style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", padding:"0 8px" }}
          >
            <SolidIcon3D
              iconKey={s.iconKey}
              accentColor={s.accentColor}
              size="small"
              ariaLabel={s.label}
              style={{ marginBottom: 14 }}
            />

            <span style={{
              display:"block",
              fontSize:32,
              fontWeight:300,
              color:c1(isDark),
              letterSpacing:"-0.04em",
              lineHeight:1,
              marginBottom:6,
            }}>
              {s.value}
            </span>

            <span style={{
              display:"block",
              fontSize:9,
              fontWeight:600,
              color:c3(isDark),
              letterSpacing:"0.16em",
              textTransform:"uppercase",
              opacity:0.7,
            }}>
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* ── CARROSSEL — largura total ── */}
      <div style={{ padding:"0 28px 24px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <h2 style={{ fontWeight:700, fontSize:15, color:c1(isDark), letterSpacing:"-0.02em" }}>Aulas em destaque</h2>
          <div style={{ display:"flex", gap:8 }}>
            {[-1,1].map(d => (
              <button key={d} onClick={() => setIdx(i => (i+d+AULAS.length)%AULAS.length)}
                style={{ width:34, height:34, borderRadius:10,
                  border: isDark?"1.5px solid rgba(255,255,255,0.22)":"1px solid rgba(0,0,0,0.1)",
                  background: isDark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.05)",
                  cursor:"pointer", color:c1(isDark), fontSize:20, fontWeight:500,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  boxShadow:"0 2px 8px rgba(0,0,0,0.1)", transition:"all 0.15s" }}>
                {d<0?"‹":"›"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ position:"relative", borderRadius:22, overflow:"hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div key={idx}
              initial={{ opacity:0, x:48 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-48 }}
              transition={{ type:"spring", stiffness:300, damping:28 }}
              style={{ borderRadius:22, padding:"22px 24px",
                background:`linear-gradient(145deg,${u.bg} 0%,#030306 100%)`,
                boxShadow:`0 8px 32px rgba(0,0,0,0.12), 0 0 48px ${u.color}20` }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
                <Tag label={aula.tag} color={u.color}/>
                <span style={{ fontSize:10, color:"rgba(255,255,255,0.28)", letterSpacing:"0.02em" }}>Aula {aula.aula} · {aula.duracao}</span>
              </div>
              <div style={{ display:"flex", alignItems:"flex-start", gap:18, marginBottom:16 }}>
                <Planet universo={aula.universo} size={64}/>
                <div style={{ flex:1 }}>
                  <p style={{ fontWeight:800, fontSize:16, color:"#fff", letterSpacing:"-0.025em", marginBottom:6, lineHeight:1.3 }}>{aula.titulo}</p>
                  <p style={{ fontSize:12, color:"rgba(255,255,255,0.36)", lineHeight:1.5 }}>Continue de onde parou e avance no seu universo de aprendizagem.</p>
                </div>
              </div>
              {aula.progress > 0 && (
                <div style={{ marginBottom:16 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ fontSize:10, color:"rgba(255,255,255,0.32)" }}>Progresso</span>
                    <span style={{ fontSize:10, fontWeight:700, color:u.color }}>{aula.progress}%</span>
                  </div>
                  <div style={{ height:5, borderRadius:3, background:"rgba(255,255,255,0.08)" }}>
                    <motion.div initial={{ width:0 }} animate={{ width:`${aula.progress}%` }} transition={{ duration:0.9, ease:"easeOut" }}
                      style={{ height:"100%", borderRadius:3, background:`linear-gradient(90deg,${u.color}66,${u.color})` }}/>
                  </div>
                </div>
              )}
              <button style={{ width:"100%", padding:"12px", borderRadius:12,
                border:`1px solid ${u.color}50`,
                background:`rgba(${parseInt(u.color.slice(1,3),16)},${parseInt(u.color.slice(3,5),16)},${parseInt(u.color.slice(5,7),16)},0.16)`,
                color:u.color, fontWeight:700, fontSize:13, cursor:"pointer", letterSpacing:"-0.01em",
                backdropFilter:"blur(8px)" }}>
                {aula.progress > 0 ? "▶  Continuar aula" : "▶  Começar agora"}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots + timer */}
        <div style={{ display:"flex", justifyContent:"center", gap:5, marginTop:12 }}>
          {AULAS.map((a,i) => { const uu = UV.find(x => x.id===a.universo); return (
            <div key={i} onClick={() => setIdx(i)}
              style={{ height:5, borderRadius:3, cursor:"pointer", transition:"all 0.3s",
                background:i===idx?uu.color:isDark?"rgba(255,255,255,0.14)":"rgba(0,0,0,0.13)",
                width:i===idx?28:8 }}/>
          );})}
        </div>
        <div style={{ height:2, borderRadius:1, background:isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)", marginTop:6, overflow:"hidden" }}>
          <motion.div key={idx} initial={{ width:0 }} animate={{ width:"100%" }} transition={{ duration:3.8, ease:"linear" }}
            style={{ height:"100%", borderRadius:1, background:UV.find(x=>x.id===AULAS[idx].universo)?.color||T.acc }}/>
        </div>
      </div>

      {/* ── GRID: PUBLICAÇÕES (principal) + COLUNA LATERAL ── */}
      <div style={{ padding:"0 28px 24px", display:"grid", gridTemplateColumns:"1fr 220px", gap:16, alignItems:"start" }}>

        {/* CHECK LIST DO USUÁRIO */}
        <CheckListUsuario isDark={isDark} glass={glass} glassB={glassB} cardShadow={cardShadow}/>

        {/* COLUNA LATERAL — Produtos + Agenda */}
        <div style={{ display:"flex", flexDirection:"column", gap:14, position:"sticky", top:60 }}>

          {/* PRODUTOS AFILIADOS */}
          <div style={{ borderRadius:22, overflow:"hidden",
            background: isDark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.55)",
            backdropFilter:"blur(16px) saturate(1.8)",
            WebkitBackdropFilter:"blur(16px) saturate(1.8)",
            border: isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(0,0,0,0.05)",
            boxShadow:"0 8px 32px rgba(0,0,0,0.12)" }}>
            <div style={{ padding:"12px 14px 8px", borderBottom: isDark?"1px solid rgba(255,255,255,0.07)":"1px solid rgba(0,0,0,0.05)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#FF7A2E", boxShadow:"0 0 6px #FF7A2E" }}/>
                <span style={{ fontSize:12, fontWeight:700, color:c1(isDark) }}>Produtos em Destaque</span>
              </div>
              <p style={{ fontSize:9, color:c3(isDark), lineHeight:1.4 }}>Seleção da Liza · Mercado Livre</p>
              <p style={{ fontSize:7.5, color:c3(isDark)+"88", marginTop:2 }}>*Links de afiliado</p>
            </div>
            {PRODUTOS_AFILIADOS.map(p => (
              <motion.a key={p.id} href={p.link}
                whileHover={{ backgroundColor: isDark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.025)" }}
                style={{ display:"flex", gap:10, padding:"10px 12px", borderTop:`1px solid ${glassB}`, textDecoration:"none", transition:"background 0.15s" }}>
                <div style={{ width:48, height:48, borderRadius:10, flexShrink:0,
                  background:`linear-gradient(135deg,${p.cor}22,${p.cor}08)`,
                  border:`1px solid ${p.cor}20`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:20 }}>{p.emoji}</span>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:11, fontWeight:600, color:c1(isDark), lineHeight:1.3, marginBottom:3,
                    overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{p.nome}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:3 }}>
                    <span style={{ fontSize:9, color:"#FF7A2E", fontWeight:700 }}>⭐ {p.estrelas}</span>
                    <span style={{ fontSize:8, color:c3(isDark) }}>({p.vendas})</span>
                  </div>
                  <div style={{ display:"flex", alignItems:"baseline", gap:5 }}>
                    <span style={{ fontSize:12, fontWeight:900, color:"#52B87A" }}>{p.preco}</span>
                    <span style={{ fontSize:9, fontWeight:700, color:"#52B87A", padding:"1px 4px", borderRadius:3, background:"rgba(82,184,122,0.12)" }}>{p.desconto}</span>
                  </div>
                </div>
              </motion.a>
            ))}
            <div style={{ padding:"10px 14px", borderTop:`1px solid ${glassB}` }}>
              <a href="#" style={{ display:"block", textAlign:"center", fontSize:11, fontWeight:700, color:T.acc, textDecoration:"none" }}>Ver mais produtos →</a>
            </div>
          </div>

          {/* AGENDA INTELIGENTE */}
          <div style={{ borderRadius:22, overflow:"hidden", background:glass, backdropFilter:"blur(12px)",
            border: isDark?"1px solid rgba(255,255,255,0.08)":"none", boxShadow:cardShadow }}>
            <div style={{ padding:"12px 14px 10px", borderBottom:`1px solid ${glassB}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#C26D8C", boxShadow:"0 0 6px #C26D8C" }}/>
                <span style={{ fontWeight:700, fontSize:12, color:c1(isDark) }}>Agenda</span>
              </div>
              <span style={{ fontSize:10, color:T.acc, fontWeight:600, cursor:"pointer" }}>Ver tudo →</span>
            </div>
            <div style={{ padding:"8px 10px", display:"flex", flexDirection:"column", gap:6 }}>
              {agenda.slice(0,3).map(ev => {
                const tipoInfo = tipoLabel(ev.tipo);
                return (
                  <div key={ev.id} style={{ borderRadius:11, overflow:"hidden",
                    background: isDark?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.7)",
                    border:`1px solid ${ev.inscrito ? ev.color+"45" : glassB}`,
                    boxShadow: ev.inscrito ? `0 0 0 1px ${ev.color}18` : "none" }}>
                    <div style={{ display:"flex" }}>
                      {/* Foto quadrada compacta */}
                      <div style={{ width:56, height:56, flexShrink:0, position:"relative",
                        background:`linear-gradient(145deg,${ev.color}28,${ev.color}08)`,
                        display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
                        {ev.foto
                          ? <img src={ev.foto} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                          : <span style={{ fontSize:20 }}>{ev.tipo==="mentoria_individual"?"🎯":ev.tipo==="mentoria_grupo"?"👥":"🎪"}</span>
                        }
                        <div style={{ position:"absolute", bottom:2, left:2, padding:"1px 4px", borderRadius:3,
                          background:"rgba(0,0,0,0.55)", backdropFilter:"blur(4px)" }}>
                          <span style={{ fontSize:6, fontWeight:800, color:ev.color, textTransform:"uppercase" }}>{ev.modalidade}</span>
                        </div>
                      </div>
                      {/* Info compacta */}
                      <div style={{ flex:1, padding:"7px 8px", minWidth:0 }}>
                        <Tag label={tipoInfo.label} color={tipoInfo.color}/>
                        <p style={{ fontWeight:650, fontSize:11, color:c1(isDark), lineHeight:1.3, margin:"3px 0",
                          overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{ev.title}</p>
                        <div style={{ display:"flex", justifyContent:"space-between" }}>
                          <span style={{ fontSize:9, color:c3(isDark) }}>{ev.time}</span>
                          <span style={{ fontWeight:900, fontSize:10, color:ev.preco==="Gratuito"?"#52B87A":c1(isDark) }}>{ev.preco}</span>
                        </div>
                      </div>
                    </div>
                    {/* Footer ações compacto */}
                    <div style={{ padding:"5px 8px", borderTop:`1px solid ${glassB}`, display:"flex", alignItems:"center", gap:4 }}>
                      {ev.inscrito ? (
                        <>
                          <span style={{ fontSize:8, fontWeight:700, color:"#52B87A" }}>✓ Inscrito</span>
                          <div style={{ flex:1 }}/>
                          <button onClick={() => toggleSino(ev.id)}
                            style={{ padding:"2px 6px", borderRadius:5, border:`1px solid ${ev.sino?"#7A5CCF40":glassB}`,
                              background:ev.sino?"#7A5CCF10":"transparent", cursor:"pointer", fontSize:10 }}>
                            {ev.sino?"🔔":"🔕"}
                          </button>
                          <button onClick={() => toggleEmail(ev.id)}
                            style={{ padding:"2px 6px", borderRadius:5, border:`1px solid ${ev.email?"#6B8FC740":glassB}`,
                              background:ev.email?"#6B8FC710":"transparent", cursor:"pointer", fontSize:10 }}>
                            ✉️
                          </button>
                        </>
                      ) : (
                        <>
                          <span style={{ fontSize:8, color:c3(isDark), flex:1 }}>Disponível</span>
                          <button onClick={() => inscrever(ev.id)}
                            style={{ padding:"3px 10px", borderRadius:6, border:"none",
                              background:`linear-gradient(135deg,${ev.color},${ev.color}cc)`,
                              color:"white", fontWeight:700, fontSize:9, cursor:"pointer" }}>
                            Inscrever
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>{/* fim coluna lateral */}

      </div>{/* fim grid */}


    </motion.div>
  );
}

// ═══ PAGE: UNIVERSOS ═══
function PageUniversos({ isDark }) {
  const ativos = UV.filter(u => u.progress > 0);
  const bloq = UV.filter(u => u.progress === 0);
  return (
    <motion.div key="universos" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} style={{ overflowY:"auto", flex:1, padding:"28px 28px 40px" }}>
      <h1 style={{ fontWeight:900, fontSize:26, color:c1(isDark), letterSpacing:"-0.03em", marginBottom:4 }}>Meus Universos</h1>
      <p style={{ fontSize:13, color:c2(isDark), marginBottom:24 }}>Acompanhe o seu progresso e descubra novas dimensões.</p>
      <h2 style={{ fontWeight:700, fontSize:14, color:c1(isDark), marginBottom:14 }}>🪐 Em Progresso</h2>
      <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:28 }}>
        {ativos.map(u => (
          <div key={u.id} style={{ borderRadius:20, padding:20, background:cd(isDark), border:`1px solid ${cb(isDark)}`, display:"flex", gap:18, alignItems:"center" }}>
            <Planet universo={u.id} size={72}/>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                <h3 style={{ fontWeight:900, fontSize:18, color:c1(isDark), letterSpacing:"-0.02em" }}>{u.label}</h3>
                <span style={{ fontWeight:900, fontSize:18, color:u.color }}>{u.progress}%</span>
              </div>
              <p style={{ fontSize:12, color:c3(isDark), marginBottom:10 }}>{u.tagline}</p>
              <Bar pct={u.progress} color={u.color}/>
              <p style={{ fontSize:10, color:c3(isDark), margin:"6px 0 12px" }}>{u.aulas} de {u.total} aulas</p>
              <button style={{ width:"100%", padding:"10px", borderRadius:10, border:"none", background:u.color, color:"white", fontWeight:700, fontSize:13, cursor:"pointer", boxShadow:`0 4px 12px ${u.color}40` }}>Continuar Aula</button>
            </div>
          </div>
        ))}
      </div>
      <h2 style={{ fontWeight:700, fontSize:14, color:c1(isDark), marginBottom:14 }}>🔒 Inexplorados</h2>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
        {bloq.map(u => (
          <div key={u.id} style={{ borderRadius:20, padding:20, background:cd(isDark), border:`1px solid ${cb(isDark)}`, display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
            <div style={{ opacity:0.45, marginBottom:12 }}><Planet universo={u.id} size={60}/></div>
            <h3 style={{ fontWeight:900, fontSize:14, color:c1(isDark), marginBottom:4 }}>{u.label}</h3>
            <p style={{ fontSize:10, color:c3(isDark), marginBottom:12 }}>{u.tagline}</p>
            <button style={{ width:"100%", padding:"9px", borderRadius:10, border:`1px solid ${u.color}50`, background:u.color+"10", color:u.color, fontWeight:700, fontSize:12, cursor:"pointer" }}>Desbloquear</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ═══ PAGE: CÉREBRO ═══
function PageCerebro({ isDark }) {
  return (
    <motion.div key="cerebro" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} style={{ overflowY:"auto", flex:1, padding:"28px 28px 40px" }}>
      <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 12px", borderRadius:8, background:"rgba(244,63,94,0.08)", border:"1px solid rgba(244,63,94,0.2)", color:"#F43F5E", marginBottom:12 }}>
        <Icon3D iconKey="brain" size={16} color="#F43F5E"/>
        <span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em" }}>Inteligência Comportamental</span>
      </div>
      <h1 style={{ fontWeight:900, fontSize:26, color:c1(isDark), letterSpacing:"-0.03em", marginBottom:4 }}>Matriz Cognitiva ICONZA</h1>
      <p style={{ fontSize:13, color:c2(isDark), marginBottom:24 }}>A nossa IA mapeia as suas aptidões com base nas interações.</p>
      <div style={{ borderRadius:20, padding:18, background:cd(isDark), border:`1px solid ${cb(isDark)}`, marginBottom:18, display:"flex", gap:14, alignItems:"center" }}>
        <div style={{ width:48, height:48, borderRadius:22, background:"linear-gradient(135deg,#F43F5E,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <Icon3D iconKey="brain2" size={32}/>
        </div>
        <div>
          <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:c3(isDark), marginBottom:3 }}>Perfil Dominante</p>
          <p style={{ fontWeight:900, fontSize:18, color:c1(isDark), letterSpacing:"-0.02em" }}>Criador Colaborativo</p>
        </div>
      </div>
      <div style={{ borderRadius:20, padding:18, background:cd(isDark), border:`1px solid ${cb(isDark)}`, marginBottom:18 }}>
        <h3 style={{ fontWeight:700, fontSize:14, color:c1(isDark), marginBottom:18 }}>Desempenho por Área</h3>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", height:130, gap:10, padding:"0 4px" }}>
          {BRAIN.map((s, i) => (
            <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
              <span style={{ fontSize:10, fontWeight:700, color:s.color }}>{s.score}%</span>
              <div style={{ width:"100%", maxWidth:28, height:90, borderRadius:"6px 6px 0 0", background:isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)", position:"relative", overflow:"hidden" }}>
                <motion.div initial={{ height:0 }} animate={{ height:`${s.score}%` }} transition={{ duration:1, delay:i*0.1 }}
                  style={{ position:"absolute", bottom:0, width:"100%", borderRadius:"4px 4px 0 0", background:`linear-gradient(to top,transparent,${s.color})` }}/>
              </div>
              <div style={{ width:28, height:28, borderRadius:"50%", background:isDark?"#232428":"white", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 6px rgba(0,0,0,0.1)", marginTop:-14 }}>
                <Icon3D iconKey={s.iconKey} size={16} color={s.color}/>
              </div>
              <span style={{ fontSize:8, fontWeight:600, color:c3(isDark), textAlign:"center" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {BRAIN.map((s, i) => (
          <motion.div key={i} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}
            style={{ display:"flex", alignItems:"center", gap:12, padding:14, borderRadius:22, background:cd(isDark), border:`1px solid ${cb(isDark)}` }}>
            <div style={{ width:38, height:38, borderRadius:10, background:s.color+"14", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Icon3D iconKey={s.iconKey} size={22} color={s.color}/>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                <span style={{ fontWeight:650, fontSize:13, color:c1(isDark) }}>{s.label}</span>
                <span style={{ fontWeight:900, fontSize:13, color:s.color }}>{s.score}%</span>
              </div>
              <Bar pct={s.score} color={s.color}/>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ═══ PAGE: ICONPLAY ═══
function PageIconplay({ isDark }) {
  const top = [{r:1,nome:"Liza Rutyon",role:"UI/UX Designer",color:"#C26D8C",score:9850},{r:2,nome:"Kai Mendes",role:"Motion Designer",color:"#6B8FC7",score:8420},{r:3,nome:"Amara Silva",role:"Brand Designer",color:"#52B87A",score:7900}];
  const talents = [{nome:"Pedro Costa",service:"Editor de Vídeo",universo:"iconmind",emoji:"🎬"},{nome:"Nia Rodrigues",service:"Consultora de Imagem",universo:"iconetnia",emoji:"👗"},{nome:"João Lima",service:"Food Stylist",universo:"iconfood",emoji:"🍽️"}];
  return (
    <motion.div key="iconplay" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} style={{ overflowY:"auto", flex:1, padding:"28px 28px 40px" }}>
      <div style={{ borderRadius:20, padding:24, background:isDark?"#18191C":"white", border:`1px solid ${cb(isDark)}`, marginBottom:24, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(139,92,246,0.08),transparent)", pointerEvents:"none" }}/>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 12px", borderRadius:8, background:"rgba(139,92,246,0.1)", border:"1px solid rgba(139,92,246,0.2)", color:"#8B5CF6", marginBottom:12, position:"relative" }}>
          <Icon3D iconKey="trophy" size={16} color="#8B5CF6"/><span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em" }}>ICONPLAY</span>
        </div>
        <h1 style={{ fontWeight:900, fontSize:22, color:c1(isDark), letterSpacing:"-0.03em", marginBottom:8, position:"relative" }}>Prove o seu talento e ganhe um Portfólio exclusivo.</h1>
        <p style={{ fontSize:13, color:c2(isDark), marginBottom:16, position:"relative" }}>Os melhores classificados ganham um website portfólio profissional.</p>
        <button style={{ padding:"11px 22px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#8B5CF6,#6B8FC7)", color:"white", fontWeight:700, fontSize:13, cursor:"pointer", boxShadow:"0 4px 14px rgba(139,92,246,0.3)", display:"flex", alignItems:"center", gap:8, position:"relative" }}>
          <Icon3D iconKey="trophy" size={16} color="white"/> Ver Desafios Ativos
        </button>
      </div>
      <h2 style={{ fontWeight:700, fontSize:14, color:c1(isDark), marginBottom:12 }}>⭐ Top Criadores</h2>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
        {top.map((d, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:14, borderRadius:22, background:cd(isDark), border:`1px solid ${cb(isDark)}` }}>
            <div style={{ width:30, height:30, borderRadius:8, background:i===0?"#E0A11B":isDark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.07)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:13, color:i===0?"white":c2(isDark), flexShrink:0 }}>{d.r}</div>
            <div style={{ width:42, height:42, borderRadius:"50%", background:`linear-gradient(135deg,#0A0A0A,${d.color})`, display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:900, fontSize:15, flexShrink:0 }}>{d.nome[0]}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:650, fontSize:13, color:c1(isDark) }}>{d.nome}</div>
              <div style={{ fontSize:11, color:c3(isDark) }}>{d.role}</div>
            </div>
            <div style={{ fontWeight:900, fontSize:13, color:"#8B5CF6" }}>{d.score} XP</div>
          </div>
        ))}
      </div>
      <h2 style={{ fontWeight:700, fontSize:14, color:c1(isDark), marginBottom:12 }}>💼 Hub de Talentos</h2>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
        {talents.map((t, i) => { const uv = UV.find(x => x.id===t.universo); return (
          <div key={i} style={{ borderRadius:22, padding:16, background:cd(isDark), border:`1px solid ${cb(isDark)}`, display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
            <div style={{ fontSize:26, width:50, height:50, borderRadius:12, background:isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8 }}>{t.emoji}</div>
            <div style={{ fontWeight:650, fontSize:12, color:c1(isDark), marginBottom:2 }}>{t.nome}</div>
            <div style={{ fontSize:10, color:c3(isDark), marginBottom:8 }}>{t.service}</div>
            <Tag label={uv.label.replace("ICON","")} color={uv.color}/>
          </div>
        );})}
      </div>
    </motion.div>
  );
}

// ═══ PAGE: EU APOIO ═══
function PageApoio({ isDark }) {
  const [amount, setAmount] = useState("");
  const supporters = [{r:1,nome:"Amara Silva",color:"#52B87A",amount:"R$ 1.250"},{r:2,nome:"Kai Mendes",color:"#6B8FC7",amount:"R$ 890"}];
  const wish = [{nome:"Microfone Shure",price:"R$ 850",emoji:"🎙️"},{nome:"Ring Light",price:"R$ 320",emoji:"💡"},{nome:"HD Externo 2TB",price:"R$ 450",emoji:"💾"},{nome:"Cadeira Gamer",price:"R$ 1.200",emoji:"🪑"}];
  return (
    <motion.div key="apoio" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} style={{ overflowY:"auto", flex:1, padding:"28px 28px 40px" }}>
      <div style={{ borderRadius:20, padding:24, background:cd(isDark), border:`1px solid ${cb(isDark)}`, marginBottom:24, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(224,161,27,0.07),transparent)", pointerEvents:"none" }}/>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 12px", borderRadius:8, background:"rgba(224,161,27,0.1)", color:"#E0A11B", marginBottom:12, position:"relative" }}>
          <Icon3D iconKey="heart" size={16} color="#E0A11B"/><span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em" }}>Apoie o Projeto</span>
        </div>
        <h1 style={{ fontWeight:900, fontSize:22, color:c1(isDark), letterSpacing:"-0.03em", marginBottom:16, position:"relative" }}>Faça parte da nossa expansão.</h1>
        <div style={{ display:"flex", gap:8, marginBottom:10, position:"relative" }}>
          {["25","50","100","200"].map(v => (
            <button key={v} onClick={() => setAmount(v)} style={{ flex:1, padding:"8px", borderRadius:8, border:`1px solid ${amount===v?"#E0A11B":cb(isDark)}`, background:amount===v?"#E0A11B":"transparent", color:amount===v?"white":c2(isDark), fontWeight:700, fontSize:12, cursor:"pointer", transition:"all 0.2s" }}>R${v}</button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 14px", borderRadius:10, border:`1px solid ${cb(isDark)}`, background:isDark?"rgba(0,0,0,0.3)":"#F8F7F5", marginBottom:10, position:"relative" }}>
          <span style={{ fontWeight:900, fontSize:18, color:"#E0A11B" }}>R$</span>
          <input type="number" placeholder="0,00" value={amount} onChange={e => setAmount(e.target.value)} style={{ background:"transparent", border:"none", outline:"none", fontSize:18, fontWeight:900, color:c1(isDark), width:"100%" }}/>
        </div>
        <button style={{ width:"100%", padding:"13px", borderRadius:10, border:"none", background:"#E0A11B", color:"white", fontWeight:900, fontSize:14, cursor:"pointer", boxShadow:"0 4px 16px rgba(224,161,27,0.35)", position:"relative" }}>Apoiar Agora</button>
      </div>
      <h2 style={{ fontWeight:700, fontSize:14, color:c1(isDark), marginBottom:12 }}>🏅 Top Colaboradores</h2>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
        {supporters.map((s, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:14, borderRadius:22, background:cd(isDark), border:`1px solid ${cb(isDark)}` }}>
            <div style={{ width:30, height:30, borderRadius:"50%", background:i===0?"#E0A11B":isDark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.07)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:13, color:i===0?"white":c2(isDark), flexShrink:0 }}>{s.r}</div>
            <div style={{ width:42, height:42, borderRadius:"50%", background:s.color, display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:900, fontSize:15, flexShrink:0 }}>{s.nome[0]}</div>
            <div style={{ flex:1, fontWeight:650, fontSize:13, color:c1(isDark) }}>{s.nome}</div>
            <div style={{ fontWeight:900, fontSize:14, color:"#52B87A" }}>{s.amount}</div>
          </div>
        ))}
      </div>
      <h2 style={{ fontWeight:700, fontSize:14, color:c1(isDark), marginBottom:12 }}>🎁 Lista de Desejos</h2>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {wish.map((item, i) => (
          <div key={i} style={{ padding:14, borderRadius:22, background:cd(isDark), border:`1px solid ${cb(isDark)}`, display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
            <div style={{ fontSize:28, marginBottom:8 }}>{item.emoji}</div>
            <div style={{ fontWeight:650, fontSize:11, color:c1(isDark), marginBottom:4 }}>{item.nome}</div>
            <div style={{ fontWeight:900, fontSize:12, color:"#C26D8C" }}>{item.price}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ═══ PAGE: PERFIL — com Conquistas, Histórico, Títulos ═══
function PagePerfil({ isDark }) {
  const [tab, setTab] = useState("mural");
  const ui = UV.find(u => u.id === "iconmind");
  const unlocked = CONQUISTAS.filter(c => c.desbloqueada);
  const xpPct = Math.round((2840 / 3200) * 100);
  const tituloAtivo = TITULOS.find(t => t.ativo);

  const tabs = [
    { id:"mural",      label:"Mural"      },
    { id:"conquistas", label:"Conquistas" },
    { id:"historico",  label:"Histórico"  },
    { id:"titulos",    label:"Títulos"    },
  ];

  return (
    <motion.div key="perfil" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} style={{ overflowY:"auto", flex:1, paddingBottom:40 }}>
      {/* Cover */}
      <div style={{ height:150, background:`linear-gradient(145deg,${ui.bg},#06040E)`, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", width:250, height:250, borderRadius:"50%", top:-80, right:-40, background:ui.color, opacity:0.2, filter:"blur(80px)" }}/>
        <div style={{ position:"absolute", top:16, right:20, display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:10, background:"rgba(255,255,255,0.1)", backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,0.15)" }}>
          <Icon3D iconKey="star" size={14}/>
          <span style={{ fontSize:10, fontWeight:700, color:"white" }}>Nível 12</span>
        </div>
      </div>

      <div style={{ padding:"0 24px 24px" }}>
        {/* Avatar */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginTop:-44, marginBottom:16 }}>
          <div style={{ position:"relative" }}>
            <div style={{ width:80, height:80, borderRadius:22, background:"linear-gradient(135deg,#D4688A,#7A5CCF)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:28, fontWeight:900, border:`4px solid ${isDark?T.bgD:T.bg}`, boxShadow:"0 8px 24px rgba(212,104,138,0.4)" }}>L</div>
            <div style={{ position:"absolute", bottom:2, right:2, width:14, height:14, borderRadius:"50%", background:"#52B87A", border:`2px solid ${isDark?T.bgD:T.bg}` }}/>
          </div>
          <button style={{ padding:"7px 16px", borderRadius:10, border:`1px solid ${cb(isDark)}`, background:cd(isDark), color:c2(isDark), fontSize:12, fontWeight:600, cursor:"pointer" }}>✎ Editar</button>
        </div>

        {/* Nome + título ativo */}
        <div style={{ marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:4 }}>
            <h2 style={{ fontWeight:900, fontSize:20, color:c1(isDark), letterSpacing:"-0.03em" }}>Liza Rutyon</h2>
            <span style={{ padding:"2px 8px", borderRadius:6, background:"rgba(91,143,212,0.12)", color:"#6B8FC7", fontSize:9, fontWeight:700 }}>✓ Verificado</span>
            <span style={{ padding:"2px 8px", borderRadius:6, background:"linear-gradient(90deg,#7A5CCF,#6B8FC7)", color:"white", fontSize:9, fontWeight:900 }}>PRO</span>
          </div>
          <p style={{ fontSize:12, color:c3(isDark), marginBottom:4 }}>@lizaruty</p>
          {/* Título ativo em destaque */}
          {tituloAtivo && (
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"4px 10px", borderRadius:8, background:tituloAtivo.color+"14", border:`1px solid ${tituloAtivo.color}30`, marginBottom:8 }}>
              <span style={{ fontSize:14 }}>✦</span>
              <span style={{ fontSize:12, fontWeight:700, color:tituloAtivo.color }}>{tituloAtivo.label}</span>
            </div>
          )}
          <p style={{ fontSize:13, color:c2(isDark), lineHeight:1.5 }}>Criadora de conteúdo, aprendiz eterna e apaixonada por arte, cultura e autoconhecimento.</p>
        </div>

        {/* XP */}
        <div style={{ padding:14, borderRadius:22, background:cd(isDark), border:`1px solid ${cb(isDark)}`, marginBottom:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
            <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,#E0A11B,#E8711A)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Icon3D iconKey="star" size={18}/>
            </div>
            <p style={{ fontSize:12, fontWeight:650, color:c1(isDark) }}>Nível 12 · <span style={{ color:"#E0A11B" }}>{xpPct}% para o Nível 13</span></p>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:c3(isDark), marginBottom:6 }}><span>2.840 XP</span><span>3.200 XP</span></div>
          <div style={{ height:7, borderRadius:4, background:isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)" }}>
            <motion.div initial={{ width:0 }} animate={{ width:`${xpPct}%` }} transition={{ duration:1.2, ease:"easeOut" }}
              style={{ height:"100%", borderRadius:4, background:"linear-gradient(90deg,#E0A11B88,#E0A11B)" }}/>
          </div>
        </div>

        {/* Emblemas rápidos */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12, overflowX:"auto", paddingBottom:4 }}>
          <span style={{ fontSize:10, fontWeight:600, color:c3(isDark), flexShrink:0 }}>Emblemas</span>
          {unlocked.map(c => (
            <motion.div key={c.id} whileHover={{ scale:1.15, y:-3 }} title={c.label}
              style={{ width:34, height:34, borderRadius:10, background:c.color+"10", border:`1px solid ${c.color}28`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, cursor:"pointer" }}>
              <Icon3D iconKey={c.iconKey} size={20} color={c.color}/>
            </motion.div>
          ))}
          <div style={{ width:34, height:34, borderRadius:10, background:isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:c3(isDark), flexShrink:0 }}>
            +{CONQUISTAS.filter(c=>!c.desbloqueada).length}
          </div>
        </div>

        {/* Meta pills */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:16 }}>
          {["📍 Duque de Caxias","🗓 Jan 2026","🔥 7 dias","📚 17 aulas"].map((m, i) => (
            <span key={i} style={{ padding:"5px 10px", borderRadius:20, background:isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)", color:c2(isDark), fontSize:11, border:`1px solid ${cb(isDark)}` }}>{m}</span>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", borderBottom:`1px solid ${cb(isDark)}`, marginBottom:16 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex:1, padding:"10px 0", border:"none", background:"transparent", cursor:"pointer", fontSize:13, fontWeight:tab===t.id?700:400, color:tab===t.id?c1(isDark):c3(isDark), borderBottom:`2px solid ${tab===t.id?"#D4688A":"transparent"}`, transition:"all 0.15s" }}>{t.label}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.18 }}>

            {/* ABA: MURAL */}
            {tab === "mural" && (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {POSTS.map((post, i) => { const uv = UV.find(x => x.id===post.universo); return (
                  <div key={i} style={{ padding:16, borderRadius:22, background:cd(isDark), border:`1px solid ${cb(isDark)}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,#D4688A,#7A5CCF)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:900, fontSize:13, flexShrink:0 }}>L</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:650, fontSize:13, color:c1(isDark) }}>Liza Rutyon</div>
                        <div style={{ fontSize:10, color:c3(isDark) }}>{post.tempo}</div>
                      </div>
                      <Planet universo={post.universo} size={22}/>
                    </div>
                    <p style={{ fontSize:13, color:c2(isDark), lineHeight:1.5, marginBottom:10 }}>{post.texto}</p>
                    <div style={{ display:"flex", gap:14, paddingTop:10, borderTop:`1px solid ${cb(isDark)}` }}>
                      <span style={{ fontSize:12, color:c3(isDark), cursor:"pointer" }}>❤️ {post.likes}</span>
                      <div style={{ marginLeft:"auto" }}><Tag label={post.universo.replace("icon","").toUpperCase()} color={uv.color}/></div>
                    </div>
                  </div>
                );})}
              </div>
            )}

            {/* ABA: CONQUISTAS */}
            {tab === "conquistas" && (
              <div>
                <div style={{ display:"flex", gap:10, marginBottom:16 }}>
                  {[{l:"Desbloqueadas",v:unlocked.length,c:"#52B87A"},{l:"Total",v:CONQUISTAS.length,c:"#7A5CCF"},{l:"XP de Conquistas",v:"420",c:"#E0A11B"}].map((s,i) => (
                    <div key={i} style={{ flex:1, padding:"12px 10px", borderRadius:12, background:cd(isDark), border:`1px solid ${cb(isDark)}`, textAlign:"center" }}>
                      <div style={{ fontWeight:900, fontSize:20, color:s.c, letterSpacing:"-0.03em" }}>{s.v}</div>
                      <div style={{ fontSize:9, color:c3(isDark), marginTop:3 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {CONQUISTAS.map(c => (
                    <motion.div key={c.id} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
                      style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px", borderRadius:22, background:cd(isDark), border:`1px solid ${c.desbloqueada ? c.color+"30" : cb(isDark)}`,
                        opacity: c.desbloqueada ? 1 : 0.55 }}>
                      <div style={{ width:48, height:48, borderRadius:22, background:c.desbloqueada ? c.color+"18" : isDark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                        boxShadow: c.desbloqueada ? `0 4px 14px ${c.color}28` : "none" }}>
                        <Icon3D iconKey={c.iconKey} size={28} color={c.desbloqueada ? c.color : c3(isDark)}/>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                          <span style={{ fontWeight:700, fontSize:13, color:c1(isDark) }}>{c.label}</span>
                          {c.desbloqueada && <span style={{ fontSize:9, fontWeight:700, color:c.color, padding:"1px 6px", borderRadius:4, background:c.color+"14" }}>+{c.xp} XP</span>}
                        </div>
                        <p style={{ fontSize:11, color:c3(isDark), marginBottom:2 }}>{c.desc}</p>
                        {c.desbloqueada && c.data && <span style={{ fontSize:9, color:c3(isDark) }}>🗓 {c.data}</span>}
                        {!c.desbloqueada && <span style={{ fontSize:9, color:c3(isDark) }}>🔒 Ainda não desbloqueada</span>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ABA: HISTÓRICO */}
            {tab === "historico" && (
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
                  <Icon3D iconKey="history" size={18} color={T.acc}/>
                  <span style={{ fontSize:14, fontWeight:700, color:c1(isDark) }}>Atividades Recentes</span>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                  {HISTORICO.map((h, i) => { const uv = UV.find(x => x.id===h.universo); return (
                    <motion.div key={h.id} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.06 }}
                      style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"16px 16px", borderRadius:12, background:i%2===0?cd(isDark):"transparent", border:`1px solid ${i%2===0?cb(isDark):"transparent"}` }}>
                      <div style={{ width:36, height:36, borderRadius:10, background:uv.color+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>
                        {h.tipo==="aula"?"▶️":h.tipo==="conquista"?"⭐":h.tipo==="social"?"💬":"📊"}
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ fontSize:12.5, color:c1(isDark), lineHeight:1.4, marginBottom:2 }}>{h.desc}</p>
                        <span style={{ fontSize:10, color:c3(isDark) }}>{h.tempo}</span>
                      </div>
                      <span style={{ fontSize:11, fontWeight:900, color:"#52B87A", flexShrink:0 }}>+{h.xp} XP</span>
                    </motion.div>
                  );})}
                </div>
              </div>
            )}

            {/* ABA: TÍTULOS */}
            {tab === "titulos" && (
              <div>
                <p style={{ fontSize:12, color:c2(isDark), marginBottom:16 }}>O título ativo aparece no teu perfil público e na sidebar.</p>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {TITULOS.map(t => (
                    <motion.div key={t.id} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
                      style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px", borderRadius:22, background:cd(isDark),
                        border:`1px solid ${t.ativo ? t.color+"50" : cb(isDark)}`,
                        opacity: t.desbloqueado ? 1 : 0.45, boxShadow: t.ativo ? `0 0 0 2px ${t.color}30` : "none" }}>
                      <div style={{ width:44, height:44, borderRadius:12, background:t.color+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>✦</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                          <span style={{ fontWeight:700, fontSize:13, color:t.desbloqueado?c1(isDark):c3(isDark) }}>{t.label}</span>
                          {t.ativo && <span style={{ fontSize:9, fontWeight:900, color:t.color, padding:"1px 6px", borderRadius:4, background:t.color+"14" }}>ATIVO</span>}
                          {!t.desbloqueado && <span style={{ fontSize:9, color:c3(isDark) }}>🔒</span>}
                        </div>
                        <p style={{ fontSize:11, color:c3(isDark) }}>{t.desc}</p>
                      </div>
                      {t.desbloqueado && !t.ativo && (
                        <button style={{ padding:"6px 14px", borderRadius:8, border:`1px solid ${t.color}40`, background:t.color+"10", color:t.color, fontWeight:700, fontSize:11, cursor:"pointer", flexShrink:0 }}>Usar</button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ═══ PAGE: CONFIGURAÇÕES ═══
function PageConfiguracoes({ isDark, setIsDark }) {
  const [tab, setTab] = useState("notificacoes");
  const [notif, setNotif] = useState(false);
  return (
    <motion.div key="config" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} style={{ overflowY:"auto", flex:1, padding:"28px 28px 40px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
        <NavIcon iconKey="settings" color="#8E99A8" isActive={true} size={18}/>
        <h1 style={{ fontWeight:900, fontSize:26, color:c1(isDark), letterSpacing:"-0.03em" }}>Definições</h1>
      </div>
      <div style={{ display:"flex", borderBottom:`1px solid ${cb(isDark)}`, marginBottom:24 }}>
        {["notificacoes","seguranca","geral"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding:"10px 18px", border:"none", background:"transparent", cursor:"pointer", fontSize:13, fontWeight:tab===t?700:400, color:tab===t?c1(isDark):c3(isDark), borderBottom:`2px solid ${tab===t?"#6B8FC7":"transparent"}`, transition:"all 0.15s", textTransform:"capitalize" }}>{t}</button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.18 }}>
          {tab === "notificacoes" && (
            <div style={{ borderRadius:20, padding:22, background:isDark?"rgba(82,184,122,0.07)":"rgba(82,184,122,0.05)", border:"1px solid rgba(82,184,122,0.2)", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, width:5, height:"100%", background:"#52B87A", borderRadius:"16px 0 0 16px" }}/>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:14, paddingLeft:10 }}>
                <div>
                  <h3 style={{ fontWeight:700, fontSize:16, color:c1(isDark), marginBottom:8 }}>💬 Alertas via WhatsApp</h3>
                  <p style={{ fontSize:13, color:c2(isDark), lineHeight:1.5, maxWidth:340 }}>Receba confirmações de inscrição e lembretes de progresso diretamente no seu telemóvel.</p>
                </div>
                <Toggle on={notif} onToggle={() => setNotif(!notif)} color="#52B87A"/>
              </div>
              <AnimatePresence>
                {notif && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
                    style={{ marginTop:16, paddingTop:16, borderTop:"1px solid rgba(82,184,122,0.15)", paddingLeft:10 }}>
                    <label style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:c3(isDark), display:"block", marginBottom:8 }}>Número de Telemóvel</label>
                    <div style={{ display:"flex", gap:10 }}>
                      <input type="tel" placeholder="+55 11 91234-5678" style={{ flex:1, padding:"12px 14px", borderRadius:10, border:`1px solid ${cb(isDark)}`, background:isDark?"#232428":"#F8F7F5", color:c1(isDark), fontSize:13, outline:"none" }}/>
                      <button style={{ padding:"12px 16px", borderRadius:10, border:"none", background:"#52B87A", color:"white", fontWeight:700, fontSize:13, cursor:"pointer" }}>Testar</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          {tab === "seguranca" && (
            <div style={{ borderRadius:20, padding:22, background:isDark?"rgba(82,184,122,0.07)":"rgba(82,184,122,0.05)", border:"1px solid rgba(82,184,122,0.2)", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, width:5, height:"100%", background:"#52B87A", borderRadius:"16px 0 0 16px" }}/>
              <div style={{ paddingLeft:10 }}>
                <h3 style={{ fontWeight:700, fontSize:16, color:c1(isDark), marginBottom:8 }}>🔐 Esqueceu-se da senha?</h3>
                <p style={{ fontSize:13, color:c2(isDark), lineHeight:1.5, marginBottom:16 }}>Ative a recuperação inteligente via <strong>WhatsApp</strong> e receba um código mágico diretamente no seu telemóvel.</p>
                <button style={{ padding:"12px 20px", borderRadius:10, border:"none", background:"#52B87A", color:"white", fontWeight:700, fontSize:13, cursor:"pointer", boxShadow:"0 4px 12px rgba(82,184,122,0.3)" }}>💬 Ativar Recuperação por WhatsApp</button>
              </div>
            </div>
          )}
          {tab === "geral" && (
            <div style={{ borderRadius:20, padding:22, background:cd(isDark), border:`1px solid ${cb(isDark)}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <h3 style={{ fontWeight:650, fontSize:15, color:c1(isDark), marginBottom:4 }}>{isDark ? "🌙 Modo Escuro ativo" : "☀️ Modo Claro ativo"}</h3>
                  <p style={{ fontSize:12, color:c3(isDark) }}>Alterne entre os temas da interface</p>
                </div>
                <Toggle on={isDark} onToggle={() => setIsDark(!isDark)} color={T.acc}/>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// ═══ PAGE: EM CONSTRUÇÃO PREMIUM ═══
function PageEmConstrucao({ isDark, label, iconKey, color, descricao }) {
  const recursos = {
    ia: ["Mentor virtual personalizado","Recomendações por comportamento","Criação de trilhas de aprendizagem","Análise cognitiva em tempo real"],
    cursos: ["Videoaulas por universo","Podcasts temáticos","Workshops ao vivo","Certificados de conclusão"],
    colecoes: ["Salve aulas favoritas","Organize por tema","Compartilhe coleções","Referências e ferramentas"],
    marketplace: ["Cursos premium","Mentorias 1:1","Templates criativos","Serviços de criadores"],
  };
  const items = recursos[iconKey] || [];
  return (
    <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} style={{ flex:1, overflowY:"auto", padding:"40px 28px" }}>
      <div style={{ maxWidth:520, margin:"0 auto" }}>
        <div style={{ width:72, height:72, borderRadius:20, background:color+"14", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, boxShadow:`0 4px 20px ${color}20` }}>
          <Icon3D iconKey={iconKey} size={36} color={color}/>
        </div>
        <h2 style={{ fontWeight:900, fontSize:24, color:c1(isDark), letterSpacing:"-0.03em", marginBottom:8 }}>{label}</h2>
        <p style={{ fontSize:13, color:c2(isDark), lineHeight:1.6, marginBottom:24 }}>{descricao || "Esta secção está a ser construída com cuidado. Volte em breve!"}</p>
        {items.length > 0 && (
          <div>
            <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:c3(isDark), marginBottom:14 }}>O que está a chegar</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {items.map((item, i) => (
                <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.08 }}
                  style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", borderRadius:12, background:cd(isDark), border:`1px solid ${cb(isDark)}` }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:color, flexShrink:0, boxShadow:`0 0 8px ${color}` }}/>
                  <span style={{ fontSize:13, color:c1(isDark) }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        <div style={{ marginTop:28, padding:"16px 20px", borderRadius:22, background:color+"08", border:`1px dashed ${color}40`, textAlign:"center" }}>
          <p style={{ fontSize:12, color:c2(isDark), marginBottom:10 }}>Quer ser notificada quando lançar?</p>
          <button style={{ padding:"10px 24px", borderRadius:10, border:"none", background:color, color:"white", fontWeight:700, fontSize:13, cursor:"pointer" }}>Avisar-me</button>
        </div>
      </div>
    </motion.div>
  );
}

// ═══ ROOT APP ═══
export default function App() {
  const [page, setPage] = useState("inicio");
  const [isDark, setIsDark] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [notifs, setNotifs] = useState(NOTIFICACOES);
  const [notifOpen, setNotifOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [zoom, setZoom] = useState(100);

  const notifCount = notifs.filter(n => !n.lida).length;
  const marcarLida = (id) => setNotifs(prev => prev.map(n => n.id === id ? {...n, lida:true} : n));

  const render = () => {
    switch(page) {
      case "inicio":        return <PageInicio isDark={isDark} notifs={notifs} onAbrirNotif={() => setNotifOpen(o => !o)}/>;
      case "universos":     return <PageUniversos isDark={isDark}/>;
      case "cerebro":       return <PageCerebro isDark={isDark}/>;
      case "iconplay":      return <PageIconplay isDark={isDark}/>;
      case "apoio":         return <PageApoio isDark={isDark}/>;
      case "perfil":        return <PagePerfil isDark={isDark}/>;
      case "configuracoes": return <PageConfiguracoes isDark={isDark} setIsDark={setIsDark}/>;
      case "ia":            return <PageEmConstrucao isDark={isDark} label="IA do ICONZA" iconKey="ia" color="#C26D8C" descricao="O centro de inteligência do ecossistema ICONZA. Um mentor virtual que aprende com o seu comportamento e cria trilhas personalizadas."/>;
      case "cursos":        return <PageEmConstrucao isDark={isDark} label="Cursos" iconKey="cursos" color="#52B87A" descricao="Biblioteca completa de conteúdos dos universos — videoaulas, podcasts, ebooks e workshops ao vivo."/>;
      case "colecoes":      return <PageEmConstrucao isDark={isDark} label="Coleções" iconKey="colecoes" color="#6B8FC7" descricao="O seu espaço de organização pessoal. Salve aulas, ferramentas, referências e crie coleções temáticas."/>;
      case "marketplace":   return <PageEmConstrucao isDark={isDark} label="Marketplace" iconKey="marketplace" color="#D97832" descricao="A economia criativa do ICONZA. Cursos premium, mentorias, templates e serviços dos melhores criadores."/>;
      default: return <PageInicio isDark={isDark} notifs={notifs} onAbrirNotif={() => setNotifOpen(o => !o)}/>;
    }
  };

  const isMobile = useIsMobile();

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:isDark?T.bgD:T.bg, fontFamily:"'Inter',system-ui,sans-serif", transition:"background 0.3s" }}>

      {/* INTRO */}
      <AnimatePresence>
        {!introComplete && <IntroScreen onComplete={() => setIntroComplete(true)}/>}
      </AnimatePresence>

      {/* PAINEL */}
      {introComplete && (
        <>
          {/* Sidebar só em desktop */}
          {!isMobile && (
            <Sidebar page={page} setPage={setPage} isDark={isDark}
              notifCount={notifCount}
              collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed}/>
          )}

          <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, overflowX:"hidden" }}>
            {/* TopBar — desktop: zoom + dark; mobile: logo + dark + notif */}
            {isMobile ? (
              <div style={{ height:52, display:"flex", alignItems:"center", padding:"0 16px", gap:10,
                background: isDark?"rgba(14,14,16,0.85)":"rgba(255,255,255,0.85)",
                backdropFilter:"blur(16px)", borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)"}`,
                position:"sticky", top:0, zIndex:40, flexShrink:0 }}>
                <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#7A5CCF,#6B8FC7)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:900, fontSize:12 }}>I</div>
                <span style={{ fontWeight:900, fontSize:16, color:c1(isDark), letterSpacing:"-0.04em", flex:1 }}>ICONZA</span>
                <motion.button onClick={() => setIsDark(d=>!d)} whileTap={{scale:0.88}}
                  style={{ padding:0, border:"none", background:"transparent", cursor:"pointer", display:"flex" }}>
                  <SolidIcon3D
                    iconKey={isDark ? "sun" : "moon"}
                    accentColor={isDark ? "#EAB308" : "#6366F1"}
                    size="xs"
                    ariaLabel={isDark ? "Activar modo claro" : "Activar modo escuro"}
                  />
                </motion.button>
                <motion.button whileTap={{scale:0.88}} onClick={() => setNotifOpen(o=>!o)}
                  style={{ position:"relative", padding:0, border:"none", background:"transparent", cursor:"pointer", display:"flex" }}>
                  <SolidIcon3D
                    iconKey="bell"
                    accentColor={notifCount > 0 ? "#F43F5E" : "#7A5CCF"}
                    size="xs"
                    ariaLabel="Notificações"
                  />
                  {notifCount>0&&<span style={{position:"absolute",top:-2,right:-2,width:14,height:14,borderRadius:"50%",background:"#FFFFFF",color:"#F43F5E",fontSize:8,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}>{notifCount}</span>}
                </motion.button>
              </div>
            ) : (
              <TopBar isDark={isDark} setIsDark={setIsDark} zoom={zoom} setZoom={setZoom}
                notifCount={notifCount} onAbrirNotif={() => setNotifOpen(o=>!o)} sidebarCollapsed={sidebarCollapsed}/>
            )}

            {/* Conteúdo com zoom (só desktop) */}
            <div style={{ flex:1, transformOrigin:"top left",
              transform: isMobile ? "none" : `scale(${zoom/100})`,
              width: isMobile ? "100%" : `${10000/zoom}%`,
              transition:"transform 0.25s ease" }}>
              <AnimatePresence mode="wait">
                <motion.div key={page} style={{ flex:1, display:"flex", flexDirection:"column" }}>
                  {render()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Nav Bottom Mobile */}
          {isMobile && (
            <nav style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:50,
              background: isDark?"rgba(14,14,16,0.95)":"rgba(255,255,255,0.95)",
              backdropFilter:"blur(20px)", borderTop:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)"}`,
              display:"flex", justifyContent:"space-around", padding:"6px 0 10px" }}>
              {NAV.filter(n=>["inicio","universos","cerebro","perfil","configuracoes"].includes(n.id)).map(item=>{
                const isActive = page === item.id;
                return (
                  <motion.button key={item.id} onClick={()=>setPage(item.id)} whileTap={{scale:0.86}}
                    style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, border:"none", background:"transparent", cursor:"pointer", padding:"4px 8px" }}>
                    <div style={{ width:36, height:36, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center",
                      background:isActive?item.color+"14":"transparent", transition:"background 0.15s" }}>
                      <NavIcon iconKey={item.iconKey} color={item.color} isActive={isActive} size={17}/>
                    </div>
                    <span style={{ fontSize:9, fontWeight:isActive?700:400, color:isActive?item.color:c3(isDark), letterSpacing:"0.01em" }}>{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>
          )}

          {/* PAINEL NOTIFICAÇÕES */}
          <AnimatePresence>
            {notifOpen && (
              <PainelNotificacoes isDark={isDark} notifs={notifs} onLer={marcarLida} onClose={() => setNotifOpen(false)}/>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
