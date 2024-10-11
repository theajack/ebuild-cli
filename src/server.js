import express from 'express';

const app = express();
const PORT = 3000;
 
app.get('/', (req, res) => {
    res.send('Hello!!');
});

const server = app.listen(PORT, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Server is listening at http://%s:%s', host, port);
});