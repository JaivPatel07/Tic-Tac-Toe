document.addEventListener("DOMContentLoaded", () => {

    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const modeButton = document.getElementById("mode");
    const boardElement = document.querySelector(".board");

    const HUMAN = "X";
    const AI = "O";

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = HUMAN;
    let gameActive = true;
    let currentMode = "pvp";

    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    statusText.textContent = `Player ${currentPlayer}'s turn`;
    document.body.classList.add("turn-x");

    modeButton.textContent = "Switch to AI";
    modeButton.addEventListener("click", () => {
        if (currentMode === "pvp") {
            currentMode = "ai";
            modeButton.textContent = "Switch to PvP";
        } else {
            currentMode = "pvp";
            modeButton.textContent = "Switch to AI";
        }
        resetGame();
    });

    // Cell click
    cells.forEach(cell => cell.addEventListener("click", handleClick));

    function handleClick(e) {
        const index = e.target.dataset.index;

        if (!gameActive || board[index] !== "") return;

        // Player vs Player
        if (currentMode === "pvp") {
            makeMove(index, currentPlayer);
            return;
        }

        // Player vs AI
        if (currentMode === "ai") {
            makeMove(index, HUMAN);

            if (gameActive) {
                setTimeout(() => {
                    const bestMove = getBestMove();
                    makeMove(bestMove, AI);
                }, 400);
            }
        }
    }

    function makeMove(index, player) {
        board[index] = player;
        cells[index].textContent = player;
        checkWinner();
    }

    function checkWinner() {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;

            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;

                // Show ONLY WIN / LOSE
                if (currentMode === "ai") {
                    statusText.textContent = board[a] === HUMAN ? "WIN" : "LOSE";
                } else {
                    statusText.textContent = "WIN";
                }

                statusText.classList.add("big-result");
                boardElement.classList.add("disabled");
                document.body.classList.remove("turn-x", "turn-o");
                return;
            }
        }

        if (!board.includes("")) {
            gameActive = false;
            statusText.textContent = "DRAW";
            statusText.classList.add("big-result");
            boardElement.classList.add("disabled");
            document.body.classList.remove("turn-x", "turn-o");
            return;
        }

        currentPlayer = currentPlayer === HUMAN ? AI : HUMAN;
        statusText.textContent = `Player ${currentPlayer}'s turn`;
        document.body.classList.toggle("turn-x", currentPlayer === HUMAN);
        document.body.classList.toggle("turn-o", currentPlayer === AI);
    }

    // ---------- MINIMAX AI ----------

    function evaluate(boardState) {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                boardState[a] &&
                boardState[a] === boardState[b] &&
                boardState[a] === boardState[c]
            ) {
                return boardState[a] === AI ? 10 : -10;
            }
        }
        return 0;
    }

    function minimax(boardState, depth, isMaximizing) {
        const score = evaluate(boardState);

        if (score === 10) return score - depth;
        if (score === -10) return score + depth;
        if (!boardState.includes("")) return 0;

        if (isMaximizing) {
            let best = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (boardState[i] === "") {
                    boardState[i] = AI;
                    best = Math.max(best, minimax(boardState, depth + 1, false));
                    boardState[i] = "";
                }
            }
            return best;
        } else {
            let best = Infinity;
            for (let i = 0; i < 9; i++) {
                if (boardState[i] === "") {
                    boardState[i] = HUMAN;
                    best = Math.min(best, minimax(boardState, depth + 1, true));
                    boardState[i] = "";
                }
            }
            return best;
        }
    }

    function getBestMove() {
        let bestScore = -Infinity;
        let move = null;

        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = AI;
                let score = minimax(board, 0, false);
                board[i] = "";

                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    }
    window.resetGame = function () {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = HUMAN;
        gameActive = true;

        statusText.textContent = `Player ${currentPlayer}'s turn`;
        statusText.classList.remove("big-result");

        boardElement.classList.remove("disabled");

        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("win");
        });

        document.body.classList.add("turn-x");
        document.body.classList.remove("turn-o");
    };

});
