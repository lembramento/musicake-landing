// Musicake hi-fi — app shell + tweaks
// Follows wireframe V2 strictly: Hero → Slice → HowSlice → Baking → HowBaking
//                                → Audience → Manifesto → Testimonials → FAQ → CTA

const HIFI_DEFAULTS = /*EDITMODE-BEGIN*/{
  "language": "pt",
  "accent": "magenta",
  "showFAQ": true,
  "showTestimonials": true
}/*EDITMODE-END*/;

function HiFiApp() {
  const [t, setTweak] = useTweaks(HIFI_DEFAULTS);
  const lang = t.language;

  React.useEffect(() => {
    const root = document.documentElement;
    const presets = {
      magenta: ["#FF8B96", "#E94E9D", "#A346C2"],
      sunset:  ["#FFB347", "#FF5E96", "#A346C2"],
      cyan:    ["#7FE7FF", "#5E8EFF", "#A346C2"],
      mint:    ["#7FFFA7", "#5EE0C2", "#5E8EFF"],
    };
    const [c1, c2, c3] = presets[t.accent] || presets.magenta;
    root.style.setProperty("--coral", c1);
    root.style.setProperty("--magenta", c2);
    root.style.setProperty("--purple", c3);
    root.style.setProperty("--grad", `linear-gradient(135deg, ${c1} 0%, ${c2} 48%, ${c3} 100%)`);
  }, [t.accent]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div data-screen-label={`musicake-hifi-${lang}`}>
      <NavHi lang={lang} onScrollTo={scrollTo} />
      <HeroHi lang={lang} onScrollTo={scrollTo} />

      {/* Slice — product + how it works in one section */}
      <SliceSection lang={lang} />

      {/* Baking — product + how it works in one section */}
      <BakingSection lang={lang} />

      <AudienceHi lang={lang} />
      <ManifestoHi lang={lang} />
      {t.showTestimonials && <TestimonialsHi lang={lang} />}
      {t.showFAQ && <FAQHi lang={lang} />}
      <FinalCTAHi lang={lang} />
      <FooterHi lang={lang} />

      <TweaksPanel title="Tweaks">
        <TweakSection label={lang === "pt" ? "idioma" : "language"}>
          <TweakRadio
            label=""
            value={t.language}
            onChange={(v) => setTweak("language", v)}
            options={[{ value: "pt", label: "PT" }, { value: "en", label: "EN" }]}
          />
        </TweakSection>

        <TweakSection label={lang === "pt" ? "paleta do gradiente" : "gradient palette"}>
          <TweakColor
            label=""
            value={t.accent}
            onChange={(v) => setTweak("accent", v)}
            options={[
              ["#FF8B96", "#E94E9D", "#A346C2"],
              ["#FFB347", "#FF5E96", "#A346C2"],
              ["#7FE7FF", "#5E8EFF", "#A346C2"],
              ["#7FFFA7", "#5EE0C2", "#5E8EFF"],
            ]}
          />
        </TweakSection>

        <TweakSection label={lang === "pt" ? "seções extras" : "extra sections"}>
          <TweakToggle
            label={lang === "pt" ? "depoimentos" : "testimonials"}
            value={t.showTestimonials}
            onChange={(v) => setTweak("showTestimonials", v)}
          />
          <TweakToggle
            label="FAQ"
            value={t.showFAQ}
            onChange={(v) => setTweak("showFAQ", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HiFiApp />);
