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

// Requisições do chatbot
app.post("/mensagens", async (req, res) => {
  try {
    if (req.body.token === null || !req.body.token) {
      return res.json({ error: "Token inexistente" });
    }

    if (req.body.token !== "7e7ea27176aaadda5bc1eec0a25ff3f6") {
      return res.json({ error: "Token invalido" });
    }
    const chatId = req.body.chatId;
    const df = chatId.substr(0, 12);
    const data = await api.get(
      `messages?token=p7cszdv6dsfkct6z&lastMessageNumber=20&chatId=${df}%40c.us`
    );
    return res.json(data.data);
  } catch (error) {
    return res.json({ error: "Falha na requisição" });
  }
});

app.post("/group", async (req, res) => {
  try {
    const data = await api.post("group?token=p7cszdv6dsfkct6z", {
      groupName: req.body.name,
      phones: req.body.phone,
      messageText: req.body.message
    });

    return res.json(data.data);
  } catch (error) {
    return res.json({ error: "Falha na requisição" });
  }
});

app.get("/contatos", async (req, res) => {
  try {
    const data = await api.get("dialogs?token=p7cszdv6dsfkct6z");
    return res.json(data.data);
  } catch (error) {
    return res.json({ error: "Falha na requisição" });
  }
});

app.get("/status", async (req, res) => {
  try {
    const data = await api.get("status?token=p7cszdv6dsfkct6z");
    return res.json(data.data);
  } catch (error) {
    return res.json({ error: "Falha na requisição" });
  }
});

app.post("/leads", async (req, res) => {
  try {
    // Avisando que tem um novo leads
    const texto1 = `Oi ${req.body.name}, tudo bem?`;
    const texto2 = `Sou o William e falo aqui da Penta Incorporadora`;
    const texto3 = `Vi aqui que você demonstrou interesse em conhecer um de nossos condomínio fechados o ${req.body.product}. Por isso,  estou entrando em contato.`;
    const texto4 = `Posso te enviar algumas fotos do nosso decorado?`;
    const aviso = `Novo lead cadastrado - Nome: ${req.body.name} - Telefone: ${req.body.phone} - Produto: ${req.body.product}`;
    // Disparando aviso de novo lead
    const datas = await api.post("sendMessage?token=p7cszdv6dsfkct6z", {
      phone: "5562992208625",
      body: aviso
    });
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
  } catch (error) {
    return res.json({ error: "Falha na requisição" });
  }
});

app.post("/sendMessage", async (req, res) => {
  try {
    const data = await api.post("sendMessage?token=p7cszdv6dsfkct6z", {
      phone: req.body.phone,
      body: req.body.message
    });

    return res.json(data.data);
  } catch (error) {
    return res.json({ error: "Falha na requisição" });
  }
});

app.listen(process.env.PORT || 3000);
