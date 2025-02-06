import { create } from 'zustand';
import { League, Match, TeamStats, TeamForm } from '@/types/league';

interface LeagueState {
  leagues: League[];
  currentLeagueId: string | null;
  matches: Match[];
  standings: TeamStats[];
  teamForms: TeamForm[];
  addLeague: (league: League) => void;
  setCurrentLeague: (id: string | null) => void;
  updateLeagueStatus: (id: string, status: League['status']) => void;
  deleteLeague: (id: string) => void;
  setMatches: (matches: Match[]) => void;
  setStandings: (standings: TeamStats[]) => void;
  setTeamForms: (teamForms: TeamForm[]) => void;
}

export const useLeagueStore = create<LeagueState>((set) => ({
  leagues: [],
  currentLeagueId: null,
  matches: [],
  standings: [],
  teamForms: [],
  
  addLeague: (league) => set((state) => ({
    leagues: [...state.leagues, league]
  })),
  
  setCurrentLeague: (id) => set({ currentLeagueId: id }),
  
  updateLeagueStatus: (id, status) => set((state) => ({
    leagues: state.leagues.map((league) =>
      league.id === id ? { ...league, status } : league
    )
  })),
  
  deleteLeague: (id) => set((state) => ({
    leagues: state.leagues.filter((league) => league.id !== id)
  })),
  
  setMatches: (matches) => set({ matches }),
  
  setStandings: (standings) => set({ standings }),
  
  setTeamForms: (teamForms) => set({ teamForms })
}));