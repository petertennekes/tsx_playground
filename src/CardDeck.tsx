import CardArea from "./CardArea";
import PlayingCard from "./PlayingCards";
import useCards from "./useCards";

interface CardDeckProps {
  cardsURL: string;
}

function CardDeck(props: CardDeckProps) {
  const { cards, loading, createOnDrop } = useCards(props.cardsURL);

  if (loading) return <h1>LOADING</h1>;

  return (
    <div style={{ display: "flex" }}>
      {cards.length > 0 &&
        cards.map((card, index) => (
          <CardArea key={index} onDrop={createOnDrop(index)}>
            <PlayingCard {...card} indexSource={index} />
          </CardArea>
        ))}
    </div>
  );
}

export default CardDeck;
