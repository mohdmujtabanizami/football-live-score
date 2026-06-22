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
import StandingsPage from "./pages/StandingsPage"; // <-- StandingsPage Import
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
  const [showStandings, setShowStandings] = useState(false); // StandingsPage ke liye
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
      console.warn("API Offline: Opening Match Page with Dummy Data", error);
      // Fallback: API fail hone par bhi page khulega
      setSelectedMatchPage({
        ...match,
        events: [],
        lineups: [],
        stats: [],
      });
    }
  };

  const openTeamDetails = async (teamId, teamName = "Unknown Team", teamLogo = "") => {
    try {
      const [teamRes, squadRes] = await Promise.all([
       fetch(`${API_URL}/api/team/${teamId}`).then((res) => res.json()),
       fetch(`${API_URL}/api/team/${teamId}/players`).then((res) => res.json()),
      ]);
      setSelectedTeam({
        id: teamId, 
        name: teamRes.team.name, 
        logo: teamRes.team.logo,
        founded: teamRes.team.founded, 
        stadium: teamRes.venue.name,
        city: teamRes.venue.city, 
        capacity: teamRes.venue.capacity,
        squad: squadRes[0]?.players || []
      });
      setShowStandings(false); 
      setShowScorers(false);
    } catch (error) {
      console.warn("API Offline: Opening Team Page with Dummy Data", error);
      // Fallback: API fail hone par bhi team page khulega basic info ke sath
      setSelectedTeam({
        id: teamId,
        name: teamName,
        logo: teamLogo,
        founded: "N/A",
        stadium: "Offline Stadium",
        city: "N/A",
        capacity: "0",
        squad: [],
      });
      setShowStandings(false); 
      setShowScorers(false);
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
        darkMode={darkMode} setDarkMode={setDarkMode}
        language={language} setLanguage={setLanguage}
        user={user} handleLogin={handleLogin} handleLogout={handleLogout}
        showMenu={showMenu} setShowMenu={setShowMenu} logo={logo} t={t}
      />

      {/* YAHAN UPDATE KIYA GAYA HAI: setSelectedNews={setSelectedNews} add kiya hai */}
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