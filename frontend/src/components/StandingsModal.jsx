import React, { useState, useEffect } from "react";
import { API_URL } from "../config";

// Leagues ki list dropdown ke liye
const leagues = [
  { id: 39, name: "Premier League" },
  { id: 140, name: "La Liga" },
  { id: 135, name: "Serie A" },
  { id: 78, name: "Bundesliga" },
  { id: 61, name: "Ligue 1" },
];

// Offline limit khatam hone par ye dummy data dikhega
const dummyStandings = [
  {
    rank: 1,
    team: { id: 50, name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png" },
    all: { played: 38, win: 28, draw: 5, lose: 5 },
    points: 89,
  },
  {
    rank: 2,
    team: { id: 42, name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png" },
    all: { played: 38, win: 26, draw: 7, lose: 5 },
    points: 85,
  },
];

function StandingsPage({ onBack, darkMode, onTeamClick }) {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState(39);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      setIsOffline(false);
      try {
        const res = await fetch(`${API_URL}/api/standings/${selectedLeague}?season=2026`);
        
        if (!res.ok) throw new Error("API Limit Reached");
        
        const data = await res.json();
        
        // API response se standings array nikalne ka logic
        let standingsData = [];
        if (data.response && data.response[0]?.league?.standings[0]) {
           standingsData = data.response[0].league.standings[0];
        } else if (Array.isArray(data)) {
           standingsData = data;
        } else {
           throw new Error("Empty or Invalid Data");
        }
        
        if (standingsData.length > 0) {
            setStandings(standingsData);
        } else {
            throw new Error("No standings found");
        }
      } catch (error) {
        console.warn("Using Offline Standings:", error.message);
        setIsOffline(true);
        // Error aane par dummy fallback use karein
        setStandings(dummyStandings);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [selectedLeague]);

  return (
    <div className={darkMode ? "dark" : "light"} style={{ minHeight: "100vh", padding: "30px 20px" }}>
      
      {/* Back Button */}
      <button 
        onClick={onBack} 
        style={{
          background: "#2563eb", color: "white", padding: "10px 20px", 
          border: "none", borderRadius: "8px", cursor: "pointer", 
          marginBottom: "20px", fontWeight: "bold"
        }}
      >
        ← Back
      </button>

      {/* Header */}
      <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "36px" }}>
        🏆 Standings {isOffline && "(Offline)"}
      </h1>

      {/* League Filter */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
        <select 
          value={selectedLeague} 
          onChange={(e) => setSelectedLeague(Number(e.target.value))}
          style={{ padding: "10px", borderRadius: "8px", fontSize: "16px", border: "1px solid #ccc" }}
        >
          {leagues.map((lg) => (
            <option key={lg.id} value={lg.id}>{lg.name}</option>
          ))}
        </select>
      </div>

      {/* Table Content */}
      {loading ? (
        <h2 style={{ textAlign: "center" }}>Loading Standings...</h2>
      ) : (
        <div style={{ overflowX: "auto", maxWidth: "1000px", margin: "0 auto" }}>
          <table className="standings-table" style={{ width: "100%", borderCollapse: "collapse", background: darkMode ? "#1e293b" : "white", borderRadius: "12px", overflow: "hidden" }}>
            <thead>
              <tr style={{ background: "#0f766e", color: "white" }}>
                <th style={{ padding: "15px", textAlign: "center" }}>POS</th>
                <th style={{ padding: "15px", textAlign: "left" }}>TEAM</th>
                <th style={{ padding: "15px", textAlign: "center" }}>P</th>
                <th style={{ padding: "15px", textAlign: "center" }}>W</th>
                <th style={{ padding: "15px", textAlign: "center" }}>D</th>
                <th style={{ padding: "15px", textAlign: "center" }}>L</th>
                <th style={{ padding: "15px", textAlign: "center" }}>PTS</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr key={row.team.id} style={{ borderBottom: darkMode ? "1px solid #334155" : "1px solid #e2e8f0" }}>
                  <td style={{ padding: "15px", textAlign: "center", fontWeight: "bold" }}>{row.rank}</td>
                  
                  {/* YAHAN CLICK HONE PAR TEAM PAGE KHULEGA */}
                  <td 
                    style={{ padding: "15px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
                    onClick={() => onTeamClick && onTeamClick(row.team.id, row.team.name, row.team.logo)}
                  >
                    <img src={row.team.logo} alt={row.team.name} style={{ width: "30px", height: "30px", objectFit: "contain" }} />
                    <span style={{ fontWeight: "600" }} className="ranking-team">{row.team.name}</span>
                  </td>
                  
                  <td style={{ padding: "15px", textAlign: "center" }}>{row.all.played}</td>
                  <td style={{ padding: "15px", textAlign: "center" }}>{row.all.win}</td>
                  <td style={{ padding: "15px", textAlign: "center" }}>{row.all.draw}</td>
                  <td style={{ padding: "15px", textAlign: "center" }}>{row.all.lose}</td>
                  <td style={{ padding: "15px", textAlign: "center", fontWeight: "bold" }}>{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StandingsPage;