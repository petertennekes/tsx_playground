import { useEffect, useState } from "react";
import { CardProps } from "./PlayingCards";

const fetchJSON = (url: string) => fetch(url).then((r) => r.json());

export default function useCards(cardsURL: string) {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<CardProps[]>([]);

  useEffect(() => {
    fetchJSON(cardsURL).then((fetchedCards) => {
      setCards(fetchedCards);
      setLoading(false);
    });
  }, [cardsURL]);

  return {
    cards,
    loading,
  };
}
