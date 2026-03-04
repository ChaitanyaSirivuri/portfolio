import "./index.scss";
import yosemiteImg from "./bi1.jpeg"; // replace with your image path

// Alternating thumbnail background colors: white → cyan
const ROW_COLORS = ["#ffffff", "#64ccc5"];
// Contrasting pill border: opposite of thumbnail bg
const PILL_COLORS = ["#ffffff", "#64ccc5"];

const CardComponent = ({ data, cardIndex = 0 }) => {
  const thumbnailBg = ROW_COLORS[cardIndex % ROW_COLORS.length];
  const pillBorder = PILL_COLORS[cardIndex % PILL_COLORS.length];

  return (
    <div className="card-container">
      <div className="card">
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