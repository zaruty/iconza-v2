"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon3D, NavIcon } from "./dashboard-icons";
import { NAV } from "./dashboard-nav-data";
import { T, c1, c2, c3, cd, cb } from "./dashboard-tokens";
import type {
  DashboardLayoutProps,
  Notificacao,
  PageId,
  TooltipSide,
} from "./dashboard-types";
import { MOBILE_NAV_IDS } from "./dashboard-types";

function useIsMobile(): boolean {
  const [m, setM] = useState(
    typeof window !== "undefined" && window.innerWidth < 768,
  );
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return m;
}

type IntroScreenProps = { onComplete: () => void };
type TooltipProps = {
  text: string;
  children: ReactNode;
  side?: TooltipSide;
};
type SidebarProps = {
  page: PageId;
  setPage: (page: PageId) => void;
  isDark: boolean;
  notifCount: number;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};
type TopBarProps = {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  notifCount: number;
  onAbrirNotif: () => void;
};
type PainelNotificacoesProps = {
  isDark: boolean;
  notifs: Notificacao[];
  onLer: (id: number) => void;
  onClose: () => void;
};

function IntroScreen({ onComplete }: IntroScreenProps) {
  useEffect(() => {
    const t = setTimeout(onComplete, 4000);
    return () => clearTimeout(t);
  }, [onComplete]);
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
        Construindo identidades cognitivas atravÃ©s de universos temÃ¡ticos.
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
        Pular â†’
      </motion.button>
    </motion.div>
  );
}

