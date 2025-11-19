import React, { useEffect, useState } from "react";
const API_URL = 'https://tuproyecto.supabase.co/rest/v1/personaje_stats';
const API_KEY = 'sb_secret_mVUgjqc8-d4LDjka6JinNQ_52uHO3U5';


export default function Body() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(
          "https://yrpaahgwlhuvwsvgzdau.supabase.co/rest/v1/personajes?select=nombre",
          {
            method: "GET",
            headers: {
               'apikey': API_KEY,
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'

            },
          }
        );

        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Error cargando la API:", error);
      }
    }

    loadData();
  }, []);

  return (
    <main>
      <h2>Lista de personajes</h2>

      <ul>
        {items.map((item, i) => (
          <li key={i}>{item.nombre}</li>
        ))}
      </ul>
    </main>
  );
}