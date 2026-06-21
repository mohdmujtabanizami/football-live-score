import { useEffect, useState } from "react";
import { LEAGUE_IDS } from "../utils/constants";

export default function useStandings(
  selectedLeague,
  showStandings
) {
  const [standingsData, setStandingsData] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    if (!showStandings) return;

    const fetchStandings = async () => {
      try {
        setLoading(true);
        setError(null);

        const leagueId =
          LEAGUE_IDS[selectedLeague] || 39;

        const response = await fetch(
          `http://localhost:5000/api/standings/${leagueId}`
        );

        const data =
          await response.json();

        if (
          data &&
          data.length > 0 &&
          data[0]?.league?.standings?.[0]
        ) {
          setStandingsData(
            data[0].league.standings[0]
          );
        } else {
          setStandingsData([]);
        }
      } catch (err) {
        console.error(
          "Standings fetch error:",
          err
        );

        setError(err);
        setStandingsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [
    selectedLeague,
    showStandings,
  ]);

  return {
    standingsData,
    loading,
    error,
  };
}