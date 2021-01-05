import { useDrop } from "react-dnd";
import { DragTypes } from "./PlayingCards";
import "./CardArea.css";
import WithProps from "./WithProps";

interface CardAreaProps {
  onDrop: (item: any) => void;
  children: any;
}
export enum Direction {
  Left,
  Right,
  None,
}
const CardArea = (props: CardAreaProps) => {
  const [{ isOver, directionOfDrag }, drop] = useDrop({
    accept: DragTypes.CARD,
    drop: (item) => props.onDrop(item),

    collect: (monitor) => {
      const directionOfDrag = monitor.getDifferenceFromInitialOffset()
        ? monitor.getDifferenceFromInitialOffset()!.x > 0
          ? Direction.Right
          : Direction.Left
        : Direction.None;
      return {
        isOver: !!monitor.isOver(),
        directionOfDrag: directionOfDrag,
      };
    },
  });
  console.log(directionOfDrag);
  return (
    <div className="card-area">
      <div>
        <div
          className="left"
          style={{
            backgroundImage:
              isOver && directionOfDrag === Direction.Left
                ? "radial-gradient(lightblue 30%, transparent 70%"
                : "",
          }}
        ></div>
        <div
          className="right"
          style={{
            backgroundImage:
              isOver && directionOfDrag === Direction.Right
                ? "radial-gradient(lightblue 30%, transparent 70%"
                : "",
          }}
        ></div>
      </div>
      <div className="card-holder" ref={drop}>
        <WithProps isOver={isOver} directionOfDrag={directionOfDrag}>
          {props.children}
        </WithProps>
      </div>
    </div>
  );
};

export default CardArea;
