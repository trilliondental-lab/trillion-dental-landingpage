"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const disciplines = [
  ["01", "Fit", "Clean margins and contacts for a better fit."],
  ["02", "Function", "Designed for the patient’s bite and movement."],
  ["03", "Strength", "The right material and thickness for each case."],
  ["04", "Looks", "Natural shape, shade and surface finish."],
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
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setLoaded(true);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    const updateHero = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      const schematic = Math.min(1, Math.max(0, (progress - .34) / .58));
      heroRef.current.style.setProperty("--hero-progress", progress.toFixed(3));
      heroRef.current.style.setProperty("--schematic", schematic.toFixed(3));
    };
    updateHero();
    window.addEventListener("scroll", updateHero, { passive: true });
    window.addEventListener("resize", updateHero);
    return () => { observer.disconnect(); window.removeEventListener("scroll", updateHero); window.removeEventListener("resize", updateHero); };
  }, []);

  return (
    <main id="top" className={loaded ? "loaded" : ""}>
      <header className="nav-shell">
        <BrandMark />
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          <span /><span />
        </button>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          <a href="#precision" onClick={() => setMenuOpen(false)}>Zirconia</a>
          <a href="#workflow" onClick={() => setMenuOpen(false)}>Workflow</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Other services</a>
          <a href="#why" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
        <a className="nav-cta" href="#contact">Send a case <span>↗</span></a>
      </header>

      <section className="hero-scroll" ref={heroRef}>
       <div className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">The zirconia laboratory</p>
          <h1><span>Zirconia.</span><span className="gold-line">Perfected.</span></h1>
          <p className="hero-intro">We make zirconia crowns and bridges that fit well, look natural and last.</p>
          <div className="hero-actions">
            <a className="button gold" href="#contact">Send your zirconia case <span>→</span></a>
            <a className="text-link" href="#precision">Explore the process <span>↓</span></a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="crown-stage">
            <Image className="crown-photo" src="/crown-hero-v2.png" alt="Realistic white zirconia molar crown" width={1500} height={1049} priority />
            <Image className="crown-scan" src="/crown-hero-v2.png" alt="" width={1500} height={1049} aria-hidden="true" />
            <div className="scan-line" aria-hidden="true" />
            <div className="schematic-box box-a"><span>MARGIN</span><b>01</b></div>
            <div className="schematic-box box-b"><span>CONTACT</span><b>02</b></div>
            <div className="schematic-box box-c"><span>OCCLUSION</span><b>03</b></div>
            <div className="schematic-box box-d"><span>ANATOMY</span><b>04</b></div>
          </div>
          <div className="measure measure-a"><span>01</span> MARGIN INTEGRITY</div>
          <div className="measure measure-b"><span>02</span> ANATOMY</div>
          <div className="measure measure-c"><span>03</span> OCCLUSION</div>
          <div className="model-tag">TRILLION / ZR—01<small>MULTILAYER ZIRCONIA · CAD/CAM</small></div>
        </div>
        <div className="hero-status"><span>Scroll view</span><strong>3D</strong><span>Photo → Scan</span></div>
        <div className="scroll-cue">Scroll to scan <i /></div>
       </div>
      </section>

      <section id="precision" className="precision section-pad">
        <div className="section-heading reveal">
          <p className="eyebrow">Built around one material</p>
          <h2>Made to fit.<br /><em>Made to work.</em></h2>
          <p>We check every crown for fit, bite, strength and looks before it leaves our lab.</p>
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
          <div><p className="eyebrow">How we make your case</p><h2>A clear digital<br />workflow.</h2></div>
          <p>From your scan to final checking, each step is handled by our team.</p>
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
          <h2>Choose the right<br />zirconia.</h2>
          <p>We match the strength, colour and translucency to each case.</p>
          <div className="material-tabs">
            <div className="material-tab"><span>MONOLAYER</span><strong>More strength</strong><p>A strong, single-shade zirconia for posterior and long-span cases.</p></div>
            <div className="material-tab active"><span>MULTILAYER</span><strong>More natural</strong><p>A built-in shade and translucency change from the gum line to the biting edge.</p></div>
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
        <div className="cases-head reveal"><div><p className="eyebrow">Our work</p><h2>Zirconia cases<br />from our lab.</h2></div><p>Single crowns, bridges and full-arch work made for a natural fit and finish.</p></div>
        <div className="case-grid">
          {cases.map((item) => <article className={`case-card ${item.cls} reveal`} key={item.id}>
            <div className="case-art"><span className="case-tooth">{item.id === "03" ? "◡◡◡" : item.id === "02" ? "◡◡" : "◡"}</span><i /></div>
            <div className="case-meta"><span>{item.id} / {item.type}</span><h3>{item.title}</h3><p>{item.meta}</p></div>
          </article>)}
        </div>
      </section>

      <section id="services" className="capabilities section-pad">
        <div className="cap-title reveal"><p className="eyebrow">Other lab services</p><h2>Zirconia first.<br />Full lab support.</h2><p className="cap-intro">Zirconia is our main focus, but you can send us your other dental cases too.</p></div>
        <div className="cap-list reveal">
          {["Zirconia crowns & bridges", "PFM crowns", "Acrylic dentures", "Flexible dentures", "3D printed appliances", "Orthodontic appliances", "Other dental cases"].map((x, i) => <div key={x}><span>0{i + 1}</span><strong>{x}</strong><b>↗</b></div>)}
        </div>
      </section>

      <section id="why" className="why section-pad">
        <div className="why-orbit reveal"><span className="orbit-ring ring-a" /><span className="orbit-ring ring-b" /><strong>T</strong><small>ZIRCONIA<br />SPECIALIST</small></div>
        <div className="why-copy reveal">
          <p className="eyebrow">Why Trillion</p><h2>Simple service.<br />Reliable work.</h2>
          <p className="why-lead">We focus on good fit, clear communication and steady turnaround.</p>
          <div className="why-points">
            <div><span>01</span><p><strong>Zirconia experience</strong>Our process is built around zirconia from design to final finish.</p></div>
            <div><span>02</span><p><strong>Talk to our team</strong>Speak directly with the technicians working on your case.</p></div>
            <div><span>03</span><p><strong>Reliable turnaround</strong>Clear checks and steady delivery for every case.</p></div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact section-pad">
        <div className="contact-grid" aria-hidden="true" />
        <p className="eyebrow reveal">Ready to send a case?</p>
        <h2 className="reveal">Send your<br /><em>zirconia case.</em></h2>
        <p className="reveal">Send your scan and prescription. Our team will take care of the rest.</p>
        <div className="contact-actions reveal"><a className="button gold" href="mailto:cases@trilliondentallab.com">Start a digital case <span>↗</span></a><a className="button outline" href="tel:+6500000000">Speak to the lab</a></div>
      </section>

      <footer>
        <BrandMark /><p>Zirconia crown &amp; bridge specialists.</p><div><a href="#precision">Expertise</a><a href="#workflow">Workflow</a><a href="#cases">Cases</a></div><span>© {new Date().getFullYear()} Trillion Dental Lab</span>
      </footer>
    </main>
  );
}
