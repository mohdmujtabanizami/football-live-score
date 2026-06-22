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
        // Promise.allSettled ka use kiya taaki ek fail ho toh dusra chalta rahe
        const [todayRes, wcRes] = await Promise.allSettled([
          fetch(`${API_URL}/api/fixtures/today`).then(res => res.ok ? res.json() : []),
          fetch(`${API_URL}/api/fixtures/1?season=2026`).then(res => res.ok ? res.json() : [])
        ]);

        const todayData = todayRes.status === "fulfilled" ? todayRes.value : [];
        const wcData = wcRes.status === "fulfilled" ? wcRes.value : [];

        console.log("TODAY DATA RAW:", todayData);
        console.log("WORLD CUP DATA RAW:", wcData);

        const extractArray = (data) => {
          if (Array.isArray(data)) return data;
          if (data && Array.isArray(data.response)) return data.response;
          return [];
        };

        const todayArr = extractArray(todayData);
        const wcArr = extractArray(wcData);

        const combinedMatches = [...todayArr, ...wcArr];

        // Sabse zaroori Check: Sirf wahi data aage jaye jisme 'fixture' aur 'id' maujood ho
        const validMatches = combinedMatches.filter(m => m && m.fixture && m.fixture.id);

        if (validMatches.length === 0) {
          console.warn("No valid matches found for today or World Cup.");
          setMatches([]);
          return;
        }

        const uniqueMatches = Array.from(
          new Map(validMatches.map((m) => [m.fixture.id, m])).values()
        );

        // Real API data set karna
        setMatches(formatMatches(uniqueMatches));
      } catch (err) {
        console.error("Critical Fetch Error:", err.message);
        setMatches([]);
      }
    };

    // Pehli baar load hone par call karein
    fetchScores();

    // Har 4 minute (240000ms) mein auto-check karein.
    const interval = setInterval(fetchScores, 240000); 

    return () => clearInterval(interval);
  }, [notificationsEnabled]);

  return matches;
}