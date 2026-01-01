document.addEventListener("DOMContentLoaded", () => {

    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");

    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    statusText.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.addEventListener("click", handleClick);
    });

    function handleClick(e) {
        const index = e.target.dataset.index;

        if (board[index] !== "" || !gameActive) {
            return;
        }

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        checkWinner();
    }

    function checkWinner() {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;

            if (board[a] &&
                board[a] === board[b] &&
                board[a] === board[c]) {
                statusText.textContent = `Player ${currentPlayer} Wins!`;
                gameActive = false;
                alert(`Player ${currentPlayer} Wins!`);
                return;
            }
        }

        if (!board.includes("")) {
            statusText.textContent = "It's a Draw!";
            
            gameActive = false;
            alert("It's a Draw!");
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }

    window.resetGame = function () {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;
        statusText.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = "");
    };

});
