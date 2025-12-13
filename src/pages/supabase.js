const API_URL = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_KEY;

export const SUPABASE_PROJECT_URL = API_URL.replace("/rest/v1/", "");

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
