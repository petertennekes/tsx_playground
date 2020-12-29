import React from 'react';
import './App.css';
import CardDeck from './CardDeck'

function App() {

  return (
    <div className="App">
      <CardDeck cardsURL="card-deck.json" />
    </div>
  );
}

export default App;
