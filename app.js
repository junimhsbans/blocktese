const express = require("express");
var api = require("./api");
var cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/teste", (req, res) => {
  console.log(req.body);
  return res.json({ ok: true });
});

app.post("/reqs", (req, res) => {
  console.log(req);
  return res.json({ ok: true });
});

app.get("/get", (req, res) => {
  console.log(req.query);
  // console.log(req.params)
  return res.json({ ok: true });
});

app.get("/mensagens", async (req, res) => {
  const data = await api.get(
    "messages?token=p7cszdv6dsfkct6z&lastMessageNumber=20&chatId=5562985380621%40c.us"
  );
  return res.json(data.data);
});

app.post("/group", async (req, res) => {
  const data = await api.post("group?token=p7cszdv6dsfkct6z", {
    groupName: req.body.name,
    phones: req.body.phone,
    messageText: req.body.message
  });

  return res.json(data.data);
});

app.get("/status", async (req, res) => {
  const data = await api.get("status?token=p7cszdv6dsfkct6z");
  return res.json(data.data);
});

app.post("/leads", async (req, res) => {
  // Avisando que tem um novo leads
  const texto1 = `Oi ${req.body.name}, tudo bem?`;
  const texto2 = `Sou o William e falo aqui da Penta Incorporadora`;
  const texto3 = `Vi aqui que você demonstrou interesse em conhecer um de nossos condomínio fechados o ${req.body.product}. Por isso,  estou entrando em contato.`;
  const texto4 = `Posso te enviar algumas fotos do nosso decorado?`;
  // Enviando mensagem para o cliente
  const data = await api.post("sendMessage?token=p7cszdv6dsfkct6z", {
    phone: req.body.phone,
    body: texto1
  });
  const data1 = await api.post("sendMessage?token=p7cszdv6dsfkct6z", {
    phone: req.body.phone,
    body: texto2
  });
  setTimeout(async () => {
    const data3 = await api.post("sendMessage?token=p7cszdv6dsfkct6z", {
      phone: req.body.phone,
      body: texto3
    });
  }, 6000);
  setTimeout(async () => {
    const data4 = await api.post("sendMessage?token=p7cszdv6dsfkct6z", {
      phone: req.body.phone,
      body: texto4
    });
  }, 9000);

  return res.json({ ok: "Enviado com sucesso" });
});

app.post("/sendMessage", async (req, res) => {
  const data = await api.post("sendMessage?token=p7cszdv6dsfkct6z", {
    phone: req.body.phone,
    body: req.body.message
  });

  return res.json(data.data);
});

app.listen(process.env.PORT || 3000);
