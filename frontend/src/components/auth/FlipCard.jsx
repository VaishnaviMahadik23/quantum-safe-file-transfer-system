import "./FlipCard.css";

function FlipCard({ isFlipped, front, back }) {
  return (
    <div className={`flip-card-shell ${isFlipped ? "is-flipped" : ""}`}>
      {/* Security atmosphere */}
      <div className="flip-card-aura aura-blue"></div>
      <div className="flip-card-aura aura-purple"></div>

      {/* Animated scanning beam */}
      <div className="flip-card-scan"></div>

      {/* Main card */}
      <div className="flip-card">
        <div
          className={`flip-card-inner ${
            isFlipped ? "flipped" : ""
          }`}
        >
          {/* LOGIN */}
          <section className="flip-card-face flip-card-front">
            <div className="card-corner corner-top-left"></div>
            <div className="card-corner corner-top-right"></div>
            <div className="card-corner corner-bottom-left"></div>
            <div className="card-corner corner-bottom-right"></div>

            <div className="security-grid"></div>

            <div className="card-content">
              {front}
            </div>
          </section>

          {/* REGISTER */}
          <section className="flip-card-face flip-card-back">
            <div className="card-corner corner-top-left"></div>
            <div className="card-corner corner-top-right"></div>
            <div className="card-corner corner-bottom-left"></div>
            <div className="card-corner corner-bottom-right"></div>

            <div className="security-grid"></div>

            <div className="card-content">
              {back}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;