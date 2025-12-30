export default function BattleHistory({ tag }) {
  const [battles, setBattles] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
      fetch(`${API_URL}/player/%23${tag}/battles`)      .then((r) => r.json())
      .then(setBattles);
  }, [tag]);

  return (
    <div>
      <h3>Record</h3>
      {battles.map((b, i) => {
        const win = b.team[0].crowns > b.opponent[0].crowns;

        return (
          <div
            key={i}
            style={{
              border: `3px solid ${win ? "green" : "red"}`,
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <strong>{win ? "Victoria" : "Derrota"}</strong>

            <div>
              {b.team[0].cards.map((c) => (
                <img key={c.id} src={c.iconUrls.medium} />
              ))}
            </div>

            <div>
              {b.opponent[0].cards.map((c) => (
                <img key={c.id} src={c.iconUrls.medium} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
