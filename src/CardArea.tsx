import { useDrop } from "react-dnd";
import { DragTypes } from "./PlayingCards";
import "./CardArea.css";
import WithProps from "./WithProps";

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
    <div className="card-area" ref={drop}>
      <WithProps isOver={isOver}>{props.children}</WithProps>
    </div>
  );
};

export default CardArea;
