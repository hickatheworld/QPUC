import express from 'express';

const server = express();

server.get('/', (req, res) => {
	res.send('Never gonna give you up, never gonna let you down.');
});

server.listen(8080, () => console.log('Listening.'))