import React, {useState, useEffect} from 'react';
import Firestore from './services/firestore.js';
import Board from './Board';

function Create(props) {
  const [grid, setGrid] = useState([]);

  async function saveGrid(e) {
    e.preventDefault();
    let fields = e.target.elements;
    let email = fields['email'].value;
    let title = fields['title'].value;
    const createdGrid = await Firestore.add.grid(email, title, grid);
    if (createdGrid === null) { /* error */ }
    console.log(createdGrid);
    return false;
  }

  return (
    <div>
    <form onSubmit={saveGrid}>
      Email: <input name="email" />
      Title: <input name="title" />
      <button type="submit">Save</button>
    </form>
    <Board setGrid={setGrid} />
    </div>
  );
}

export default Create;
