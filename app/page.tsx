"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CASE_SUBMISSION_URL = "https://wa.me/601113348503";

const disciplines = [
  ["01", "Fit", "Clean margins and contacts for a better fit."],
  ["02", "Function", "Designed for the patient’s bite and movement."],
  ["03", "Strength", "The right material and thickness for each case."],
  ["04", "Looks", "Natural shape, shade and surface finish."],
];

const workflow = [
  ["01", "Case Received", "Scan / Model / Impression"],
  ["02", "CAD Design", "Margin to anatomy"],
  ["03", "Mill", "5-axis precision"],
  ["04", "Sinter", "Controlled cycle"],
  ["05", "QC 1", "Fit and structure"],
  ["06", "Finish", "Texture and colour"],
  ["07", "QC 2", "Final check and pack"],
];

const cases = [
  { id: "01", type: "Anterior", title: "Single Central Crown", meta: "Anterior · Single unit", image: "case-image-one", description: "A single central crown shaped and finished to blend naturally with the neighbouring teeth." },
  { id: "02", type: "Posterior", title: "Four-unit Bridge", meta: "Posterior · Bridge", image: "case-image-two", description: "A four-unit posterior bridge designed with strong connectors, stable contacts and natural occlusal anatomy." },
  { id: "03", type: "Anterior", title: "Three-unit Anterior Bridge", meta: "Anterior · Gingival contour", image: "case-image-three", description: "A three-unit anterior bridge with a shaped gingival contour for a natural emergence and smile-line appearance." },
];

