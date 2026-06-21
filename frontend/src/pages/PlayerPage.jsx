import { API_URL } from "../config";
import { useState, useEffect } from "react";
import "./PlayerPage.css";

function PlayerPage({ player, onBack }) {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("playerTheme");
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  const [realData, setRealData] = useState(null);
  const [trophies, setTrophies] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("playerTheme", JSON.stringify(darkMode));
  }, [darkMode]);

  // ================= FETCH ALL REAL DATA CONCURRENTLY =================
  useEffect(() => {
    if (player && player.id) {
      setLoading(true);
      Promise.all([
       fetch(`${API_URL}/api/player/${player.id}`).then(res => res.json()),
       fetch(`${API_URL}/api/player/${player.id}/trophies`).then(res => res.json()),
       fetch(`${API_URL}/api/player/${player.id}/transfers`).then(res => res.json()),
       fetch(`${API_URL}/api/player/${player.id}/history`).then(res => res.json())
      ])
      .then(([playerData, trophiesData, transfersData, historyData]) => {
        setRealData(playerData);
        setTrophies(trophiesData || []);
        
        // Transfers aate hain nested array mein, usko extract karenge
        if (transfersData && transfersData.length > 0) {
          setTransfers(transfersData[0].transfers || []);
        }
        
        setHistory(historyData || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching detailed player stats:", err);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [player]);

  if (loading) {
    return (
      <div className={`player-page ${darkMode ? "dark-theme" : "light-theme"}`}>
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading Full Profile... ⏳</h2>
      </div>
    );
  }

  // ================= MAIN DATA MAPPING =================
  const stats = realData?.statistics?.[0] || {};
  const pInfo = realData?.player || {};

  const displayData = {
    name: pInfo.name || player.name,
    photo: pInfo.photo || player.image || "https://via.placeholder.com/150",
    age: pInfo.age || player.age || "N/A",
    nationality: pInfo.nationality || player.nationality || "Unknown",
    height: pInfo.height || player.height || "N/A",
    weight: pInfo.weight || player.weight || "N/A",
    
    team: stats.team?.name || player.team,
    teamLogo: stats.team?.logo,
    
    jersey: stats.games?.number || player.jersey || "N/A",
    position: stats.games?.position || player.position || "Player",
    rating: stats.games?.rating ? parseFloat(stats.games.rating).toFixed(1) : "N/A",
    
    appearances: stats.games?.appearences || player.appearances || 0,
    goals: stats.goals?.total || player.goals || 0,
    assists: stats.goals?.assists || player.assists || 0,
  };

  // ================= SEPARATING TROPHIES AND AWARDS =================
  // API frequently mixes team trophies and individual awards (like top scorer).
  const teamTrophies = trophies.filter(t => t.place === "Winner");
  const individualAwards = trophies.filter(t => t.place !== "Winner" && t.place);

  return (
    <div className={`player-page ${darkMode ? "dark-theme" : "light-theme"}`}>
      <button className="back-btn" onClick={onBack}>← Back</button>
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* HEADER SECTION */}
      <div className="player-header">
        <img src={displayData.photo} alt={displayData.name} className="player-image" />
        <div className="player-card-info">
          <div className="jersey-badge">#{displayData.jersey}</div>
          <h1>{displayData.name}</h1>
          <p>{displayData.team} {displayData.teamLogo && <img src={displayData.teamLogo} alt="team" style={{ width: '20px', verticalAlign: 'middle' }} />}</p>
        </div>
        <div className="player-badges">
          <span>{displayData.position}</span>
          <span>{displayData.nationality}</span>
        </div>
      </div>

      {/* BASIC & PHYSICAL INFO */}
      <div className="player-info">
        <p>🎯 Position: {displayData.position}</p>
        <p>🎂 Age: {displayData.age}</p>
        <p>🌍 Nationality: {displayData.nationality}</p>
      </div>

      <div className="player-physical-card">
        <h3>Physical Information</h3>
        <div className="physical-item"><span>📏 Height</span><strong>{displayData.height}</strong></div>
        <div className="physical-item"><span>🏋️ Weight</span><strong>{displayData.weight}</strong></div>
      </div>

      {/* STATS CARDS */}
      <div className="player-stats">
        <div className="stat-card"><h2>{displayData.goals}</h2><p>Goals</p></div>
        <div className="stat-card"><h2>{displayData.assists}</h2><p>Assists</p></div>
        <div className="stat-card"><h2>{displayData.appearances}</h2><p>Matches</p></div>
        <div className="stat-card">
          <h2>{displayData.rating}</h2>
          <div className="rating-stars">⭐⭐⭐⭐⭐</div>
          <p>Rating</p>
        </div>
      </div>

      {/* REAL TROPHY CABINET */}
      <div className="trophy-section">
        <h2>Trophy Cabinet</h2>
        {teamTrophies.length > 0 ? (
          <div className="trophy-grid">
            {teamTrophies.slice(0, 4).map((trophy, index) => (
              <div className="trophy-card" key={index}>
                🏆
                <h3>{trophy.season}</h3>
                <p>{trophy.league}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No major trophies recorded yet.</p>
        )}
      </div>

      {/* REAL CAREER TIMELINE (TRANSFERS) */}
      <div className="career-section">
        <h2>Career Timeline</h2>
        <div className="career-card">
          {transfers.length > 0 ? transfers.slice(0, 4).map((transfer, index) => (
            <div className="career-item" key={index}>
              <img src={transfer.teams.in.logo} alt={transfer.teams.in.name} className="career-logo" />
              <div>
                <h3>{transfer.date}</h3>
                <p>{transfer.teams.out.name} ➞ {transfer.teams.in.name}</p>
                <small style={{color: "gray"}}>{transfer.type}</small>
              </div>
            </div>
          )) : (
            <p>No transfer history available.</p>
          )}
        </div>
      </div>

      {/* REAL INDIVIDUAL AWARDS */}
      <div className="awards-section">
        <h2>Individual Achievements</h2>
        {individualAwards.length > 0 ? (
          <div className="awards-grid">
            {individualAwards.slice(0, 3).map((award, index) => (
              <div className="award-card" key={index}>
                ⭐
                <h3>{award.league}</h3>
                <p>{award.place} ({award.season})</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{textAlign: "center"}}>No individual awards data available.</p>
        )}
      </div>

      {/* REAL HISTORICAL GOALS BY SEASON */}
      <div className="goals-history-section">
        <h2>Goals By Past Seasons</h2>
        <div className="goals-history-card">
          {history.length > 0 ? history.map((hist, index) => (
            <div className="goal-season-row" key={index}>
              <div>
                <h3>{hist.season}</h3>
                <p>{hist.team} - {hist.league}</p>
              </div>
              <span className="goal-count">{hist.goals} Goals</span>
            </div>
          )) : (
            <p>No historical data available.</p>
          )}
        </div>
      </div>

      {/* BIOGRAPHY */}
      <div className="player-bio">
        <h2>Biography</h2>
        <p>
          {displayData.name} is a professional footballer currently playing for {displayData.team}.
          He plays as a {displayData.position} and is known for his impact on the pitch.
        </p>
      </div>

    </div>
  );
}

export default PlayerPage;