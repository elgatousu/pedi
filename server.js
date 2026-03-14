const express = require("express");
const app = express();

let pedidos = 0;

app.get("/pedido", (req, res) => {

    const action = req.query.action;

    if(action === "add"){
        pedidos++;
        return res.send(`?? Pedido recibido | Total: ${pedidos}`);
    }

    if(action === "sub"){
        pedidos = Math.max(0, pedidos - 1);
        return res.send(`? Pedido cancelado | Total: ${pedidos}`);
    }

    if(action === "reset"){
        pedidos = 0;
        return res.send(`?? Contador reiniciado`);
    }

    res.send(`?? Total pedidos: ${pedidos}`);
});

app.listen(3000, () => console.log("Servidor activo"));