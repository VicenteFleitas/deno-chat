import Rectangle from "./Rectangle.js";
import Text from "./Text.js";

class Input {
	constructor (x, y, placeHolder = "", width = 120, height = 40, padding = 4) {
		Object.assign(this, {x, y, width, height, placeHolder, padding } );
		this.re = /[a-zA-Z0-9]/;
		this.init();
	}
	init () {
		this.rect = new Rectangle(this.x, this.y, this.width, this.height, "#cdcdcd");
		this.content = new Text(this.x + this.padding, this.y + 25, this.placeHolder, "#000");

		window.addEventListener("keydown", e => {
			if (e.keyCode === 8) {
				this.content.text = this.content.text.slice(0, -1);
			} else {
				
				if (e.key.length === 1 && e.key.match(this.re)) {
					console.log(e.key.match(this.re)); // true
					this.content.text = this.content.text + e.key
				}
				
			}
			
		})
	}
	render(ctx) {
		this.rect.render(ctx);
		this.content.render(ctx);
	}
}

export default Input;