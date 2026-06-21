import { API_URL } from "../config";
import React, { useState, useEffect } from "react";
import "./StandingsPage.css"; 
import { standingsData } from "../standingsData"; // Backup data import

function StandingsPage({ onBack, darkMode, onTeamClick }) {
  const [selectedLeague, setSelectedLeague] = useState("Premier League");
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  const LEAGUE_IDS = { 
    "Premier League": 39, 
    "La Liga": 140, 
    "Serie A": 135, 
    "FIFA World Cup": 1 // FIFA World Cup added
  };

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      setIsFallback(false);
      try {
        const leagueId = LEAGUE_IDS[selectedLeague];
        // World Cup (ID 1) ke liye 2022 season, baaki ke liye 2023
        const season = leagueId === 1 ? 2022 : 2023;
        
        const response = await fetch(`${API_URL}/api/standings/${leagueId}?season=${season}`);
        const data = await response.json();
        
        if (data && data[0]?.league?.standings[0]) {
          setStandings(data[0].league.standings[0]);
        } else {
          throw new Error("Empty API data");
        }
      } catch (err) {
        console.warn("API Offline, using Fallback Standings");
        setStandings(standingsData[selectedLeague] || []);
        setIsFallback(true);
      } finally {
        setLoading(false);
      }
    };
    fetchStandings();
  }, [selectedLeague]);

  return (
    <div className={`top-scorers-page ${darkMode ? "dark-theme" : "light-theme"}`}>
      <div className="top-scorers-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h1>🏆 Standings {isFallback && <span className="offline-tag">(Offline)</span>}</h1>
        <select className="league-select" value={selectedLeague} onChange={(e) => setSelectedLeague(e.target.value)}>
          {Object.keys(LEAGUE_IDS).map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      <div className="scorers-table-container">
        <table className="scorers-table">
          <thead>
            <tr>
              <th className="rank-th">Pos</th>
              <th className="player-th">Team</th>
              <th>P</th><th>W</th><th>D</th><th>L</th><th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="7" className="loading-cell">Loading...</td></tr> : 
            standings.map((t) => (
              <tr key={t.team.id} className="scorer-row" onClick={() => onTeamClick(t.team.id)}>
                <td className="rank-col">{t.rank}</td>
                <td className="player-cell">
                  <img src={t.team.logo} alt={t.team.name} className="club-logo" />
                  <span className="scorer-name">{t.team.name}</span>
                </td>
                <td>{t.all.played}</td>
                <td>{t.all.win}</td>
                <td>{t.all.draw}</td>
                <td>{t.all.lose}</td>
                <td className="goals-count">{t.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StandingsPage;