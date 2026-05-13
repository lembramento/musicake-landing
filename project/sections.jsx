// Primitivas e seções do wireframe Musicake
// Visual: papel off-white, tinta escura, sotaques rosa/magenta/roxo da marca.

const { useState, useEffect, useRef } = React;

// =============================================================
// Primitivas sketchy
// =============================================================

function SketchBox({ children, className = "", style = {}, tilt = 0, fill = "transparent", thick = false, accent = false }) {
  const rotateStyle = tilt ? { transform: `rotate(${tilt}deg)` } : {};
  return (
    <div
      className={`sk-box ${className} ${thick ? "sk-thick" : ""} ${accent ? "sk-accent" : ""}`}
      style={{ background: fill, ...rotateStyle, ...style }}
    >
      {children}
    </div>
  );
}

function HandLabel({ children, size = 22, color = "var(--ink)", className = "", style = {} }) {
  return (
    <span className={`sk-hand ${className}`} style={{ fontSize: size, color, lineHeight: 1.15, ...style }}>
      {children}
    </span>
  );
}

function CapsLabel({ children, size = 13, color = "var(--ink-soft)", className = "", style = {} }) {
  return (
    <span className={`sk-caps ${className}`} style={{ fontSize: size, color, ...style }}>
      {children}
    </span>
  );
}

function Marker({ children, color = "var(--marker)", rotate = -1.5 }) {
  return (
    <span className="sk-marker" style={{ background: color, transform: `rotate(${rotate}deg)` }}>
      {children}
    </span>
  );
}

function Scribble({ w = 80, h = 8, color = "var(--ink)", style = {} }) {
  // Linha sublinhada à mão
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", ...style }}>
      <path
        d={`M2 ${h - 3} Q ${w * 0.25} ${h - 6}, ${w * 0.5} ${h - 3} T ${w - 2} ${h - 4}`}
        stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"
      />
    </svg>
  );
}

