import { useDrop } from "react-dnd";
import { DragTypes } from "./PlayingCards";
import "./CardArea.css";

interface CardAreaProps {
  onDrop: (item: any) => void;
  children: any;
}

const CardArea = (props: CardAreaProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: DragTypes.CARD,
    drop: (item) => props.onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  return (
    <div className="card-area">
      <div
        className="left"
        ref={drop}
        style={{ backgroundColor: isOver ? "yellow" : "transparent" }}
      ></div>
      <div className="card-place">{props.children}</div>
      <div className="right"></div>
    </div>
  );
};

export default CardArea;
