import { useRef, useCallback } from "react";
import "./index.scss";
import yosemiteImg from "./bi1.jpeg";

const ROW_COLORS = ["#ffffff", "#64ccc5"];
const PILL_COLORS = ["#ffffff", "#64ccc5"];

const CardComponent = ({ data, cardIndex = 0, onClick, isOverlay }) => {
  const cardRef = useRef(null);
  const thumbnailBg = ROW_COLORS[cardIndex % ROW_COLORS.length];
  const pillBorder = PILL_COLORS[cardIndex % PILL_COLORS.length];

  const handleClick = useCallback(() => {
    if (onClick && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      onClick(data, rect, cardIndex, cardRef.current);
    }
  }, [onClick, data, cardIndex]);

  return (
    <div
      className={`card-container ${isOverlay ? 'overlay-card' : ''}`}
      onClick={!isOverlay ? handleClick : undefined}
    >
      <div className="card" ref={cardRef}>
        <div className="card-image" style={{ backgroundColor: thumbnailBg }}>
          <img src={yosemiteImg} alt="Blog thumbnail" />
        </div>

        <div className="card-content" style={{ borderTop: `1.5px solid ${thumbnailBg}` }}>
          <h2 className="title">{data.title}</h2>
          <div
            className="category-container"
            style={{ borderColor: pillBorder }}
          >
            <span className="category">{data.category || "Professional"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
