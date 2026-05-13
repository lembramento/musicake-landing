// 3 variações de storytelling para a landing Musicake.
// Cada variação compõe as mesmas seções em ordens / ênfases diferentes.

function VariationLabel({ id, name, idea }) {
  return (
    <div className="sk-var-label">
      <CapsLabel>variação {id} — {name}</CapsLabel>
      <p className="sk-var-idea">{idea}</p>
    </div>
  );
}

// V1 — Manifesto + produto (próximo do esboço original)
// Fluxo: Manifesto → Produtos → Audiência → Como Slice → Como Baking → CTA
function VariationOne({ c, hookIdx, sliceLayout, sliceFlow, extras }) {
  return (
    <div className="sk-variation">
      <VariationLabel id="01" name="manifesto + produtos"
        idea="Fiel ao esboço original. Começa com a crença, mostra os 2 produtos lado a lado, depois público e mecânicas. Defende o 'porquê' antes do 'o que'." />
      <NavBar c={c} />
      <Hero c={c} hookIdx={hookIdx} />
      <ProductCards c={c} order={["baking", "slice"]} />
      <Audience c={c} />
      <HowSlice c={c} layout={sliceLayout} flow={sliceFlow} />
      <HowBaking c={c} />
      {extras.testimonials && <Testimonials c={c} />}
      {extras.faq && <FAQ c={c} />}
      <FinalCTA c={c} />
      <Footer c={c} />
    </div>
  );
}

// V2 — Demo-first: começa pelo Slice (gancho universal de ouvintes)
// Fluxo: Hero → Slice (produto + como funciona) → Baking (produto + como funciona)
// → Audiência → Manifesto "Music deserves better" → CTA
function VariationTwo({ c, hookIdx, sliceLayout, sliceFlow, extras }) {
  return (
    <div className="sk-variation">
      <VariationLabel id="02" name="demo-first, manifesto no final"
        idea="Mostra Slice rápido (entendimento em 5s), depois Baking com profundidade. Manifesto vem depois como punchline emocional, fechando antes do CTA. Bom para júri que quer ver produto antes de filosofia." />
      <NavBar c={c} />
      <Hero c={c} hookIdx={hookIdx} />

      {/* Slice product + how */}
      <section className="sk-section sk-combo">
        <SketchBox className="sk-combo-card" thick>
          <div className="sk-product-head">
            <HandLabel size={42}>{c.slice.name}</HandLabel>
            <CapsLabel>{c.slice.tag}</CapsLabel>
          </div>
          <p className="sk-product-headline">{c.slice.headline}</p>
          <p className="sk-product-desc">{c.slice.desc}</p>
          <ul className="sk-bullets sk-bullets-row">
            {c.slice.bullets.map((b, i) => <li key={i}><span className="sk-tick">✓</span> {b}</li>)}
          </ul>
        </SketchBox>
      </section>
      <HowSlice c={c} layout={sliceLayout} flow={sliceFlow} />

      {/* Baking product + how */}
      <section className="sk-section sk-combo">
        <SketchBox className="sk-combo-card" thick tilt={0.3}>
          <div className="sk-product-head">
            <HandLabel size={42}>{c.baking.name}</HandLabel>
            <CapsLabel>{c.baking.tag}</CapsLabel>
          </div>
          <p className="sk-product-headline">{c.baking.headline}</p>
          <p className="sk-product-desc">{c.baking.desc}</p>
          <ul className="sk-bullets sk-bullets-row">
            {c.baking.bullets.map((b, i) => <li key={i}><span className="sk-tick">✓</span> {b}</li>)}
          </ul>
        </SketchBox>
      </section>
      <HowBaking c={c} />

      <Audience c={c} />
      <ManifestoBlock c={c} />
      {extras.testimonials && <Testimonials c={c} />}
      {extras.faq && <FAQ c={c} />}
      <FinalCTA c={c} />
      <Footer c={c} />
    </div>
  );
}

// V3 — Two paths: ouvinte vs artista (escolha sua jornada)
// Fluxo: Hero → "Escolha seu lado" (Ouvinte / Artista) → Slice → Baking → Audiência expandida → Manifesto curto → CTA dual
function VariationThree({ c, hookIdx, sliceLayout, sliceFlow, extras }) {
  const isPT = c.nav.listen === "para ouvintes";
  return (
    <div className="sk-variation">
      <VariationLabel id="03" name="dois caminhos: ouvinte vs artista"
        idea="Divide audiência logo após o hero. Cada um vê seu próprio fluxo. Mais segmentado, ótimo pra pitch porque cada juiz se vê em um dos lados. CTA dual no final." />
      <NavBar c={c} />
      <Hero c={c} hookIdx={hookIdx} />

      <section className="sk-section sk-paths">
        <header className="sk-section-head sk-section-head-tight">
          <CapsLabel>{isPT ? "qual é o seu lado?" : "which side are you on?"}</CapsLabel>
          <h2 className="sk-h2"><span className="sk-h2-line">{isPT ? "Dois caminhos. Uma mesma crença." : "Two paths. One same belief."}</span></h2>
        </header>
        <div className="sk-paths-grid">
          <SketchBox className="sk-path-card" thick tilt={-0.6}>
            <CapsLabel>{isPT ? "ouço música" : "I listen"}</CapsLabel>
            <HandLabel size={36}>Slice →</HandLabel>
            <p>{isPT ? "Compartilhe e receba música sem se importar com plataforma." : "Share and receive music without caring about which platform."}</p>
            <span className="sk-path-link"><HandLabel size={18}>{isPT ? "ver como funciona ↓" : "see how it works ↓"}</HandLabel></span>
          </SketchBox>
          <SketchBox className="sk-path-card" thick tilt={0.7}>
            <CapsLabel>{isPT ? "lanço música" : "I release"}</CapsLabel>
            <HandLabel size={36}>Baking →</HandLabel>
            <p>{isPT ? "Lance com menos fricção e conexão direta com seus fãs." : "Release with less friction and a direct line to your fans."}</p>
            <span className="sk-path-link"><HandLabel size={18}>{isPT ? "ver como funciona ↓" : "see how it works ↓"}</HandLabel></span>
          </SketchBox>
        </div>
      </section>

      <HowSlice c={c} layout={sliceLayout} flow={sliceFlow} />
      <HowBaking c={c} />
      <Audience c={c} />
      <ManifestoBlock c={c} />
      {extras.testimonials && <Testimonials c={c} />}
      {extras.faq && <FAQ c={c} />}
      <FinalCTA c={c} />
      <Footer c={c} />
    </div>
  );
}

window.VariationOne = VariationOne;
window.VariationTwo = VariationTwo;
window.VariationThree = VariationThree;
