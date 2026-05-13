// Musicake hi-fi — mockup art for the "how it works" sections.
// Fictional artist for Slice flow: Júlia Bandeira — "Quase manhã"
//   from the EP "Antes do céu clarear" (folk rock).

// ============================================================
// Reusable: album cover with title + artist text overlaid
// ============================================================
function AlbumCover({ size = "lg", style = {}, className = "" }) {
  return (
    <div className={`mock-cover mock-cover-${size} ${className}`} style={style}>
      <div className="mock-cover-art" />
      <div className="mock-cover-text">
        <div className="mock-cover-title">QUASE&nbsp;MANHÃ</div>
        <div className="mock-cover-artist">JÚLIA BANDEIRA</div>
      </div>
    </div>
  );
}

function PlatformDot({ color, char }) {
  return <span className="mock-plat-dot" style={{ background: color }}>{char}</span>;
}

// ============================================================
// Step mock — mobile (share flow)
// ============================================================
function MobileStepArt({ step }) {
  if (step === 1) {
    // Player screen with full info
    return (
      <div className="mock mock-player2">
        <div className="mock-mob-statusbar">
          <span>09:41</span>
          <span className="bars">●●●●</span>
        </div>
        <div className="mock-mob-topbar">
          <span>▾</span>
          <span className="mock-mob-topbar-title">tocando agora</span>
          <span>···</span>
        </div>
        <AlbumCover size="lg" />
        <div className="mock-mob-meta">
          <div className="mock-mob-title">Quase manhã</div>
          <div className="mock-mob-artist">Júlia Bandeira · Antes do céu clarear</div>
        </div>
        <div className="mock-mob-progress">
          <div className="mock-mob-progress-bar"><div className="fill" /></div>
          <div className="mock-mob-progress-times">
            <span>1:24</span>
            <span>3:45</span>
          </div>
        </div>
        <div className="mock-mob-controls">
          <span>♡</span>
          <span>⏮</span>
          <span className="mock-mob-play">▶</span>
          <span>⏭</span>
          <span className="mock-mob-share-hl">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
          </span>
        </div>
      </div>
    );
  }
  if (step === 2) {
    // Share sheet sliding up from bottom — dimmed player behind
    return (
      <div className="mock mock-player2 mock-player-dim">
        <div className="mock-mob-statusbar">
          <span>09:41</span>
          <span className="bars">●●●●</span>
        </div>
        <AlbumCover size="sm" />
        <div className="mock-mob-meta">
          <div className="mock-mob-title">Quase manhã</div>
          <div className="mock-mob-artist">Júlia Bandeira</div>
        </div>

        {/* dim overlay */}
        <div className="mock-sheet-backdrop" />

        {/* share sheet panel at bottom */}
        <div className="mock-sheet2">
          <div className="mock-sheet2-handle" />
          <div className="mock-sheet2-title">compartilhar via</div>
          <div className="mock-sheet2-grid">
            <div className="mock-sheet2-app">
              <PlatformDot color="#1DB954" char="♫" />
              <span>Spotify</span>
            </div>
            <div className="mock-sheet2-app musicake-highlight">
              <span className="mock-sheet2-musicake">
                <img src="assets/musicake_simbol.png" alt="" width="14" height="16" />
              </span>
              <span>Musicake</span>
            </div>
            <div className="mock-sheet2-app">
              <PlatformDot color="#25D366" char="w" />
              <span>WhatsApp</span>
            </div>
            <div className="mock-sheet2-app">
              <PlatformDot color="#0084FF" char="m" />
              <span>Messages</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // step 3 — universal link result
  return (
    <div className="mock mock-link2">
      <div className="mock-mob-statusbar">
        <span>09:41</span>
        <span className="bars">●●●●</span>
      </div>
      <div className="mock-link2-success">
        <span className="mock-link2-check">✓</span>
        <span>link criado</span>
      </div>
      <div className="mock-link2-card">
        <AlbumCover size="xs" />
        <div className="mock-link2-meta">
          <div className="mock-link2-title">Quase manhã</div>
          <div className="mock-link2-artist">Júlia Bandeira</div>
        </div>
      </div>
      <div className="mock-link2-url">
        <span>musicake.io/s/<strong>k7p2-ah</strong></span>
        <span className="mock-link2-copy">copiar</span>
      </div>
      <div className="mock-link2-subtitle">abre em qualquer plataforma</div>
      <div className="mock-link2-platforms">
        <div><PlatformDot color="#1DB954" char="♫" /><span>Spotify</span><span className="mock-check">✓</span></div>
        <div><PlatformDot color="#FA2D48" char="" /><span>Apple Music</span><span className="mock-check">✓</span></div>
        <div><PlatformDot color="#A238FF" char="" /><span>Deezer</span><span className="mock-check">✓</span></div>
        <div><PlatformDot color="#FF0033" char="" /><span>YouTube Music</span><span className="mock-check">✓</span></div>
      </div>
    </div>
  );
}

// ============================================================
// Step mock — desktop (extension flow)
// ============================================================
function DesktopStepArt({ step }) {
  if (step === 1) {
    return (
      <div className="mock mock-ext-store">
        <div className="mock-browser-chrome">
          <span /><span /><span /><div className="mock-browser-url">chrome.google.com/webstore</div>
        </div>
        <div className="mock-ext-hero">
          <div className="mock-ext-icon-lg">
            <img src="assets/musicake_simbol.png" alt="" width="32" height="38" style={{ display: "block" }} />
          </div>
          <div className="mock-ext-info">
            <div className="mock-ext-name">Musicake — universal link</div>
            <div className="mock-ext-sub">compartilhe música em qualquer plataforma</div>
            <div className="mock-ext-stars">★★★★★ <span className="mock-ext-rev">4.9 · 12k usuários</span></div>
          </div>
          <div className="mock-ext-add">+ adicionar</div>
        </div>
      </div>
    );
  }
  if (step === 2) {
    // Browser playing music + musicake icon highlighted
    return (
      <div className="mock mock-platform-listening">
        <div className="mock-browser-chrome">
          <span /><span /><span /><div className="mock-browser-url">spotify.com / quase-manhã</div>
        </div>
        <div className="mock-bp-content">
          <div className="mock-bp-album">
            <AlbumCover size="md" />
          </div>
          <div className="mock-bp-info">
            <div className="mock-bp-eyebrow">tocando agora</div>
            <div className="mock-bp-title">Quase manhã</div>
            <div className="mock-bp-artist">Júlia Bandeira</div>
            <div className="mock-bp-progress"><div className="fill" /></div>
            <div className="mock-bp-times"><span>1:24</span><span>3:45</span></div>
          </div>
          {/* Musicake icon hovering in the player UI */}
          <div className="mock-bp-musicake-wrap">
            <span className="mock-musicake-icon" title="Musicake">
              <img src="assets/musicake_simbol.png" alt="" width="14" height="16" style={{ display: "block" }} />
            </span>
            <div className="mock-musicake-tip">↑ clique aqui</div>
          </div>
        </div>
      </div>
    );
  }
  // step 3 — link generated popup
  return (
    <div className="mock mock-link-generated">
      <div className="mock-browser-chrome">
        <span /><span /><span /><div className="mock-browser-url">spotify.com / quase-manhã</div>
      </div>
      <div className="mock-link3-bg">
        <AlbumCover size="md" className="mock-link3-bg-cover" />
      </div>
      <div className="mock-popup">
        <div className="mock-popup-head">
          <div className="mock-popup-icon">
            <img src="assets/musicake_simbol.png" alt="" width="14" height="16" style={{ display: "block" }} />
          </div>
          <span>link universal pronto</span>
        </div>
        <div className="mock-popup-url">musicake.io/s/k7p2-ah</div>
        <div className="mock-popup-copy">copiar ⎘</div>
      </div>
    </div>
  );
}

// ============================================================
// (legacy export kept for backward compat)
// ============================================================
function UniversalLinkCard() { return null; }

Object.assign(window, { UniversalLinkCard, MobileStepArt, DesktopStepArt, AlbumCover });
