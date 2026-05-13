// Musicake hi-fi — mockup art for the "how it works" sections.
// Clean design-system style (not imitating Spotify/Apple).

function PlatformSwatch({ name }) {
  const colors = {
    "Spotify": "linear-gradient(135deg, #1DB954, #169c46)",
    "Apple Music": "linear-gradient(135deg, #FA2D48, #c01b32)",
    "Deezer": "linear-gradient(135deg, #A238FF, #6e1ec4)",
    "YouTube Music": "linear-gradient(135deg, #FF0033, #c8002a)",
    "Tidal": "linear-gradient(135deg, #ffffff, #b3b3b3)",
    "SoundCloud": "linear-gradient(135deg, #FF5500, #c84300)",
  };
  return <span className="swatch" style={{ background: colors[name] || "#666" }} />;
}

// ============================================================
// Universal link card (used in Slice product visual)
// ============================================================
function UniversalLinkCard() {
  return (
    <div className="hf-mock">
      <div className="hf-link-card-floating hf-link-card-floating-1">
        <div className="av" style={{ backgroundImage: `url("${(window.AVATAR_PHOTOS || [])[0]}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <span>Marina te mandou uma música</span>
      </div>
      <div className="hf-link-card">
        <div className="hf-link-card-head">
          <div className="hf-link-cover" />
          <div className="hf-link-meta">
            <div className="hf-link-title">nome da música</div>
            <div className="hf-link-artist">artista · single</div>
          </div>
        </div>
        <div className="hf-link-url">
          <div className="hf-link-url-text">musicake.io/s/<strong>k7p2-ah</strong></div>
          <div className="hf-link-copy">copiar</div>
        </div>
        <div className="hf-link-platforms">
          <div className="hf-link-platform">
            <PlatformSwatch name="Spotify" />
            <span className="name">Spotify</span>
            <span className="check">✓</span>
          </div>
          <div className="hf-link-platform">
            <PlatformSwatch name="Apple Music" />
            <span className="name">Apple Music</span>
            <span className="check">✓</span>
          </div>
          <div className="hf-link-platform">
            <PlatformSwatch name="Deezer" />
            <span className="name">Deezer</span>
            <span className="check">✓</span>
          </div>
          <div className="hf-link-platform">
            <PlatformSwatch name="YouTube Music" />
            <span className="name">YT Music</span>
            <span className="check">✓</span>
          </div>
        </div>
      </div>
      <div className="hf-link-card-floating hf-link-card-floating-2">
        <span>abre na sua plataforma ↗</span>
      </div>
    </div>
  );
}

// ============================================================
// Step mock — mobile (share flow)
// ============================================================
function MobileStepArt({ step }) {
  if (step === 1) {
    // Player with share highlight
    return (
      <div className="mock mock-player">
        <div className="mock-player-art" />
        <div className="mock-player-meta">
          <div className="mock-line w70" />
          <div className="mock-line w40" />
        </div>
        <div className="mock-player-controls">
          <span>‹‹</span><span className="mock-play">▶</span><span>››</span>
        </div>
        <div className="mock-share-highlight">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
        </div>
      </div>
    );
  }
  if (step === 2) {
    // Share sheet
    return (
      <div className="mock mock-sheet">
        <div className="mock-sheet-title">compartilhar via</div>
        <div className="mock-sheet-grid">
          <div className="mock-sheet-app"><div className="mock-sheet-app-icon" style={{ background: "#1DB954" }}>♫</div><span>App</span></div>
          <div className="mock-sheet-app musicake-highlight">
            <div className="mock-sheet-app-icon" style={{ background: "linear-gradient(135deg, #FF8B96, #E94E9D, #A346C2)" }}>▶</div>
            <span>Musicake</span>
          </div>
          <div className="mock-sheet-app"><div className="mock-sheet-app-icon" style={{ background: "#25D366" }}>w</div><span>WhatsApp</span></div>
          <div className="mock-sheet-app"><div className="mock-sheet-app-icon" style={{ background: "#0084FF" }}>m</div><span>Messages</span></div>
        </div>
      </div>
    );
  }
  // step 3 — universal link result
  return (
    <div className="mock mock-link">
      <div className="mock-link-cover" />
      <div className="mock-link-row">
        <span>Spotify</span><span className="mock-check">✓</span>
      </div>
      <div className="mock-link-row">
        <span>Apple Music</span><span className="mock-check">✓</span>
      </div>
      <div className="mock-link-row">
        <span>Deezer</span><span className="mock-check">✓</span>
      </div>
      <div className="mock-link-row">
        <span>YouTube Music</span><span className="mock-check">✓</span>
      </div>
    </div>
  );
}

// ============================================================
// Step mock — desktop (extension flow)
// ============================================================
function DesktopStepArt({ step }) {
  if (step === 1) {
    // Extension store card
    return (
      <div className="mock mock-ext-store">
        <div className="mock-browser-chrome">
          <span /><span /><span /><div className="mock-browser-url">chrome web store</div>
        </div>
        <div className="mock-ext-card">
          <div className="mock-ext-icon">
            <img src="assets/musicake_simbol.png" alt="" width="22" height="26" style={{display:'block'}} />
          </div>
          <div className="mock-ext-info">
            <div className="mock-ext-name">Musicake</div>
            <div className="mock-ext-sub">universal music sharing</div>
          </div>
          <div className="mock-ext-add">+ adicionar</div>
        </div>
      </div>
    );
  }
  if (step === 2) {
    // Browser with platform player + musicake icon highlighted
    return (
      <div className="mock mock-platform-listening">
        <div className="mock-browser-chrome">
          <span /><span /><span /><div className="mock-browser-url">tocando agora</div>
        </div>
        <div className="mock-platform-player">
          <div className="mock-platform-cover" />
          <div className="mock-platform-info">
            <div className="mock-line w60" />
            <div className="mock-line w40" />
            <div className="mock-platform-progress"><div className="mock-platform-progress-fill" /></div>
          </div>
          <div className="mock-platform-actions">
            <span className="mock-platform-act">♡</span>
            <span className="mock-musicake-icon" title="Musicake">
              <img src="assets/musicake_simbol.png" alt="" width="14" height="16" style={{display:'block'}} />
            </span>
          </div>
        </div>
        <div className="mock-musicake-tip">↑ clique aqui</div>
      </div>
    );
  }
  // step 3 — link generated popup
  return (
    <div className="mock mock-link-generated">
      <div className="mock-browser-chrome">
        <span /><span /><span /><div className="mock-browser-url">link pronto</div>
      </div>
      <div className="mock-popup">
        <div className="mock-popup-head">
          <div className="mock-popup-icon">
            <img src="assets/musicake_simbol.png" alt="" width="14" height="16" style={{display:'block'}} />
          </div>
          <span>link universal pronto</span>
        </div>
        <div className="mock-popup-url">musicake.io/s/k7p2-ah</div>
        <div className="mock-popup-copy">copiar ⎘</div>
      </div>
    </div>
  );
}

Object.assign(window, { UniversalLinkCard, MobileStepArt, DesktopStepArt, PlatformSwatch });
