// Musicake hi-fi — sections (strictly follows wireframe V2: copy from window.COPY)
// V2 flow: Hero → Slice card → HowSlice → Baking card → HowBaking → Audience
//          → Manifesto → Testimonials → FAQ → Final CTA → Footer

// ============================================================
// Avatar photos
// ============================================================
const AVATAR_PHOTOS = window.AVATAR_PHOTOS || [
"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=faces",
"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=faces",
"https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop&crop=faces",
"https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=200&h=200&fit=crop&crop=faces"];


// ============================================================
// Helper: render a multi-line title with last (or chosen) line in gradient
// ============================================================
function Headline({ lines, gradLine }) {
  // If gradLine is undefined, gradient the LAST line.
  const gIdx = gradLine === undefined ? lines.length - 1 : gradLine;
  return (
    <>
      {lines.map((line, i) =>
      <span key={i} style={{ display: "block" }}>
          {i === gIdx ? <span className="hf-grad-text">{line}</span> : line}
        </span>
      )}
    </>);

}

// ============================================================
// Nav
// ============================================================
function NavHi({ lang, onScrollTo }) {
  const c = window.COPY[lang];
  const scrolled = useScrolled();
  return (
    <div className={`hf-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="hf-nav-inner">
        <Logo size={28} />
        <div className="hf-nav-links">
          <a className="hf-nav-link" onClick={() => onScrollTo("slice")}>{c.nav.listen}</a>
          <a className="hf-nav-link" onClick={() => onScrollTo("baking")}>{c.nav.artists}</a>
        </div>
        <div className="hf-nav-cta">
          <button className="hf-btn hf-btn-primary" onClick={() => onScrollTo("cta")}>{c.nav.waitlist}</button>
        </div>
      </div>
    </div>);

}

// ============================================================
// Hero
// ============================================================
function HeroHi({ lang, onScrollTo }) {
  const c = window.COPY[lang];
  const hook = c.heroHooks[0];
  return (
    <section className="hf-section hf-hero">
      <div className="hf-hero-text">
        <span className="hf-eyebrow-pill"><span className="dot" />{hook.kicker}</span>
        <h1 className="hf-h1">
          <Headline lines={hook.title} gradLine={1} />
        </h1>
        <p className="hf-sub">{hook.sub}</p>
        <div className="hf-hero-actions">
          <button className="hf-btn hf-btn-primary" onClick={() => onScrollTo("cta")}>
            {c.ctaPrimary} <Icon name="arrow-right" size={16} />
          </button>
          <button className="hf-btn hf-btn-ghost" onClick={() => onScrollTo("how")}>
            {c.ctaSecondary}
          </button>
        </div>
      </div>
      <div className="hf-hero-visual">
        <HeroOrbit />
      </div>
    </section>);

}

// ============================================================
// Hero orbit (regular circular, equal-spaced)
// ============================================================
// Graphic vinyl — only the concentric grooves on a soft maroon glow,
// edges fade into the background (no solid disc, no label, no spindle).
function HeroVinyl() {
  // Many tightly-packed grooves
  const grooves = [];
  for (let r = 98; r >= 30; r -= 2.4) grooves.push(r);
  return (
    <svg
      className="hf-hero-vinyl"
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="vinyl-tint" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#3a0f2a" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#26092a" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#26092a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vinyl-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#fff" stopOpacity="1" />
          <stop offset="55%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="vinyl-fade-mask">
          <rect width="200" height="200" fill="url(#vinyl-fade)" />
        </mask>
      </defs>
      <g mask="url(#vinyl-fade-mask)">
        {/* soft tinted backdrop where the grooves live */}
        <circle cx="100" cy="100" r="100" fill="url(#vinyl-tint)" />
        {/* the grooves */}
        {grooves.map((r, i) => (
          <circle
            key={i}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="rgba(255,200,220,0.10)"
            strokeWidth="0.35"
          />
        ))}
      </g>
    </svg>
  );
}

function HeroOrbit() {
  const N = 7;
  const satellites = React.useMemo(() => {
    const sizes = [76, 64, 72, 68, 60, 70, 64];
    const photoIdx = [0, 2, 1, 3, 4, 5, 6];
    return Array.from({ length: N }, (_, i) => ({
      baseAngle: i / N * 360,
      size: sizes[i],
      idx: photoIdx[i]
    }));
  }, []);

  const satRefs = React.useRef([]);

  React.useEffect(() => {
    let radius = 210;
    const fit = () => {
      const w = window.innerWidth;
      if (w < 720) radius = 140;else
      if (w < 980) radius = 180;else
      radius = 210;
    };
    fit();
    window.addEventListener("resize", fit);

    const PERIOD = 60000;
    let raf;
    const tick = (t) => {
      const baseDeg = t * 360 / PERIOD;
      for (let i = 0; i < N; i++) {
        const el = satRefs.current[i];
        if (!el) continue;
        const a = (satellites[i].baseAngle + baseDeg) % 360 * Math.PI / 180;
        const x = radius * Math.cos(a);
        const y = radius * Math.sin(a);
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
    };
  }, [satellites]);

  return (
    <div className="hf-orbit-wrap">
      <div className="hf-orbit-bg" />
      <HeroVinyl />
      <div className="hf-orbit-wave">
        {Array.from({ length: 20 }).map((_, i) =>
        <span key={i} className="bar" style={{ animationDelay: `${i % 8 * 0.12}s` }} />
        )}
      </div>
      <div className="hf-orbit-center is-pulsing">
        <img
          src="assets/musicake_simbol.png"
          alt="Musicake"
          style={{ width: 150, height: "auto", display: "block", filter: "drop-shadow(0 0 60px rgba(233,78,157,0.55))" }} />
        
      </div>
      {satellites.map((s, i) =>
      <div
        key={i}
        ref={(el) => satRefs.current[i] = el}
        className="hf-orbit-satellite">
        
          <div
          className="hf-orbit-photo"
          style={{
            width: s.size,
            height: s.size,
            marginLeft: -s.size / 2,
            marginTop: -s.size / 2,
            backgroundImage: `url("${AVATAR_PHOTOS[s.idx % AVATAR_PHOTOS.length]}")`
          }} />
        
        </div>
      )}
    </div>);

}

// ============================================================
// Slice — unified product + how-it-works section (with phone/laptop frames)
// ============================================================
function SliceSection({ lang }) {
  const c = window.COPY[lang];
  const p = c.slice;
  const [flow, setFlow] = React.useState("mobile");

  const steps = flow === "mobile" ? c.howSlice : c.howSliceDesktop;
  const ArtComp = flow === "mobile" ? MobileStepArt : DesktopStepArt;

  return (
    <section className="hf-section" id="slice">
      <div className="hf-product-section">
        {/* Product head */}
        <div className="hf-product-head">
          <div className="hf-product-head-main">
            <span className="hf-product-tag-pill">{p.tag}</span>
            <h2 className="hf-product-name">{p.name}</h2>
            <p className="hf-product-headline-big hf-grad-text">{p.headline}</p>
            <ul className="hf-product-bullets">
              {p.bullets.map((b, i) =>
              <li key={i}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(233,78,157,0.18)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--coral)", flexShrink: 0, marginTop: 2 }}>
                    <Icon name="check" size={12} strokeWidth={3} />
                  </span>
                  {b}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* How it works (same section) */}
        <div className="hf-product-section-how" id="how">
          <div className="hf-product-section-how-head">
            <div>
              <span className="hf-eyebrow with-dot">{c.howSliceKicker}</span>
              <h3 className="hf-product-section-how-title">{c.howSliceTitle}</h3>
            </div>
          </div>

          {/* Real tab bar — underline indicator */}
          <div className="hf-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={flow === "mobile"}
              className={`hf-tab ${flow === "mobile" ? "active" : ""}`}
              onClick={() => setFlow("mobile")}>
              
              {c.howSliceTabs.mobile}
            </button>
            <button
              role="tab"
              aria-selected={flow === "desktop"}
              className={`hf-tab ${flow === "desktop" ? "active" : ""}`}
              onClick={() => setFlow("desktop")}>
              
              {c.howSliceTabs.desktop}
            </button>
          </div>

          <div className="hf-steps">
            {steps.map((s, i) =>
            <div key={`${flow}-${i}`} className="hf-step">
                <div className="hf-step-header">
                  <div className="hf-step-num">{s.n}</div>
                  <div className="hf-step-label">{s.label}</div>
                </div>
                <div className="hf-step-art">
                  {flow === "mobile" ?
                <div className="hf-phone-frame">
                      <div className="hf-phone-screen">
                        <ArtComp step={s.n} />
                      </div>
                    </div> :

                <div className="hf-laptop-frame">
                      <div className="hf-laptop-screen">
                        <div className="hf-laptop-screen-inner">
                          <ArtComp step={s.n} />
                        </div>
                      </div>
                      <div className="hf-laptop-base" />
                    </div>
                }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

// ============================================================
// Baking — unified product + how-it-works section (with plate mock)
// ============================================================
function BakingSection({ lang }) {
  const c = window.COPY[lang];
  const p = c.baking;
  return (
    <section className="hf-section" id="baking">
      <div className="hf-product-section is-baking">
        {/* Product head */}
        <div className="hf-product-head">
          <div className="hf-product-head-main">
            <span className="hf-product-tag-pill is-baking">{p.tag}</span>
            <h2 className="hf-product-name">{p.name}</h2>
            <p className="hf-product-headline-big hf-grad-text">{p.headline}</p>
            <ul className="hf-product-bullets">
              {p.bullets.map((b, i) =>
              <li key={i}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(163,70,194,0.2)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#D08DE8", flexShrink: 0, marginTop: 2 }}>
                    <Icon name="check" size={12} strokeWidth={3} />
                  </span>
                  {b}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* How it works */}
        <div className="hf-product-section-how">
          <div className="hf-product-section-how-head">
            <div>
              <span className="hf-eyebrow with-dot">{c.howBakingKicker}</span>
              <h3 className="hf-product-section-how-title">{c.howBakingTitle}</h3>
            </div>
          </div>

          <div className="hf-baking-steps">
            {c.howBaking.map((s, i) =>
            <div key={i} className="hf-baking-step">
                <div className="hf-step-num hf-step-num-purple">{s.n}</div>
                <p style={{ fontWeight: "400" }}>{s.label}</p>
              </div>
            )}
          </div>

          <PlateMockHi lang={lang} />
        </div>
      </div>
    </section>);

}

function PlateMockHi({ lang }) {
  const isPT = lang === "pt";
  const meta = isPT ? "single · lança em 14.05" : "single · drops 05.14";
  const titleTxt = isPT ? "nome do single" : "song name";
  const artistTxt = isPT ? "artista" : "artist";
  const releaseTxt = isPT ?
  "Algumas linhas sobre a história da música — onde foi gravada, com quem, o que ela significa." :
  "A few lines about the song — where it was recorded, with whom, what it means.";
  const collectLabel = isPT ? "avisar quando lançar" : "notify me on launch";
  const placeholder = isPT ? "seu e-mail" : "your email";
  const fansLabel = isPT ? "248 fãs aguardando o lançamento" : "248 fans waiting for launch";
  const zoomEyebrow = isPT ? "Zoom · área de interação com fãs" : "Zoom · fan interaction area";

  return (
    <div className="hf-plate-showcase">
      {/* Phone with plate inside */}
      <div className="hf-plate-phone-wrap">
        <div className="hf-phone-frame hf-phone-frame-lg">
          <div className="hf-phone-screen">
            <div className="hf-plate-mobile">
              <div className="hf-plate-mobile-meta">{meta}</div>
              <div className="hf-plate-mobile-cover">
                <div className="play"><Icon name="play" size={22} color="white" /></div>
              </div>
              <div className="hf-plate-mobile-title">{titleTxt}</div>
              <div className="hf-plate-mobile-artist">{artistTxt}</div>
              <div className="hf-plate-mobile-release">"{releaseTxt}"</div>

              {/* This block is the "highlighted" zone */}
              <div className="hf-plate-mobile-cta hf-plate-mobile-zone">
                <div className="hf-plate-mobile-input">{placeholder}</div>
                <div className="hf-plate-mobile-button">{collectLabel}</div>
                <div className="hf-plate-mobile-fans">
                  <div className="hf-plate-mobile-fans-avs">
                    <Avatar size={18} idx={0} />
                    <Avatar size={18} idx={2} />
                    <Avatar size={18} idx={4} />
                  </div>
                  <span>+244</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom callout: enlarged fan-interaction detail */}
      <div className="hf-plate-zoom-wrap">
        <svg className="hf-plate-zoom-line" viewBox="0 0 200 200" preserveAspectRatio="none">
          <path d="M 6 160 C 60 160, 90 80, 180 40" stroke="var(--magenta)" strokeWidth="1.5" strokeDasharray="3 5" fill="none" />
        </svg>
        <div className="hf-plate-zoom">
          <span className="hf-eyebrow with-dot">{zoomEyebrow}</span>
          <div className="hf-plate-zoom-form">
            <div className="hf-plate-zoom-input">{placeholder}</div>
            <button className="hf-btn hf-btn-primary hf-plate-zoom-btn">{collectLabel} <Icon name="arrow-right" size={14} /></button>
          </div>
          <div className="hf-plate-zoom-divider" />
          <div className="hf-plate-zoom-fans">
            <div className="hf-plate-zoom-fans-avatars">
              <Avatar size={28} idx={0} />
              <Avatar size={28} idx={2} />
              <Avatar size={28} idx={1} />
              <Avatar size={28} idx={4} />
              <Avatar size={28} idx={3} />
            </div>
            <div className="hf-plate-zoom-fans-text">{fansLabel}</div>
          </div>
        </div>
      </div>
    </div>);

}

// ============================================================
// Audience
// ============================================================
function AudienceHi({ lang }) {
  const c = window.COPY[lang];
  const icons = ["headphones", "mic", "users", "newspaper"];
  return (
    <section className="hf-section">
      <div className="hf-section-title align-left">
        {c.audienceKicker && <span className="hf-eyebrow with-dot">{c.audienceKicker}</span>}
        <h2 className="hf-h2">
          <Headline lines={c.audienceTitle} gradLine={1} />
        </h2>
      </div>
      <div className="hf-audience-grid">
        {c.audiences.map((a, i) =>
        <div key={i} className="hf-aud-card">
            <div className="hf-aud-icon"><Icon name={icons[i]} size={20} /></div>
            <h3>{a.name}</h3>
            <p>{a.desc}</p>
          </div>
        )}
      </div>
    </section>);

}

// ============================================================
// Manifesto
// ============================================================
function ManifestoHi({ lang }) {
  const c = window.COPY[lang];
  const m = c.manifestoBlock;
  return (
    <div className="hf-manifesto-wrap" id="manifesto">
      <div className="hf-manifesto-wave">
        {Array.from({ length: 30 }).map((_, i) =>
        <span key={i} className="bar" style={{ animationDelay: `${i % 10 * 0.18}s` }} />
        )}
      </div>
      <div className="hf-manifesto">
        <span className="hf-eyebrow with-dot">{m.kicker}</span>
        <h2>
          <Headline lines={m.title} gradLine={1} />
        </h2>
        <p className="hf-manifesto-body">{m.body}</p>
      </div>
    </div>);

}

// ============================================================
// Testimonials
// ============================================================
function TestimonialsHi({ lang }) {
  const c = window.COPY[lang];
  return (
    <section className="hf-section">
      <div className="hf-section-title align-left">
        <span className="hf-eyebrow with-dot">{c.testimonialsKicker}</span>
      </div>
      <div className="hf-testimonials-grid">
        {c.testimonials.map((q, i) => {
          // Split "Name · role" -> name and role
          const [name, role] = q.author.split(/\s+·\s+/);
          const initials = (name || "?").slice(0, 1).toUpperCase();
          return (
            <div key={i} className="hf-quote">
              <span className="hf-quote-mark">"</span>
              <p className="hf-quote-text">{q.quote}</p>
              <div className="hf-quote-author">
                <Avatar initials={initials} size={44} idx={i + 1} />
                <div className="info">
                  <span className="name">{name}</span>
                  <span className="role">{role}</span>
                </div>
              </div>
            </div>);

        })}
      </div>
    </section>);

}

// ============================================================
// FAQ
// ============================================================
function FAQHi({ lang }) {
  const c = window.COPY[lang];
  const [open, setOpen] = React.useState(0);
  return (
    <section className="hf-section">
      <div className="hf-section-title">
        <span className="hf-eyebrow with-dot">{c.faqKicker}</span>
      </div>
      <div className="hf-faq-list">
        {c.faq.map((row, i) =>
        <div key={i} className={`hf-faq-row ${open === i ? "open" : ""}`}>
            <button className="hf-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{row.q}</span>
              <span className="hf-faq-toggle">+</span>
            </button>
            <div className="hf-faq-a">{row.a}</div>
          </div>
        )}
      </div>
    </section>);

}

// ============================================================
// Final CTA — role toggle (ouvinte / artista)
// ============================================================
function FinalCTAHi({ lang }) {
  const c = window.COPY[lang];
  const isPT = lang === "pt";
  const [role, setRole] = React.useState("listener");

  const roleLabel = isPT ? "Eu sou" : "I'm";
  const roles = isPT ?
  { listener: "ouvinte", artist: "artista" } :
  { listener: "a listener", artist: "an artist" };
  const placeholder = isPT ?
  { listener: "seu melhor e-mail", artist: "seu e-mail de artista" } :
  { listener: "your best email", artist: "your artist email" };
  const ctaLabel = isPT ?
  { listener: "quero entrar", artist: "falar com vocês" } :
  { listener: "I want in", artist: "let's talk" };

  return (
    <section className="hf-section" id="cta">
      <div className="hf-cta">
        <div className="hf-cta-inner">
          <span className="hf-eyebrow with-dot">{c.finalKicker}</span>
          <h2 className="hf-h2">
            <Headline lines={c.finalTitle} gradLine={2} />
          </h2>
          <p className="hf-cta-sub">{c.finalSub}</p>

          <div className="hf-cta-card">
            <div className="hf-cta-role">
              <span className="hf-cta-role-label">{roleLabel}</span>
              <div className="hf-tabs hf-tabs-inline" role="tablist">
                <button
                  role="tab"
                  aria-selected={role === "listener"}
                  className={`hf-tab ${role === "listener" ? "active" : ""}`}
                  onClick={() => setRole("listener")}>
                  
                  <Icon name="headphones" size={14} /> {roles.listener}
                </button>
                <button
                  role="tab"
                  aria-selected={role === "artist"}
                  className={`hf-tab ${role === "artist" ? "active" : ""}`}
                  onClick={() => setRole("artist")}>
                  
                  <Icon name="mic" size={14} /> {roles.artist}
                </button>
              </div>
            </div>

            <form className="hf-cta-form" onSubmit={(e) => e.preventDefault()}>
              <input className="hf-cta-input" type="email" placeholder={placeholder[role]} />
              <button type="submit" className="hf-btn hf-btn-primary">{ctaLabel[role]} <Icon name="arrow-right" size={16} /></button>
            </form>

            <div className="hf-cta-fineprint">{isPT ? "Sem spam. A gente avisa quando sua vaga chegar." : "No spam. We let you know when your spot is up."}</div>
          </div>
        </div>
      </div>
    </section>);

}

// ============================================================
// Footer
// ============================================================
function FooterHi({ lang }) {
  const c = window.COPY[lang];
  return (
    <footer className="hf-footer">
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Logo size={22} />
      </div>
      <div>{c.footer}</div>
    </footer>);

}

Object.assign(window, {
  NavHi, HeroHi, SliceSection, BakingSection, AudienceHi,
  ManifestoHi, TestimonialsHi, FAQHi, FinalCTAHi, FooterHi
});