document.getElementById("startButton").addEventListener("click", startGame);

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

const box = 20;
let snake, direction, food, score, gameInterval;

function startGame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";

    snake = [{ x: 10 * box, y: 10 * box }];
    direction = "RIGHT";
    food = generateFood();
    score = 0;
    scoreDisplay.textContent = score;

    document.addEventListener("keydown", changeDirection);
    clearInterval(gameInterval);
    gameInterval = setInterval(draw, 100);
}

function generateFood() {
    return {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
}

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function draw() {
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Dibujar serpiente con animación de color
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "limegreen" : "green";
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(segment.x, segment.y, box, box);
    });

    // Mover la serpiente
    let head = { ...snake[0] };

    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    // Verificar colisión con los bordes
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver();
        return;
    }

    // Verificar colisión con sí misma
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    // Comer comida
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = score;
        food = generateFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);
}

function gameOver() {
    clearInterval(gameInterval);
    alert("¡Game Over! Puntuación: " + score);
    document.getElementById("menu").style.display = "block";
    document.getElementById("gameContainer").style.display = "none";
}
