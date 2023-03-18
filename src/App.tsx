import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { CardList } from './components/abstract';
import { TerrainMap, Heightmap } from './components/concrete';
import MapGenerator from './utils/MapGenerator';

const cardLists = {
  "cardList1": {
    cards: {
      "card-1": { content: "Card 1" },
      "card-2": { content: "Card 2" },
      "card-3": { content: "Card 3" },
      "card-4": null,
      "card-5": null,
      "card-6": null,
    },
    indicator: null,
  },
  "cardList2": {
    cards: {
      "card-1": { content: "Card 1" },
      "card-2": { content: "Card 2" },
      "card-3": { content: "Card 3" },
      "card-4": null,
      "card-5": null,
      "card-6": null,
    },
    indicator: null,
  },
}

function App() {
  const generator = new MapGenerator(2, 512, 512)
  return (
    <div className="App">
      <header className="App-header">
        <>
          {Object.entries(cardLists).map(([cardListKey, cardList], index) => <CardList
            key={index}
            listId={cardListKey}
            cardList={cardList}
          />
          )}
        </>
        {/*<Counter /> */}
        <TerrainMap height={512} width={512} scale={2} generator={generator} />
        <Heightmap height={512} width={512} scale={2} generator={generator} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
