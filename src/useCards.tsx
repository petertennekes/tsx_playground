import { useEffect, useState } from "react";
import { CardProps } from "./PlayingCard";

const fetchJSON = (url: string) => fetch(url).then((r) => r.json());

export default function useCards(cardsURL: string) {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<CardProps[]>([]);

  const createOnDrop = (indexTarget: number) => {
    return (item: any) => {
      const cardsCopy = [...cards];
      const itemToMove = cardsCopy.splice(item.indexSource, 1);
      cardsCopy.splice(indexTarget, 0, ...itemToMove);
      setCards(cardsCopy);
    };
  };

  useEffect(() => {
    fetchJSON(cardsURL).then((fetchedCards) => {
      setCards(fetchedCards);
      setLoading(false);
    });
  }, [cardsURL]);

  return {
    cards,
    loading,
    createOnDrop,
  };
}
