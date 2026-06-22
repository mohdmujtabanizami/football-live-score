const express = require("express");
const cors = require("cors");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const getCurrentSeason = () => {
  const month = new Date().getMonth(); 
  const year = new Date().getFullYear();
  return month < 7 ? year - 1 : year; 
};
const CURRENT_SEASON = getCurrentSeason();

if (!process.env.API_KEY) {
  console.error("API_KEY missing in .env");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

const footballApi = axios.create({
  baseURL: "https://v3.football.api-sports.io",
  headers: { "x-apisports-key": process.env.API_KEY },
});

const checkApiErrors = (responseData) => {
  if (responseData.errors && Object.keys(responseData.errors).length > 0) {
    console.error("API ERROR DETECTED:", responseData.errors);
  }
};

const logError = (err) => {
  console.error("Backend Error:", err.message);
};

app.get("/", (req, res) => {
  res.send("Football Backend Running ⚽");
});

app.get("/api/live-scores", async (req, res) => {
  try {
    const response = await footballApi.get("/fixtures", { params: { live: "all" } });
    checkApiErrors(response.data);
    res.json(response.data.response || []);
  } catch (err) {
    logError(err);
    res.status(500).json({ error: "Failed to fetch live scores" });
  }
});

/* =========================
   TODAY FIXTURES (SMART FALLBACK)
========================= */
app.get("/api/fixtures/today", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    let response = await footballApi.get("/fixtures", { params: { date: today } });
    checkApiErrors(response.data);
    
    let matches = response.data.response || [];

    if (matches.length === 0) {
      console.log("No matches today. Fetching upcoming next 15 matches...");
      response = await footballApi.get("/fixtures", { params: { next: 15 } });
      matches = response.data.response || [];
    }

    res.json(matches);
  } catch (err) {
    logError(err);
    res.status(500).json({ error: "API Limit Reached or Data failed" });
  }
});

app.get("/api/fixtures/:leagueId", async (req, res) => {
  try {
    const { leagueId } = req.params;
    const seasonToUse = req.query.season || CURRENT_SEASON;
    const response = await footballApi.get("/fixtures", {
      params: { league: leagueId, season: seasonToUse },
    });
    checkApiErrors(response.data);
    res.json(response.data.response || []);
  } catch (err) {
    logError(err);
    res.status(500).json({ error: "Failed to fetch league fixtures" });
  }
});

app.get("/api/news", async (req, res) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "(football OR soccer OR premier league)",
        language: "en",
        sortBy: "publishedAt",
        pageSize: 20,
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    res.json(response.data.articles.map((a, i) => ({ id: i + 1, title: a.title, image: a.urlToImage, url: a.url })));
  } catch (err) {
    logError(err);
    res.status(500).json({ error: "News fetch failed" });
  }
});

app.get("/api/match/:id", async (req, res) => {
  try {
    const response = await footballApi.get("/fixtures", { params: { id: req.params.id } });
    res.json(response.data.response[0] || {});
  } catch (err) {
    res.status(500).json({ error: "Match fetch failed" });
  }
});

app.get("/api/match-events/:id", async (req, res) => {
  try {
    const response = await footballApi.get("/fixtures/events", { params: { fixture: req.params.id } });
    res.json(response.data.response || []);
  } catch (err) {
    res.status(500).json({ error: "Events fetch failed" });
  }
});

app.get("/api/lineups/:fixtureId", async (req, res) => {
  try {
    const response = await footballApi.get("/fixtures/lineups", { params: { fixture: req.params.fixtureId } });
    res.json(response.data.response || []);
  } catch (err) {
    res.status(500).json({ error: "Lineups fetch failed" });
  }
});

app.get("/api/team/:id", async (req, res) => {
  try {
    const response = await footballApi.get("/teams", { params: { id: req.params.id } });
    res.json(response.data.response[0] || {});
  } catch (err) {
    res.status(500).json({ error: "Team fetch failed" });
  }
});

app.get("/api/team/:id/players", async (req, res) => {
  try {
    const response = await footballApi.get("/players/squads", { params: { team: req.params.id } });
    res.json(response.data.response || []);
  } catch (err) {
    res.status(500).json({ error: "Squad fetch failed" });
  }
});

app.get("/api/player/:id", async (req, res) => {
  try {
    const response = await footballApi.get("/players", {
      params: { id: req.params.id, season: req.query.season || CURRENT_SEASON },
    });
    res.json(response.data.response[0] || {});
  } catch (err) {
    res.status(500).json({ error: "Player fetch failed" });
  }
});

app.get("/api/top-scorers/:leagueId", async (req, res) => {
  try {
    const response = await footballApi.get("/players/topscorers", {
      params: { league: req.params.leagueId, season: req.query.season || CURRENT_SEASON },
    });
    res.json(response.data.response || []);
  } catch (err) {
    res.status(500).json({ error: "Top scorers fetch failed" });
  }
});

app.get("/api/standings/:league", async (req, res) => {
  try {
    const response = await footballApi.get("/standings", {
      params: { league: req.params.league, season: req.query.season || CURRENT_SEASON },
    });
    res.json(response.data.response || []);
  } catch (err) {
    res.status(500).json({ error: "Standings fetch failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});