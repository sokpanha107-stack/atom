'use client'

import { useState } from 'react'
import { Activity, ArrowDownRight, ArrowUpRight, Bell, ChevronDown, Command, Eye, EyeOff, Gauge, Globe2, Moon, Radar, Settings, Shield, Sun, Terminal, Vault, X, Zap } from 'lucide-react'

type View = 'War Room' | 'Rule Engine' | 'The Vault' | 'System Health' | 'Settings'

const navItems: { label: View; icon: typeof Radar }[] = [
  { label: 'War Room', icon: Radar },
  { label: 'Rule Engine', icon: Command },
  { label: 'The Vault', icon: Vault },
  { label: 'System Health', icon: Activity },
  { label: 'Settings', icon: Settings },
]

const alerts = [
  { bank: 'JPMORGAN', type: 'BUY LIMIT', amount: '$100.0M', price: '$2,600.00', time: '14:32:08.421', side: 'buy' },
  { bank: 'GOLDMAN SACHS', type: 'SELL STOP', amount: '$42.5M', price: '$2,594.50', time: '14:31:54.087', side: 'sell' },
  { bank: 'CITADEL SEC.', type: 'BUY LIMIT', amount: '$18.2M', price: '$2,588.00', time: '14:31:32.619', side: 'buy' },
  { bank: 'MORGAN STANLEY', type: 'SELL LIMIT', amount: '$64.0M', price: '$2,603.25', time: '14:30:48.201', side: 'sell' },
  { bank: 'DEUTSCHE BANK', type: 'BUY STOP', amount: '$31.8M', price: '$2,581.75', time: '14:30:12.903', side: 'buy' },
]

function AtomMark() {
  return <svg aria-hidden="true" viewBox="0 0 40 40" className="size-9"><circle cx="20" cy="20" r="2.2" fill="currentColor"/><ellipse cx="20" cy="20" rx="17" ry="6.5" fill="none" stroke="currentColor" strokeWidth="1.2"/><ellipse cx="20" cy="20" rx="17" ry="6.5" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(60 20 20)"/><ellipse cx="20" cy="20" rx="17" ry="6.5" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(120 20 20)"/></svg>
}

function RadarDisplay() {
  return <div className="radar-grid relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-full border border-white/15 bg-[#080808]">
    <svg viewBox="0 0 360 360" className="absolute inset-0 h-full w-full" aria-label="Radar sweep visualization" role="img">
      <circle cx="180" cy="180" r="48"/><circle cx="180" cy="180" r="96"/><circle cx="180" cy="180" r="144"/><line x1="180" y1="14" x2="180" y2="346"/><line x1="14" y1="180" x2="346" y2="180"/>
      <path d="M180 180 L180 15 A165 165 0 0 1 295 62 Z" className="radar-sweep"/>
      <circle cx="248" cy="116" r="3.5" className="radar-dot"/><circle cx="120" cy="225" r="3" className="radar-dot"/><circle cx="213" cy="278" r="2.5" className="radar-dot"/>
    </svg>
    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] tracking-[.3em] text-white/60">SCANNING</span>
    <span className="absolute bottom-7 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[.2em] text-white/35">RANGE 25.0 KM</span>
  </div>
}

function SettingsRows({ dark, setDark, eye, setEye }: { dark: boolean; setDark: (value: boolean) => void; eye: boolean; setEye: (value: boolean) => void }) {
  return <div className="divide-y divide-border">
    <SettingRow icon={dark ? Moon : Sun} title="Appearance" detail={dark ? 'Dark interface' : 'Light interface'}><button className="switch-control" role="switch" aria-checked={dark} aria-label="Dark mode" onClick={() => setDark(!dark)}><span /></button></SettingRow>
    <SettingRow icon={eye ? Shield : Eye} title="Eye protection" detail={eye ? 'Reduced contrast enabled' : 'Standard contrast'}><button className="switch-control" role="switch" aria-checked={eye} aria-label="Eye protection mode" onClick={() => setEye(!eye)}><span /></button></SettingRow>
    <SettingRow icon={Bell} title="Notifications" detail="Critical alerts and execution events"><button className="switch-control" role="switch" aria-checked="true" aria-label="Notifications"><span /></button></SettingRow>
    <SettingRow icon={Globe2} title="Language" detail="Interface language"><button className="flex items-center gap-2 font-mono text-xs tracking-wider">EN <ChevronDown size={14}/></button></SettingRow>
  </div>
}

