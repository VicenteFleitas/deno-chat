addEventListener("fetch", e => {
	const res = new Response("Hello world!", {
		headers: { "content-type": "text/plain" }
	})
	e.respondWith(res);
})