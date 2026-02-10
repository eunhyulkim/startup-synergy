export function Introduction() {
  return (
    <section id="about" className="conf-section conf-about">
      <span className="conf-section-label">About</span>

      <p className="conf-about-lead">
        우리의 강점을 연결할 수 있다면
      </p>

      <div className="conf-about-cards">
        <div className="conf-about-card">
          <span className="conf-about-card-label">일시</span>
          <span className="conf-about-card-value">2026년 2월 11일 (수)</span>
          <span className="conf-about-card-value">오후 2시</span>
        </div>
        <div className="conf-about-card">
          <span className="conf-about-card-label">장소</span>
          <span className="conf-about-card-value">논현로 76길 24</span>
          <span className="conf-about-card-value">BPT 빌딩 1층</span>
        </div>
      </div>
    </section>
  );
}
