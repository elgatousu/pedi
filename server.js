const express = require("express");
const app = express();

let pedidos = 0;

app.get("/", (req, res) => {
    res.send("Servidor de pedidos activo");
});

app.get("/pedido", (req, res) => {

    const action = req.query.action;

    if (action === "add") {
        pedidos++;
        return res.send(` 🏍️ Pedido entregado | Total: ${pedidos}`);
    }

    if (action === "sub") {
        pedidos = Math.max(0, pedidos - 1);
        return res.send(`❌ Pedido cancelado | Total: ${pedidos}`);
    }

    if (action === "reset") {
        pedidos = 0;
        return res.send(`🔄 Contador reiniciado | Total: ${pedidos}`);
    }

    res.send(`🏍️ Total pedidos: ${pedidos}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor activo en puerto ${PORT}`);
});
