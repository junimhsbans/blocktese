const express = require('express');

const app = express();

app.use(express.json());

app.post('/teste', (req, res) => {
    console.log(req.body);
})

app.get('/', (req, res) => {
    res.send('Helo Word');
})

app.listen(3000, () => {
    console.log('Rodando na porta 3000');
})
