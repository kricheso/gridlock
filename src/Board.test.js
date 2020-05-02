
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Board from './Board';

const default_grid ={
  title: "Armada",
  creatorDisplayName: "Jeremy",
  data: [
    ["1", "1", "1", "1"],
    ["1", "1", "S", "1"],
    ["0", "0", "1", "1"],
    ["0", "0", "F", "0"]]
};

const arrow = {
  up: { key: "ArrowUp", code: "ArrowRight", keyCode: 38, type:"keydown" },
  down: { key: "ArrowDown", code: "ArrowDown", keyCode: 40, type:"keydown" },
  left: { key: "ArrowLeft", code: "ArrowLeft", keyCode: 37, type:"keydown" },
  right: { key: "ArrowRight", code: "ArrowRight", keyCode: 39, type:"keydown" },
}

describe('Board component', () => {
  test('Create mode adds columns', async () => {
    const { container } = render(<Board />);
    expect(container.querySelector('tr').children.length).toBe(1);
    act(()=>{fireEvent.keyDown(document, arrow.right);});
    expect(container.querySelector('tr').children.length).toBe(2);
    act(()=>{fireEvent.keyDown(document, arrow.left);});
    expect(container.querySelector('tr').children.length).toBe(1);
  });

  test('Create mode adds rows', async () => {
    const { container } = render(<Board />);
    expect(container.querySelector('tbody').children.length).toBe(1);
    act(()=>{fireEvent.keyDown(document, arrow.up);});
    expect(container.querySelector('tbody').children.length).toBe(2);
    act(()=>{fireEvent.keyDown(document, arrow.down);});
    expect(container.querySelector('tbody').children.length).toBe(1);
  });

  test('Play mode selects adjacent cell', async () => {
    const { container } = render(<Board grid={default_grid.data} />);
    expect(!container.querySelectorAll('tr')[1].children[1].className.includes("seen"));
    act(()=>{fireEvent.keyDown(document, arrow.left);});
    expect(container.querySelectorAll('tr')[1].children[1].className.includes("seen"));
  });
});
