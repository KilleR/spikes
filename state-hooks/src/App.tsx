import React from 'react';
import './App.css';
import ToDo from "./components/ToDo";
import List from "./components/List";

function App() {
  return (
    <div className={'app'}>
      <ToDo></ToDo>
      <List></List>
    </div>
  );
}

export default App;
