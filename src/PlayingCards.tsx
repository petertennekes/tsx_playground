import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import ReactMarkdown from "react-markdown";
import "./PlayingCards.css";
import { useState } from "react";
const classNames = require("classnames");

enum CardSides {
  Front,
  Reverse,
}

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
    <Card
      className={classNames("playingCard", isSelected && "selected")}
      onClick={onClick}
      style={style}
    >
      {visibleSide === CardSides.Front && (
        <Card.Img variant="top" src={imgSrc} />
      )}
      <Card.Body>
        {visibleSide === CardSides.Front && (
          <Card.Title>
            <h1>{title}</h1>
          </Card.Title>
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
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" onClick={toggleSide}>
          Flip
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default PlayingCard;
