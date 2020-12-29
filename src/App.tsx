import React from 'react';
import './App.css';
import PlayingCard from './PlayingCards'

function App() {
  return (
    <div className="App">
      <div className="container">
        <PlayingCard title="test" description="short description of the title. max two lines." 
        backgroundText="*Test* markdowned text. [I'm an inline-style link](https://www.google.com)"/>
        </div>
    </div>
  );
}

export default App;
