import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

const API = "https://api.clashroyale.com/v1";
const HEADERS = {
  Authorization: `Bearer ${process.env.CLASH_API_KEY}`,
};

// PERFIL
app.get("/player/:tag", async (req, res) => {
  const tag = req.params.tag.replace("#", "%23");
  const r = await fetch(`${API}/players/${tag}`, { headers: HEADERS });
  const data = await r.json();
  res.json(data);
});

// HISTORIAL
app.get("/player/:tag/battles", async (req, res) => {
  const tag = req.params.tag.replace("#", "%23");
  const r = await fetch(`${API}/players/${tag}/battlelog`, { headers: HEADERS });
  const data = await r.json();
  res.json(data);
});

app.listen(3001, () =>
  console.log("🔥 Backend listo en http://localhost:3001")
);
