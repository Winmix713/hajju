import { create } from 'zustand';
import { League, Match, TeamStats, TeamForm } from '../types';
import { calculateTeamStats } from '../utils/calculations';

interface LeagueStore {
  leagues: League[];
  currentLeagueId: string | null;
  matches: Match[];
  standings: TeamStats[];
  teamForms: TeamForm[];
  roundView: 'rounds' | 'all';
  setLeagues: (leagues: League[]) => void;
  addLeague: (league: League) => void;
  removeLeague: (id: string) => void;
  updateLeague: (id: string, updates: Partial<League>) => void;
  setCurrentLeagueId: (id: string | null) => void;
  setMatches: (matches: Match[]) => void;
  setRoundView: (view: 'rounds' | 'all') => void;
  loadLeagueData: (leagueId: string) => void;
  saveLeagueData: () => void;
  completeLeague: (leagueId: string) => void;
}

export const useLeagueStore = create<LeagueStore>((set, get) => ({
  leagues: [],
  currentLeagueId: null,
  matches: [],
  standings: [],
  teamForms: [],
  roundView: 'rounds',

  setLeagues: (leagues) => set({ leagues }),
  
  addLeague: (league) => set((state) => ({ 
    leagues: [...state.leagues, league] 
  })),
  
  removeLeague: (id) => set((state) => ({ 
    leagues: state.leagues.filter(league => league.id !== id) 
  })),
  
  updateLeague: (id, updates) => set((state) => ({
    leagues: state.leagues.map(league => 
      league.id === id ? { ...league, ...updates } : league
    )
  })),
  
  setCurrentLeagueId: (id) => set({ currentLeagueId: id }),
  
  setMatches: (matches) => {
    const teamStats = calculateTeamStats(matches);
    set({ 
      matches,
      standings: teamStats.standings,
      teamForms: teamStats.teamForms
    });
  },
  
  setRoundView: (view) => set({ roundView: view }),
  
  loadLeagueData: (leagueId) => {
    const savedData = localStorage.getItem(`league_${leagueId}`);
    if (savedData) {
      const { matches, standings, teamForms } = JSON.parse(savedData);
      set({ matches, standings, teamForms });
    } else {
      set({ matches: [], standings: [], teamForms: [] });
    }
  },
  
  saveLeagueData: () => {
    const { currentLeagueId, matches, standings, teamForms } = get();
    if (currentLeagueId) {
      const leagueData = { matches, standings, teamForms };
      localStorage.setItem(`league_${currentLeagueId}`, JSON.stringify(leagueData));
    }
  },
  
  completeLeague: (leagueId) => {
    const { leagues, matches } = get();
    const updatedLeagues = leagues.map(league => 
      league.id === leagueId ? { ...league, status: 'Completed' as const } : league
    );
    
    const teamStats = calculateTeamStats(matches);
    const [winner, secondPlace, thirdPlace] = teamStats.standings;
    
    const finalLeagues = updatedLeagues.map(league => 
      league.id === leagueId ? {
        ...league,
        winner: winner?.team || '-',
        secondPlace: secondPlace?.team || '-',
        thirdPlace: thirdPlace?.team || '-'
      } : league
    );
    
    set({ leagues: finalLeagues });
    get().saveLeagueData();
  }
}));