import { API_URL } from "./config";
import React, { useEffect, useState } from "react";
import "./App.css";

import logo from "/scorehub-logo.png";

// Custom Hooks
import useAuth from "./hooks/useAuth";
import useMatches from "./hooks/useMatches";
import useNews from "./hooks/useNews";

// Utilities
import { translations } from "./translations";

// Components
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import LiveScores from "./components/LiveScores";
import NewsPage from "./components/NewsPage";
import NewsModal from "./components/NewsModal";

// Pages
import TeamPage from "./pages/TeamPage";
import PlayerPage from "./pages/PlayerPage";
import TopScorers from "./pages/TopScorers";
import StandingsPage from "./pages/StandingsPage";
import MatchDetails from "./pages/MatchDetails";

function App() {
  const { user, handleLogin, handleLogout } = useAuth();

  const [currentPage, setCurrentPage] = useState("home");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "English");
  
  // Navigation States
  const [selectedMatchPage, setSelectedMatchPage] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  
  // Page Toggles
  const [showStandings, setShowStandings] = useState(false);
  const [showScorers, setShowScorers] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  const [activeTab, setActiveTab] = useState("LIVE");
  const [search, setSearch] = useState("");
  const [leagueFilter, setLeagueFilter] = useState("All");

  // Hooks
  const matches = useMatches(true) || [];
  const { news, newsLoading, newsError } = useNews(language);

  const t = translations[language] || translations.English;
  const isRTL = language === "Arabic" || language === "Urdu";
  const leaguesList = ["All", ...new Set(matches.map((match) => match.league))];

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    localStorage.setItem("language", language);
  }, [darkMode, language]);

  // ================= HARDWARE BACK BUTTON LOGIC =================
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
  }, []);

  useEffect(() => {
    const handleBackButton = (e) => {
      let preventAppExit = false;

      if (selectedPlayer) { setSelectedPlayer(null); preventAppExit = true; }
      else if (selectedMatchPage) { setSelectedMatchPage(null); preventAppExit = true; }
      else if (selectedTeam) { setSelectedTeam(null); preventAppExit = true; }
      else if (selectedNews) { setSelectedNews(null); preventAppExit = true; }
      else if (showScorers) { setShowScorers(false); preventAppExit = true; }
      else if (showStandings) { setShowStandings(false); preventAppExit = true; }
      else if (currentPage !== "home") { setCurrentPage("home"); preventAppExit = true; }

      if (preventAppExit) {
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handleBackButton);
    return () => window.removeEventListener("popstate", handleBackButton);
  }, [selectedPlayer, selectedMatchPage, selectedTeam, selectedNews, showScorers, showStandings, currentPage]);

  // ================= DATA FETCHING HANDLERS =================
  const openMatchDetails = async (match) => {
    try {
      const [eventsRes, lineupsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/api/match-events/${match.id}`).then((res) => res.json()),
        fetch(`${API_URL}/api/lineups/${match.id}`).then((res) => res.json()),
        fetch(`${API_URL}/api/match-stats/${match.id}`).then((res) => res.json()),
      ]);
      setSelectedMatchPage({ ...match, events: eventsRes || [], lineups: lineupsRes || [], stats: statsRes || [] });
    } catch (error) {
      console.error("API Error: Cannot fetch match details", error);
      alert("Match details are unavailable right now. API limit reached or server error.");
      // Koi dummy data set nahi hoga
    }
  };

  const openTeamDetails = async (teamId, teamName = "Unknown Team", teamLogo = "") => {
    try {
      const [teamRes, squadRes] = await Promise.all([
        fetch(`${API_URL}/api/team/${teamId}`).then((res) => res.json()),
        fetch(`${API_URL}/api/team/${teamId}/players`).then((res) => res.json()),
      ]);
      setSelectedTeam({
        id: teamId, name: teamRes.team.name, logo: teamRes.team.logo,
        founded: teamRes.team.founded, stadium: teamRes.venue.name,
        city: teamRes.venue.city, capacity: teamRes.venue.capacity,
        squad: squadRes[0]?.players || []
      });
      setShowStandings(false); setShowScorers(false);
    } catch (error) {
      console.error("API Error: Cannot fetch team details", error);
      alert("Team details are unavailable right now. API limit reached or server error.");
      // Koi dummy data set nahi hoga
    }
  };

  // ================= PAGE ROUTING =================
  if (selectedPlayer) return <PlayerPage player={selectedPlayer} onBack={() => setSelectedPlayer(null)} />;
  if (selectedMatchPage) return <MatchDetails match={selectedMatchPage} onBack={() => setSelectedMatchPage(null)} onPlayerClick={setSelectedPlayer} />;
  if (selectedTeam) return <TeamPage team={selectedTeam} onBack={() => setSelectedTeam(null)} onPlayerClick={setSelectedPlayer} />;
  
  if (showScorers) return <TopScorers onBack={() => setShowScorers(false)} darkMode={darkMode} onPlayerClick={setSelectedPlayer} />;
  if (showStandings) return <StandingsPage onBack={() => setShowStandings(false)} darkMode={darkMode} onTeamClick={openTeamDetails} />;

  return (
    <div className={darkMode ? "container dark" : "container light"} dir={isRTL ? "rtl" : "ltr"}>
      <Navbar
        currentPage={currentPage} setCurrentPage={setCurrentPage}
        setShowStandings={setShowStandings} setShowScorers={setShowScorers}
        showStandings={showStandings} showScorers={showScorers}
        darkMode={darkMode} setDarkMode={setDarkMode}
        language={language} setLanguage={setLanguage}
        user={user} handleLogin={handleLogin} handleLogout={handleLogout}
        showMenu={showMenu} setShowMenu={setShowMenu} logo={logo} t={t}
      />

      {currentPage === "home" && <HomePage matches={matches} news={news} newsLoading={newsLoading} newsError={newsError} t={t} openMatchDetails={openMatchDetails} setSelectedNews={setSelectedNews} />}
      
      {currentPage === "live" && (
        <LiveScores
          matches={matches} activeTab={activeTab} setActiveTab={setActiveTab}
          leagueFilter={leagueFilter} setLeagueFilter={setLeagueFilter}
          search={search} setSearch={setSearch} leaguesList={leaguesList}
          openTeamDetails={openTeamDetails} openMatchDetails={openMatchDetails} t={t}
        />
      )}

      {currentPage === "news" && <NewsPage news={news} t={t} setSelectedNews={setSelectedNews} />}

      <NewsModal selectedNews={selectedNews} news={news} t={t} darkMode={darkMode} setSelectedNews={setSelectedNews} />
    </div>
  );
}

export default App;