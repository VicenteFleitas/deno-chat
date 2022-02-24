class Pointer {
	constructor () {
		// init vars
		this.x = 0;
		this.y = 0;
		this.dragOffsetX = 0;
		this.dragOffsetY = 0;
		this.state = undefined;
		this.dragSprite = null;
		this.draggableSprites = [];
		// add listeners
		window.addEventListener("mousedown", e => {
			this.x = e.clientX;
			this.y = e.clientY;
			this.state = "isDown";
		})
		window.addEventListener("mousemove", e => {
			this.x = e.clientX;
			this.y = e.clientY;
		})
		window.addEventListener("mouseup", e => {
			this.x = e.clientX;
			this.y = e.clientY;
			this.state = "isUp";
		})
	}
	// functions
	addDraggable(sprite) {
		sprite.draggable = true;
		this.draggableSprites.push(sprite);
	}
	removeDraggable(sprite) {
		sprite.draggable = false;
		this.draggableSprites.splice(this.draggableSprites.indexOf(sprite), 1);
	}
	updateDragAndDrop() {
		if (this.state === "isDown") {
			if (this.dragSprite === null) {
				for (let i = this.draggableSprites.length - 1; i > -1; i--) {
					let sprite = this.draggableSprites[i];
					if (this.hitTestPoint(this, sprite) && sprite.draggable) {
						this.dragOffsetX = this.x - sprite.gx;
						this.dragOffsetY = this.y - sprite.gy;
						this.dragSprite = sprite;
						// rearange sprite position on parent (stage)
						let children = sprite.parent.children;
						children.splice(children.indexOf(sprite), 1);
						children.push(sprite);
						// rearange draggableSprites too
						this.draggableSprites.splice(this.draggableSprites.indexOf(sprite), 1);
						this.draggableSprites.push(sprite);

						break; // break the loop
					}
				}
			} else {
				// move dragged sprite
				this.dragSprite.x = this.x - this.dragOffsetX;
				this.dragSprite.y = this.y - this.dragOffsetY;
			}
		}
		if (this.state === "isUp") {
			this.dragSprite = null;
		}
	}
	hitTestPoint(point, sprite) {
		// vars
		let shape, left, right, top, bottom, vx, vy, magnitude, hit;
		// if circle
		if (sprite.radius) {
			shape = "circle";
		} else {
			shape = "rectangle";
		}

		// Rectangle
		if (shape === "rectangle") {
			// Get the position of the sprite's edges
			left = sprite.x;
			right = sprite.x + sprite.width;
			top = sprite.y;
			bottom = sprite.y + sprite.height;
			// Find out if the point is intersecting the rectangle
			hit = point.x > left && point.x < right && point.y > top && point.y < bottom;
		}

		// Circle
		if (shape === "circle") {
			// Find the distance between the point and the
			// center of the circle
			vx = point.x - sprite.centerX,
			vy = point.y - sprite.centerY,
			magnitude = Math.sqrt(vx * vx + vy * vy);

			// The point is intersecting the circle if the magnitude
			// (distance) is less than the circle's radius
			hit = magnitude < sprite.radius;
		}

		// `hit` will be either `true` or `false`
		return hit;
	}
}

export default Pointer;