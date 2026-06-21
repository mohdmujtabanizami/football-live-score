import { API_URL } from "../config";
import React, { useState, useEffect } from "react";
import "./TopScorers.css";
// Local backup data import
import { topScorersData } from "../topScorersData"; 

const LEAGUES = {
  "Premier League": 39,
  "La Liga": 140,
  "Serie A": 135,
  "Bundesliga": 78,
  "Ligue 1": 61,
  "Champions League": 2,
  "FIFA World Cup": 1
};

function TopScorers({ onBack, darkMode, onPlayerClick }) {
  const [selectedLeague, setSelectedLeague] = useState("Premier League");
  const [scorers, setScorers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const fetchTopScorers = async () => {
      setLoading(true);
      setIsFallback(false);
      try {
        const leagueId = LEAGUES[selectedLeague];
        const season = leagueId === 1 ? 2022 : 2023;
        
        const response = await fetch(`${API_URL}/api/top-scorers/${leagueId}?season=${season}`);
        const data = await response.json();

        if (data && data.length > 0) {
          setScorers(data);
        } else {
          throw new Error("No API data");
        }
      } catch (error) {
        console.warn("Using Fallback Data:", error);
        setScorers(topScorersData[selectedLeague] || []);
        setIsFallback(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTopScorers();
  }, [selectedLeague]);

  return (
    <div className={`top-scorers-page ${darkMode ? "dark-theme" : "light-theme"}`}>
      <div className="top-scorers-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="title-container">
          <h1 className="topscorers-title">
            🏆 Top Scorers {isFallback && <span className="offline-tag">(Offline)</span>}
          </h1>
          <select 
            className="league-select" 
            value={selectedLeague} 
            onChange={(e) => setSelectedLeague(e.target.value)}
          >
            {Object.keys(LEAGUES).map((league) => (
              <option key={league} value={league}>{league}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="scorers-table-container">
        <table className="scorers-table">
          <thead>
            <tr>
              <th className="rank-th">Rank</th>
              <th className="player-th">Player</th>
              <th className="club-th">Club</th>
              <th className="goals-th">Goals</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="loading-cell">Loading... ⚽</td></tr>
            ) : scorers.length > 0 ? (
              scorers.map((item, index) => {
                const isApi = !isFallback;
                const player = isApi ? item.player : { name: item.player, photo: item.photo };
                const team = isApi ? item.statistics[0].team : { name: item.club, logo: item.teamLogo };
                const goals = isApi ? item.statistics[0].goals.total : item.goals;

                return (
                  <tr key={index} className="scorer-row" onClick={() => onPlayerClick(player)}>
                    <td className="rank-col">
                      <span className={`rank-badge rank-${index + 1}`}>{index + 1}</span>
                    </td>
                    <td className="player-cell">
                      <img src={player.photo} alt={player.name} className="scorer-img" />
                      <span className="scorer-name">{player.name}</span>
                    </td>
                    <td className="club-cell">
                      <div className="club-info-container">
                        <img src={team.logo} alt={team.name} className="club-logo" />
                        <span className="club-name">{team.name}</span>
                      </div>
                    </td>
                    <td className="goals-col">
                      <span className="goals-count">{goals}</span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan="4" className="no-data-cell">No data available.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopScorers;