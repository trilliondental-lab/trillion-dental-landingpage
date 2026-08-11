"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CrownScene = dynamic(() => import("./CrownScene"), { ssr: false });

const disciplines = [
  ["01", "Fit", "Digitally refined margins, calibrated contacts and seating you can trust."],
  ["02", "Function", "Occlusion designed around the patient—not a generic anatomy library."],
  ["03", "Strength", "Material and connector decisions matched to the indication."],
  ["04", "Aesthetics", "Natural contours, surface texture and shade transitions, finished by hand."],
];

const workflow = [
  ["01", "Scan", "STL / PLY / IOS"],
  ["02", "CAD Design", "Margin to anatomy"],
  ["03", "Mill", "5-axis precision"],
  ["04", "Sinter", "Controlled cycle"],
  ["05", "Finish", "Texture & character"],
  ["06", "QC", "Fit. Form. Function."],
];

const cases = [
  { id: "01", type: "Anterior", title: "Single Central", meta: "Multilayer · A2", cls: "case-one" },
  { id: "02", type: "Posterior", title: "Three-unit Bridge", meta: "High-strength · A3", cls: "case-two" },
  { id: "03", type: "Full Arch", title: "12-unit Zirconia", meta: "Multilayer · BL3", cls: "case-three" },
];

function BrandMark() {
  return <a className="brand" href="#top" aria-label="Trillion Dental Lab home"><span className="brand-mark">T</span><span>TRILLION<small>DENTAL LAB</small></span></a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main id="top" className={loaded ? "loaded" : ""}>
      <header className="nav-shell">
        <BrandMark />
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          <span /><span />
        </button>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          <a href="#precision" onClick={() => setMenuOpen(false)}>Expertise</a>
          <a href="#workflow" onClick={() => setMenuOpen(false)}>Workflow</a>
          <a href="#cases" onClick={() => setMenuOpen(false)}>Cases</a>
          <a href="#why" onClick={() => setMenuOpen(false)}>Why Trillion</a>
        </nav>
        <a className="nav-cta" href="#contact">Send a case <span>↗</span></a>
      </header>

      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">The zirconia laboratory</p>
          <h1><span>Zirconia.</span><span className="gold-line">Perfected.</span></h1>
          <p className="hero-intro">Digital zirconia crowns &amp; bridges engineered for precision, strength and natural aesthetics.</p>
          <div className="hero-actions">
            <a className="button gold" href="#contact">Send your zirconia case <span>→</span></a>
            <a className="text-link" href="#precision">Explore the process <span>↓</span></a>
          </div>
        </div>
        <div className="hero-visual">
          <CrownScene />
          <div className="measure measure-a"><span>01</span> MARGIN INTEGRITY</div>
          <div className="measure measure-b"><span>02</span> ANATOMY</div>
          <div className="measure measure-c"><span>03</span> OCCLUSION</div>
          <div className="model-tag">TRILLION / ZR—01<small>MULTILAYER ZIRCONIA · CAD/CAM</small></div>
        </div>
        <div className="hero-status"><span>Precision protocol</span><strong>20μm</strong><span>Design tolerance</span></div>
        <div className="scroll-cue">Scroll to inspect <i /></div>
      </section>

      <section id="precision" className="precision section-pad">
        <div className="section-heading reveal">
          <p className="eyebrow">Built around one material</p>
          <h2>Not just a crown.<br /><em>A restoration engineered to fit.</em></h2>
          <p>Every zirconia case is shaped by four disciplines. Each one is considered, measured and checked before it leaves our laboratory.</p>
        </div>
        <div className="discipline-grid">
          {disciplines.map(([num, title, copy]) => (
            <article className="discipline reveal" key={title}>
              <span>{num}</span><div className="discipline-icon">{title === "Fit" ? "⌖" : title === "Function" ? "∿" : title === "Strength" ? "◇" : "✦"}</div>
              <h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="workflow" className="workflow section-pad">
        <div className="workflow-head reveal">
          <div><p className="eyebrow">Digital from start to finish</p><h2>One controlled<br />workflow.</h2></div>
          <p>Your scan enters a connected production chain. No handoff disappears into a black box; every stage builds toward a predictable seat.</p>
        </div>
        <div className="workflow-track">
          {workflow.map(([num, title, meta], i) => (
            <article className="workflow-step reveal" key={title} style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}>
              <span className="step-num">{num}</span><div className="step-node">{i === workflow.length - 1 ? "✓" : "•"}</div><h3>{title}</h3><p>{meta}</p>
            </article>
          ))}
        </div>
        <div className="workflow-note reveal"><span>SCAN RECEIVED</span><i /><span>CASE VERIFIED</span></div>
      </section>

      <section className="material section-pad">
        <div className="material-copy reveal">
          <p className="eyebrow">Material intelligence</p>
          <h2>The right zirconia<br />for the right case.</h2>
          <p>We choose opacity, translucency and strength around the clinical indication—not convenience.</p>
          <div className="material-tabs">
            <div className="material-tab"><span>MONOLAYER</span><strong>Maximum strength</strong><p>A single, consistent high-strength formulation for demanding posterior and long-span indications.</p></div>
            <div className="material-tab active"><span>MULTILAYER</span><strong>Natural transition</strong><p>Integrated shade and translucency gradients for restorations that move naturally from cervical to incisal.</p></div>
          </div>
        </div>
        <div className="layer-visual reveal" aria-label="Multilayer zirconia shade visualization">
          <div className="layer layer-1"><span>INCISAL</span><b>Translucency</b></div>
          <div className="layer layer-2"><span>TRANSITION</span><b>Balance</b></div>
          <div className="layer layer-3"><span>CERVICAL</span><b>Chroma</b></div>
          <div className="layer-core"><span>5Y MULTILAYER</span><strong>ZR—ML</strong></div>
        </div>
      </section>

      <section id="cases" className="cases section-pad">
        <div className="cases-head reveal"><div><p className="eyebrow">Selected work</p><h2>Real cases.<br />Resolved beautifully.</h2></div><p>From single units to full-arch restorations, our zirconia work is built to disappear in the mouth—and perform.</p></div>
        <div className="case-grid">
          {cases.map((item) => <article className={`case-card ${item.cls} reveal`} key={item.id}>
            <div className="case-art"><span className="case-tooth">{item.id === "03" ? "◡◡◡" : item.id === "02" ? "◡◡" : "◡"}</span><i /></div>
            <div className="case-meta"><span>{item.id} / {item.type}</span><h3>{item.title}</h3><p>{item.meta}</p></div>
          </article>)}
        </div>
      </section>

      <section className="capabilities section-pad">
        <div className="cap-title reveal"><p className="eyebrow">Crown &amp; bridge capabilities</p><h2>One specialist.<br />Every zirconia indication.</h2></div>
        <div className="cap-list reveal">
          {["Single crowns", "Multi-unit bridges", "Full-contour zirconia", "Layered zirconia", "Implant-supported crowns", "Full-arch restorations"].map((x, i) => <div key={x}><span>0{i + 1}</span><strong>{x}</strong><b>↗</b></div>)}
        </div>
      </section>

      <section id="why" className="why section-pad">
        <div className="why-orbit reveal"><span className="orbit-ring ring-a" /><span className="orbit-ring ring-b" /><strong>T</strong><small>ZIRCONIA<br />SPECIALIST</small></div>
        <div className="why-copy reveal">
          <p className="eyebrow">Why Trillion</p><h2>Specialism creates<br />consistency.</h2>
          <p className="why-lead">We built our laboratory around zirconia so your team gets a repeatable standard—not a different result every case.</p>
          <div className="why-points">
            <div><span>01</span><p><strong>Material-led expertise</strong>Protocols shaped around zirconia, from design through sintering and finishing.</p></div>
            <div><span>02</span><p><strong>Direct technician access</strong>Clear communication with the people actually designing your restoration.</p></div>
            <div><span>03</span><p><strong>Predictable delivery</strong>A controlled workflow, documented QC and dependable turnaround.</p></div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact section-pad">
        <div className="contact-grid" aria-hidden="true" />
        <p className="eyebrow reveal">Your next case starts here</p>
        <h2 className="reveal">Send your<br /><em>zirconia case.</em></h2>
        <p className="reveal">Upload your scan, share your prescription, and let our zirconia team take it from there.</p>
        <div className="contact-actions reveal"><a className="button gold" href="mailto:cases@trilliondentallab.com">Start a digital case <span>↗</span></a><a className="button outline" href="tel:+6500000000">Speak to the lab</a></div>
      </section>

      <footer>
        <BrandMark /><p>Zirconia crown &amp; bridge specialists.</p><div><a href="#precision">Expertise</a><a href="#workflow">Workflow</a><a href="#cases">Cases</a></div><span>© {new Date().getFullYear()} Trillion Dental Lab</span>
      </footer>
    </main>
  );
}
