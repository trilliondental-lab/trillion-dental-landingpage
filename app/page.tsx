"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CASE_SUBMISSION_URL = "https://wa.me/601113348503";
const CLINIC_PORTAL_URL = "https://labtrack-trilliondental.netlify.app/";
const LAB_FORM_URL = "https://drive.google.com/file/d/1XDgnwL7sAtKmMD6W72m4UL4IyDR1kBhH/view?usp=sharing";
const caseEnquiry = (message: string) => `${CASE_SUBMISSION_URL}?text=${encodeURIComponent(message)}`;
const NEW_CASE_URL = caseEnquiry("Hello Trillion Dental Lab, I would like to submit a new case. Please help me confirm the material, quotation, turnaround and submission method for my clinic.");
const GENERAL_ENQUIRY_URL = caseEnquiry("Hello Trillion Dental Lab, I have a question about your lab services.");
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Trillion Dental Pt 622 Villa Batutah Kg Bukit Marak 16150 Kota Bharu Kelantan");

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
    <Image className="brand-logo" src="/trillion-mark-v1.webp" alt="" width={120} height={86} unoptimized />
    <span>TRILLION<small>DENTAL LAB</small></span>
  </a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [materialMode, setMaterialMode] = useState<"mono" | "multi">("multi");
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [crownRotation, setCrownRotation] = useState({ x: -4, y: -7 });
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedCase === null) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLButtonElement>("button")?.focus();
    const keepFocus = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedCase(null);
      if (event.key !== "Tab" || !dialog) return;
      const elements = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]'));
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", keepFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", keepFocus);
      previousFocus?.focus();
    };
  }, [selectedCase]);

  return (
    <main id="top" className="loaded">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="nav-shell">
        <BrandMark />
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}><span /><span /></button>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          <a href="#zirconia" onClick={() => setMenuOpen(false)}>Zirconia</a>
          <a href="#cases" onClick={() => setMenuOpen(false)}>Case gallery</a>
          <a href="#workflow" onClick={() => setMenuOpen(false)}>Workflow</a>
          <a href={LAB_FORM_URL} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Lab form ↗</a>
          <a href={CLINIC_PORTAL_URL} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Clinic login ↗</a>
        </nav>
        <a className="mobile-contact-cta" href={NEW_CASE_URL} target="_blank" rel="noreferrer">WhatsApp ↗</a>
        <a className="nav-cta" href={NEW_CASE_URL} target="_blank" rel="noreferrer">Discuss a case <span>↗</span></a>
      </header>

      <section id="main-content" className="hero-scroll" tabIndex={-1}>
        <div className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">Based in Kelantan, Malaysia</p>
            <h1><span>Zirconia.</span><span className="gold-line">Perfected.</span></h1>
            <p className="hero-intro">Zirconia crowns and bridges for dental clinics—supported by digital workflows, two-stage quality checks and online case tracking.</p>
            <div className="hero-actions">
              <a className="button gold" href={NEW_CASE_URL} target="_blank" rel="noreferrer">Discuss a case on WhatsApp <span>↗</span></a>
              <a className="text-link" href="#cases">View our cases <span>↓</span></a>
            </div>
            <a className="hero-form-link" href={LAB_FORM_URL} target="_blank" rel="noreferrer">Get the lab prescription form (PDF) ↗</a>
          </div>
          <div className="hero-visual">
            <div className="crown-stage">
              <Image className="crown-photo" src="/crown-hero-v2.webp" alt="Realistic white zirconia molar crown" width={1500} height={1049} priority unoptimized />
              <Image className="crown-scan" src="/crown-hero-v2.webp" alt="" width={1500} height={1049} aria-hidden="true" unoptimized />
            </div>
          </div>
        </div>
      </section>

      <div className="clinic-proof" aria-label="Support for your clinic"><span><b>01</b> Scan, model or impression</span><span><b>02</b> Two-stage quality checks</span><a href="#tracking"><b>03</b> Online case tracking ↗</a></div>

      <section id="zirconia" className="material section-pad">
        <div className="material-copy reveal">
          <p className="eyebrow">Zirconia options</p>
          <h2>See the colour<br />difference.</h2>
          <p>Choose an option to see how the colour and translucency change.</p>
          <div className="material-tabs" role="group" aria-label="Choose zirconia type">
            <button className={`material-tab ${materialMode === "mono" ? "active" : ""}`} onClick={() => setMaterialMode("mono")} aria-pressed={materialMode === "mono"}><span>MONOLAYER</span><strong>One even shade</strong><p>A uniform shade through the restoration. Discuss suitability for your case with our team.</p></button>
            <button className={`material-tab ${materialMode === "multi" ? "active" : ""}`} onClick={() => setMaterialMode("multi")} aria-pressed={materialMode === "multi"}><span>MULTILAYER</span><strong>Natural shade change</strong><p>Warmer near the gum line and more translucent near the biting surface.</p></button>
          </div>
        </div>
        <div className={`material-photo-view ${materialMode}`}>
          <Image className={`material-product-image ${materialMode === "mono" ? "active" : ""}`} src="/monolayer-zirconia-v1.webp" alt="Monolayer zirconia crown with an even shade" width={900} height={900} loading="eager" unoptimized />
          <Image className={`material-product-image ${materialMode === "multi" ? "active" : ""}`} src="/multilayer-zirconia-v1.webp" alt="Multilayer zirconia crown with a natural shade gradient" width={900} height={900} loading="eager" unoptimized />
          <div className="material-picture-label"><span>{materialMode === "mono" ? "MONOLAYER" : "MULTILAYER"}</span><strong>{materialMode === "mono" ? "EVEN COLOUR" : "COLOUR GRADIENT"}</strong></div>
          <div className="colour-scale"><span>CERVICAL</span><i /><span>OCCLUSAL</span></div>
        </div>
        <div className="material-comparison">
          <h3>Choose with your case in mind.</h3>
          {/* Keyboard focus lets users scroll the comparison horizontally on small screens. */}
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <div className="table-scroll" role="region" aria-label="Zirconia options comparison" tabIndex={0}>
            <table><thead><tr><th scope="col">What to compare</th><th scope="col">Monolayer</th><th scope="col">Multilayer</th></tr></thead><tbody>
              <tr><th scope="row">Shade appearance</th><td>One even base shade</td><td>Graduated shade from cervical to occlusal</td></tr>
              <tr><th scope="row">Aesthetic planning</th><td>Discuss the required stain and finish</td><td>Discuss shade transition and translucency</td></tr>
              <tr><th scope="row">Case selection</th><td colSpan={2}>Confirm the specific material, restoration design and manufacturer indications with the lab.</td></tr>
              <tr><th scope="row">Before prescribing</th><td colSpan={2}>Request the available brand, shade range, technical data and preparation requirements for your case.</td></tr>
            </tbody></table>
          </div>
          <a className="inline-link" href={caseEnquiry("Hello Trillion Dental Lab, please share the zirconia brands, shade options and manufacturer specifications available for my case.")} target="_blank" rel="noreferrer">Request material specifications ↗</a>
        </div>
      </section>

      <section id="cases" className="cases section-pad">
        <div className="cases-head reveal"><div><p className="eyebrow">Case gallery</p><h2>Explore our<br />zirconia work.</h2></div><p>Take a closer look at crown and bridge examples, from single anterior units to multi-unit restorations.</p></div>
        <div className="case-grid">
          {cases.map((item, index) => <button className={`case-card reveal ${item.image}`} key={item.id} onClick={() => setSelectedCase(index)} aria-label={`View ${item.title} case example`}>
            <div className="case-art"><i /></div>
            <div className="case-meta"><span>{item.id} / {item.type}</span><h3>{item.title}</h3><p>{item.meta}</p><b>View case ↗</b></div>
          </button>)}
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
              src="/crown-hero-v2.webp"
              alt="Interactive zirconia crown shown during quality checking"
              width={1500}
              height={1049}
              unoptimized
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
          <div><p className="eyebrow">How we make your case</p><h2>A clear digital<br />workflow.</h2></div>
          <p>Every case is checked twice before it is packed and sent to your clinic.</p>
        </div>
        <div className="case-entry reveal">
          <div><span>01</span><strong>Digital Scan</strong><p>Send STL or PLY exports. Ask us how to connect your intraoral scanner.</p></div>
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
          <a className="button outline portal-button" href={CLINIC_PORTAL_URL} target="_blank" rel="noreferrer">Open clinic portal <span>↗</span></a>
        </div>
        <div className="portal-window reveal" aria-label="Example of the clinic case tracking website">
          <div className="portal-top"><BrandMark /><span>CLINIC PORTAL</span><b>DEMO</b></div>
          <p className="demo-note">Illustrative preview · Sample cases, not live patient data</p>
          <div className="portal-summary"><span>Active cases<strong>08</strong></span><span>Ready to send<strong>02</strong></span><span>Due this week<strong>05</strong></span></div>
          <div className="portal-table">
            <div className="portal-row head"><span>CASE</span><span>PATIENT</span><span>STAGE</span><span>DELIVERY</span></div>
            <div className="portal-row"><span>#DEMO-01</span><span>Sample A</span><span><i className="status design" />CAD Design</span><span>14 Aug</span></div>
            <div className="portal-row"><span>#DEMO-02</span><span>Sample B</span><span><i className="status finish" />Finishing</span><span>13 Aug</span></div>
            <div className="portal-row"><span>#DEMO-03</span><span>Sample C</span><span><i className="status ready" />QC 2</span><span>12 Aug</span></div>
          </div>
          <div className="portal-progress"><span>CASE #DEMO-01</span><div><i /><i className="done" /><i /><i /><i /></div><small>Scan received → CAD design → Production → QC → Delivery</small></div>
        </div>
      </section>

      <section id="working-with-us" className="working section-pad">
        <div className="working-heading"><p className="eyebrow">Working with Trillion</p><h2>A clear start.<br /><em>A smoother handover.</em></h2><p>Prepare the case details, then speak to our team to confirm the plan before production.</p></div>
        <div className="working-grid">
          <article className="submission-card"><span className="eyebrow">01 / Prepare your case</span><h3>Your submission checklist</h3><ul className="checklist"><li>Completed lab prescription form</li><li>Clinic and dentist contact details</li><li>Case reference and tooth numbers</li><li>Restoration type, material and shade</li><li>Scans, model or impression as applicable</li><li>Requested date and relevant case instructions</li></ul><a className="button gold" href={LAB_FORM_URL} target="_blank" rel="noreferrer">Open lab form (PDF) <span>↗</span></a><p className="small-copy">View, print or download the form from Google Drive.</p></article>
          <div className="clinic-faq">
            <details open><summary>Turnaround & urgent cases</summary><p>Share your requested date when you enquire. Ask our team to confirm the production and delivery schedule for your case before booking the fitting.</p></details>
            <details><summary>Collection & delivery</summary><p>Send your clinic location so we can confirm the available collection or courier arrangement and any delivery charges.</p></details>
            <details><summary>Adjustments & remakes</summary><p>Contact the lab with the case reference and the issue to arrange a review. Ask for the applicable adjustment or remake terms when confirming your case.</p></details>
            <details><summary>Material, shade & quotation</summary><p>Discuss the restoration, material option and shade with our team. Request a quotation and material specifications before proceeding.</p></details>
            <details><summary>Sending your first digital case</summary><p>Tell us which scanner you use. We can discuss the appropriate export or transfer route. Use a case reference in your initial enquiry; confirm the appropriate channel before sharing patient information.</p></details>
            <a className="inline-link" href={NEW_CASE_URL} target="_blank" rel="noreferrer">Confirm your case details on WhatsApp ↗</a>
          </div>
        </div>
      </section>

      <section id="services" className="capabilities section-pad">
        <div className="cap-title reveal"><p className="eyebrow">Other lab services</p><h2>Zirconia first.<br />Full lab support.</h2><p className="cap-intro">Zirconia is our main focus, but you can send us your other dental cases too.</p></div>
        <div className="cap-list reveal">
          {["Zirconia crowns & bridges", "PFM crowns", "Acrylic dentures", "Flexible dentures", "3D printed appliances", "Orthodontic appliances", "Other dental cases"].map((x, i) => <div key={x}><span>0{i + 1}</span><strong>{x}</strong></div>)}
        </div>
      </section>

      <section id="contact" className="contact section-pad">
        <div className="contact-grid" aria-hidden="true" />
        <p className="eyebrow reveal">Ready to send a case?</p>
        <h2 className="reveal">Send your<br /><em>zirconia case.</em></h2>
        <p className="reveal">Start with the lab form. Then confirm your material, quotation and requested date with our team.</p>
        <div className="contact-actions reveal"><a className="button gold" href={NEW_CASE_URL} target="_blank" rel="noreferrer">Discuss a case on WhatsApp <span>↗</span></a><a className="button outline" href={LAB_FORM_URL} target="_blank" rel="noreferrer">Open lab form (PDF) <span>↗</span></a></div>
        <a className="inline-link contact-question" href={GENERAL_ENQUIRY_URL} target="_blank" rel="noreferrer">Have a general question? Speak to the lab ↗</a>
      </section>

      <footer>
        <BrandMark />
        <address className="footer-address"><strong>Trillion Dental</strong>Pt 622, Villa Batutah, Kg Bukit Marak,<br />16150 Kota Bharu, Kelantan<br /><a className="inline-link" href={MAP_URL} target="_blank" rel="noreferrer">Find us on Google Maps ↗</a></address>
        <div className="footer-contact"><a className="footer-phone" href={CASE_SUBMISSION_URL} target="_blank" rel="noreferrer">+60 11-1334 8503</a><a className="inline-link" href="mailto:trilliondental@gmail.com">trilliondental@gmail.com</a></div>
        <div className="footer-links"><a href="#cases">Case gallery</a><a href="#services">Lab services</a><a href="#working-with-us">Submission guide</a><a href={LAB_FORM_URL} target="_blank" rel="noreferrer">Lab form ↗</a><a href={CLINIC_PORTAL_URL} target="_blank" rel="noreferrer">Clinic login ↗</a></div>
        <span>© {new Date().getFullYear()} Trillion Dental Lab</span>
      </footer>

      {selectedCase !== null && <div className="case-modal">
        <button className="modal-backdrop" aria-label="Dismiss case details" tabIndex={-1} onClick={() => setSelectedCase(null)} />
        <div className="case-dialog" role="dialog" aria-modal="true" aria-label={`${cases[selectedCase].title} case details`} ref={dialogRef}>
          <button className="modal-close" onClick={() => setSelectedCase(null)} aria-label="Close case details">×</button>
          <div className={`case-dialog-photo ${cases[selectedCase].image}`} role="img" aria-label={`${cases[selectedCase].title} on a dental model`} />
          <div className="case-dialog-copy"><span>{cases[selectedCase].id} / {cases[selectedCase].type}</span><h2>{cases[selectedCase].title}</h2><p>{cases[selectedCase].description}</p><dl className="case-facts"><div><dt>Restoration</dt><dd>{cases[selectedCase].title}</dd></div><div><dt>Region</dt><dd>{cases[selectedCase].type}</dd></div><div><dt>Shown</dt><dd>Restoration on a dental model</dd></div><div><dt>Planning focus</dt><dd>{selectedCase === 0 ? "Shade, contour and neighbouring teeth" : selectedCase === 1 ? "Connectors, contacts and occlusal anatomy" : "Gingival contour and emergence profile"}</dd></div></dl><a className="inline-link" href={caseEnquiry(`Hello Trillion Dental Lab, I would like to discuss a ${cases[selectedCase].title.toLowerCase()} case. Please advise on material options, shade and turnaround.`)} target="_blank" rel="noreferrer">Discuss a similar case ↗</a></div>
        </div>
      </div>}
    </main>
  );
}
