import { useEffect, useState } from "react";
import { CardProps } from "./PlayingCards";

const fetchJSON = (url: string) => fetch(url).then((r) => r.json());

export default function useCards(cardsURL: string) {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<CardProps[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const createOnClick = (index: number) => {
    return () => {
      const currentSelection = [index, ...selectedCards];

      setSelectedCards(currentSelection);

      if (currentSelection.length === 2) {
        const cardsCopy = [...cards];
        const [selection1, selection2] = currentSelection;

        const card1 = cards[selection1];
        const card2 = cards[selection2];

        cardsCopy[selection1] = card2;
        cardsCopy[selection2] = card1;

        setTimeout(() => {
          setCards(cardsCopy);
          setSelectedCards([]);
        }, 100);
      }
    };
  };

  useEffect(() => {
    fetchJSON(cardsURL).then((fetchedCards) => {
      setCards(fetchedCards);
      setLoading(false);
    });
  }, [cardsURL]);

  const isSelected = (index: number) => {
    return selectedCards.indexOf(index) >= 0;
  };

  return {
    cards,
    loading,
    createOnClick,
    isSelected,
  };
}
