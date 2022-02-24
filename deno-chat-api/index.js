addEventListener("fetch", e => {
	const res = new Response("Hello my world!", {
		headers: { "content-type": "text/plain" }
	})
	e.respondWith(res);
})