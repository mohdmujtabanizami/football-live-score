// Smart Season Detector: European leagues usually start in August.
const getCurrentSeason = () => {
  const month = new Date().getMonth(); 
  const year = new Date().getFullYear();
  return month < 7 ? year - 1 : year; 
};
const CURRENT_SEASON = getCurrentSeason();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

if (!process.env.API_KEY) {
  console.error("API_KEY missing in .env");
  process.exit(1);
}

if (!process.env.NEWS_API_KEY) {
  console.error("NEWS_API_KEY missing in .env");
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   RATE LIMITER
========================= */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

/* =========================
   API FOOTBALL CONFIG
========================= */
const footballApi = axios.create({
  baseURL: "https://v3.football.api-sports.io",
  headers: {
    "x-apisports-key": process.env.API_KEY,
  },
});

const logError = (err) => {
  console.error(err.response?.data || err.message || "An error occurred");
};

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("Football Backend Running ⚽");
});

/* =========================
   LIVE SCORES
========================= */
app.get("/api/live-scores", async (req, res) => {
  try {
    const response = await footballApi.get("/fixtures", { params: { live: "all" } });
    res.json(response.data.response || []);
  } catch (err) {
    logError(err);
    res.status(500).json({ error: "Failed to fetch live scores" });
  }
});

/* =========================
   TODAY FIXTURES
========================= */
app.get("/api/fixtures/today", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const response = await footballApi.get("/fixtures", {
      params: {
        date: today,
      },
    });

    const matches = response.data.response || [];
    
    // Agar match nahi hain, toh khali array bhejein, dummy data nahi
    res.json(matches);
  } catch (err) {
    logError(err);
    // Error aane par error bhejein, nakli Liverpool match nahi
    res.status(500).json({ error: "Failed to fetch today's fixtures" });
  }
});

/* =========================
   FIXTURES BY LEAGUE
========================= */
app.get("/api/fixtures/:leagueId", async (req, res) => {
  try {
    const { leagueId } = req.params;

    const seasonToUse =
      leagueId == 1
        ? 2022
        : req.query.season || CURRENT_SEASON;

    const response = await footballApi.get("/fixtures", {
      params: { league: leagueId, season: seasonToUse },
    });

    const matches = response.data.response || [];

    // Agar match nahi hain, toh khali array bhejein, dummy World Cup data nahi
    res.json(matches);
  } catch (err) {
    logError(err);
    // Error aane par error bhejein, nakli Argentina match nahi
    res.status(500).json({ error: "Failed to fetch league fixtures" });
  }
});

/* =========================
   FOOTBALL NEWS
========================= */
app.get("/api/news", async (req, res) => {
  try {
    const requestedLang = req.query.lang || "en";
    const validLangs = ["ar", "de", "en", "es", "fr", "it", "nl", "no", "pt", "ru", "sv", "ud", "zh"];
    const langToUse = validLangs.includes(requestedLang) ? requestedLang : "en";

    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "(football OR soccer OR premier league OR champions league OR fifa world cup OR la liga OR bundesliga OR serie a)",
        language: langToUse,
        sortBy: "publishedAt",
        pageSize: 20,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    const news = response.data.articles.map((article, index) => ({
      id: index + 1,
      title: article.title,
      image: article.urlToImage || "https://via.placeholder.com/600x400",
      date: article.publishedAt,
      author: article.author,
      description: article.description,
      content: article.content || article.description,
      source: article.source.name,
      url: article.url,
    }));

    res.json(news);
  } catch (err) {
    logError(err);
    res.status(500).json({ error: "News fetch failed" });
  }
});

/* =========================
   MATCH DETAILS & EVENTS
========================= */
app.get("/api/match/:id", async (req, res) => {
  try {
    const response = await footballApi.get("/fixtures", { params: { id: req.params.id } });
    res.json(response.data.response[0] || {});
  } catch (err) {
    logError(err);
    res.status(500).json({ error: "Match fetch failed" });
  }
});

app.get("/api/match-events/:id", async (req, res) => {
  try {
    const response = await footballApi.get("/fixtures/events", { params: { fixture: req.params.id } });
    res.json(response.data.response);
  } catch (err) {
    logError(err);
    res.status(500).json({ error: "Events fetch failed" });
  }
});

/* =========================
   LINEUPS
========================= */
app.get("/api/lineups/:fixtureId", async (req, res) => {
  try {
    const response = await footballApi.get("/fixtures/lineups", { params: { fixture: req.params.fixtureId } });
    res.json(response.data.response);
  } catch (err) {
    logError(err);
    res.status(500).json({ error: "Lineups fetch failed" });
  }
});

/* =========================
   TEAM & PLAYERS
========================= */
app.get("/api/team/:id", async (req, res) => {
  try {
    const response = await footballApi.get("/teams", { params: { id: req.params.id } });
    res.json(response.data.response[0] || {});
  } catch (err) {
    logError(err);
    res.status(500).json({ error: "Team fetch failed" });
  }
});

app.get("/api/team/:id/players", async (req, res) => {
  try {
    const response = await footballApi.get("/players/squads", { params: { team: req.params.id } });
    res.json(response.data.response);
  } catch (err) {
    logError(err);
    res.status(500).json({ error: "Squad fetch failed" });
  }
});

/* =========================
   PLAYER DETAILS
========================= */
app.get("/api/player/:id", async (req, res) => {
  try {
    const response = await footballApi.get("/players", {
      params: { id: req.params.id, season: req.query.season || CURRENT_SEASON },
    });
    res.json(response.data.response[0] || {});
  } catch (err) {
    logError(err);
    res.status(500).json({ error: "Player fetch failed" });
  }
});

/* =========================
   TOP SCORERS
========================= */
app.get("/api/top-scorers/:leagueId", async (req, res) => {
  try {
    const { leagueId } = req.params;
    const seasonToUse = leagueId == 1 ? 2022 : (req.query.season || CURRENT_SEASON);

    const response = await footballApi.get("/players/topscorers", {
      params: { league: leagueId, season: seasonToUse },
    });
    res.json(response.data.response || []);
  } catch (err) {
    logError(err);
    res.status(500).json({ error: "Top scorers fetch failed" });
  }
});

/* =========================
   STANDINGS
========================= */
app.get("/api/standings/:league", async (req, res) => {
  try {
    const response = await footballApi.get("/standings", {
      params: { league: req.params.league, season: req.query.season || CURRENT_SEASON },
    });
    res.json(response.data.response);
  } catch (err) {
    logError(err);
    res.status(500).json({ error: "Standings fetch failed" });
  }
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});