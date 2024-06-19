document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.grid');
    const resetButton = document.getElementById('resetButton');
    const statusDisplay = document.getElementById('gameStatus');
    const gridSize = 16;
    const shipCount = 5;
    const maxClicks = 8;
    let clicks = 0;
    let shipsFound = 0;

    function generateShipPositions(shipCount, gridSize) {
        const positions = new Set();
        while (positions.size < shipCount) {
            positions.add(Math.floor(Math.random() * gridSize));
        }
        return Array.from(positions);
    }

    function disableAllCells() {
        const cells = document.querySelectorAll('.cells');
        cells.forEach(cell => {
            cell.removeEventListener('click', handleCellClick);
        });
    }

    function updateMessage(message) {
        statusDisplay.textContent = message;
    }

    function checkWinCondition() {
        if (shipsFound === shipCount) {
            updateMessage("Congratulations! You Won!");
            disableAllCells();
        }
    }

    function handleCellClick() {
        if (this.dataset.clicked === 'true') {
            return;
        }
        this.dataset.clicked = 'true';
        clicks++;
        

        if (this.dataset.hasShip) {
            this.style.backgroundImage = 'url("https://ucarecdn.com/ec668e99-6be4-42f9-aa7c-6a92c049353c/")';
            shipsFound++;
            updateMessage(`Yey! Remaining clicks: ${maxClicks - clicks}`);
            checkWinCondition();
        } 
        
        else {
            this.style.backgroundImage = 'url("https://ucarecdn.com/88b392a4-eb2d-4b7c-aa8e-ae4a4ece891b/")';
            updateMessage(`oops! Remaining clicks: ${maxClicks - clicks}`);
        }

        if (clicks >= maxClicks && shipsFound < shipCount) {
            updateMessage("Game Over, You Lose");
            disableAllCells();
        }
    }

    function createGrid() {
        const shipIndices = generateShipPositions(shipCount, gridSize);
        for (let i = 0; i < gridSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add("cells");
            if(shipIndices.includes(i)){
                cell.dataset.hasShip = true;
            }
            grid.appendChild(cell);
            cell.addEventListener('click', handleCellClick);
        }
    }

    createGrid();

    resetButton.addEventListener('click', function() {
        grid.innerHTML = ''; // Clear the grid
        createGrid(); // Recreate the grid
        clicks = 0;
        shipsFound = 0;
        updateMessage("Game reset! Start playing.");
    });

    const p = document.querySelector('p');
    p.addEventListener('mouseover',()=>{
        p.textContent = "You have to find the 5 hidden ships in 8 clicks.";
        p.style.transform = "scale(1.05)";
        p.style.transition = "0.3s ease";
        p.style.color = "brown";
    })
    p.addEventListener('mouseout', ()=>{
        p.textContent = "Instructions";
        p.style.transition = "0.3s ease";
        p.style.color = "black";
    })
});