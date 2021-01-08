import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import CardDeck from "./CardDeck";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <CardDeck cardsURL="/api/cards" />
      </DndProvider>
    </div>
  );
}

export default App;