function Tooltip({ text, children, side = "right" }: TooltipProps) {
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


function Sidebar({ page, setPage, isDark, notifCount, collapsed, setCollapsed }: SidebarProps) {
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

      {/* Header â€” Crown como Ãºnico gatilho expand/colapso */}
      <div style={{
        padding:"12px 0 10px",
        borderBottom:`1px solid ${divB}`,
        display:"flex", alignItems:"center",
        justifyContent: collapsed ? "center" : "space-between",
        paddingLeft: collapsed ? 0 : 16,
        paddingRight: collapsed ? 0 : 12,
        minHeight:56,
      }}>
        {/* Crown SVG â€” centralizada quando colapsada, Ã  esquerda quando expandida */}
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

        {/* Logo â€” sÃ³ visÃ­vel quando expandida */}
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
        {/* X â€” sÃ³ visÃ­vel quando expandida, sutil com hover */}
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

          // â”€â”€ regras de cor dinÃ¢mica â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
          // Colapsada: ativo = cor do item, inativo = branco 50%
          // Expandida: ativo = cor do item (100%), inativo = branco 70%
          const iconColor = collapsed
            ? (isActive ? item.color          : "rgba(255,255,255,0.5)")
            : (isActive ? item.color          : "rgba(255,255,255,0.7)");

          // Label: ativo = branco puro, inativo = branco 65%
          const labelColor = isActive ? "#FFFFFF" : "rgba(255,255,255,0.65)";

          // Fundo do botÃ£o: ativo = cor com 18% opacidade, hover herdado
          const btnBg = isActive
            ? (collapsed ? item.color+"18" : item.color+"18")
            : "transparent";

          // Fundo do container do Ã­cone: ativo = cor 28%, inativo = branco 6% (sÃ³ expandida)
          const iconBg = isActive
            ? `linear-gradient(135deg,${item.color}40,${item.color}22)`
            : (!collapsed ? "rgba(255,255,255,0.06)" : "transparent");

          // Sombra do Ã­cone ativo
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
              {/* Ãcone â€” contraste elevado no estado expandido */}
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

      {/* User + botÃ£o fechar (sÃ³ quando expandido) */}
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


function TopBar({ isDark, setIsDark, zoom, setZoom, notifCount, onAbrirNotif }: TopBarProps) {
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

      {/* Zoom compacto: âˆ’ valor + */}
      <div style={{ display:"flex", alignItems:"center", gap:0, borderRadius:10, overflow:"hidden",
        border:`1px solid ${divB}`, background: isDark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)" }}>
        <button onClick={() => setZoom(z => Math.max(MIN, z - STEP))}
          style={{ width:30, height:30, border:"none", background:"transparent", cursor:"pointer",
            color:c2(isDark), fontSize:17, fontWeight:300, display:"flex", alignItems:"center", justifyContent:"center",
            borderRight:`1px solid ${divB}` }}>âˆ’</button>
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
        style={{ width:36, height:36, borderRadius:10, border:`1px solid ${divB}`,
          background: isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)",
          display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:16 }}>
        {isDark ? "â˜€ï¸" : "ðŸŒ™"}
      </motion.button>

      {/* NotificaÃ§Ãµes */}
      <motion.button whileTap={{ scale:0.9 }} onClick={onAbrirNotif}
        style={{ position:"relative", width:36, height:36, borderRadius:10, border:`1px solid ${divB}`,
          background: isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)",
          display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
        <Icon3D iconKey="bell" size={18} color={notifCount > 0 ? "#F43F5E" : c2(isDark)}/>
        {notifCount > 0 && (
          <span style={{ position:"absolute", top:-3, right:-3, width:16, height:16, borderRadius:"50%",
            background:"#F43F5E", color:"white", fontSize:8, fontWeight:900,
            display:"flex", alignItems:"center", justifyContent:"center",
            border:`2px solid ${isDark?T.bgD:T.bg}` }}>{notifCount}</span>
        )}
      </motion.button>
    </div>
  );
}

function PainelNotificacoes({ isDark, notifs, onLer, onClose }: PainelNotificacoesProps) {
  return (
    <motion.div initial={{ opacity:0, x:20, scale:0.97 }} animate={{ opacity:1, x:0, scale:1 }} exit={{ opacity:0, x:20, scale:0.97 }}
      style={{ position:"fixed", top:20, right:20, width:320, zIndex:200, borderRadius:22, overflow:"hidden",
        background:cd(isDark), border: isDark?"1px solid rgba(255,255,255,0.06)":"none", boxShadow:"0 20px 60px rgba(0,0,0,0.15)" }}>
      <div style={{ padding:"16px 18px 12px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:`1px solid ${cb(isDark)}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <Icon3D iconKey="bell" size={18} color="#7A5CCF"/>
          <span style={{ fontWeight:700, fontSize:14, color:c1(isDark) }}>NotificaÃ§Ãµes</span>
        </div>
        <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:c3(isDark), fontSize:20, lineHeight:1 }}>Ã—</button>
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
export function DashboardLayout({
  page,
  setPage,
  isDark,
  setIsDark,
  introComplete,
  setIntroComplete,
  notifs,
  setNotifs,
  notifOpen,
  setNotifOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
  zoom,
  setZoom,
  children,
}: DashboardLayoutProps) {
  const notifCount = notifs.filter((n) => !n.lida).length;
  const marcarLida = (id: number) =>
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, lida: true } : n)));

  const isMobile = useIsMobile();

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:isDark?T.bgD:T.bg, fontFamily:"'Inter',system-ui,sans-serif", transition:"background 0.3s" }}>

      <AnimatePresence>
        {!introComplete && <IntroScreen onComplete={() => setIntroComplete(true)}/>}
      </AnimatePresence>

      {introComplete && (
        <>
          {!isMobile && (
            <Sidebar page={page} setPage={setPage} isDark={isDark}
              notifCount={notifCount}
              collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed}/>
          )}

          <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, overflowX:"hidden" }}>
            {isMobile ? (
              <div style={{ height:52, display:"flex", alignItems:"center", padding:"0 16px", gap:10,
                background: isDark?"rgba(14,14,16,0.85)":"rgba(255,255,255,0.85)",
                backdropFilter:"blur(16px)", borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)"}`,
                position:"sticky", top:0, zIndex:40, flexShrink:0 }}>
                <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#7A5CCF,#6B8FC7)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:900, fontSize:12 }}>I</div>
                <span style={{ fontWeight:900, fontSize:16, color:c1(isDark), letterSpacing:"-0.04em", flex:1 }}>ICONZA</span>
                <motion.button onClick={() => setIsDark((d) => !d)} whileTap={{scale:0.88}}
                  style={{ width:34,height:34,borderRadius:9,border:`1px solid ${isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}`,background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:16 }}>
                  {isDark?"☀️":"🌙"}
                </motion.button>
                <motion.button whileTap={{scale:0.88}} onClick={() => setNotifOpen((o) => !o)}
                  style={{ position:"relative",width:34,height:34,borderRadius:9,border:`1px solid ${isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}`,background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
                  <Icon3D iconKey="bell" size={17} color={notifCount>0?"#F43F5E":c2(isDark)}/>
                  {notifCount>0&&<span style={{position:"absolute",top:-3,right:-3,width:15,height:15,borderRadius:"50%",background:"#F43F5E",color:"white",fontSize:8,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${isDark?T.bgD:T.bg}`}}>{notifCount}</span>}
                </motion.button>
              </div>
            ) : (
              <TopBar isDark={isDark} setIsDark={setIsDark} zoom={zoom} setZoom={setZoom}
                notifCount={notifCount} onAbrirNotif={() => setNotifOpen((o) => !o)} />
            )}

            <div style={{ flex:1, transformOrigin:"top left",
              transform: isMobile ? "none" : `scale(${zoom/100})`,
              width: isMobile ? "100%" : `${10000/zoom}%`,
              transition:"transform 0.25s ease" }}>
              <AnimatePresence mode="wait">
                <motion.div key={page} style={{ flex:1, display:"flex", flexDirection:"column" }}>
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {isMobile && (
            <nav style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:50,
              background: isDark?"rgba(14,14,16,0.95)":"rgba(255,255,255,0.95)",
              backdropFilter:"blur(20px)", borderTop:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)"}`,
              display:"flex", justifyContent:"space-around", padding:"6px 0 10px" }}>
              {NAV.filter((n) => MOBILE_NAV_IDS.includes(n.id)).map((item) => {
                const isActive = page === item.id;
                return (
                  <motion.button key={item.id} onClick={() => setPage(item.id)} whileTap={{scale:0.86}}
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
