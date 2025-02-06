import { Match, TeamStats, TeamForm } from '../types';

interface TeamData {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
  penaltyKicks: number;
}

export function calculateTeamStats(matches: Match[]) {
  const teamStats: Record<string, TeamData> = {};

  matches.forEach((match) => {
    const homeScore = parseInt(String(match.home_score));
    const awayScore = parseInt(String(match.away_score));

    [match.home_team, match.away_team].forEach((team) => {
      if (!teamStats[team]) {
        teamStats[team] = {
          team,
          played: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
          points: 0,
          form: [],
          penaltyKicks: 0,
        };
      }
    });

    const homeTeam = teamStats[match.home_team];
    const awayTeam = teamStats[match.away_team];

    homeTeam.played++;
    homeTeam.goalsFor += homeScore;
    homeTeam.goalsAgainst += awayScore;

    awayTeam.played++;
    awayTeam.goalsFor += awayScore;
    awayTeam.goalsAgainst += homeScore;

    if (homeScore > awayScore) {
      homeTeam.won++;
      homeTeam.points += 3;
      homeTeam.form.push("W");
      awayTeam.lost++;
      awayTeam.form.push("L");
    } else if (homeScore < awayScore) {
      awayTeam.won++;
      awayTeam.points += 3;
      awayTeam.form.push("W");
      homeTeam.lost++;
      homeTeam.form.push("L");
    } else {
      homeTeam.drawn++;
      homeTeam.points++;
      homeTeam.form.push("D");
      awayTeam.drawn++;
      awayTeam.points++;
      awayTeam.form.push("D");
    }

    homeTeam.goalDifference = homeTeam.goalsFor - homeTeam.goalsAgainst;
    awayTeam.goalDifference = awayTeam.goalsFor - awayTeam.goalsAgainst;

    homeTeam.form = homeTeam.form.slice(-5);
    awayTeam.form = awayTeam.form.slice(-5);
  });

  const standings: TeamStats[] = Object.values(teamStats)
    .map((stats) => ({
      position: 0,
      team: stats.team,
      played: stats.played,
      won: stats.won,
      drawn: stats.drawn,
      lost: stats.lost,
      goalsFor: stats.goalsFor,
      goalsAgainst: stats.goalsAgainst,
      goalDifference: stats.goalDifference,
      points: stats.points,
      form: stats.form.join(""),
    }))
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    })
    .map((team, index) => ({ ...team, position: index + 1 }));

  const teamForms: TeamForm[] = Object.values(teamStats)
    .map((stats) => ({
      position: 0,
      team: stats.team,
      goalsFor: stats.goalsFor,
      goalsAgainst: stats.goalsAgainst,
      penaltyKicks: stats.penaltyKicks,
      played: stats.played,
      points: stats.points,
      form: stats.form.join(""),
    }))
    .sort((a, b) => b.points - a.points)
    .map((team, index) => ({ ...team, position: index + 1 }));

  return { standings, teamForms };
}