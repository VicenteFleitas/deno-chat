import { Application, Router } from "https://deno.land/x/oak@v9.0.0/mod.ts"; //  oak@v7.1.0

const messages = [];

const router = new Router();
router
	.get("/", (context) => {
		context.response.body = "Chat server!";
	})
	.get("/messages", (context) => {
		context.response.body = messages;
	})
	.post("/messages", async (context) => {
		const message = await context.request.body().value;
		messages.push(message);
		context.response.body = messages;
	});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

addEventListener("fetch", app.fetchEventHandler());