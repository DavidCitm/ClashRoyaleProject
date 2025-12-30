import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PlayerProfile.css";

export default function PlayerProfile() {
  const { tag } = useParams();
  const [player, setPlayer] = useState(null);
  const [battles, setBattles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
  async function loadPlayer() {
    try {
      const profileRes = await fetch(
        `${API_URL}/player/%23${tag}`
      );

      if (!profileRes.ok) throw new Error("Player not found");

      const profileData = await profileRes.json();

      const battlesRes = await fetch(
        `${API_URL}/player/%23${tag}/battles`
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
}, [tag, API_URL]);

  if (loading) return <p className="loading">Loading player...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="player-profile">

      {/* PERFIL */}
      <div className="profile-card">
        <h1 className="player-name">{player.name}</h1>

        <div className="profile-stats">
          <span>🏆 {player.trophies}</span>
          <span>⭐ Level {player.expLevel}</span>
          <span>🏟️ {player.arena?.name}</span>
        </div>
      </div>

      {/* MAZO ACTUAL */}
      <h2 className="section-title">Current Deck</h2>
      <div className="deck">
        {player.currentDeck?.map(card => (
          <img
            key={card.id}
            src={card.iconUrls.medium}
            alt={card.name}
            title={card.name}
          />
        ))}
      </div>

      {/* HISTORIAL */}
      <h2 className="section-title">Battle History</h2>

      <div className="battles">
        {battles.map((battle, i) => {
          const team = battle.team[0];
          const opponent = battle.opponent[0];
          const win = team.crowns > opponent.crowns;

          return (
            <div
              key={i}
              className={`battle-card ${win ? "win" : "lose"}`}
            >
              <div className="battle-header">
                <span className="battle-result">
                  {win ? "🟢 Victory" : "🔴 Defeat"}
                </span>
                <span className="battle-score">
                  {team.crowns} : {opponent.crowns}
                </span>
              </div>

              <div className="battle-decks">
                <div className="battle-deck">
                  {team.cards.map(card => (
                    <img
                      key={card.id}
                      src={card.iconUrls.medium}
                      alt={card.name}
                      title={card.name}
                    />
                  ))}
                </div>

                <div className="battle-deck opponent">
                  {opponent.cards.map(card => (
                    <img
                      key={card.id}
                      src={card.iconUrls.medium}
                      alt={card.name}
                      title={card.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
