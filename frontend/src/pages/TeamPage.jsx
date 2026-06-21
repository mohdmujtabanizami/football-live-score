import { API_URL } from "../config";
import { useState, useEffect } from "react";
import "./TeamPage.css";

function TeamPage({ team, onBack, onPlayerClick }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= FETCH REAL TEAM STATS =================
  useEffect(() => {
    if (team && team.id) {
      // Backend automatically defaults to the current season and league 39 (Premier League) 
      // if specific query params aren't passed, which is perfect for this view.
      fetch(`${API_URL}/api/team/${team.id}/stats`)
        .then((res) => res.json())
        .then((data) => {
          setStats(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch team stats:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [team]);

  // Extract recent form (last 5 matches)
  const formArray = stats?.form ? stats.form.split("").slice(-5) : [];

  return (
    <div className="team-page">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      {/* HEADER */}
      <div className="team-header">
        <img src={team.logo} alt={team.name} className="team-logo" />
        <h1>{team.name}</h1>
      </div>

      {/* TEAM INFO */}
      <div className="team-info">
        <p>🏟 Stadium: {team.stadium || "Unknown"}</p>
        <p>🏙 City: {team.city || "Unknown"}</p>
        <p>📅 Founded: {team.founded || "N/A"}</p>
        <p>👥 Capacity: {team.capacity?.toLocaleString() || "N/A"}</p>
      </div>

      {/* TEAM STATS */}
      {loading ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>Loading Team Stats... ⏳</p>
      ) : (
        <>
          <div className="team-stats">
            <div className="stat-card">
              <h2>{stats?.fixtures?.played?.total || 0}</h2>
              <p>Matches</p>
            </div>
            <div className="stat-card">
              <h2>{stats?.goals?.for?.total?.total || 0}</h2>
              <p>Goals</p>
            </div>
            <div className="stat-card">
              <h2>{stats?.fixtures?.wins?.total || 0}</h2>
              <p>Wins</p>
            </div>
            <div className="stat-card">
              <h2>{stats?.fixtures?.loses?.total || 0}</h2>
              <p>Losses</p>
            </div>
          </div>

          {/* RECENT FORM */}
          <div className="recent-form">
            <h2>Recent Form</h2>
            {formArray.length > 0 ? (
              <div className="form-boxes">
                {formArray.map((result, index) => {
                  let badgeClass = "draw";
                  if (result === "W") badgeClass = "win";
                  if (result === "L") badgeClass = "loss";

                  return (
                    <span key={index} className={badgeClass}>
                      {result}
                    </span>
                  );
                })}
              </div>
            ) : (
              <p>Form data not available</p>
            )}
          </div>
        </>
      )}

      {/* TEAM SQUAD (PLAYERS) */}
      <div className="team-squad-section" style={{ marginTop: "30px" }}>
        <h2>Current Squad</h2>
        {team.squad && team.squad.length > 0 ? (
          <div className="squad-grid" style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center", marginTop: "15px" }}>
            {team.squad.map((player) => (
              <div 
                key={player.id} 
                className="squad-card clickable-player" 
                style={{ background: "#f8f9fa", padding: "10px", borderRadius: "10px", textAlign: "center", width: "120px", cursor: "pointer", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}
                onClick={() => onPlayerClick({ id: player.id, name: player.name, team: team.name })}
              >
                <img 
                  src={player.photo || "https://via.placeholder.com/150"} 
                  alt={player.name} 
                  style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", marginBottom: "10px" }} 
                />
                <div style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>{player.name}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>{player.position}</div>
                <div style={{ fontSize: "12px", color: "#e63946", fontWeight: "bold" }}>#{player.number || "-"}</div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "gray" }}>Squad details not available.</p>
        )}
      </div>

      {/* ABOUT CLUB */}
      <div className="team-description" style={{ marginTop: "40px" }}>
        <h2>About Club</h2>
        <p>
          {team.name} is a professional football club based in {team.city || "their respective city"}. 
          They play their home matches at {team.stadium || "their home stadium"} which has a capacity of {team.capacity?.toLocaleString() || "several thousand"} supporters.
        </p>
      </div>

    </div>
  );
}

export default TeamPage;