import { createContext, useState, useEffect } from "react";

// Creamos el contexto para compartir datos
export const DataContext = createContext();

// Proveedor de datos que envolverá nuestra app
export default function DataProvider({ children }) {
  // Estados para almacenar los datos traídos de Supabase
  const [arenas, setArenas] = useState([]);
  const [personajes, setPersonajes] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  // useEffect para cargar datos una vez al montar el componente
  useEffect(() => {
    async function loadData() {
      setLoading(true); // Indicamos que estamos cargando datos

      // URL base y API key de Supabase 
      // HAY QUE OCULTARLAS
      const API_URL = "https://yrpaahgwlhuvwsvgzdau.supabase.co/rest/v1/";
      const API_KEY = "sb_publishable_D0iDnQVwzQt1_XzxDIkbmw_80jfFsMU";

      // Función para traer cualquier tabla de Supabase
      async function fetchTable(table) {
        const res = await fetch(API_URL + table, {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`
          }
        });
        return res.json();
      }

      // Traemos todas las tablas
      const [arenasData, personajesData, statsData] = await Promise.all([
        fetchTable("arenas"),
        fetchTable("personajes"),
        fetchTable("personaje_stats"),
      ]); 

      // Guardamos los datos en estados
      setArenas(arenasData);
      setPersonajes(personajesData);
      setStats(statsData);

      setLoading(false); // Marcamos como que ha terminado la carga
    }

    loadData();
  }, []); // se ejecuta solo al montar

  // Proveemos los datos a los componentes hijos
  return (
    <DataContext.Provider value={{ arenas, personajes, stats, loading }}>
      {children}
    </DataContext.Provider>
  );
}
