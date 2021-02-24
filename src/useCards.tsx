import { useEffect, useState } from "react";
import { CardProps } from "./PlayingCard";
import {Socket} from "socket.io-client";


export default function useCards(socket: Socket) {

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

  useEffect(()=>{
    setLocalCards([]);
  },[serverCards]);

  useEffect(() => {
    console.log("Set event listner")
    socket.on('cards', (payload: any)=> {

      const receivedCards = (typeof payload === 'string') ? JSON.parse(payload) : payload
      console.log("Received cards",  receivedCards);
      setServerCards(JSON.parse(JSON.stringify(receivedCards)));
    });
    console.log("connected: ", socket.id);

  }, [socket]);
  return {
    cards: localCards.length === 0 ? serverCards : localCards,
    loading:(localCards.length===0 && serverCards.length===0),
    createOnDrop,
  };
}
