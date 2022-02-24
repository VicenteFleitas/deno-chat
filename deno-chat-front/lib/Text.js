import Sprite from "./Sprite.js";

class Text extends Sprite {
	constructor (x, y, text = "", color = "#fff", fontSize = 18, fontFamily = "Arial") {
		super();
		Object.assign(this, { x, y, color });
		this.text = text;
		this.fontSize = fontSize;
		this.fontFamily = fontFamily;
	}
	render(ctx) {
		this.width = ctx.measureText(this.text).width * (this.fontSize/10);
		this.height = ctx.measureText("M").width * (this.fontSize/10);

		ctx.save();
		ctx.globalAlpha = this.alpha;
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.font = `${this.fontSize}px ${this.fontFamily}`;
		ctx.fillText(this.text, this.x, this.y);
		ctx.fill();
		ctx.restore();
	}
}

export default Text;