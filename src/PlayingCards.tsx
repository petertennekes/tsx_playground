import { useDrag } from "react-dnd";

import ReactMarkdown from "react-markdown";
import "./PlayingCards.css";
import { useState } from "react";
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
  id: string;
  imgSrc?: string;
  isSelected: boolean;
  onClick: () => void;
  style: any;
}

function PlayingCard(props: CardProps) {
  const [visibleSide, setVisibleSide] = useState(CardSides.Front);
  const toggleSide = () => {
    if (visibleSide === CardSides.Front) {
      setVisibleSide(CardSides.Reverse);
    } else {
      setVisibleSide(CardSides.Front);
    }
  };
  const [{ isDragging }, drag] = useDrag({
    item: { type: DragTypes.CARD },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const {
    title,
    description,
    detailedText,
    imgSrc = "logo192.png",
    isSelected,
    onClick,
    style,
  } = props;

  return (
    <div
      className={classNames("playingCard", isSelected && "selected")}
      onClick={onClick}
      style={{
        opacity: isDragging ? 0.5 : 1,
        ...style,
      }}
      ref={drag}
    >
      {visibleSide === CardSides.Front && <img src={imgSrc} />}
      <div className="card-body">
        {visibleSide === CardSides.Front && (
          <div className="card-title">
            <h1>{title}</h1>
          </div>
        )}
        <div className="card-text">
          {" "}
          {/* Cannot use Card.text directly as this would result in nested <p> when using ReactMarkdown */}
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
