function Navbar({
  currentPage,
  setCurrentPage,
  setShowStandings,
  setShowScorers,
  darkMode,
  setDarkMode,
  language,
  setLanguage,
  user,
  handleLogin,
  handleLogout,
  showMenu,
  setShowMenu,
  logo,
  t
}) {
  return (
    <div className="top-navbar">

      <img src={logo} alt="ScoreHub" className="site-logo" />

      <div className="nav-links">
        <span
          onClick={() => setCurrentPage("home")}
          className={currentPage === "home" ? "active-nav" : ""}
        >
          {t.home}
        </span>

        <span
          onClick={() => setCurrentPage("live")}
          className={currentPage === "live" ? "active-nav" : ""}
        >
          {t.liveScores}
        </span>

        <span
          onClick={() => setCurrentPage("news")}
          className={currentPage === "news" ? "active-nav" : ""}
        >
          {t.news}
        </span>

        <span onClick={() => setShowStandings(true)}>
          {t.rankings}
        </span>

        <span onClick={() => setShowScorers(true)}>
          {t.topScorers}
        </span>
      </div>

      <div className="settings-wrapper">

        <button
          className="settings-btn"
          onClick={() => setShowMenu(!showMenu)}
        >
          ☰
        </button>

        {showMenu && (
          <div className="settings-menu">

            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? t.lightMode : t.darkMode}
            </button>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Urdu</option>
              <option>Arabic</option>
              <option>French</option>
              <option>Spanish</option>
            </select>

            {user ? (
              <>
                <div>{user.displayName}</div>
                <button onClick={handleLogout}>
                  {t.logout}
                </button>
              </>
            ) : (
              <button onClick={handleLogin}>
                {t.login}
              </button>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;