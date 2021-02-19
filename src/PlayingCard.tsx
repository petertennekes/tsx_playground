import {useDrag} from "react-dnd";

import ReactMarkdown from "react-markdown";
import "./PlayingCard.css";
import {useState} from "react";
import {Direction} from "./CardArea";

const classNames = require("classnames");

enum CardSides {
  Front,
  Reverse,
}

export const DragTypes = {
  CARD: "card",
};

export interface CardProps {
  title: string;
  description: string;
  detailedText: string;
  key: string;
  imgSrc?: string;
  style: any;
  indexSource: number;
  isOver?: boolean;
  directionOfDrag?: Direction;
}

function PlayingCard(props: CardProps) {
  const {
    title,
    description,
    detailedText,
    imgSrc = "logo192.png",
    style,
    indexSource,
    isOver,
    directionOfDrag,
  } = props;
  const [visibleSide, setVisibleSide] = useState(CardSides.Front);
  const toggleSide = () => {
    if (visibleSide === CardSides.Front) {
      setVisibleSide(CardSides.Reverse);
    } else {
      setVisibleSide(CardSides.Front);
    }
  };
  const [{ isDragging }, drag] = useDrag({
    item: { type: DragTypes.CARD, indexSource: indexSource },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div
      className={classNames("playingCard", {
        hovered: isOver,
        directionLeft: directionOfDrag === Direction.Left,
        directionRight: directionOfDrag === Direction.Right,
        dragged: isDragging,
      })}
      onClick={toggleSide}
      style={style}
      ref={drag}
    >
      {visibleSide === CardSides.Front && <img alt={title} src={imgSrc} />}
      <div className="card-body">
        {visibleSide === CardSides.Front && (
          <div className="card-title">
            <h1>{title}</h1>
          </div>
        )}
        <div className="card-text">
          {" "}
          {visibleSide === CardSides.Front ? (
            <p>{description}</p>
          ) : (
            <ReactMarkdown>{detailedText}</ReactMarkdown>
          )}
        </div>
      </div>
      <div className="card-footer">
        <button onClick={toggleSide}>Flip</button>
      </div>
    </div>
  );
}

export default PlayingCard;
