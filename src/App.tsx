import React from 'react';
import './App.css';
import PlayingCard from './playinCards'

function App() {
  return (
    <div className="App">
      <PlayingCard title="test" description="short description of the title. max two lines." 
      backgroundText="*Test* markdowned text. [I'm an inline-style link](https://www.google.com)"/>
    </div>
  );
}

export default App;
