const express = require("express");

const app = express();

const SUPABASE_URL = "https://jbaaxihuboiedptfqgrg.supabase.co";
const SUPABASE_KEY = "sb_publishable_Yu30CA4em3Adad3gkpA_Nw_-aYmjo4B";

// 🔥 obtener pedidos
async function getPedidos() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/contador?id=eq.1`, {
        headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`
        }
    });

    if (!res.ok) {
        throw new Error("Error GET pedidos");
    }

    const data = await res.json();
    return data?.[0]?.pedidos || 0;
}

// 🔥 actualizar pedidos
async function setPedidos(valor) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/contador?id=eq.1`, {
        method: "PATCH",
        headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal"
        },
        body: JSON.stringify({ pedidos: valor })
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error("Error PATCH: " + txt);
    }
}

app.get("/", (req, res) => {
    res.send("Servidor de pedidos activo");
});

// 🔥 endpoint principal
app.get("/pedido", async (req, res) => {
    try {
        const action = req.query.action;

        let pedidos = await getPedidos();

        if (action === "add") {
            pedidos++;
            await setPedidos(pedidos);
            return res.send(`📦 Pedido recibido | Total: ${pedidos}`);
        }

        if (action === "sub") {
            pedidos = Math.max(0, pedidos - 1);
            await setPedidos(pedidos);
            return res.send(`❌ Pedido cancelado | Total: ${pedidos}`);
        }

        if (action === "reset") {
            pedidos = 0;
            await setPedidos(pedidos);
            return res.send(`🔄 Contador reiniciado | Total: ${pedidos}`);
        }

        // ver total
        res.send(`📦 Total pedidos: ${pedidos}`);

    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).send("Error en pedidos 💀");
    }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`Servidor activo en puerto ${PORT}`);
});
