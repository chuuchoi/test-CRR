import React, { useState, useRef } from 'react';

// Simple card data type
interface Card {
  id: number;
  text: string;
}

// Column labels for statuses
const columns = ['Pending', 'Confirmed', 'Cancelled'];

// Initial board data: 3 columns with cards
const initialBoard = [
  [ { id: 1, text: 'Card 1' }, { id: 2, text: 'Card 2' } ],
  [ { id: 3, text: 'Card 3' } ],
  [ { id: 4, text: 'Card 4' }, { id: 5, text: 'Card 5' } ],
];

export default function Board() {
  const [board, setBoard] = useState<Card[][]>(initialBoard);
  const dragCard = useRef<{card: Card; fromCol: number; fromIdx: number} | null>(null);

  // Handle drag start
  function onDragStart(card: Card, fromCol: number, fromIdx: number) {
    dragCard.current = { card, fromCol, fromIdx };
  }

  // Handle drop
  function onDrop(toCol: number, toIdx: number) {
    if (!dragCard.current) return;
    const { card, fromCol, fromIdx } = dragCard.current;
    if (fromCol === toCol && fromIdx === toIdx) return;
    setBoard(prev => {
      // Remove card from old position
      const newBoard = prev.map(col => [...col]);
      newBoard[fromCol].splice(fromIdx, 1);
      // Insert card at new position
      newBoard[toCol].splice(toIdx, 0, card);
      return newBoard;
    });
    dragCard.current = null;
  }

  // Handle drag over
  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  return (
    <div className="flex gap-4 p-8 bg-gray-100 min-h-screen">
      {board.map((col, colIdx) => (
        <div key={colIdx} className="bg-white rounded shadow p-4 w-64 min-h-[300px] flex flex-col gap-2">
          <div className="font-bold mb-2 text-center">{columns[colIdx]}</div>
          {col.map((card, cardIdx) => (
            <div
              key={card.id}
              className="bg-blue-100 rounded p-2 mb-2 cursor-move shadow hover:bg-blue-200 transition"
              draggable
              onDragStart={() => onDragStart(card, colIdx, cardIdx)}
              onDragOver={onDragOver}
              onDrop={() => onDrop(colIdx, cardIdx)}
            >
              {card.text}
            </div>
          ))}
          {/* Drop zone at end of column */}
          <div
            className="flex-1"
            onDragOver={onDragOver}
            onDrop={() => onDrop(colIdx, col.length)}
          />
        </div>
      ))}
    </div>
  );
}
