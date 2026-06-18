import { useEffect, useRef, useState } from 'react';
import { PROFILE, PROJECTS, CERTS, GROUPS, SKILLS } from '../lib/filesystem.js';

const TABS = ['About', 'Skills', 'Projects', 'Certs', 'Groups', 'Contact'];

// DOS text-mode / Turbo Vision-style window. Draggable + resizable.
// Sits under the CRT overlay so scanlines + glow wash over it too.
export default function TuiWindow({ onClose }) {
  // fit the viewport so it never spawns off-screen on phones
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const initW = Math.min(760, vw - 16);
  const initH = Math.min(560, vh - 16);
  const [pos, setPos] = useState(() => ({
    x: Math.max(8, (vw - initW) / 2),
    y: Math.max(8, (vh - initH) / 2 - 10),
  }));
  const [size, setSize] = useState({ w: initW, h: initH });
  const [maximized, setMaximized] = useState(false);
  const [tab, setTab] = useState('About');

  const beginPointer = (e, onMove) => {
    e.preventDefault();
    const sx = e.clientX;
    const sy = e.clientY;
    const move = (ev) => onMove(ev.clientX - sx, ev.clientY - sy);
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const startDrag = (e) => {
    if (maximized) return;
    const ox = pos.x;
    const oy = pos.y;
    beginPointer(e, (dx, dy) => setPos({ x: ox + dx, y: oy + dy }));
  };

  const startResize = (e) => {
    e.stopPropagation();
    const ow = size.w;
    const oh = size.h;
    beginPointer(e, (dx, dy) =>
      setSize({ w: Math.max(280, ow + dx), h: Math.max(240, oh + dy) })
    );
  };

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const style = maximized
    ? { left: 0, top: 0, width: '100%', height: '100%' }
    : { left: pos.x, top: pos.y, width: size.w, height: size.h };

  return (
    <div className="tui" style={style} role="dialog" aria-label="Portfolio">
      <div
        className="tui__titlebar"
        onPointerDown={startDrag}
        onDoubleClick={() => setMaximized((m) => !m)}
      >
        <span className="tui__title">▒ portfolio.exe — John Santos</span>
        <span className="tui__controls">
          <button className="tui__ctl" onClick={() => setMaximized((m) => !m)} title="Maximize">
            {maximized ? '▔' : '□'}
          </button>
          <button className="tui__ctl tui__ctl--close" onClick={onClose} title="Close">
            ✕
          </button>
        </span>
      </div>

      <div className="tui__menu">
        {TABS.map((t) => (
          <button
            key={t}
            className={`tui__tab ${tab === t ? 'is-active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="tui__body">
        <div className="tui__page">{renderTab(tab)}</div>
      </div>

      <div className="tui__status">
        <span>{tab}</span>
        <span className="tui__status-grow">
          {PROJECTS.length} projects · {CERTS.length} certs
        </span>
        <span>ESC=Quit · drag title · resize ◢</span>
      </div>

      {!maximized && <div className="tui__resize" onPointerDown={startResize}>◢</div>}
    </div>
  );
}

function renderTab(tab) {
  switch (tab) {
    case 'About':
      return <AboutTab />;
    case 'Skills':
      return <SkillsTab />;
    case 'Projects':
      return <ProjectsTab />;
    case 'Certs':
      return <CertsTab />;
    case 'Groups':
      return <GroupsTab />;
    case 'Contact':
      return <ContactTab />;
    default:
      return null;
  }
}

function Field({ label, children }) {
  return (
    <div className="tui-field">
      <span className="tui-field__label">{label}</span>
      <span className="tui-field__val">{children}</span>
    </div>
  );
}

function Box({ title, children }) {
  return (
    <fieldset className="tui-box">
      <legend>┤ {title} ├</legend>
      {children}
    </fieldset>
  );
}

function AboutTab() {
  return (
    <div className="tui-stack">
      <Box title="Profile">
        <Field label="Name">{PROFILE.name}</Field>
        <Field label="Role">{PROFILE.role}</Field>
        <Field label="Location">{PROFILE.location}</Field>
        <Field label="Aliases">{PROFILE.nicknames.join(', ')}</Field>
        <Field label="Born">August 28, 2003</Field>
      </Box>
      <Box title="Education">
        <p>BS Information Technology — Malayan Colleges Laguna</p>
        <p>STEM Strand — Perpetual Help College of Calamba</p>
      </Box>
      <Box title="Bio">
        <p>
          Aspiring Network Administrator &amp; Software Developer based in the Philippines,
          currently taking a BS in Information Technology at Malayan Colleges Laguna. Interested
          in K-Pop / Korean Culture, video games, and tech.
        </p>
      </Box>
      <img className="tui-photo" src="./assets/aboutme.jpg" alt="John Robert Santos" />
    </div>
  );
}

function SkillsTab() {
  return (
    <div className="tui-stack">
      {SKILLS.map((g) => (
        <Box key={g.cat} title={g.cat}>
          <div className="tui-chips">
            {g.items.map((it) => (
              <span key={it} className="tui-chip">{it}</span>
            ))}
          </div>
        </Box>
      ))}
    </div>
  );
}

function ProjectsTab() {
  return (
    <div className="tui-list">
      {PROJECTS.map((p) => (
        <div key={p.id} className="tui-item">
          <div className="tui-item__head">
            <span className="tui-item__title">■ {p.title}</span>
            {p.private ? (
              <span className="tui-badge">[ PRIVATE ]</span>
            ) : (
              <button className="tui-btn" onClick={() => window.open(p.url, '_blank', 'noopener')}>
                [ Open GitHub ]
              </button>
            )}
          </div>
          <div className="tui-item__meta">{p.role} · {p.tech}</div>
          <p className="tui-item__desc">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

function CertsTab() {
  return (
    <div className="tui-list">
      {CERTS.map((c) => (
        <div key={c.id} className="tui-item">
          <div className="tui-item__head">
            <span className="tui-item__title">◆ {c.title}</span>
            {c.url && (
              <button className="tui-btn" onClick={() => window.open(c.url, '_blank', 'noopener')}>
                [ Verify ]
              </button>
            )}
          </div>
          <div className="tui-item__meta">
            {c.issuer}
            {c.issued ? ` · ${c.issued}` : ''}
          </div>
          <p className="tui-item__desc">{c.desc}</p>
        </div>
      ))}
    </div>
  );
}

function GroupsTab() {
  return (
    <div className="tui-groups">
      {GROUPS.map((g) => (
        <figure key={g.id} className="tui-group-card">
          <img src={g.img} alt={g.name} loading="lazy" />
          <figcaption>{g.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function ContactTab() {
  return (
    <div className="tui-stack">
      <Box title="Get in touch">
        <Field label="Email">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </Field>
        <Field label="Phone">{PROFILE.phone}</Field>
        <Field label="GitHub">
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">github.com/JannersLSR</a>
        </Field>
        <Field label="LinkedIn">
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/jannerslsr</a>
        </Field>
        <Field label="Twitter/X">
          <a href={PROFILE.twitter} target="_blank" rel="noopener noreferrer">twitter.com/jawnerS_</a>
        </Field>
      </Box>
      <div className="tui-actions">
        <button
          className="tui-btn tui-btn--primary"
          onClick={() => window.open(PROFILE.resume, '_blank', 'noopener')}
        >
          [ ⤓ Open Resume.pdf ]
        </button>
      </div>
      <img className="tui-photo" src="./assets/profile.png" alt="John Robert Santos" />
    </div>
  );
}
