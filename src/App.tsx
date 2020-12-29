import React from 'react';
import './App.css';
import PlayingCard from './PlayingCards'

function App() {
  const cards = [
    {
      title: "one", description: "card 1", detailedText: "it is card 1"
    },
    {
      title: "two", description: "card 2", detailedText: "it is card 2"
    },
    {
      title: "three", description: "card 3", detailedText: "it is card 3"
    },
    {
      title: "foue", description: "card 4", detailedText: "it is card 4"
    }
  ]
  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        {cards.map((card, index) => <PlayingCard {...card} />)}

      </div>
    </div>
  );
}

export default App;
