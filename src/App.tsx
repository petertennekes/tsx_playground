import React from 'react';
import './App.css';
import CardDeck from './CardDeck'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      <CardDeck cardsURL="card-deck.json" />
    </div>
  );
}

export default App;
