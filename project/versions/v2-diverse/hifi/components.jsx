// Musicake hi-fi — shared primitives
// Logo, icons, scroll-reveal, small UI bits.

const { useState, useEffect, useRef } = React;

// ============================================================
// Logo: brand symbol + wordmark (uses provided PNG assets)
// ============================================================
function PlayCake({ size = 36, glow = false, className = "" }) {
  return (
    <img
      src="assets/musicake_simbol.png"
      alt="Musicake"
      className={`hf-logo-icon ${className}`}
      style={{
        height: size * (240 / 200),
        width: "auto",
        display: "block",
        filter: glow ? "drop-shadow(0 0 24px rgba(233,78,157,0.45))" : undefined,
      }}
    />
  );
}

function Logo({ size = 28, withText = true, className = "" }) {
  if (withText) {
    // Use the full wordmark PNG so we get the real brand lockup.
    // PNG is 1257x233 — preserve that ratio.
    const height = size * 1.05;
    return (
      <a className={`hf-logo ${className}`} href="#top">
        <img
          src="assets/musicake_white.png"
          alt="Musicake"
          style={{ height, width: "auto", display: "block" }}
        />
      </a>
    );
  }
  return <PlayCake size={size} className={className} />;
}

// ============================================================
// Icons (simple inline strokes)
// ============================================================
function Icon({ name, size = 18, color = "currentColor", strokeWidth = 2 }) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "arrow-right":
      return <svg {...props}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case "check":
      return <svg {...props}><path d="M20 6 9 17l-5-5" /></svg>;
    case "play":
      return <svg {...props}><path d="M8 5v14l11-7z" fill={color} stroke="none" /></svg>;
    case "share":
      return <svg {...props}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>;
    case "link":
      return <svg {...props}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>;
    case "users":
      return <svg {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "mic":
      return <svg {...props}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" /></svg>;
    case "headphones":
      return <svg {...props}><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" /><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>;
    case "newspaper":
      return <svg {...props}><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8z" /></svg>;
    case "plus":
      return <svg {...props}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
    case "globe":
      return <svg {...props}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
    case "puzzle":
      return <svg {...props}><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02z" /></svg>;
    case "menu":
      return <svg {...props}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;
    default:
      return null;
  }
}

// ============================================================
// Reveal: fade-in on scroll
// ============================================================
function Reveal({ children, delay = 0, as: As = "div", className = "", ...rest }) {
  // Pure CSS reveal — animation runs on render, no IO/JS needed.
  const cls = `hf-reveal ${delay ? `hf-reveal-delay-${delay}` : ""} ${className}`.trim();
  return <As className={cls} {...rest}>{children}</As>;
}

// ============================================================
// Avatar (photo from Unsplash or initials fallback)
// ============================================================
const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #FF8B96, #E94E9D)",
  "linear-gradient(135deg, #E94E9D, #A346C2)",
  "linear-gradient(135deg, #A346C2, #6B3FB8)",
  "linear-gradient(135deg, #FF8B96, #FFB347)",
  "linear-gradient(135deg, #6B3FB8, #4D7FE8)",
  "linear-gradient(135deg, #4D7FE8, #4ECDB8)",
];

// Curated photo URLs (Unsplash — face crops). Diverse mix of ethnicities.
const AVATAR_PHOTOS = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=200&h=200&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=200&h=200&fit=crop&crop=faces",
];

function Avatar({ initials = "M", size = 36, idx = 0, photo = true, style = {} }) {
  if (photo) {
    return (
      <div
        style={{
          width: size, height: size,
          borderRadius: "50%",
          background: `${AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length]} center/cover`,
          backgroundImage: `url("${AVATAR_PHOTOS[idx % AVATAR_PHOTOS.length]}"), ${AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length]}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          ...style,
        }}
        aria-label={initials}
      />
    );
  }
  return (
    <div
      style={{
        width: size, height: size,
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "white", fontWeight: 700, fontSize: size * 0.4,
        background: AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length],
        ...style,
      }}
    >{initials}</div>
  );
}

// ============================================================
// Tiny scroll listener to add 'is-scrolled' on nav
// ============================================================
function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

Object.assign(window, { PlayCake, Logo, Icon, Reveal, Avatar, useScrolled, AVATAR_GRADIENTS, AVATAR_PHOTOS });
