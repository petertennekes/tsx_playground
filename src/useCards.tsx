import { useEffect, useState } from "react";
import { CardProps } from "./PlayingCard";
import { io } from "socket.io-client";

const fetchJSON = (url: string) => fetch(url).then((r) => r.json());
const socket = io();
console.log("connected: ", socket.id);

export default function useCards(cardsURL: string) {
  const [loading, setLoading] = useState(true);
  const [incoming, setIncoming] = useState(false);
  const [cards, setCards] = useState<CardProps[]>([]);

  const createOnDrop = (indexTarget: number) => {
    //"COD created for ", indexTarget
    return (item: any) => {
      //"COD triggered for ", indexTarget ,"with ", item.indexSource
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

  useEffect(()=>{
    if (!incoming){ //looks a bit ugly solution. problem we don't want to emit the changed cards if the change is a result of a recevied card deck
      socket.emit("cards", JSON.stringify(cards));
    }
    }, [cards])

  useEffect(() => {
    socket.on('cards', (payload: string)=> {
      setIncoming(true);
      setCards(JSON.parse(payload));
      setIncoming(false);
    });
  }, []);

  return {
    cards,
    loading,
    createOnDrop,
  };
}
