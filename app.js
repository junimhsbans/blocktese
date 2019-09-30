const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/teste', (req, res) => {
    console.log(req.body);
    return res.json({ ok: true });
})

app.post('/reqs', (req, res) => {
    console.log(req);
    console.log("--------------------------------------------------------------------------------");
    console.log(req.data);
    return res.json({ ok: true });
})

app.get('/', (req, res) => {
    res.send('Helo Word');
})

app.listen(process.env.PORT || 3000);
