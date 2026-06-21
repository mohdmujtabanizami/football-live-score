const API_URL = "https://football-live-score-dlf6.onrender.com";

export const getLiveScores = async () => {
  const res = await fetch(
    `${API_URL}/api/live-scores`
  );

  return res.json();
};

export const getNews = async () => {
  const res = await fetch(
    `${API_URL}/api/news`
  );

  return res.json();
};

export const getTodayFixtures = async () => {
  const res = await fetch(
    `${API_URL}/api/fixtures/today`
  );

  return res.json();
};

export const getStandings = async (league) => {
  const res = await fetch(
    `${API_URL}/api/standings/${league}`
  );

  return res.json();
};

export const getTopScorers = async (league) => {
  const res = await fetch(
    `${API_URL}/api/topscorers/${league}`
  );

  return res.json();
};