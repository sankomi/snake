const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;
const UP = 4;

let head = {x: 4, y: 0};
let direction = RIGHT;
let lastDirection;
let length = 5;

const grid = [];
const divs = [];
const game = document.createElement("div");
game.classList.add("game");
document.body.appendChild(game);
for (let i = 0; i < 10; i++) {
	grid[i] = [];
	divs[i] = [];
	for (let j = 0; j < 10; j++) {
		grid[i][j] = 0;
		divs[i][j] = document.createElement("div");
		divs[i][j].classList.add("tile");
		game.appendChild(divs[i][j]);
	}
}
grid[0][4] = 1;
grid[1][4] = 2;
grid[2][4] = 3;
grid[3][4] = 4;
grid[4][4] = 5;

draw();
let intId;

function reset() {
	dead = false;

	head = {x: 4, y: 4};
	direction = RIGHT;
	length = 5;

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			grid[i][j] = 0;
		}
	}
	grid[0][4] = 1;
	grid[1][4] = 2;
	grid[2][4] = 3;
	grid[3][4] = 4;
	grid[4][4] = 5;

	let x, y;
	do {
		x = Math.floor(10 * Math.random());
		y = Math.floor(10 * Math.random());
	} while (grid[x][y] !== 0)
	grid[x][y] = -1;

	draw();
	clearInterval(intId);
	intId = setInterval(update, 500);
}

const buttons = document.createElement("div");
buttons.classList.add("buttons");
const topButtons = document.createElement("div");
const bottomButtons = document.createElement("div");
const otherButtons = document.createElement("div");
document.body.appendChild(buttons);
buttons.appendChild(otherButtons);
buttons.appendChild(topButtons);
buttons.appendChild(bottomButtons);

const down = document.createElement("button");
down.textContent = "down";
const up = document.createElement("button");
up.textContent = "up";
const left = document.createElement("button");
left.textContent = "left";
const right = document.createElement("button");
right.textContent = "right";

topButtons.appendChild(up);
bottomButtons.appendChild(left);
bottomButtons.appendChild(down);
bottomButtons.appendChild(right);

down.addEventListener("click", changeDirection.bind(this, DOWN));
up.addEventListener("click", changeDirection.bind(this, UP));
left.addEventListener("click", changeDirection.bind(this, LEFT));
right.addEventListener("click", changeDirection.bind(this, RIGHT));
window.addEventListener("keydown", event => {
	switch (event.key) {
		case "ArrowUp":
			changeDirection(UP);
			break;
		case "ArrowDown":
			changeDirection(DOWN);
			break;
		case "ArrowLeft":
			changeDirection(LEFT);
			break;
		case "ArrowRight":
			changeDirection(RIGHT);
			break;
		case "Enter":
			if (dead) {

			}
	}
});

function changeDirection(dir) {
	if (dir === DOWN && lastDirection !== UP) {
		direction = dir;
	} else if (dir === UP && lastDirection !== DOWN) {
		direction = dir;
	} else if (dir === RIGHT && lastDirection !== LEFT) {
		direction = dir;
	} else if (dir === LEFT && lastDirection !== RIGHT) {
		direction = dir;
	}
}

const start = document.createElement("button");
start.textContent = "start";
otherButtons.appendChild(start);
start.addEventListener("click", event => {
	if (!dead) return;
	reset();
});

let dead = true;

function update() {
	const newHead = {x: head.x, y: head.y};
	switch (direction) {
		case RIGHT:
			newHead.x += 1;
			break;
		case LEFT:
			newHead.x -= 1;
			break;
		case DOWN:
			newHead.y += 1;
			break;
		case UP:
			newHead.y -= 1;
			break;
	}

	let grow = false;

	if (newHead.x < 0 || newHead.x > 9) {
		alert("dead");
		clearInterval(intId);
		dead = true;
		return;
	} else if (newHead.y < 0 || newHead.y > 9) {
		alert("dead");
		clearInterval(intId);
		dead = true;
		return;
	} else if (grid[newHead.x][newHead.y] > 1) {
		alert("dead");
		clearInterval(intId);
		dead = true;
		return;
	} else if (grid[newHead.x][newHead.y] === -1) {
		grow = true;
		let x, y;
		do {
			x = Math.floor(10 * Math.random());
			y = Math.floor(10 * Math.random());
		} while (grid[x][y] !== 0 || length >= 99)
		grid[x][y] = -1;

		clearInterval(intId);
		intId = setInterval(update, 515 - length * 3);
	}
	
	head = newHead;
	grid[head.x][head.y] = length + 1;
	
	if (!grow) {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				if (grid[i][j] > 0) {
					grid[i][j] -= 1;
				}
			}
		}
	} else {
		length += 1;
	}

	lastDirection = direction;
	draw();
}

function draw() {
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			if (grid[i][j] > 0) {
				divs[j][i].textContent = "x";
			} else if (grid[i][j] === -1 ) {
				divs[j][i].textContent = "o";
			} else {
				divs[j][i].textContent = "";
			}
		}
	}
}
