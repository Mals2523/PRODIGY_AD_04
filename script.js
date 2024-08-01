const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  let currentPlayer = "X";
  let gameActive = true;
  const gameState = ["", "", "", "", "", "", "", "", ""];
  let player1Name = "Player 1";
  let player2Name = "Player 2";
  
  document.getElementById('start-game').addEventListener('click', () => {
    player1Name = document.getElementById('player1-name').value || 'Player 1';
    player2Name = document.getElementById('player2-name').value || 'Player 2';
    document.getElementById('game-status').textContent = `${player1Name}'s turn (X)`;
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
  });
  
  document.querySelectorAll('.grid-item').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });
  
  function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.id);
  
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }
  
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer === "X" ? "❌" : "⭕";
  
    if (checkWinner()) {
      const winnerName = currentPlayer === "X" ? player1Name : player2Name;
      document.getElementById('game-status').innerHTML = `<span class="winner-text">${winnerName} wins!</span>`;
      document.querySelector('.winner-text').classList.add('animate-winner');
      gameActive = false;
    } else if (gameState.includes("")) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      document.getElementById('game-status').textContent = `${currentPlayer === "X" ? player1Name : player2Name}'s turn (${currentPlayer === "X" ? "❌" : "⭕"})`;
    } else {
      document.getElementById('game-status').textContent = "It's a draw!";
    }
  }
  
  function checkWinner() {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        document.getElementById(a).classList.add('winning-cell');
        document.getElementById(b).classList.add('winning-cell');
        document.getElementById(c).classList.add('winning-cell');
        return true;
      }
    }
    return false;
  }
  
  document.getElementById('reset-game').addEventListener('click', () => {
    gameActive = true;
    currentPlayer = "X";
    gameState.fill("");
    document.querySelectorAll('.grid-item').forEach(cell => {
      cell.textContent = "";
      cell.classList.remove('winning-cell');
    });
    document.getElementById('game-status').textContent = `${player1Name}'s turn (X)`;
  });
  