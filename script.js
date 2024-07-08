let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

class Vector2D {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	add(res) {
		return new Vector2D(this.x + res.x, this.y + res.y);
	}

	sub(res) {
		return new Vector2D(this.x - res.x, this.y - res.y);
	}

	scale(s) {
		return new Vector2D(this.x * s, this.y * s);
	}
}
function fillCircle(context, center, r, color) {
	context.beginPath();
	context.arc(center.x, center.y, r, 0, Math.PI * 2, 0);
	context.fillStyle = color;
	// context.lineWidth = 0;
	// context.strokeWidth = 0;
	// context.strokeStyle = "#181818"
	// context.stroke();
	context.fill();
}

let radius = 10;
let pos = new Vector2D(radius + 10, radius + 10);
let velocity = new Vector2D(0, 0);
let speed = 500;
let dx = 1;
let dy = 1;
let start;

let directionMap = {
	'KeyS': new Vector2D(0, speed),
	'KeyW': new Vector2D(0, -speed),
	'KeyA': new Vector2D(-speed, 0),
	'KeyD': new Vector2D(speed, 0),
};

document.addEventListener("DOMContentLoaded", () => {
	function step(timeStamp) {
		if (start === undefined) {
			start = 0;
		}
		const dt = (timeStamp - start) * 0.001;
		start = timeStamp;

		const width = window.innerWidth;
		const height = window.innerHeight;
		canvas.width = width;
		canvas.width = height;

		pos = pos.add(velocity.scale(dt));

		ctx.clearRect(0, 0, width, height);
		fillCircle(ctx, pos, radius, "red");
		window.requestAnimationFrame(step)
	}

	document.addEventListener('keydown', event => {
		if (event.code in directionMap) {
            velocity = velocity.add(directionMap[event.code]);
        }
	});

	document.addEventListener('keyup', event => {
		if (event.code in directionMap) {
            velocity = velocity.sub(directionMap[event.code]);
        }
	});

	window.requestAnimationFrame(step);
});
