import CardArea from "./CardArea";
import PlayingCard from "./PlayingCard";
import useCards from "./useCards";
import {Socket} from "socket.io-client";

interface CardDeckProps {
  socket: Socket;
}

function CardDeck(props: CardDeckProps) {
  const { cards, loading, createOnDrop } = useCards(props.socket);

  if (loading) return <h1>LOADING</h1>;

  return (
    <div style={{ display: "flex" }}>
      {cards.length > 0 &&
        cards.map((card, index) => (
          <CardArea key={card.key} onDrop={createOnDrop(index)}>
            <PlayingCard {...card} indexSource={index}  />
          </CardArea>
        ))}
    </div>
  );
}

export default CardDeck;
