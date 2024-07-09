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
	context.fill();
}

let radius = 10;
let pos = new Vector2D(radius + 10, radius + 10);
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

let pressedKeys = new Set();

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
        
        let velocity = new Vector2D(0, 0);
        for (let key of pressedKeys) {
            if (key in directionMap) {
                velocity = velocity.add(directionMap[key]);
            }
        }
		pos = pos.add(velocity.scale(dt));

		ctx.clearRect(0, 0, width, height);
		fillCircle(ctx, pos, radius, "red");
		window.requestAnimationFrame(step)
	}

	document.addEventListener('keydown', event => {
		pressedKeys.add(event.code);
	});

	document.addEventListener('keyup', event => {
		pressedKeys.delete(event.code);
	});

	window.requestAnimationFrame(step);
});
