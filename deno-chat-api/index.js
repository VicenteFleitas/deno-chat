import { Application } from "https://deno.land/x/oak@v7.1.0/mod.ts"; //  oak@v7.1.0

const app = new Application();

app.use((ctx) => {
	ctx.response.body = "Hello world! again.";
});

addEventListener("fetch", app.fetchEventHandler());