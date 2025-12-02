const API_URL = "https://yrpaahgwlhuvwsvgzdau.supabase.co/rest/v1/";
const API_KEY = "sb_publishable_D0iDnQVwzQt1_XzxDIkbmw_80jfFsMU"; 
// ⚠️ Debes mover esto a .env en producción.

export async function fetchTable(table) {
  const res = await fetch(API_URL + table, {
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
    }
  });
  return res.json();
}

export async function fetchById(table, column, value) {
  const res = await fetch(`${API_URL}${table}?${column}=eq.${value}`, {
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
    }
  });
  return res.json();
}
