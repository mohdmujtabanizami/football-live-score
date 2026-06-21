import React, { useState, useEffect } from "react";
import "./MatchDetails.css";

function MatchDetails({ match, onBack, onPlayerClick }) {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("matchTheme");
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  useEffect(() => {
    localStorage.setItem("matchTheme", JSON.stringify(darkMode));
  }, [darkMode]);

  // ================= DATA PARSING HELPERS =================
  
  const homeLineup = match.lineups?.find(l => l.team.id === match.homeId) || {};
  const awayLineup = match.lineups?.find(l => l.team.id === match.awayId) || {};
  
  const homeCoach = homeLineup.coach || {};
  const awayCoach = awayLineup.coach || {};

  const groupFormation = (startXI) => {
    const grouped = { gk: null, defenders: [], midfielders: [], forwards: [] };
    startXI?.forEach(item => {
      const p = item.player;
      if (p.pos === 'G') grouped.gk = p;
      else if (p.pos === 'D') grouped.defenders.push(p);
      else if (p.pos === 'M') grouped.midfielders.push(p);
      else if (p.pos === 'F') grouped.forwards.push(p);
    });
    return grouped;
  };

  const homeFormation = groupFormation(homeLineup.startXI);
  const awayFormation = groupFormation(awayLineup.startXI);

  const homeStats = match.stats?.find(s => s.team.id === match.homeId)?.statistics || [];
  const awayStats = match.stats?.find(s => s.team.id === match.awayId)?.statistics || [];
  
  const getStat = (statsArray, type) => {
    const stat = statsArray.find(s => s.type === type);
    return stat ? (stat.value !== null ? stat.value : "0") : "0";
  };

  const getPlayerImg = (id) => id ? `https://media.api-sports.io/football/players/${id}.png` : "https://via.placeholder.com/150";
  const getCoachImg = (id) => id ? `https://media.api-sports.io/football/coachs/${id}.png` : "https://via.placeholder.com/150";

  const getLeftPosition = (index, totalPlayers) => {
    if (totalPlayers === 1) return "50%";
    return `${15 + (index / (totalPlayers - 1)) * 70}%`;
  };

  // --- SMART NAME & ROLE DETECTORS ---
  const isCaptain = (p) => p && (p.captain === true || (p.name && p.name.includes('(C)')));
  const isGK = (p) => p && (p.pos === 'G' || (p.name && p.name.includes('(G)')));
  const cleanName = (name) => name ? name.replace(/\s*\([CG]\)/g, '').trim() : '';

  // --- TACTICS DESCRIPTIONS DICTIONARY ---
  const formationDescriptions = {
    "4-2-3-1": "One of the most popular modern setups, offering a strong double-pivot in midfield and fluid attacking transitions behind a single striker.",
    "4-3-3": "A classic, balanced setup featuring a trio of midfielders that allows teams to dominate possession and control the wings.",
    "4-4-2": "The traditional backbone of football, providing rigid defensive lines and two strikers to press the opponent.",
    "5-3-2": "Heavily used by teams focusing on defensive solidity, where wing-backs push up to transition seamlessly between attacking and defending modes.",
    "3-5-2": "Heavily used by teams focusing on defensive solidity, where wing-backs push up to transition seamlessly between attacking and defending modes.",
    "3-4-3": "A tactical scheme that balances the squad by keeping lines compact, often resulting in high-intensity attacking."
  };

  const getFormationDesc = (formation) => {
    if (!formation) return "Tactical details not available for this team.";
    return formationDescriptions[formation] || "A strategic setup adapted to the team's specific tactical requirements on the pitch.";
  };

  return (
    <div className={`match-details-page ${darkMode ? "dark-theme" : "light-theme"}`}>
      <button className="back-btn" onClick={onBack}>← Back</button>
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* HEADER SECTION */}
      <div className="match-header">
        <div className="teams-header">
          <div className="team-box">
            <img src={match.homeLogo} alt={match.homeTeam} className="team-logo" />
            <h2>{match.homeTeam}</h2>
          </div>
          <div className="score-center">
            <div className="match-score">{match.score}</div>
          </div>
          <div className="team-box">
            <img src={match.awayLogo} alt={match.awayTeam} className="team-logo" />
            <h2>{match.awayTeam}</h2>
          </div>
        </div>
      </div>

      <div className="info-card">
        <p>🏟 {match.venue || "TBD"}</p>
        <p>🌍 {match.country}</p>
        <p>👨‍⚖️ {match.referee || "Unknown"}</p>
        <p>🏆 {match.league}</p>
      </div>

      {/* REAL MATCH STATISTICS */}
      <div className="stats-card">
        <h2>📊 Match Statistics</h2>
        {homeStats.length > 0 || awayStats.length > 0 ? (
          <div className="stats-grid">
            <div>Possession: {getStat(homeStats, "Ball Possession")} - {getStat(awayStats, "Ball Possession")}</div>
            <div>Total Shots: {getStat(homeStats, "Total Shots")} - {getStat(awayStats, "Total Shots")}</div>
            <div>Shots on Target: {getStat(homeStats, "Shots on Goal")} - {getStat(awayStats, "Shots on Goal")}</div>
            <div>Corner Kicks: {getStat(homeStats, "Corner Kicks")} - {getStat(awayStats, "Corner Kicks")}</div>
            <div>Fouls: {getStat(homeStats, "Fouls")} - {getStat(awayStats, "Fouls")}</div>
            <div>Yellow Cards: {getStat(homeStats, "Yellow Cards")} - {getStat(awayStats, "Yellow Cards")}</div>
          </div>
        ) : (
          <p>Stats not available yet.</p>
        )}
      </div>

      {/* MATCH EVENTS (TIMELINE) */}
      <div className="events-card">
        <h2 className="timeline-title-main">⚽ Match Timeline</h2>
        <div className="api-timeline-container">
          <div className="api-timeline-line"></div>

          {match.events?.length > 0 ? match.events.map((event, index) => {
            const isHomeEvent = event.team.id === match.homeId;
            const eventType = event.type.toLowerCase(); 
            
            return (
              <div key={index} className={`api-timeline-row ${isHomeEvent ? 'home-event-row' : 'away-event-row'}`}>
                <div className="api-timeline-badge">
                  <span className="api-minute-text">{event.time.elapsed}'</span>
                  <div className="api-timeline-dot"></div>
                </div>

                <div className="api-event-card">
                  <div className="api-event-icon-wrap">
                    <span className={`event-icon ${eventType}`}>
                      {eventType === "goal" && "⚽"}
                      {eventType === "card" && event.detail.includes("Yellow") && "🟨"}
                      {eventType === "card" && event.detail.includes("Red") && "🟥"}
                      {eventType === "subst" && "🔄"}
                    </span>
                  </div>
                  
                  <div className="api-event-details">
                    {eventType === "subst" ? (
                      <div className="sub-event-detail timeline-sub">
                        <div className="sub-players">
                          <span className="player-in">IN: {cleanName(event.assist.name)}</span>
                          <span className="sub-arrow">⇄</span>
                          <span className="player-out">OUT: {cleanName(event.player.name)}</span>
                        </div>
                        <img src={isHomeEvent ? match.homeLogo : match.awayLogo} alt={event.team.name} className="sub-team-logo-small" />
                      </div>
                    ) : (
                      <div className="normal-event">
                        <div className="event-text">
                          <h4>{cleanName(event.player.name)}</h4>
                          <p>{event.detail}</p>
                          <small>{event.team.name}</small>
                        </div>
                        <img src={isHomeEvent ? match.homeLogo : match.awayLogo} alt={event.team.name} className="sub-team-logo-small" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }) : (
             <p style={{textAlign: "center", width: "100%"}}>No events recorded yet.</p>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* NEW: TACTICS & FORMATIONS EXPLANATION SECTION */}
      {/* ========================================================================= */}
      <div className="premium-section" style={{ marginBottom: "20px" }}>
        <div className="premium-header">TACTICS & FORMATIONS</div>
        <div className="premium-container" style={{ padding: "20px" }}>
          <div className="tactics-row">
            
            {/* HOME TACTICS */}
            <div className="tactics-team home-tactics">
              <div className="tactics-title">
                <img src={match.homeLogo} alt={match.homeTeam} className="pro-tiny-logo"/>
                <strong className="exact-name">{match.homeTeam}</strong>
                <span className="formation-badge">{homeLineup.formation || "N/A"}</span>
              </div>
              <p className="tactics-desc">{getFormationDesc(homeLineup.formation)}</p>
            </div>
            
            <div className="tactics-divider"></div>
            
            {/* AWAY TACTICS */}
            <div className="tactics-team away-tactics">
              <div className="tactics-title justify-end">
                <span className="formation-badge">{awayLineup.formation || "N/A"}</span>
                <strong className="exact-name">{match.awayTeam}</strong>
                <img src={match.awayLogo} alt={match.awayTeam} className="pro-tiny-logo"/>
              </div>
              <p className="tactics-desc text-right">{getFormationDesc(awayLineup.formation)}</p>
            </div>
            
          </div>
        </div>
      </div>

      {/* FORMATION PITCH */}
      <div className="lineups-card">
        <h2>👥 Pitch View</h2>
        <div className="match-pitch" style={{ position: "relative", overflow: "hidden" }}>
          <div className="pitch-markings">
            <div className="center-line"></div>
            <div className="center-circle"></div>
            <div className="penalty-box top-box"></div>
            <div className="goal-box top-goal-box"></div>
            <div className="penalty-box bottom-box"></div>
            <div className="goal-box bottom-goal-box"></div>
          </div>

          {/* HOME GK */}
          {homeFormation.gk && (
            <div className="formation-player gk-player" style={{ position: "absolute", top: "8%", left: "50%", transform: "translate(-50%, -50%)" }} 
              onClick={() => onPlayerClick({ name: cleanName(homeFormation.gk.name), team: match.homeTeam, position: "Goalkeeper", jersey: homeFormation.gk.number, image: getPlayerImg(homeFormation.gk.id) })}>
              <div className="formation-img-wrapper">
                <img src={getPlayerImg(homeFormation.gk.id)} alt={cleanName(homeFormation.gk.name)} className="formation-player-img" />
                <span className="player-badge badge-gk">GK</span>
                {isCaptain(homeFormation.gk) && <span className="player-badge badge-c">C</span>}
              </div>
              <div className="player-meta-row">
                <span className="jersey-number">#{homeFormation.gk.number}</span>
                <span className="formation-name">{cleanName(homeFormation.gk.name)}</span>
              </div>
            </div>
          )}

          {/* HOME PLAYERS */}
          {['defenders', 'midfielders', 'forwards'].map((role, row) => 
            homeFormation[role]?.map((p, i, arr) => (
              <div key={`home-${role}-${i}`} className="formation-player home-player" style={{ position: "absolute", top: `${20 + (row * 13)}%`, left: getLeftPosition(i, arr.length), transform: "translate(-50%, -50%)" }} 
                onClick={() => onPlayerClick({ name: cleanName(p.name), team: match.homeTeam, position: role, jersey: p.number, image: getPlayerImg(p.id) })}>
                <div className="formation-img-wrapper">
                  <img src={getPlayerImg(p.id)} alt={cleanName(p.name)} className="formation-player-img" />
                  {isCaptain(p) && <span className="player-badge badge-c">C</span>}
                </div>
                <div className="player-meta-row">
                  <span className="jersey-number">#{p.number}</span>
                  <span className="formation-name">{cleanName(p.name)}</span>
                </div>
              </div>
            ))
          )}

          {/* AWAY PLAYERS */}
          {['forwards', 'midfielders', 'defenders'].map((role, row) => 
            awayFormation[role]?.map((p, i, arr) => (
              <div key={`away-${role}-${i}`} className="formation-player away-player" style={{ position: "absolute", top: `${55 + (row * 12)}%`, left: getLeftPosition(i, arr.length), transform: "translate(-50%, -50%)" }} 
                onClick={() => onPlayerClick({ name: cleanName(p.name), team: match.awayTeam, position: role, jersey: p.number, image: getPlayerImg(p.id) })}>
                <div className="formation-img-wrapper">
                  <img src={getPlayerImg(p.id)} alt={cleanName(p.name)} className="formation-player-img" />
                  {isCaptain(p) && <span className="player-badge badge-c">C</span>}
                </div>
                <div className="player-meta-row">
                  <span className="jersey-number">#{p.number}</span>
                  <span className="formation-name">{cleanName(p.name)}</span>
                </div>
              </div>
            ))
          )}

          {/* AWAY GK */}
          {awayFormation.gk && (
            <div className="formation-player gk-player" style={{ position: "absolute", top: "92%", left: "50%", transform: "translate(-50%, -50%)" }} 
              onClick={() => onPlayerClick({ name: cleanName(awayFormation.gk.name), team: match.awayTeam, position: "Goalkeeper", jersey: awayFormation.gk.number, image: getPlayerImg(awayFormation.gk.id) })}>
              <div className="formation-img-wrapper">
                <img src={getPlayerImg(awayFormation.gk.id)} alt={cleanName(awayFormation.gk.name)} className="formation-player-img" />
                <span className="player-badge badge-gk">GK</span>
                {isCaptain(awayFormation.gk) && <span className="player-badge badge-c">C</span>}
              </div>
              <div className="player-meta-row">
                <span className="jersey-number">#{awayFormation.gk.number}</span>
                <span className="formation-name">{cleanName(awayFormation.gk.name)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. SUBSTITUTED PLAYERS */}
      {/* ========================================================================= */}
      <div className="premium-section">
        <div className="premium-header">SUBSTITUTED PLAYERS</div>
        <div className="premium-container">
          {(() => {
            const homeSubs = match.events?.filter(e => e.type.toLowerCase() === "subst" && e.team.id === match.homeId) || [];
            const awaySubs = match.events?.filter(e => e.type.toLowerCase() === "subst" && e.team.id === match.awayId) || [];
            const maxSubs = Math.max(homeSubs.length, awaySubs.length);

            if (maxSubs === 0) return <p className="premium-no-data">No substitutions recorded</p>;

            const rows = [];
            for (let i = 0; i < maxSubs; i++) {
              const hSub = homeSubs[i];
              const aSub = awaySubs[i];

              rows.push(
                <div key={`sub-row-${i}`} className="sub-row-wrapper">
                  {/* HOME SUB */}
                  <div className="sub-side home-side">
                    {hSub ? (
                      <div className="sub-card-pro clickable-player" onClick={() => onPlayerClick({ name: cleanName(hSub.assist.name), team: match.homeTeam, position: "Substitute (IN)", image: getPlayerImg(hSub.assist.id) })}>
                        <img src={getPlayerImg(hSub.assist.id)} alt={cleanName(hSub.assist.name)} className="pro-player-img" />
                        <div className="sub-text-col left-align">
                          <div className="sub-in"><span className="arrow-in">↑</span> <span className="in-name">{cleanName(hSub.assist.name)}</span></div>
                          <div className="sub-out"><span className="out-name">{cleanName(hSub.player.name)}</span> {hSub.time.elapsed}' <span className="arrow-out">↓</span></div>
                        </div>
                      </div>
                    ) : <div className="empty-side"></div>}
                  </div>

                  {/* AWAY SUB */}
                  <div className="sub-side away-side">
                    {aSub ? (
                      <div className="sub-card-pro away-card clickable-player" onClick={() => onPlayerClick({ name: cleanName(aSub.assist.name), team: match.awayTeam, position: "Substitute (IN)", image: getPlayerImg(aSub.assist.id) })}>
                        <div className="sub-text-col right-align">
                          <div className="sub-in"><span className="in-name">{cleanName(aSub.assist.name)}</span> <span className="arrow-in">↑</span></div>
                          <div className="sub-out"><span className="arrow-out">↓</span> {aSub.time.elapsed}' <span className="out-name">{cleanName(aSub.player.name)}</span></div>
                        </div>
                        <img src={getPlayerImg(aSub.assist.id)} alt={cleanName(aSub.assist.name)} className="pro-player-img" />
                      </div>
                    ) : <div className="empty-side"></div>}
                  </div>
                </div>
              );
            }
            return rows;
          })()}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. STARTING LINEUPS */}
      {/* ========================================================================= */}
      <div className="premium-section">
        <div className="premium-header">STARTING LINEUPS</div>
        <div className="premium-container">
          {(() => {
            const hStart = homeLineup.startXI || [];
            const aStart = awayLineup.startXI || [];
            const maxStart = Math.max(hStart.length, aStart.length);
            
            if (maxStart === 0) return <p className="premium-no-data">Lineups not available</p>;

            const rows = [];
            for (let i = 0; i < maxStart; i++) {
              const hp = hStart[i]?.player;
              const ap = aStart[i]?.player;

              rows.push(
                <div key={`start-${i}`} className="lineup-row-wrapper">
                  {/* HOME PLAYER */}
                  <div className="lineup-side home-side clickable-player" onClick={() => hp && onPlayerClick({ name: cleanName(hp.name), team: match.homeTeam, position: "Starting XI", image: getPlayerImg(hp.id) })}>
                    {hp && (
                      <>
                        <span className="player-num">{hp.number}</span>
                        <img src={match.homeLogo} alt="Home" className="team-flag" />
                        <span className="player-name">
                          {cleanName(hp.name)} 
                          {isGK(hp) && <span className="pos-badge">(G)</span>}
                          {isCaptain(hp) && <span className="pos-badge">(C)</span>}
                        </span>
                      </>
                    )}
                  </div>

                  {/* AWAY PLAYER */}
                  <div className="lineup-side away-side clickable-player" onClick={() => ap && onPlayerClick({ name: cleanName(ap.name), team: match.awayTeam, position: "Starting XI", image: getPlayerImg(ap.id) })}>
                    {ap && (
                      <>
                        <span className="player-name">
                          {cleanName(ap.name)} 
                          {isGK(ap) && <span className="pos-badge">(G)</span>}
                          {isCaptain(ap) && <span className="pos-badge">(C)</span>}
                        </span>
                        <img src={match.awayLogo} alt="Away" className="team-flag" />
                        <span className="player-num">{ap.number}</span>
                      </>
                    )}
                  </div>
                </div>
              );
            }
            return rows;
          })()}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SUBSTITUTES */}
      {/* ========================================================================= */}
      <div className="premium-section">
        <div className="premium-header">SUBSTITUTES</div>
        <div className="premium-container">
          {(() => {
            const hSub = homeLineup.substitutes || [];
            const aSub = awayLineup.substitutes || [];
            const maxSub = Math.max(hSub.length, aSub.length);
            
            if (maxSub === 0) return <p className="premium-no-data">Substitutes not available</p>;

            const rows = [];
            for (let i = 0; i < maxSub; i++) {
              const hp = hSub[i]?.player;
              const ap = aSub[i]?.player;

              rows.push(
                <div key={`bench-${i}`} className="lineup-row-wrapper">
                  <div className="lineup-side home-side clickable-player" onClick={() => hp && onPlayerClick({ name: cleanName(hp.name), team: match.homeTeam, position: "Substitute", image: getPlayerImg(hp.id) })}>
                    {hp && (
                      <>
                        <span className="player-num">{hp.number}</span>
                        <img src={match.homeLogo} alt="Logo" className="team-flag" />
                        <span className="player-name">
                          {cleanName(hp.name)} 
                          {isGK(hp) && <span className="pos-badge">(G)</span>}
                          {isCaptain(hp) && <span className="pos-badge">(C)</span>}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="lineup-side away-side clickable-player" onClick={() => ap && onPlayerClick({ name: cleanName(ap.name), team: match.awayTeam, position: "Substitute", image: getPlayerImg(ap.id) })}>
                    {ap && (
                      <>
                        <span className="player-name">
                          {cleanName(ap.name)} 
                          {isGK(ap) && <span className="pos-badge">(G)</span>}
                          {isCaptain(ap) && <span className="pos-badge">(C)</span>}
                        </span>
                        <img src={match.awayLogo} alt="Logo" className="team-flag" />
                        <span className="player-num">{ap.number}</span>
                      </>
                    )}
                  </div>
                </div>
              );
            }
            return rows;
          })()}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. COACHES SECTION */}
      {/* ========================================================================= */}
      <div className="premium-section">
        <div className="premium-header">COACHES</div>
        <div className="premium-container">
          <div className="lineup-row-wrapper" style={{ borderBottom: 'none' }}>
            <div className="lineup-side home-side clickable-player" onClick={() => homeCoach.name && onPlayerClick({ name: cleanName(homeCoach.name), team: match.homeTeam, position: "Head Coach", image: getCoachImg(homeCoach.id) })}>
              {homeCoach.name && (
                <>
                  <img src={match.homeLogo} alt="Logo" className="team-flag"/>
                  <strong className="player-name" style={{ fontWeight: 600 }}>{cleanName(homeCoach.name)}</strong>
                </>
              )}
            </div>
            <div className="lineup-side away-side clickable-player" onClick={() => awayCoach.name && onPlayerClick({ name: cleanName(awayCoach.name), team: match.awayTeam, position: "Head Coach", image: getCoachImg(awayCoach.id) })}>
              {awayCoach.name && (
                <>
                  <strong className="player-name" style={{ fontWeight: 600 }}>{cleanName(awayCoach.name)}</strong>
                  <img src={match.awayLogo} alt="Logo" className="team-flag"/>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default MatchDetails;