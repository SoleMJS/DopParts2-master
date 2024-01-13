const server = http.createServer(async (request, response) => {
	if (request.method === 'GET') {
		const content = await fs.readFile(path.join(basePath, 'index.html'))
		response.setHeader('Content-Type', 'text/html') // Чтобы браузер понимал что работает с html если напишу plain то будет только контент файла
		response.writeHead(200, {
			'Content-Type': 'text/html',
		}) // statusCode , headers
		response.end(content)
	} else if (request.method === 'POST') {
		const body = []
		response.writeHead(200, {
			'Content-Type': 'text/plain; charset=utf-8',
		}) // Для старых браузеров лучше это писать чтобы все хорошо считывалось

		request.on('data', data => {
			body.push(Buffer.from(data))
		})
		request.on('end', () => {
			const title = body.toString().split('=')[1].replaceAll('+', ' ')
			addNote(title)
			response.end(`Title = ${title}`)
		})
	}
})
