import { useEffect, useState } from "react";
import { CardProps } from "./PlayingCard";
import { io } from "socket.io-client";

const fetchJSON = (url: string) => fetch(url).then((r) => r.json());
const socket = io();
console.log("connected: ", socket.id);

export default function useCards(cardsURL: string) {
  const [loading, setLoading] = useState(true);
  const [serverCards, setServerCards] = useState<CardProps[]>([]);
  const [localCards, setLocalCards] = useState<CardProps[]>([]);

  const createOnDrop = (indexTarget: number) => {
    //"COD created for ", indexTarget
    return (item: any) => {
      //"COD triggered for ", indexTarget ,"with ", item.indexSource
      const cardsCopy = [...serverCards];
      const itemToMove = cardsCopy.splice(item.indexSource, 1);
      cardsCopy.splice(indexTarget, 0, ...itemToMove);
      socket.emit("cards", JSON.stringify(cardsCopy));
      setLocalCards(cardsCopy);
    };
  };

  useEffect(() => {
    fetchJSON(cardsURL).then((fetchedCards) => {
      setServerCards(fetchedCards);
      setLoading(false);
    });
  }, [cardsURL]);

  useEffect(()=>{
    setLocalCards([]);
  },[serverCards]);

  useEffect(() => {
    console.log("Set event listner")
    socket.on('cards', (payload: string)=> {
      console.log("Received cards");
      setServerCards(JSON.parse(payload));
    });
  }, []);

  return {
    cards: localCards.length === 0 ? serverCards : localCards,
    loading,
    createOnDrop,
  };
}
