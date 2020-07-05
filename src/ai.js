import React, { Component } from 'react';

const getEmptyCells = (squares) => {
    return squares
      .map((val, idx) => [val, idx])
      .filter(item => item[0] === null);
  }
  
  const isMoveLeft = (squares) => {
    const emptyCells = getEmptyCells(squares);
    return emptyCells.length > 0;
  }
const utility = (squares, ai) => {
    const lines = [
      [0, 1, 2], // h.h0
      [3, 4, 5], // h.h1 
      [6, 7, 8], // h.h2
      [0, 3, 6], // v.v0
      [1, 4, 7], // v.v1
      [2, 5, 8], // v.v2
      [0, 4, 8], // d.d0
      [2, 4, 6]  // d.d1
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
  
      if (squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c]) {
        if (squares[a] === ai) return 10;
        return -10;
      }
    }
  
    return 0;
  }
const minimax = (squares, depth, ai, isMax) => {
    const score = utility(squares, ai);
  
    // If Maximizer has won the game return his/her evaluated score 
    if (score === 10) return score - depth;
  
    // If Minimizer has won the game return his/her evaluated score 
    if (score === -10) return score + depth;
  
    // If there are no more moves and no winner then it is a tie 
    if (!isMoveLeft(squares)) return 0;
  
    const lengthGrid = squares.length;
    let best;
  
    // If this maximizer's move 
    if (isMax) {
      best = -1000;
  
      for (let i = 0; i < lengthGrid; i++) {
        const cell = squares[i];
  
        if (cell === null) {
          // Make a move
          const next= squares.slice();
          next[i]=ai;
  
          // Call minimax recursively and choose the maximum value
          best = Math.max(best, minimax(next, depth + 1, ai, !isMax));
        }
      }
    } else {
      best = 1000;
  
      for (let i = 0; i < lengthGrid; i++) {
        const cell = squares[i];
  
        if (cell === null) {
          // Make a move
          const next= squares.slice();
          next[i]='X';  
          // Call minimax recursively and choose the minimum value
          best = Math.min(best, minimax(next, depth + 1, ai, !isMax));
        }
      }
    }
  
    return best;
  }
 
 const findBestMove = (squares, ai,level) => {
    let bestVal = -1000;
    let bestMove = null;
  
    const lengthGrid = squares.length;
    //console.log(squares);
  
    for (let i = 0; i < lengthGrid; i++) {
      const cell = squares[i];
      //console.log(i);
      //console.log(cell)
      if (cell === null) {
        // Make a move
        const next= squares.slice();
        next[i]=ai;  
        // Compute evaluation function for this move. 
        const moveVal = minimax(next, level, ai, false);
  
        // If the value of the current move is more than the best value, then update best
        if (moveVal > bestVal) {
          bestVal = moveVal;
          bestMove = i;
        }
      }
    }
  
    return bestMove;
  }
  export default findBestMove;