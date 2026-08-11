export default function MobilePreview() {
  return (
    <main className="mobile-preview-shell">
      <div className="mobile-preview-heading">
        <span>TRILLION DENTAL</span>
        <h1>Mobile preview</h1>
        <p>390 × 844 phone view</p>
      </div>
      <div className="phone-preview-frame">
        <div className="phone-preview-speaker" aria-hidden="true" />
        <iframe src="/" title="Trillion Dental mobile website preview" />
      </div>
    </main>
  );
}
