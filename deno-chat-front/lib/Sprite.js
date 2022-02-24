class Sprite {
	constructor () {
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.color = "#dee6fe";
		this.alpha = 1;
		this.draggable = false;
		this.parent = undefined;
		this.vx = 0;
		this.vy = 0;
		this._layer = 0;
	}
	get layer() {
		return this._layer;
	}
	set layer(value) {
		this._layer = value;
		this.parent.children.sort((a, b) => a.layer - b.layer);
	}
	get halfWidth() {
		return this.width / 2;
	}
	get halfHeight() {
		return this.height / 2;
	}
	set visible(value) {
		this.alpha = value ? 1 : 0;
	}
	get visible() {
		return this.alpha === 1;
	}
	get centerX() {
		return this.x + this.width / 2;
	}
	get centerY() {
		return this.y + this.height / 2;
	}
	get gx() {
		if (this.parent) {
			return this.x + this.parent.gx;
		} else {
			return this.x;
		}
	}
	get gy() {
		if (this.parent) {
			return this.y + this.parent.gy;
		} else {
			return this.y;
		}
	}
}

export default Sprite;