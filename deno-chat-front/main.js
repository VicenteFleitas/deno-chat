import Stage from "./lib/Stage.js";
import Pointer from "./lib/Pointer.js";
import { colorsDB } from "./lib/utils.js";
import Text from "./lib/Text.js";
import Input from "./lib/Input.js";
import Rectangle from "./lib/Rectangle.js";

let stage = new Stage(1080, 512, colorsDB[0]);
let pointer = new Pointer();
let messages = [];

let inputText = new Input(20, 20);
stage.addChild(inputText);

let btn = new Rectangle(20, 70, 100, 40, colorsDB[11]);
btn.click = false;
stage.addChild(btn);

const getMessages = async () => {
	const res = await fetch('https://vicen-deno-chat-api.deno.dev/messages');
	const data = await res.json();

	// clear text
	stage.children.forEach((child, i) => {
		if (child.text) {
			stage.children.splice(i, 1);
		}
	})
	// create text
	data.forEach((data, i) => {
		let msn = new Text(200, 30 + (25 * i), data.text, colorsDB[15], 18);
		stage.addChild(msn);
	})
}

const sendMessage = async (message) => {
	let data = {
		text: message
	}
	let resp = await fetch("https://vicen-deno-chat-api.deno.dev/messages", {
		method: 'POST',
		headers: {
			"content-type": "application/json"
		},
		body: JSON.stringify(data)
	})

	return resp;
}

getMessages();

function loop() {
	requestAnimationFrame(loop);

	if (pointer.hitTestPoint(pointer, btn)) {
		if (pointer.state === "isDown" && !btn.click) {
			console.log("send")
			sendMessage(inputText.content.text).then(res => {
				if (res.status === 200) {
					getMessages();
				}
			})
			btn.click = true;
		}
		if (pointer.state === "isUp" && btn.click) {
			btn.click = false;
		}
	}

	stage.render();
}

loop();