function BrandMark() {
  return <a className="brand" href="#top" aria-label="Trillion Dental Lab home">
    <Image className="brand-logo" src="/trillion-mark-v1.png" alt="" width={120} height={86} />
    <span>TRILLION<small>DENTAL LAB</small></span>
  </a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [materialMode, setMaterialMode] = useState<"mono" | "multi">("multi");
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [crownRotation, setCrownRotation] = useState({ x: -4, y: -7 });
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
    const closeModal = (event: KeyboardEvent) => event.key === "Escape" && setSelectedCase(null);
    updateHero();
    window.addEventListener("scroll", updateHero, { passive: true });
    window.addEventListener("resize", updateHero);
    window.addEventListener("keydown", closeModal);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateHero);
      window.removeEventListener("resize", updateHero);
      window.removeEventListener("keydown", closeModal);
    };
  }, []);

  return (
    <main id="top" className={loaded ? "loaded" : ""}>
      <header className="nav-shell">
        <BrandMark />
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}><span /><span /></button>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          <a href="#precision" onClick={() => setMenuOpen(false)}>Zirconia</a>
          <a href="#workflow" onClick={() => setMenuOpen(false)}>Workflow</a>
          <a href="#tracking" onClick={() => setMenuOpen(false)}>Case tracking</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Other services</a>
        </nav>
        <a className="mobile-contact-cta" href={CASE_SUBMISSION_URL} target="_blank" rel="noreferrer">Contact us now</a>
        <a className="nav-cta" href={CASE_SUBMISSION_URL} target="_blank" rel="noreferrer">Send a case <span>↗</span></a>
      </header>

      <section className="hero-scroll" ref={heroRef}>
        <div className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">Malaysia&apos;s No.1 Zirconia Laboratory</p>
            <h1><span>Zirconia.</span><span className="gold-line">Perfected.</span></h1>
            <p className="hero-intro">We make zirconia crowns and bridges that fit well, look natural and last.</p>
            <div className="hero-actions">
              <a className="button gold" href={CASE_SUBMISSION_URL} target="_blank" rel="noreferrer">Send your zirconia case <span>↗</span></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="crown-stage">
              <Image className="crown-photo" src="/crown-hero-v2.png" alt="Realistic white zirconia molar crown" width={1500} height={1049} priority />
              <Image className="crown-scan" src="/crown-hero-v2.png" alt="" width={1500} height={1049} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section id="precision" className="precision section-pad">
        <div className="precision-title reveal">
          <p className="eyebrow">What we check</p>
          <h2>Four checks.<br /><em>One better crown.</em></h2>
          <p>Every crown is checked for fit, bite, strength and appearance.</p>
        </div>
        <div className="precision-showcase">
          <div
            className="precision-product reveal"
            onPointerMove={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect();
              const x = (event.clientY - bounds.top) / bounds.height - 0.5;
              const y = (event.clientX - bounds.left) / bounds.width - 0.5;
              setCrownRotation({ x: x * -24, y: y * 42 });
            }}
            onPointerLeave={() => setCrownRotation({ x: -4, y: -7 })}
            aria-label="Move across the crown to rotate it"
          >
            <span className="precision-ring ring-one" />
            <Image
              src="/crown-hero-v2.png"
              alt="Interactive zirconia crown shown during quality checking"
              width={1500}
              height={1049}
              style={{ transform: `perspective(900px) rotateX(${crownRotation.x}deg) rotateY(${crownRotation.y}deg)` }}
            />
          </div>
          <div className="discipline-grid upgraded">
            {disciplines.map(([num, title, copy]) => <article className="discipline reveal" key={title}>
              <span>{num}</span><div className="discipline-icon">{title === "Fit" ? "⌖" : title === "Function" ? "∿" : title === "Strength" ? "◇" : "✦"}</div>
              <h3>{title}</h3><p>{copy}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section id="workflow" className="workflow section-pad">
        <div className="workflow-head reveal">
          <div>
            <p className="eyebrow desktop-workflow-title">How we make your case</p>
            <p className="eyebrow mobile-workflow-title">How to send your case</p>
            <h2 className="desktop-workflow-title">A clear digital<br />workflow.</h2>
            <h2 className="mobile-workflow-title">Send your case,<br />your way.</h2>
          </div>
          <p>Every case is checked twice before it is packed and sent to your clinic.</p>
        </div>
        <div className="case-entry reveal">
          <div><span>01</span><strong>Digital Scan</strong><p>Send STL, PLY or IOS files.</p></div>
          <div><span>02</span><strong>Physical Model</strong><p>Send your prepared dental model.</p></div>
          <div><span>03</span><strong>Impression</strong><p>Send a conventional impression to our lab.</p></div>
        </div>
        <div className="workflow-track seven-steps">
          {workflow.map(([num, title, meta], i) => <article className={`workflow-step reveal ${title.startsWith("QC") ? "qc-step" : ""}`} key={title} style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}>
            <span className="step-num">{num}</span><div className="step-node">{title.startsWith("QC") ? "✓" : "•"}</div><h3>{title}</h3><p>{meta}</p>
          </article>)}
        </div>
        <div className="workflow-note reveal"><span>SCAN RECEIVED</span><i /><strong>2× QUALITY CHECK</strong><i /><span>READY TO SEND</span></div>
        <div className="qc-proof reveal">
          <article className="qc-card qc-card-one"><div className="qc-photo" /><div><span>QC 01</span><h3>Technical check</h3><p>We check the fit, margin, contact, bite and strength after production.</p></div></article>
          <article className="qc-card qc-card-two"><div className="qc-photo" /><div><span>QC 02</span><h3>Final check</h3><p>We check the colour, finish, case details and packing before delivery.</p></div></article>
        </div>
      </section>

      <section id="tracking" className="tracking section-pad">
        <div className="tracking-copy reveal">
          <p className="eyebrow">Clinic case tracking</p>
          <h2>Always know where<br />your case is.</h2>
          <p>Clinics can log in to our dedicated website and check every case at any time. See the current stage, expected delivery date and latest update without calling the lab.</p>
          <ul><li><span>✓</span> Live case progress</li><li><span>✓</span> Expected delivery date</li><li><span>✓</span> Updates in one place</li></ul>
          <span className="portal-note">Ask our team for your clinic login.</span>
          <a className="button outline portal-button" href={CASE_SUBMISSION_URL} target="_blank" rel="noreferrer">Open clinic portal <span>↗</span></a>
        </div>
        <div className="portal-window reveal" aria-label="Example of the clinic case tracking website">
          <div className="portal-top"><BrandMark /><span>CLINIC PORTAL</span><b>● LIVE</b></div>
          <div className="portal-summary"><span>Active cases<strong>08</strong></span><span>Ready to send<strong>02</strong></span><span>Due this week<strong>05</strong></span></div>
          <div className="portal-table">
            <div className="portal-row head"><span>CASE</span><span>PATIENT</span><span>STAGE</span><span>DELIVERY</span></div>
            <div className="portal-row"><span>#ZR-1048</span><span>A. Rahman</span><span><i className="status design" />CAD Design</span><span>14 Aug</span></div>
            <div className="portal-row"><span>#ZR-1042</span><span>S. Lim</span><span><i className="status finish" />Finishing</span><span>13 Aug</span></div>
            <div className="portal-row"><span>#ZR-1039</span><span>N. Tan</span><span><i className="status ready" />QC 2</span><span>12 Aug</span></div>
          </div>
          <div className="portal-progress"><span>CASE #ZR-1048</span><div><i /><i className="done" /><i /><i /><i /></div><small>Scan received → CAD design → Production → QC → Delivery</small></div>
        </div>
      </section>

      <section className="material section-pad">
        <div className="material-copy reveal">
          <p className="eyebrow">Zirconia options</p>
          <h2>See the colour<br />difference.</h2>
          <p>Choose an option to see how the colour and translucency change.</p>
          <div className="material-tabs" role="group" aria-label="Choose zirconia type">
            <button className={`material-tab ${materialMode === "mono" ? "active" : ""}`} onClick={() => setMaterialMode("mono")} aria-pressed={materialMode === "mono"}><span>MONOLAYER</span><strong>One even shade</strong><p>Strong and consistent. Often used for posterior and long-span cases.</p></button>
            <button className={`material-tab ${materialMode === "multi" ? "active" : ""}`} onClick={() => setMaterialMode("multi")} aria-pressed={materialMode === "multi"}><span>MULTILAYER</span><strong>Natural shade change</strong><p>Warmer near the gum line and more translucent near the biting surface.</p></button>
          </div>
        </div>
        <div className={`material-photo-view ${materialMode}`}>
          <Image className={`material-product-image ${materialMode === "mono" ? "active" : ""}`} src="/monolayer-zirconia-v1.webp" alt="Monolayer zirconia crown with an even shade" width={900} height={900} loading="eager" />
          <Image className={`material-product-image ${materialMode === "multi" ? "active" : ""}`} src="/multilayer-zirconia-v1.webp" alt="Multilayer zirconia crown with a natural shade gradient" width={900} height={900} loading="eager" />
          <div className="material-picture-label"><span>{materialMode === "mono" ? "MONOLAYER" : "MULTILAYER"}</span><strong>{materialMode === "mono" ? "EVEN COLOUR" : "COLOUR GRADIENT"}</strong></div>
          <div className="colour-scale"><span>CERVICAL</span><i /><span>OCCLUSAL</span></div>
        </div>
      </section>

      <section id="cases" className="cases section-pad">
        <div className="cases-head reveal"><div><p className="eyebrow">Case examples</p><h2>Click to view<br />each case.</h2></div><p>Open a case to see a larger picture and a short description.</p></div>
        <div className="case-grid">
          {cases.map((item, index) => <button className={`case-card reveal ${item.image}`} key={item.id} onClick={() => setSelectedCase(index)} aria-label={`View ${item.title} case example`}>
            <div className="case-art"><i /></div>
            <div className="case-meta"><span>{item.id} / {item.type}</span><h3>{item.title}</h3><p>{item.meta}</p><b>View case ↗</b></div>
          </button>)}
        </div>
      </section>

      <section id="services" className="capabilities section-pad">
        <div className="cap-title reveal"><p className="eyebrow">Other lab services</p><h2>Zirconia first.<br />Full lab support.</h2><p className="cap-intro">Zirconia is our main focus, but you can send us your other dental cases too.</p></div>
        <div className="cap-list reveal">
          {["Zirconia crowns & bridges", "PFM crowns", "Acrylic dentures", "Flexible dentures", "3D printed appliances", "Orthodontic appliances", "Other dental cases"].map((x, i) => <div key={x}><span>0{i + 1}</span><strong>{x}</strong><b>↗</b></div>)}
        </div>
      </section>

      <section id="contact" className="contact section-pad">
        <div className="contact-grid" aria-hidden="true" />
        <p className="eyebrow reveal">Ready to send a case?</p>
        <h2 className="reveal">Send your<br /><em>zirconia case.</em></h2>
        <p className="reveal">Send your scan and prescription. Our team will take care of the rest.</p>
        <div className="contact-actions reveal"><a className="button gold" href={CASE_SUBMISSION_URL} target="_blank" rel="noreferrer">Start a case online <span>↗</span></a><a className="button outline" href={CASE_SUBMISSION_URL} target="_blank" rel="noreferrer">Speak to the lab</a></div>
      </section>

      <footer>
        <BrandMark />
        <address className="footer-address"><strong>Trillion Dental</strong>Pt 622, Villa Batutah, Kg Bukit Marak,<br />16150 Kota Bharu, Kelantan</address>
        <a className="footer-phone" href={CASE_SUBMISSION_URL} target="_blank" rel="noreferrer">+60 11-1334 8503</a>
        <div className="footer-links"><a href="#workflow">Workflow</a><a href="#tracking">Tracking</a><a href="#cases">Cases</a></div>
        <span>© {new Date().getFullYear()} Trillion Dental Lab</span>
      </footer>

      {selectedCase !== null && <div className="case-modal" role="dialog" aria-modal="true" aria-label={`${cases[selectedCase].title} case details`} onClick={() => setSelectedCase(null)}>
        <div className="case-dialog" onClick={(event) => event.stopPropagation()}>
          <button className="modal-close" onClick={() => setSelectedCase(null)} aria-label="Close case details">×</button>
          <div className={`case-dialog-photo ${cases[selectedCase].image}`} />
          <div className="case-dialog-copy"><span>{cases[selectedCase].id} / {cases[selectedCase].type}</span><h2>{cases[selectedCase].title}</h2><p>{cases[selectedCase].description}</p><small>{cases[selectedCase].meta}</small></div>
        </div>
      </div>}
    </main>
  );
}
