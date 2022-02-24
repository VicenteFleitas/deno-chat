import Sprite from "./Sprite.js";
import { colorsDB } from "./utils.js";

class Rectangle extends Sprite {
	constructor (x, y, width, height, color = "#fff", lineColor = "#000", lineWidth = 0) {
		super();
		Object.assign(this, { x, y, width, height, color, lineColor, lineWidth });
	}
	render(ctx) {
			ctx.save();
			ctx.globalAlpha = this.alpha;
			ctx.beginPath();
			ctx.rect(this.x, this.y, this.width, this.height);
			if (this.lineWidth !== 0) {
				ctx.lineWidth = this.lineWidth;
				ctx.strokeStyle = this.lineColor;
				ctx.stroke();
			}
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.restore();
			ctx.save();
			ctx.restore();
	} 
}

export default Rectangle;