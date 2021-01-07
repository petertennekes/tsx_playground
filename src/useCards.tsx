import { useEffect, useState } from "react";
import { CardProps } from "./PlayingCards";

const fetchJSON = (url: string) => fetch(url).then((r) => r.json());

export default function useCards(cardsURL: string) {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<CardProps[]>([]);

  const createOnDrop = (indexTarget: number) => {
    return (item: any) => {
      console.log(item.indexSource, indexTarget);
      const cardsCopy = [...cards];
      const itemToMove = cardsCopy.splice(item.indexSource, 1);
      cardsCopy.splice(indexTarget, 0, ...itemToMove);
      setCards(cardsCopy);
    };
  };

  useEffect(() => {
    console.log(cardsURL);
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
