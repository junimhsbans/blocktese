const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/teste', (req, res) => {
    console.log(req.body);
})

app.get('/', (req, res) => {
    res.send('Helo Word');
})

app.listen(3000, () => {
    console.log('Rodando na porta 3000');
})
