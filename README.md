# 🎮 Tic Tac Toe Game

A simple and interactive **Tic Tac Toe** game built using **HTML, CSS, and JavaScript**.  
This beginner-friendly project helps you understand **DOM manipulation**, **event handling**, and **basic game logic** in JavaScript.

Live Demo:  
https://jaivpatel07.github.io/Tic-Tac-Toe/

---

## 📂 Project Structure

```
Tic-Tac-Toe/
│── index.html
│── style.css
│── scripts.js
│── README.md
```

---

## 🚀 How to Run the Project

1. Download or clone this repository
2. Make sure all files are in the same folder
3. Open `index.html` in any modern web browser
4. Start playing 🎉

---

## 🕹️ How to Play

- The game is played on a 3×3 grid
- Player X starts first
- Players take turns clicking on empty cells
- The first player to align 3 symbols (row, column, or diagonal) wins
- If all cells are filled and no one wins → Draw

---

## 🧠 Game Logic Explanation

### Board Representation

```js
let board = ["", "", "", "", "", "", "", "", ""];
```

```
0 | 1 | 2
3 | 4 | 5
6 | 7 | 8
```

---

### Player Turn Handling

```js
let currentPlayer = "X";
currentPlayer = currentPlayer === "X" ? "O" : "X";
```

---

### Cell Click Logic

- Detect clicked cell using `data-index`
- Prevent clicking on filled cells
- Store the move in the board array
- Display X or O on the UI

---

### Winning Logic

```js
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];
```

---

### Draw Condition

```js
if (!board.includes(""))
```

---

### Restart Game

```js
resetGame();
```

---

## 🛠️ Technologies Used

- HTML5
- CSS
- JavaScript

---

## 🌟 Features

- Two-player mode (X vs O)
- Win & draw detection
- Restart button
- Beginner-friendly code

---

## 📷 Screenshot

![Tic Tac Toe Screenshot](image.png)

---

## 👨‍💻 Author

Jaiv Patel
