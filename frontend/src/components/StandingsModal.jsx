import { LEAGUE_IDS } from "../utils/constants";

function StandingsModal({
  showStandings,
  setShowStandings,
  selectedLeague,
  setSelectedLeague,
  standingsData,
  standingsLoading,
  standingsError,
  openTeamDetails,
  t,
}) {
  if (!showStandings) return null;

  return (
    <div
      className="modal-overlay"
      onClick={() => setShowStandings(false)}
    >
      <div
        className="standings-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>
          🏆 {selectedLeague} {t.standings}
        </h2>

        <select
          className="standings-select"
          value={selectedLeague}
          onChange={(e) =>
            setSelectedLeague(e.target.value)
          }
        >
          {Object.keys(LEAGUE_IDS || {}).map(
            (league) => (
              <option
                key={league}
                value={league}
              >
                {league}
              </option>
            )
          )}
        </select>

        {standingsLoading && (
          <p
            style={{
              textAlign: "center",
              margin: "10px 0",
            }}
          >
            Loading standings...
          </p>
        )}

        {standingsError && (
          <p
            style={{
              textAlign: "center",
              margin: "10px 0",
              color: "#ff4d4d",
            }}
          >
            Failed to load standings.
          </p>
        )}

        <table className="standings-table">
          <thead>
            <tr>
              <th>{t.pos}</th>
              <th>{t.team}</th>
              <th>{t.p}</th>
              <th>{t.w}</th>
              <th>{t.d}</th>
              <th>{t.l}</th>
              <th>{t.pts}</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(standingsData) &&
              standingsData.map(
                (teamData) => (
                  <tr
                    key={teamData.team.id}
                    className={
                      teamData.rank <= 4
                        ? "top-team"
                        : ""
                    }
                  >
                    <td>
                      <span
                        className={
                          teamData.rank === 1
                            ? "gold"
                            : teamData.rank === 2
                            ? "silver"
                            : teamData.rank === 3
                            ? "bronze"
                            : ""
                        }
                      >
                        {teamData.rank}
                      </span>
                    </td>

                    <td
                      className="ranking-team"
                      onClick={() => {
                        openTeamDetails(
                          teamData.team.id
                        );
                        setShowStandings(false);
                      }}
                    >
                      <div className="ranking-team-info">
                        <img
                          src={teamData.team.logo}
                          alt={
                            teamData.team.name
                          }
                        />
                        <span>
                          {teamData.team.name}
                        </span>
                      </div>
                    </td>

                    <td>
                      {teamData.all.played}
                    </td>
                    <td>
                      {teamData.all.win}
                    </td>
                    <td>
                      {teamData.all.draw}
                    </td>
                    <td>
                      {teamData.all.lose}
                    </td>
                    <td>
                      {teamData.points}
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>

        <button
          className="close-btn"
          onClick={() =>
            setShowStandings(false)
          }
        >
          {t.close}
        </button>
      </div>
    </div>
  );
}

export default StandingsModal;