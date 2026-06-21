import { API_URL } from "../config";
import { useEffect, useState } from "react";

export default function useMatches(
  notificationsEnabled
) {
  const [matches, setMatches] =
    useState([]);

  useEffect(() => {
    const fetchScores = () => {
      Promise.all([
        fetch(
          `${API_URL}/api/fixtures/today`
        ).then((res) => res.json()),

        fetch(
          `${API_URL}/api/fixtures/1?season=2026`
        ).then((res) => res.json()),
      ])
        .then(([todayData, wcData]) => {
          const todayArr =
            Array.isArray(todayData)
              ? todayData
              : [];

          const wcArr =
            Array.isArray(wcData)
              ? wcData
              : [];

          const combinedMatches = [
            ...todayArr,
            ...wcArr,
          ];

          const uniqueMatches =
            Array.from(
              new Map(
                combinedMatches.map(
                  (m) => [
                    m.fixture.id,
                    m,
                  ]
                )
              ).values()
            );

          const formattedMatches =
            uniqueMatches.map(
              (item) => ({
                id: item.fixture.id,
                league:
                  item.league.name,
                leagueLogo:
                  item.league.logo,
                country:
                  item.league.country,
                homeTeam:
                  item.teams.home.name,
                homeLogo:
                  item.teams.home.logo,
                homeId:
                  item.teams.home.id,
                awayTeam:
                  item.teams.away.name,
                awayLogo:
                  item.teams.away.logo,
                awayId:
                  item.teams.away.id,
                score:
                  item.goals.home !==
                  null
                    ? `${item.goals.home} - ${item.goals.away}`
                    : "? - ?",
                minute:
                  item.fixture.status
                    .elapsed,
                status:
                  item.fixture.status
                    .long,
                statusShort:
                  item.fixture.status
                    .short,
                venue:
                  item.fixture.venue
                    .name,
                city:
                  item.fixture.venue
                    .city,
                referee:
                  item.fixture.referee,
                date:
                  item.fixture.date,
                season:
                  item.league.season,
                round:
                  item.league.round,
              })
            );

          setMatches(
            formattedMatches
          );
        })
        .catch(console.log);
    };

    fetchScores();

    const interval =
      setInterval(
        fetchScores,
        180000
      );

    return () =>
      clearInterval(interval);
  }, [notificationsEnabled]);

  return matches;
}