import React from "react";

function LiveScores({
  matches = [],
  activeTab = "LIVE",
  setActiveTab,
  leagueFilter = "All",
  setLeagueFilter,
  search = "",
  setSearch,
  leaguesList = [],
  favorites = [], // FIX: Default empty array agar prop missing ho
  favoriteTeams = [], // FIX: Default empty array agar prop missing ho
  toggleFavorite = () => {}, // FIX: Default empty function
  toggleFavoriteTeam = () => {}, // FIX: Default empty function
  openTeamDetails,
  openMatchDetails,
  selectedMatch,
  setSelectedMatch,
  t = {},
}) {
  return (
    <>
      <div className="tabs">
        <button className={activeTab === "LIVE" ? "active-tab" : ""} onClick={() => setActiveTab("LIVE")}>{t.live}</button>
        <button className={activeTab === "UPCOMING" ? "active-tab" : ""} onClick={() => setActiveTab("UPCOMING")}>{t.upcoming}</button>
        <button className={activeTab === "FINISHED" ? "active-tab" : ""} onClick={() => setActiveTab("FINISHED")}>{t.finished}</button>
        <button className={activeTab === "FAVORITES" ? "active-tab" : ""} onClick={() => setActiveTab("FAVORITES")}>{t.fav}</button>
        <button className={activeTab === "MY_TEAMS" ? "active-tab" : ""} onClick={() => setActiveTab("MY_TEAMS")}>{t.myTeams}</button>
      </div>

      <select className="league-filter" value={leagueFilter} onChange={(e) => setLeagueFilter(e.target.value)}>
        {leaguesList.map((league) => (
          <option key={league} value={league}>{league}</option>
        ))}
      </select>

      <input 
        type="text" 
        placeholder={t.search || "Search..."} 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="search-box" 
      />

      <div className="matches-grid">
        {matches?.length > 0 ? (
          matches
            .filter((match) => {
              const statusShort = match?.statusShort || "";
              const isLive = ["1H", "2H", "HT", "LIVE"].includes(statusShort);
              const isUpcoming = ["NS", "TBD"].includes(statusShort);
              const isFinished = ["FT", "AET", "PEN"].includes(statusShort);
              
              if (activeTab === "LIVE") return isLive;
              if (activeTab === "UPCOMING") return isUpcoming;
              if (activeTab === "FINISHED") return isFinished;
              if (activeTab === "FAVORITES") return favorites.includes(match?.id);
              if (activeTab === "MY_TEAMS") return favoriteTeams.includes(match?.homeTeam) || favoriteTeams.includes(match?.awayTeam);
              return true;
            })
            .filter((match) => {
              const homeName = match?.homeTeam?.toLowerCase() || "";
              const awayName = match?.awayTeam?.toLowerCase() || "";
              const searchTerm = search?.toLowerCase() || "";
              
              return homeName.includes(searchTerm) || awayName.includes(searchTerm);
            })
            .filter((match) => leagueFilter === "All" ? true : match?.league === leagueFilter)
            .map((match) => (
              <div className="card" key={match?.id} onClick={() => setSelectedMatch(selectedMatch === match?.id ? null : match?.id)}>
                <div className="favorite-star" onClick={(e) => { e.stopPropagation(); toggleFavorite(match?.id); }}>
                  {favorites.includes(match?.id) ? "⭐" : "☆"}
                </div>
                
                <div className="league">
                  <img src={match?.leagueLogo || ""} alt={match?.league} className="league-logo" />
                  <span>{match?.league}</span>
                </div>
                
                <div className="round">{match?.round}</div>

                <div className="teams-row">
                  <div className="team">
                    <img src={match?.homeLogo || ""} alt={match?.homeTeam} />
                    <p className="team-name" onClick={(e) => { e.stopPropagation(); openTeamDetails(match?.homeId); }}>{match?.homeTeam}</p>
                    <span className="team-star" onClick={(e) => { e.stopPropagation(); toggleFavoriteTeam(match?.homeTeam); }}>
                      {favoriteTeams.includes(match?.homeTeam) ? "⭐" : "☆"}
                    </span>
                  </div>

                  <div className="score-section">
                    {["1H", "2H", "HT", "LIVE"].includes(match?.statusShort) && <div className="live-badge">{t.live}</div>}
                    <div className="score">{match?.score}</div>
                    <div className="status">{match?.statusShort} {match?.minute ? `• ${match.minute}'` : ""}</div>
                  </div>

                  <div className="team">
                    <img src={match?.awayLogo || ""} alt={match?.awayTeam} />
                    <p className="team-name" onClick={(e) => { e.stopPropagation(); openTeamDetails(match?.awayId); }}>{match?.awayTeam}</p>
                    <span className="team-star" onClick={(e) => { e.stopPropagation(); toggleFavoriteTeam(match?.awayTeam); }}>
                      {favoriteTeams.includes(match?.awayTeam) ? "⭐" : "☆"}
                    </span>
                  </div>
                </div>

                {selectedMatch === match?.id && (
                  <div className="match-details">
                    <h4>{t.matchDetails || "Match Details"}</h4>
                    <p>{t.stadium || "Stadium"}: {match?.venue}</p>
                    <p>{t.country || "Country"}: {match?.country}</p>
                    <p>{t.referee || "Referee"}: {match?.referee || "Unknown"}</p>
                  </div>
                )}
                <button className="stats-btn" onClick={(e) => { e.stopPropagation(); openMatchDetails(match); }}>
                  {t.viewStats || "View Stats"}
                </button>
              </div>
            ))
        ) : (
          <h2 style={{ width: "100%", textAlign: "center" }}>{t.noMatch || "No Matches Available"}</h2>
        )}
      </div>
    </>
  );
}

export default LiveScores;