function Arrow({ dir = "right", length = 60, color = "var(--ink)", style = {} }) {
  const rot = { right: 0, down: 90, left: 180, up: -90 }[dir] || 0;
  return (
    <svg width={length} height="24" viewBox={`0 0 ${length} 24`} style={{ transform: `rotate(${rot}deg)`, ...style }}>
      <path d={`M2 12 Q ${length * 0.3} 6, ${length - 14} 12`} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d={`M${length - 18} 5 L ${length - 6} 12 L ${length - 18} 19`} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CircleNum({ n, color = "var(--ink)", size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" className="sk-num">
      <path
        d="M22 3 C 32 3 41 11 41 22 C 41 33 33 41 22 41 C 11 41 3 33 3 22 C 3 11 12 3 22 3 Z"
        stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      <text x="22" y="30" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="24" fill={color}>{n}</text>
    </svg>
  );
}

function PhoneSketch({ children, w = 200, h = 380, style = {} }) {
  return (
    <div className="sk-phone" style={{ width: w, height: h, ...style }}>
      <div className="sk-phone-notch" />
      <div className="sk-phone-inner">{children}</div>
    </div>
  );
}

function BrowserSketch({ children, w = 320, h = 220, url = "spotify.com", style = {} }) {
  return (
    <div className="sk-browser" style={{ width: w, height: h, ...style }}>
      <div className="sk-browser-bar">
        <span className="sk-browser-dot sk-browser-dot-1" />
        <span className="sk-browser-dot sk-browser-dot-2" />
        <span className="sk-browser-dot sk-browser-dot-3" />
        <span className="sk-browser-url">{url}</span>
      </div>
      <div className="sk-browser-inner">{children}</div>
    </div>
  );
}

function AvatarSketch({ size = 56, fill = "transparent" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56">
      <path d="M28 4 C 41 4 52 14 52 28 C 52 41 41 52 28 52 C 15 52 4 41 4 28 C 4 14 15 4 28 4 Z" stroke="var(--ink)" strokeWidth="2" fill={fill} />
      <circle cx="28" cy="23" r="6" fill="none" stroke="var(--ink)" strokeWidth="2" />
      <path d="M14 46 Q 28 32 42 46" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PlayBadge({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ display: "block" }}>
      <defs>
        <linearGradient id="musicakeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF8B96" />
          <stop offset="50%" stopColor="#E94E9D" />
          <stop offset="100%" stopColor="#A346C2" />
        </linearGradient>
      </defs>
      <path
        d="M25 18 C 25 14 28 12 32 14 L 96 52 C 102 56 102 64 96 68 L 32 106 C 28 108 25 106 25 102 Z"
        fill="url(#musicakeGrad)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round"
      />
      <path d="M25 50 L 96 50" stroke="var(--ink)" strokeWidth="2" opacity="0.4" />
      <path d="M25 75 L 96 75" stroke="var(--ink)" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

// =============================================================
// Seções
// =============================================================

function NavBar({ c }) {
  return (
    <nav className="sk-nav">
      <div className="sk-nav-logo">
        <PlayBadge size={36} />
        <span className="sk-logo-word">musicake</span>
      </div>
      <div className="sk-nav-links">
        <CapsLabel>{c.nav.listen}</CapsLabel>
        <CapsLabel>{c.nav.artists}</CapsLabel>
        <span className="sk-nav-cta"><HandLabel size={20}>{c.nav.waitlist} →</HandLabel></span>
      </div>
    </nav>
  );
}

function Hero({ c, hookIdx = 0 }) {
  const hook = c.heroHooks[hookIdx] || c.heroHooks[0];
  return (
    <section className="sk-section sk-hero">
      <div className="sk-hero-left">
        <CapsLabel>{hook.kicker}</CapsLabel>
        <h1 className="sk-h1">
          {hook.title.map((line, i) => (
            <span key={i} className="sk-h1-line">
              {i === 1 ? <Marker>{line}</Marker> : line}
            </span>
          ))}
        </h1>
        <Scribble w={240} h={10} />
        <p className="sk-sub">{hook.sub}</p>
        <div className="sk-cta-row">
          <SketchBox className="sk-btn sk-btn-primary" thick accent><HandLabel size={22} color="var(--paper)">{c.ctaPrimary}</HandLabel></SketchBox>
          <span className="sk-btn-link"><HandLabel size={20}>{c.ctaSecondary} ↘</HandLabel></span>
        </div>
      </div>
      <div className="sk-hero-right">
        <div className="sk-orbit">
          <div className="sk-orbit-center"><PlayBadge size={140} /></div>
          <div className="sk-orbit-a a1"><AvatarSketch size={56} /></div>
          <div className="sk-orbit-a a2"><AvatarSketch size={48} /></div>
          <div className="sk-orbit-a a3"><AvatarSketch size={62} /></div>
          <div className="sk-orbit-a a4"><AvatarSketch size={44} /></div>
          <div className="sk-orbit-a a5"><AvatarSketch size={52} /></div>
          <div className="sk-orbit-a a6"><AvatarSketch size={40} /></div>
          {/* connecting scribbles */}
          <svg className="sk-orbit-lines" viewBox="0 0 500 500" preserveAspectRatio="none">
            <path d="M250 250 Q 180 180 110 130" stroke="var(--ink)" strokeWidth="1.5" fill="none" strokeDasharray="3 5" />
            <path d="M250 250 Q 340 200 410 140" stroke="var(--ink)" strokeWidth="1.5" fill="none" strokeDasharray="3 5" />
            <path d="M250 250 Q 360 320 430 380" stroke="var(--ink)" strokeWidth="1.5" fill="none" strokeDasharray="3 5" />
            <path d="M250 250 Q 160 320 100 380" stroke="var(--ink)" strokeWidth="1.5" fill="none" strokeDasharray="3 5" />
            <path d="M250 250 Q 250 160 250 90" stroke="var(--ink)" strokeWidth="1.5" fill="none" strokeDasharray="3 5" />
            <path d="M250 250 Q 250 360 250 430" stroke="var(--ink)" strokeWidth="1.5" fill="none" strokeDasharray="3 5" />
          </svg>
        </div>
      </div>
    </section>
  );
}

function ProductCards({ c, order = ["baking", "slice"] }) {
  const cards = {
    baking: (
      <SketchBox key="baking" className="sk-product" thick tilt={-0.6}>
        <div className="sk-product-head">
          <HandLabel size={42}>{c.baking.name}</HandLabel>
          <CapsLabel>{c.baking.tag}</CapsLabel>
        </div>
        <div className="sk-product-art sk-product-art-baking">
          {/* cake/plate sketch with waveform on top */}
          <svg viewBox="0 0 220 180" width="100%" height="100%">
            <path d="M30 130 Q 110 110 190 130 L 190 150 Q 110 165 30 150 Z" fill="none" stroke="var(--ink)" strokeWidth="2" />
            <path d="M30 130 Q 110 145 190 130" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
            <path d="M50 110 Q 110 90 170 110 L 170 130 Q 110 145 50 130 Z" fill="none" stroke="var(--ink)" strokeWidth="2" />
            <path d="M50 110 Q 110 125 170 110" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
            {/* waveform on top */}
            <g stroke="var(--magenta)" strokeWidth="2.5" strokeLinecap="round">
              <line x1="80" y1="95" x2="80" y2="75" />
              <line x1="90" y1="98" x2="90" y2="60" />
              <line x1="100" y1="100" x2="100" y2="80" />
              <line x1="110" y1="95" x2="110" y2="55" />
              <line x1="120" y1="98" x2="120" y2="70" />
              <line x1="130" y1="100" x2="130" y2="85" />
              <line x1="140" y1="95" x2="140" y2="65" />
            </g>
          </svg>
        </div>
        <p className="sk-product-headline">{c.baking.headline}</p>
        <p className="sk-product-desc">{c.baking.desc}</p>
        <ul className="sk-bullets">
          {c.baking.bullets.map((b, i) => <li key={i}><span className="sk-tick">✓</span> {b}</li>)}
        </ul>
      </SketchBox>
    ),
    slice: (
      <SketchBox key="slice" className="sk-product" thick tilt={0.5}>
        <div className="sk-product-head">
          <HandLabel size={42}>{c.slice.name}</HandLabel>
          <CapsLabel>{c.slice.tag}</CapsLabel>
        </div>
        <div className="sk-product-art sk-product-art-slice">
          <svg viewBox="0 0 220 180" width="100%" height="100%">
            {/* cake slice */}
            <path d="M40 140 L 180 60 L 200 90 L 60 160 Z" fill="none" stroke="var(--ink)" strokeWidth="2" />
            <path d="M40 140 L 60 160" stroke="var(--ink)" strokeWidth="2" />
            <path d="M55 150 Q 80 120 110 110" stroke="var(--ink)" strokeWidth="1.5" fill="none" />
            {/* waveform on top */}
            <g stroke="var(--pink)" strokeWidth="2.5" strokeLinecap="round">
              <line x1="90" y1="115" x2="90" y2="95" transform="rotate(-25 90 105)" />
              <line x1="105" y1="105" x2="105" y2="80" transform="rotate(-25 105 92)" />
              <line x1="120" y1="100" x2="120" y2="70" transform="rotate(-25 120 85)" />
              <line x1="135" y1="95" x2="135" y2="75" transform="rotate(-25 135 85)" />
            </g>
          </svg>
        </div>
        <p className="sk-product-headline">{c.slice.headline}</p>
        <p className="sk-product-desc">{c.slice.desc}</p>
        <ul className="sk-bullets">
          {c.slice.bullets.map((b, i) => <li key={i}><span className="sk-tick">✓</span> {b}</li>)}
        </ul>
      </SketchBox>
    ),
  };
  return (
    <section className="sk-section sk-products">
      <header className="sk-section-head">
        <CapsLabel>{c.productsKicker}</CapsLabel>
        <p className="sk-section-intro">{c.productsIntro}</p>
      </header>
      <div className="sk-products-grid">
        {order.map(k => cards[k])}
      </div>
    </section>
  );
}

function Audience({ c }) {
  return (
    <section className="sk-section sk-audience">
      <header className="sk-section-head sk-section-head-tight">
        <CapsLabel>{c.audienceKicker}</CapsLabel>
        <h2 className="sk-h2">
          {c.audienceTitle.map((line, i) => (
            <span key={i} className="sk-h2-line">{i === 1 ? <Marker color="var(--marker-purple)">{line}</Marker> : line}</span>
          ))}
        </h2>
      </header>
      <div className="sk-aud-grid">
        {c.audiences.map((a, i) => (
          <SketchBox key={i} className="sk-aud-card" tilt={(i % 2 === 0 ? -0.6 : 0.8)}>
            <div className="sk-aud-icon">
              {i === 0 && <AvatarSketch size={52} />}
              {i === 1 && (
                <svg width="52" height="52" viewBox="0 0 52 52"><path d="M10 40 L 16 12 L 22 40 M 16 28 L 22 28" stroke="var(--ink)" strokeWidth="2" fill="none" strokeLinejoin="round" /><circle cx="38" cy="34" r="6" fill="none" stroke="var(--ink)" strokeWidth="2" /><line x1="44" y1="28" x2="44" y2="14" stroke="var(--ink)" strokeWidth="2" /></svg>
              )}
              {i === 2 && (
                <svg width="52" height="52" viewBox="0 0 52 52"><rect x="8" y="10" width="36" height="32" fill="none" stroke="var(--ink)" strokeWidth="2" /><line x1="14" y1="18" x2="38" y2="18" stroke="var(--ink)" strokeWidth="2" /><line x1="14" y1="26" x2="32" y2="26" stroke="var(--ink)" strokeWidth="2" /><line x1="14" y1="34" x2="36" y2="34" stroke="var(--ink)" strokeWidth="2" /></svg>
              )}
              {i === 3 && (
                <svg width="52" height="52" viewBox="0 0 52 52"><circle cx="18" cy="22" r="8" fill="none" stroke="var(--ink)" strokeWidth="2" /><circle cx="34" cy="22" r="8" fill="none" stroke="var(--ink)" strokeWidth="2" /><circle cx="26" cy="36" r="8" fill="none" stroke="var(--ink)" strokeWidth="2" /></svg>
              )}
            </div>
            <HandLabel size={26} className="sk-aud-name">{a.name}</HandLabel>
            <p className="sk-aud-desc">{a.desc}</p>
          </SketchBox>
        ))}
      </div>
    </section>
  );
}

function PhoneStepArt({ kind }) {
  if (kind === "share-source") {
    return (
      <div className="sk-fake-player">
        <div className="sk-fake-art" />
        <div className="sk-fake-lines"><div /><div /></div>
        <div className="sk-fake-controls">‹‹  ▷  ››</div>
        <div className="sk-fake-share">⤴</div>
      </div>
    );
  }
  if (kind === "share-sheet") {
    return (
      <div className="sk-fake-player sk-fake-share-sheet">
        <div className="sk-fake-art sk-fake-art-sm" />
        <div className="sk-fake-share-grid">
          <div className="sk-share-app">▶</div>
          <div className="sk-share-app sk-share-app-hl">▶</div>
          <div className="sk-share-app">♫</div>
        </div>
      </div>
    );
  }
  if (kind === "slice-link") {
    return (
      <div className="sk-fake-player">
        <div className="sk-fake-art sk-fake-art-sm" />
        <div className="sk-fake-lines"><div /></div>
        <div className="sk-fake-platforms">
          <div>○ Spotify</div>
          <div>○ Apple Music</div>
          <div>○ Deezer</div>
          <div>○ YouTube</div>
          <div>○ Tidal</div>
        </div>
      </div>
    );
  }
  return null;
}

function BrowserStepArt({ kind }) {
  if (kind === "install") {
    return (
      <div className="sk-br-content sk-br-install">
        <div className="sk-br-page-head">
          <span className="sk-br-fav" />
          <div className="sk-br-page-title">chrome web store</div>
        </div>
        <div className="sk-br-extension-card">
          <div className="sk-br-ext-icon">
            <PlayBadge size={36} />
          </div>
          <div className="sk-br-ext-meta">
            <HandLabel size={18}>Musicake</HandLabel>
            <div className="sk-br-ext-sub">universal music sharing</div>
          </div>
          <div className="sk-br-ext-btn">+ adicionar</div>
        </div>
      </div>
    );
  }
  if (kind === "listening") {
    return (
      <div className="sk-br-content sk-br-listening">
        <div className="sk-br-now-playing">
          <div className="sk-fake-art sk-fake-art-sm" />
          <div className="sk-br-track">
            <HandLabel size={16}>nome da música</HandLabel>
            <div className="sk-br-artist">artista</div>
            <div className="sk-br-progress"><div className="sk-br-progress-fill" /></div>
          </div>
        </div>
        {/* The Musicake icon appearing in the platform UI */}
        <div className="sk-br-mc-icon" title="Musicake">
          <PlayBadge size={28} />
          <div className="sk-br-mc-tip">← clique aqui</div>
        </div>
      </div>
    );
  }
  if (kind === "link-ready") {
    return (
      <div className="sk-br-content sk-br-link-ready">
        <div className="sk-br-popup">
          <CapsLabel>seu link universal</CapsLabel>
          <div className="sk-br-link-row">
            <span className="sk-br-link">musicake.io/s/k7p2-ah</span>
            <span className="sk-br-copy">copiar ⎘</span>
          </div>
          <div className="sk-br-platforms-row">
            <span>Spotify ✓</span>
            <span>Apple ✓</span>
            <span>Deezer ✓</span>
            <span>YouTube ✓</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

function HowSlice({ c, layout = "phones", flow = "mobile" }) {
  const isPT = c.nav.listen === "para ouvintes";
  const [activeFlow, setActiveFlow] = useState(flow);

  // Keep external prop in sync (when user changes tweak)
  React.useEffect(() => { setActiveFlow(flow); }, [flow]);

  const renderSteps = (which) => {
    const steps = which === "desktop" ? c.howSliceDesktop : c.howSlice;
    const accent = which === "desktop" ? "var(--purple)" : "var(--magenta)";

    if (layout === "phones") {
      return (
        <div className={`sk-how-phones ${which === "desktop" ? "sk-how-browsers" : ""}`}>
          {steps.map((s, i) => (
            <div key={i} className="sk-how-col">
              <div className="sk-how-step">
                <CircleNum n={s.n} color={accent} />
                <p className="sk-how-step-label">{s.label}</p>
              </div>
              {which === "desktop" ? (
                <BrowserSketch w={300} h={210} url={i === 0 ? "chrome.com/webstore" : "spotify.com"}>
                  <BrowserStepArt kind={s.browser} />
                </BrowserSketch>
              ) : (
                <PhoneSketch>
                  <PhoneStepArt kind={s.phone} />
                </PhoneSketch>
              )}
              {i < steps.length - 1 && <div className="sk-how-arrow"><Arrow length={50} /></div>}
            </div>
          ))}
        </div>
      );
    }
    if (layout === "stack") {
      return (
        <div className="sk-how-stack">
          {steps.map((s, i) => (
            <SketchBox key={i} className="sk-how-stack-row">
              <CircleNum n={s.n} color={accent} />
              <div className="sk-how-stack-text">
                <HandLabel size={26}>{s.label}</HandLabel>
              </div>
              <div className="sk-how-stack-mini">
                {which === "desktop"
                  ? <BrowserSketch w={140} h={90}><div className="sk-fake-list-mini">≣</div></BrowserSketch>
                  : <PhoneSketch w={90} h={150}><div className="sk-fake-art sk-fake-art-sm" /></PhoneSketch>}
              </div>
            </SketchBox>
          ))}
        </div>
      );
    }
    if (layout === "wide") {
      return (
        <div className="sk-how-wide">
          <SketchBox className="sk-how-wide-left" thick>
            <div className="sk-how-wide-steps">
              {steps.map((s, i) => (
                <div key={i} className="sk-how-wide-step">
                  <CircleNum n={s.n} color={accent} />
                  <p>{s.label}</p>
                </div>
              ))}
            </div>
          </SketchBox>
          <SketchBox className="sk-how-wide-right" thick>
            {which === "desktop" ? (
              <BrowserSketch w={320} h={220}>
                <BrowserStepArt kind="link-ready" />
              </BrowserSketch>
            ) : (
              <PhoneSketch w={220} h={400}>
                <PhoneStepArt kind="slice-link" />
              </PhoneSketch>
            )}
          </SketchBox>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="sk-section sk-how">
      <header className="sk-section-head sk-section-head-tight">
        <CapsLabel>{c.howSliceKicker}</CapsLabel>
        <h2 className="sk-h2"><span className="sk-h2-line">{c.howSliceTitle}</span></h2>
        <p className="sk-how-intro">
          {isPT
            ? "Slice funciona em qualquer lugar onde você ouve música — no celular ou no navegador. No desktop, é ainda mais rápido."
            : "Slice works wherever you listen — on mobile or in the browser. On desktop, it's even faster."}
        </p>
      </header>

      {/* Tab switcher */}
      <div className="sk-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={activeFlow === "mobile"}
          className={`sk-tab ${activeFlow === "mobile" ? "active" : ""}`}
          onClick={() => setActiveFlow("mobile")}
        >
          <span className="sk-tab-icon">📱</span>
          <span className="sk-tab-label">{isPT ? "no celular" : "on mobile"}</span>
        </button>
        <button
          role="tab"
          aria-selected={activeFlow === "desktop"}
          className={`sk-tab ${activeFlow === "desktop" ? "active" : ""}`}
          onClick={() => setActiveFlow("desktop")}
        >
          <span className="sk-tab-icon">💻</span>
          <span className="sk-tab-label">{isPT ? "no navegador" : "in the browser"}</span>
          <span className="sk-tab-badge">{isPT ? "ainda mais fácil" : "even easier"}</span>
        </button>
      </div>

      <div className="sk-tabpanel" role="tabpanel">
        {renderSteps(activeFlow)}
      </div>
    </section>
  );
}

function HowBaking({ c }) {
  return (
    <section className="sk-section sk-how-baking">
      <header className="sk-section-head sk-section-head-tight">
        <CapsLabel>{c.howBakingKicker}</CapsLabel>
        <h2 className="sk-h2"><span className="sk-h2-line">{c.howBakingTitle}</span></h2>
      </header>
      <div className="sk-baking-grid">
        {c.howBaking.map((s, i) => (
          <SketchBox key={i} className="sk-baking-step" tilt={i % 2 ? 0.6 : -0.5}>
            <CircleNum n={s.n} color="var(--purple)" />
            <p>{s.label}</p>
          </SketchBox>
        ))}
      </div>
      <div className="sk-baking-plate">
        <CapsLabel>o plate · um exemplo</CapsLabel>
        <SketchBox className="sk-plate-mock" thick>
          <div className="sk-plate-cover" />
          <div className="sk-plate-info">
            <HandLabel size={28}>nome do single</HandLabel>
            <CapsLabel>artista · lança em 14.05</CapsLabel>
            <Scribble w={120} h={6} />
            <p className="sk-plate-release">[release / contexto / bastidores]</p>
            <div className="sk-plate-buttons">
              <span className="sk-plate-btn">▶ ouvir prévia</span>
              <span className="sk-plate-btn sk-plate-btn-primary">avisar quando lançar</span>
            </div>
            <div className="sk-plate-fans">
              <CapsLabel>área dos fãs →</CapsLabel>
            </div>
          </div>
        </SketchBox>
      </div>
    </section>
  );
}

function ManifestoBlock({ c }) {
  const m = c.manifestoBlock;
  return (
    <section className="sk-section sk-manifesto">
      <CapsLabel>{m.kicker}</CapsLabel>
      <h2 className="sk-manifesto-title">
        {m.title.map((line, i) => (
          <span key={i} className="sk-manifesto-line">
            {i === 1 ? <Marker color="var(--marker-pink)">{line}</Marker> : line}
          </span>
        ))}
      </h2>
      <p className="sk-manifesto-body">{m.body}</p>
    </section>
  );
}

function Testimonials({ c }) {
  return (
    <section className="sk-section sk-testimonials">
      <CapsLabel>{c.testimonialsKicker}</CapsLabel>
      <div className="sk-testimonials-grid">
        {c.testimonials.map((t, i) => (
          <SketchBox key={i} className="sk-quote" tilt={i % 2 ? 1 : -1}>
            <span className="sk-quote-mark">"</span>
            <HandLabel size={22}>{t.quote}</HandLabel>
            <CapsLabel className="sk-quote-author">— {t.author}</CapsLabel>
          </SketchBox>
        ))}
      </div>
    </section>
  );
}

function FAQ({ c }) {
  return (
    <section className="sk-section sk-faq">
      <CapsLabel>{c.faqKicker}</CapsLabel>
      <div className="sk-faq-list">
        {c.faq.map((f, i) => (
          <div key={i} className="sk-faq-row">
            <HandLabel size={26} className="sk-faq-q">{f.q}</HandLabel>
            <p className="sk-faq-a">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA({ c }) {
  return (
    <section className="sk-section sk-final">
      <CapsLabel>{c.finalKicker}</CapsLabel>
      <h2 className="sk-h1 sk-final-title">
        {c.finalTitle.map((line, i) => (
          <span key={i} className="sk-h1-line">{i === 1 ? <Marker color="var(--marker-pink)">{line}</Marker> : line}</span>
        ))}
      </h2>
      <p className="sk-sub" style={{ maxWidth: 560 }}>{c.finalSub}</p>
      <div className="sk-final-form">
        <SketchBox className="sk-input"><HandLabel size={22} color="var(--ink-soft)">[ seu e-mail ]</HandLabel></SketchBox>
        <SketchBox className="sk-btn sk-btn-primary" thick accent><HandLabel size={22} color="var(--paper)">{c.finalCta}</HandLabel></SketchBox>
      </div>
      <span className="sk-final-secondary"><HandLabel size={20}>{c.finalSecondary} ↗</HandLabel></span>
    </section>
  );
}

function Footer({ c }) {
  return (
    <footer className="sk-footer">
      <PlayBadge size={28} />
      <CapsLabel>{c.footer}</CapsLabel>
    </footer>
  );
}

Object.assign(window, {
  SketchBox, HandLabel, CapsLabel, Marker, Scribble, Arrow, CircleNum, PhoneSketch, BrowserSketch, AvatarSketch, PlayBadge,
  PhoneStepArt, BrowserStepArt,
  NavBar, Hero, ProductCards, Audience, HowSlice, HowBaking, ManifestoBlock, Testimonials, FAQ, FinalCTA, Footer,
});
