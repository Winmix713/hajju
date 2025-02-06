export interface League {
  id: string;
  season: string;
  winner: string;
  secondPlace: string;
  thirdPlace: string;
  status: 'In Progress' | 'Completed';
}

export interface Match {
  date: string;
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
  ht_home_score: number;
  ht_away_score: number;
  round: string;
}

export interface TeamStats {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string;
}

export interface TeamForm {
  position: number;
  team: string;
  goalsFor: number;
  goalsAgainst: number;
  penaltyKicks: number;
  played: number;
  points: number;
  form: string;
}