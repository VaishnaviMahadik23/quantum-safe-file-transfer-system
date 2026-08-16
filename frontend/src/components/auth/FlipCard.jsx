import "./FlipCard.css";

function FlipCard({
  isFlipped,
  front,
  back
}) {
  return (
    <div className="flip-card">

      <div
        className={`flip-card-inner ${
          isFlipped ? "flipped" : ""
        }`}
      >

        <div className="flip-card-front">

          {front}

        </div>

        <div className="flip-card-back">

          {back}

        </div>

      </div>

    </div>
  );
}

export default FlipCard;