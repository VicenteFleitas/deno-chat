import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use(async (ctx) => {
	await ctx.response.body = "Hello world! again.";
});

addEventListener("fetch", app.fetchEventHandler());