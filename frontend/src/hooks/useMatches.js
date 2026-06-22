import { API_URL } from "../config";
import { useEffect, useState } from "react";

export default function useMatches(notificationsEnabled) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Real API ke raw data ko app ke format mein convert karne wala function
    const formatMatches = (matchesArray) => {
      return matchesArray.map((item) => ({
        id: item?.fixture?.id,
        league: item?.league?.name || "Unknown League",
        leagueLogo: item?.league?.logo || "",
        country: item?.league?.country || "",
        homeTeam: item?.teams?.home?.name || "",
        homeLogo: item?.teams?.home?.logo || "",
        homeId: item?.teams?.home?.id,
        awayTeam: item?.teams?.away?.name || "",
        awayLogo: item?.teams?.away?.logo || "",
        awayId: item?.teams?.away?.id,
        score: item?.goals?.home !== null && item?.goals?.home !== undefined
            ? `${item.goals.home} - ${item.goals.away}`
            : "? - ?",
        minute: item?.fixture?.status?.elapsed || 0,
        status: item?.fixture?.status?.long || "TBD",
        statusShort: item?.fixture?.status?.short || "TBD",
        venue: item?.fixture?.venue?.name || "Unknown",
        city: item?.fixture?.venue?.city || "Unknown",
        referee: item?.fixture?.referee || "Unknown",
        date: item?.fixture?.date || "",
        season: item?.league?.season || "",
        round: item?.league?.round || "",
      }));
    };

    const fetchScores = () => {
      Promise.all([
        fetch(`${API_URL}/api/fixtures/today`).then((res) => res.json()),
        fetch(`${API_URL}/api/fixtures/1?season=2026`).then((res) => res.json()),
      ])
        .then(([todayData, wcData]) => {
          console.log("TODAY DATA:", todayData);
          console.log("WORLD CUP DATA:", wcData);

          const extractArray = (data) => {
            if (Array.isArray(data)) return data;
            if (data && Array.isArray(data.response)) return data.response;
            return [];
          };

          const todayArr = extractArray(todayData);
          const wcArr = extractArray(wcData);

          const combinedMatches = [...todayArr, ...wcArr];

          // Agar API limit ki wajah se data nahi aaya, toh khali array set karein
          if (combinedMatches.length === 0) {
            setMatches([]);
            return;
          }

          const uniqueMatches = Array.from(
            new Map(combinedMatches.map((m) => [m.fixture.id, m])).values()
          );

          // Real API data set karna
          setMatches(formatMatches(uniqueMatches));
        })
        .catch((err) => {
          console.error("API Limit Reached or Error:", err.message);
          // Pura dummy data logic hata diya gaya hai.
          // Ab limit khatm hone par app chupchap khali state mein rahegi.
          setMatches([]);
        });
    };

    // Pehli baar load hone par call karein
    fetchScores();

    // Har 3 minute (180000ms) mein auto-check karein.
    // Jab credit wapas aayega, ye apne aap data le aayegi!
    const interval = setInterval(fetchScores, 180000); 

    return () => clearInterval(interval);
  }, [notificationsEnabled]);

  return matches;
}