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
        homeTeam: item?.teams?.home?.name || "Unknown",
        homeLogo: item?.teams?.home?.logo || "",
        homeId: item?.teams?.home?.id,
        awayTeam: item?.teams?.away?.name || "Unknown",
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

    const fetchScores = async () => {
      try {
        // Ab hum sirf World Cup nahi, balki globally 'Today' aur 'Live' matches mangwa rahe hain
        const [todayRes, liveRes] = await Promise.allSettled([
          fetch(`${API_URL}/api/fixtures/today`).then(res => res.ok ? res.json() : []),
          fetch(`${API_URL}/api/live-scores`).then(res => res.ok ? res.json() : [])
        ]);

        const todayData = todayRes.status === "fulfilled" ? todayRes.value : [];
        const liveData = liveRes.status === "fulfilled" ? liveRes.value : [];

        const extractArray = (data) => {
          if (Array.isArray(data)) return data;
          if (data && Array.isArray(data.response)) return data.response;
          return [];
        };

        const todayArr = extractArray(todayData);
        const liveArr = extractArray(liveData);

        // Duniya bhar ke saare matches ko ek list mein jod diya
        const combinedMatches = [...todayArr, ...liveArr];

        // Sirf valid data aage pass karein
        const validMatches = combinedMatches.filter(m => m && m.fixture && m.fixture.id);

        if (validMatches.length === 0) {
          console.warn("No valid matches found currently.");
          setMatches([]);
          return;
        }

        // Duplicate matches ko remove karne ka logic (kyunki aaj ka match live list mein bhi ho sakta hai)
        const uniqueMatches = Array.from(
          new Map(validMatches.map((m) => [m.fixture.id, m])).values()
        );

        setMatches(formatMatches(uniqueMatches));
      } catch (err) {
        console.error("Critical Fetch Error:", err.message);
        setMatches([]);
      }
    };

    fetchScores();
    const interval = setInterval(fetchScores, 240000); // 4 minutes auto-refresh
    return () => clearInterval(interval);
  }, [notificationsEnabled]);

  return matches;
}