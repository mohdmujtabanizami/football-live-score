function HomePage({
  matches,
  news,
  newsLoading,
  newsError,
  t,
  openMatchDetails,
  setSelectedNews, // <-- NAYA PROP ADD KIYA HAI
}) {
  if (newsLoading) {
    return (
      <div className="home-section">
        <p>Loading news...</p>
      </div>
    );
  }

  if (newsError) {
    return (
      <div className="home-section">
        <p>Failed to load news.</p>
      </div>
    );
  }

  return (
    <div className="home-section">
      <h2 className="section-title">{t.liveMatches}</h2>

      <div className="matches-grid">
        {matches
          ?.filter((match) => ["1H", "2H", "HT", "LIVE"].includes(match.statusShort))
          .slice(0, 4)
          .map((match, index) => (
            // Match card ko clickable banaya aur cursor pointer add kiya
            <div 
              className="card" 
              key={index} 
              onClick={() => openMatchDetails(match)} 
              style={{ cursor: "pointer" }}
            >
              <div className="league">
                <img
                  src={match.leagueLogo}
                  alt={match.league}
                  className="league-logo"
                />
                <span>{match.league}</span>
              </div>

              <div className="match-info">{t.matchInfo}</div>

              <div className="round">{match.round}</div>

              <div className="teams-row">
                <div className="team">
                  <img src={match.homeLogo} alt={match.homeTeam} />
                  <p>{match.homeTeam}</p>
                </div>

                <div className="score-section">
                  <div className="live-badge">{t.live}</div>
                  <div className="score">{match.score}</div>
                  <div className="status">
                    {match.statusShort}
                    {match.minute ? ` • ${match.minute}'` : ""}
                  </div>
                </div>

                <div className="team">
                  <img src={match.awayLogo} alt={match.awayTeam} />
                  <p>{match.awayTeam}</p>
                </div>
              </div>

              <button
                className="stats-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Taki card aur button ka click clash na ho
                  openMatchDetails(match);
                }}
              >
                {t.viewStats}
              </button>
            </div>
          ))}
      </div>

      <h2 className="section-title">{t.latestNews}</h2>

      <div className="news-grid">
        {news?.slice(0, 2).map((item) => (
          // News card ko clickable banaya
          <div
            key={item.id}
            className="news-card"
            onClick={() => setSelectedNews(item)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="news-image"
            />

            <div className="news-content">
              <h3>{item.title}</h3>

              <span>{new Date(item.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;