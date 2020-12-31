import PlayingCard from "./PlayingCards";
import useCards from "./useCards";

interface CardDeckProps {
  cardsURL: string;
}

function CardDeck(props: CardDeckProps) {
  const { cards, loading, createOnClick, isSelected } = useCards(
    props.cardsURL
  );

  if (loading) return <h1>LOADING</h1>;

  return (
    <div style={{ display: "flex" }}>
      {cards.length > 0 &&
        cards.map((card, index) => (
          <PlayingCard
            {...card}
            onClick={createOnClick(index)}
            isSelected={isSelected(index)}
          />
        ))}
    </div>
  );
}

export default CardDeck;
