import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlayerSearch.css";

export default function PlayerSearch() {
  const [tag, setTag] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    if (!tag.startsWith("#")) {
      alert("You must enter the player TAG starting with #");
      return;
    }

    const cleanTag = tag.replace("#", "");
    navigate(`/player/${cleanTag}`);
  }

  return (
    <div className="player-search-container">
      <div className="player-search-card">
        <h1 className="player-search-title">Player Finder</h1>

        <p className="player-search-subtitle">
          Search a player by #TAG
        </p>

        <div className="player-search-input-group">
          <input
            type="text"
            placeholder="#UQ8J22JR"
            value={tag}
            onChange={(e) => setTag(e.target.value.toUpperCase())}
            className="player-search-input"
          />

          <button
            className="player-search-btn"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