function SettingRow({ icon: Icon, title, detail, children }: { icon: typeof Sun; title: string; detail: string; children: React.ReactNode }) {
  return <div className="flex items-center justify-between gap-4 py-5"><div className="flex items-center gap-3"><Icon size={16} className="text-muted-foreground"/><div><p className="text-sm font-medium">{title}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div></div>{children}</div>
}

export function AtomDashboard() {
  const [activeView, setActiveView] = useState<View>('War Room')
  const [dark, setDark] = useState(true)
  const [eye, setEye] = useState(false)
  const [armed, setArmed] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)

  return <div className={`atom-app min-h-screen ${dark ? 'theme-dark' : 'theme-light'} ${eye ? 'eye-protection' : ''}`}>
    <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
      <div className="brand"><AtomMark/><div><p className="text-sm font-semibold tracking-[.19em]">ATOM CORE</p><p className="mt-1 font-mono text-[9px] tracking-[.22em] text-muted-foreground">QUANT SYSTEMS / 04</p></div><button aria-label="Close navigation" className="ml-auto md:hidden" onClick={() => setMobileNav(false)}><X size={18}/></button></div>
      <div className="sidebar-label">OPERATIONS</div>
      <nav aria-label="Main navigation" className="flex flex-col gap-1">{navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => { setActiveView(label); setMobileNav(false) }} className={`nav-link ${activeView === label ? 'nav-link-active' : ''}`} aria-current={activeView === label ? 'page' : undefined}><Icon size={16}/><span>{label}</span>{label === 'War Room' && <span className="ml-auto live-dot"/>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="connection-indicator"><span className="live-dot"/><div><p className="text-xs font-medium">All systems nominal</p><p className="mt-1 font-mono text-[9px] text-muted-foreground">LATENCY 08.2 MS</p></div></div><div className="user-chip"><div className="user-avatar">AC</div><div className="min-w-0"><p className="truncate text-xs font-medium">A. Chen</p><p className="mt-1 font-mono text-[9px] text-muted-foreground">LEVEL 04 · OPERATOR</p></div><ChevronDown size={14} className="ml-auto text-muted-foreground"/></div></div>
    </aside>
    {mobileNav && <button aria-label="Close navigation overlay" className="nav-overlay md:hidden" onClick={() => setMobileNav(false)}/>}
    <div className="main-shell">
      <header className="topbar"><div className="flex items-center gap-3"><button className="menu-trigger md:hidden" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Command size={18}/></button><div><p className="font-mono text-[10px] tracking-[.2em] text-muted-foreground">ATOM / OPERATIONS</p><h1 className="mt-1 text-sm font-medium tracking-wide">{activeView.toUpperCase()}</h1></div></div>
        <div className="flex items-center gap-2"><span className="hidden font-mono text-[9px] tracking-[.16em] text-muted-foreground sm:block">DISPLAY SETTINGS</span><button className={`icon-control ${!dark ? 'control-selected' : ''}`} aria-label="Toggle light and dark mode" aria-pressed={!dark} onClick={() => setDark(!dark)}>{dark ? <Moon size={15}/> : <Sun size={15}/>}</button><button className={`icon-control ${eye ? 'control-selected' : ''}`} aria-label="Toggle eye protection" aria-pressed={eye} onClick={() => setEye(!eye)}>{eye ? <Shield size={15}/> : <Eye size={15}/>}</button><span className="top-divider"/><button className="language-control" aria-label="Select language">EN <ChevronDown size={12}/></button></div>
      </header>
      <main className="dashboard-content">
        {activeView === 'Settings' ? <section className="settings-panel"><div className="section-kicker">PREFERENCES / 01</div><h2 className="mt-2 text-2xl font-medium tracking-tight">System settings</h2><p className="mt-2 text-sm text-muted-foreground">Configure your ATOM CORE environment.</p><div className="mt-8 max-w-2xl"><SettingsRows dark={dark} setDark={setDark} eye={eye} setEye={setEye}/></div></section> : <>
          <div className="page-heading"><div><div className="section-kicker">COMMAND CENTER <span className="mx-2 text-border">/</span> LIVE FEED</div><h2 className="mt-2 text-2xl font-medium tracking-tight">Market surveillance</h2><p className="mt-1 text-sm text-muted-foreground">Real-time institutional activity monitoring</p></div><div className="session-badge"><span className="live-dot"/> NY SESSION <span className="text-muted-foreground">·</span> OPEN</div></div>
          <section className="stats-grid" aria-label="Market overview"><Stat label="NET EXPOSURE" value="$284.6M" note="+2.4% from open" icon={ArrowUpRight}/><Stat label="ACTIVE ORDERS" value="1,284" note="Across 18 institutions" icon={Activity}/><Stat label="MARKET PRICE" value="$2,598.42" note="−0.18% / 24H" icon={ArrowDownRight}/><Stat label="SYSTEM LATENCY" value="08.2 ms" note="Nominal · 99.98% uptime" icon={Gauge}/></section>
          <section className="main-grid"><article className="panel radar-panel"><div className="panel-heading"><div><p className="panel-label">01 / SENSOR ARRAY</p><h3 className="mt-1 text-sm font-medium">The Radar</h3></div><button className="mini-status"><span className="live-dot"/> ACTIVE</button></div><div className="radar-wrap"><RadarDisplay/></div><div className="radar-footer"><span>SECTOR 7G · GOLD / XAU</span><span className="font-mono">34° 03′ N / 118° 15′ W</span></div></article>
            <article className="panel alerts-panel"><div className="panel-heading"><div><p className="panel-label">02 / INSTITUTIONAL ACTIVITY</p><h3 className="mt-1 text-sm font-medium">Live alerts feed</h3></div><button className="feed-count">05 NEW <ChevronDown size={12}/></button></div><div className="alerts-list">{alerts.map((alert, index) => <div className="alert-row" key={alert.bank}><div className={`alert-mark ${alert.side}`}>{alert.side === 'buy' ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-x-2 gap-y-1"><span className="alert-bank">[{alert.bank}]</span><span className="alert-type">{alert.type}</span></div><p className="mt-1 font-mono text-xs text-foreground/80">{alert.amount} <span className="text-muted-foreground">at</span> {alert.price}</p><p className="mt-1 font-mono text-[9px] tracking-wide text-muted-foreground">ORDER REF / 00{index + 291}8</p></div><time className="shrink-0 font-mono text-[9px] text-muted-foreground">{alert.time}</time></div>)}</div><div className="feed-footer"><span>STREAMING FROM 18 VENUES</span><button>VIEW ALL <ArrowUpRight size={11}/></button></div></article></section>
          <section className="kill-section"><div className="kill-copy"><div className="flex items-center gap-2"><Shield size={15}/><span className="panel-label">EMERGENCY PROTOCOL / LEVEL 4</span></div><p className="mt-2 text-xs text-muted-foreground">Immediately liquidate all open positions across connected venues.</p></div><button className={`kill-button ${armed ? 'kill-armed' : ''}`} onClick={() => setArmed(!armed)}><Zap size={17} fill="currentColor"/><span>{armed ? 'CONFIRM — CLOSE ALL POSITIONS' : 'ATOMIC SWITCH — CLOSE ALL POSITIONS'}</span><span className="kill-key">{armed ? 'ARMED' : '⌘ + ⇧ + X'}</span></button></section>
        </>}
        <footer className="page-footer"><span>ATOM CORE TERMINAL <span className="mx-2">/</span> CLASSIFICATION: RESTRICTED</span><span>BUILD 4.08.12 <span className="mx-2">·</span> ENCRYPTED LINK <span className="live-dot ml-2 inline-block"/></span></footer>
      </main>
    </div>
  </div>
}

function Stat({ label, value, note, icon: Icon }: { label: string; value: string; note: string; icon: typeof Activity }) {
  return <article className="stat-card"><div className="flex items-center justify-between"><p className="panel-label">{label}</p><Icon size={14} className="text-muted-foreground"/></div><p className="stat-value">{value}</p><p className="stat-note">{note}</p></article>
}
