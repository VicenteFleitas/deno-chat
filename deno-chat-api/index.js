// oak@v9.0.0 this version implements fetchEventHandler
import { Application, Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import Canvas from "https://deno.land/x/canvaseno/mod.ts";

const canvas = Canvas.createCanvas(200, 200);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#ff4500";
ctx.fillRect(10, 10, 50, 50);
let array = Array.from(canvas.toBuffer());

const messages = { x: 0, y: 0 };
const channel = new BroadcastChannel("chat");
channel.onmessage = (e) => {
  messages.push(e.data);
};

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Chat server!";
  })
  .get("/messages", (context) => {
    context.response.body = array;
  })
  .post("/messages", async (context) => {
    const message = await context.request.body().value;
    messages.push(message);
    channel.postMessage(message);
    context.response.body = messages;
  });

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

addEventListener("fetch", app.fetchEventHandler());
