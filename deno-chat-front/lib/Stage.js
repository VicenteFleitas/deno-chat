class Stage {
	constructor(width = 1080, height = 512, color = "#cdcdcd") {
		Object.assign(this, { width: width, height: height, color: color });
		this.children = [];
		this.gx = 0;
		this.gy = 0;
		this.x = 0;
		this.y = 0;
		// add canvas
		this.canvas = document.createElement('canvas');
		document.body.appendChild(this.canvas)
		this.canvas.style.background = this.color;
		this.canvas.setAttribute("width", this.width);
		this.canvas.setAttribute("height", this.height);
		this.ctx = this.canvas.getContext('2d');
		console.log("Canvas as stage");
	}
	addChild(sprite) {
		this.children.push(sprite);
		sprite.parent = this;
		sprite._layer = this.children.length;
		sprite.render(this.ctx);
	}
	removeChild(sprite) {
		if(sprite.parent === this) {
			this.children.splice(this.children.indexOf(sprite), 1);
			sprite.parent = undefined;
		}
	}
	render() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.children.forEach(sprite => {
			sprite.render(this.ctx);
		})
	}
}

export default Stage;