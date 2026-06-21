const API_URL = "http://localhost:5000";

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