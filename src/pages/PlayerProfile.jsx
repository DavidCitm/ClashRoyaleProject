import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PlayerProfile.css";

export default function PlayerProfile() {
  const { tag } = useParams();
  const [player, setPlayer] = useState(null);
  const [battles, setBattles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPlayer() {
      try {
        const profileRes = await fetch(
          `http://localhost:3001/player/%23${tag}`
        );

        if (!profileRes.ok) throw new Error("Player not found");

        const profileData = await profileRes.json();

        const battlesRes = await fetch(
          `http://localhost:3001/player/%23${tag}/battles`
        );

        const battlesData = await battlesRes.json();

        setPlayer(profileData);
        setBattles(battlesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPlayer();
  }, [tag]);

  if (loading) return <p className="loading">Loading player...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="player-profile">
      <div className="profile-card">
        <h2>{player.name}</h2>
        <p>🏆 {player.trophies}</p>
        <p>⭐ Level {player.expLevel}</p>
        <p>🏟️ {player.arena?.name}</p>
      </div>

      <h3>Current Deck</h3>
      <div className="deck">
        {player.currentDeck?.map(card => (
          <img
            key={card.id}
            src={card.iconUrls.medium}
            alt={card.name}
          />
        ))}
      </div>

      <h3>Battle History</h3>
      <div className="battles">
        {battles.map((battle, i) => {
          const win =
            battle.team[0].crowns > battle.opponent[0].crowns;

          return (
            <div key={i} className={`battle-card ${win ? "win" : "lose"}`}>
              <p>
                {win ? "🟢 Victory" : "🔴 Defeat"} —{" "}
                {battle.team[0].crowns} : {battle.opponent[0].crowns}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
