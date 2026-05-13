// Musicake landing — wireframe app
// Combina 3 variações de storytelling + tweaks (variação, idioma, hero hook, layout slice, extras)

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "variation": "v2",
  "language": "pt",
  "heroHook": 0,
  "sliceLayout": "phones",
  "sliceFlow": "mobile",
  "showTestimonials": true,
  "showFAQ": false,
  "viewMode": "single"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const c = window.COPY[t.language] || window.COPY.pt;

  const variations = [
    { id: "v1", label: "manifesto", num: "01" },
    { id: "v2", label: "demo-first", num: "02" },
    { id: "v3", label: "dois caminhos", num: "03" },
  ];

  const sliceLayouts = [
    { id: "phones", label: t.language === "pt" ? "3 celulares" : "3 phones" },
    { id: "stack", label: t.language === "pt" ? "lista vertical" : "vertical list" },
    { id: "wide", label: t.language === "pt" ? "passos + 1 mock" : "steps + 1 mock" },
  ];

  const extras = {
    testimonials: t.showTestimonials,
    faq: t.showFAQ,
  };

  const renderVariation = (id) => {
    const common = { c, hookIdx: t.heroHook, sliceLayout: t.sliceLayout, sliceFlow: t.sliceFlow, extras };
    if (id === "v1") return <VariationOne key="v1" {...common} />;
    if (id === "v2") return <VariationTwo key="v2" {...common} />;
    if (id === "v3") return <VariationThree key="v3" {...common} />;
    return null;
  };

  const sectionLabels = ["01 hero", "02 produtos", "03 público", "04 como funciona slice", "05 como funciona baking", "06 cta final"];

  return (
    <div className="sk-variations-stage" data-screen-label={`musicake-${t.variation}-${t.language}`}>
      {/* Top toolbar */}
      <div className="sk-var-tabs">
        <div className="sk-var-tabs-inner">
          <span className="sk-caps" style={{ marginRight: 12 }}>variações →</span>
          {variations.map(v => (
            <button
              key={v.id}
              className={`sk-var-tab ${t.variation === v.id ? "active" : ""}`}
              onClick={() => setTweak("variation", v.id)}
            >
              <span className="var-num">{v.num}</span> {v.label}
            </button>
          ))}
          <button
            className={`sk-var-tab ${t.viewMode === "all" ? "active" : ""}`}
            onClick={() => setTweak("viewMode", t.viewMode === "all" ? "single" : "all")}
            style={{ marginLeft: 8 }}
          >
            {t.viewMode === "all" ? "ver uma" : "ver todas lado a lado"}
          </button>
        </div>
        <div className="sk-tabs-side">
          <button
            className={`sk-lang-toggle ${t.language === "pt" ? "active" : ""}`}
            onClick={() => setTweak("language", "pt")}
          >PT</button>
          <button
            className={`sk-lang-toggle ${t.language === "en" ? "active" : ""}`}
            onClick={() => setTweak("language", "en")}
          >EN</button>
        </div>
      </div>

      {/* Stage */}
      {t.viewMode === "single" ? (
        <div>{renderVariation(t.variation)}</div>
      ) : (
        <div>
          {variations.map(v => renderVariation(v.id))}
        </div>
      )}

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label={t.language === "pt" ? "storytelling" : "storytelling"}>
          <TweakRadio
            label={t.language === "pt" ? "variação" : "variation"}
            value={t.variation}
            onChange={(v) => setTweak("variation", v)}
            options={[
              { value: "v1", label: "01 manifesto" },
              { value: "v2", label: "02 demo-first" },
              { value: "v3", label: "03 dois caminhos" },
            ]}
          />
          <TweakSelect
            label={t.language === "pt" ? "gancho do hero" : "hero hook"}
            value={String(t.heroHook)}
            onChange={(v) => setTweak("heroHook", Number(v))}
            options={[
              { value: "0", label: t.language === "pt" ? "0 · Música boa merece ser compartilhada" : "0 · Good music deserves to be shared" },
              { value: "1", label: t.language === "pt" ? "1 · A música merece uma experiência melhor" : "1 · Music deserves a better experience" },
              { value: "2", label: t.language === "pt" ? "2 · Um link. Todas as plataformas." : "2 · One link. Every platform." },
              { value: "3", label: t.language === "pt" ? "3 · Lance sua música como um evento" : "3 · Release your music like an event" },
            ]}
          />
        </TweakSection>

        <TweakSection label={t.language === "pt" ? "layouts" : "layouts"}>
          <TweakRadio
            label={t.language === "pt" ? "slice — mobile / desktop" : "slice — mobile / desktop"}
            value={t.sliceFlow}
            onChange={(v) => setTweak("sliceFlow", v)}
            options={[
              { value: "mobile", label: t.language === "pt" ? "celular" : "mobile" },
              { value: "desktop", label: t.language === "pt" ? "navegador" : "browser" },
            ]}
          />
          <TweakRadio
            label={t.language === "pt" ? "como funciona slice" : "how slice works"}
            value={t.sliceLayout}
            onChange={(v) => setTweak("sliceLayout", v)}
            options={sliceLayouts.map(l => ({ value: l.id, label: l.label }))}
          />
        </TweakSection>

        <TweakSection label={t.language === "pt" ? "seções extras" : "extra sections"}>
          <TweakToggle
            label={t.language === "pt" ? "depoimentos" : "testimonials"}
            value={t.showTestimonials}
            onChange={(v) => setTweak("showTestimonials", v)}
          />
          <TweakToggle
            label="FAQ"
            value={t.showFAQ}
            onChange={(v) => setTweak("showFAQ", v)}
          />
        </TweakSection>

        <TweakSection label={t.language === "pt" ? "idioma" : "language"}>
          <TweakRadio
            label=""
            value={t.language}
            onChange={(v) => setTweak("language", v)}
            options={[
              { value: "pt", label: "PT" },
              { value: "en", label: "EN" },
            ]}
          />
        </TweakSection>

        <TweakSection label={t.language === "pt" ? "visualização" : "view"}>
          <TweakRadio
            label=""
            value={t.viewMode}
            onChange={(v) => setTweak("viewMode", v)}
            options={[
              { value: "single", label: t.language === "pt" ? "uma" : "single" },
              { value: "all", label: t.language === "pt" ? "todas" : "all" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
