import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Match } from '@/types/league';

interface MatchesViewProps {
  matches: Match[];
}

export function MatchesView({ matches }: MatchesViewProps) {
  const [viewType, setViewType] = React.useState<'rounds' | 'all'>('rounds');

  const matchesByRound = React.useMemo(() => {
    return matches.reduce((acc, match) => {
      if (!acc[match.round]) {
        acc[match.round] = [];
      }
      acc[match.round].push(match);
      return acc;
    }, {} as Record<string, Match[]>);
  }, [matches]);

  if (viewType === 'rounds') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-[#CCFF00]">Matches</h3>
          <Select value={viewType} onValueChange={(value) => setViewType(value as 'rounds' | 'all')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rounds">View by Rounds</SelectItem>
              <SelectItem value="all">View All Matches</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {Object.entries(matchesByRound).map(([round, roundMatches]) => (
          <div key={round} className="space-y-2">
            <h4 className="text-lg font-semibold text-[#CCFF00]">Round: {round}</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/70">
                  <tr>
                    <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Date</th>
                    <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Home Team</th>
                    <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Away Team</th>
                    <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Half Time</th>
                    <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Full Time</th>
                  </tr>
                </thead>
                <tbody>
                  {roundMatches.map((match, index) => (
                    <tr key={index} className="hover:bg-white/5 transition-colors border-t border-white/10">
                      <td className="p-4 text-gray-200">{match.date}</td>
                      <td className="p-4 text-gray-200">{match.home_team}</td>
                      <td className="p-4 text-gray-200">{match.away_team}</td>
                      <td className="p-4 text-gray-200">{match.ht_home_score}-{match.ht_away_score}</td>
                      <td className="p-4 text-gray-200">{match.home_score}-{match.away_score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-[#CCFF00]">Matches</h3>
        <Select value={viewType} onValueChange={(value) => setViewType(value as 'rounds' | 'all')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rounds">View by Rounds</SelectItem>
            <SelectItem value="all">View All Matches</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800/70">
            <tr>
              <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Round</th>
              <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Date</th>
              <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Home Team</th>
              <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Away Team</th>
              <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Half Time</th>
              <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Full Time</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index} className="hover:bg-white/5 transition-colors border-t border-white/10">
                <td className="p-4 text-gray-200">{match.round}</td>
                <td className="p-4 text-gray-200">{match.date}</td>
                <td className="p-4 text-gray-200">{match.home_team}</td>
                <td className="p-4 text-gray-200">{match.away_team}</td>
                <td className="p-4 text-gray-200">{match.ht_home_score}-{match.ht_away_score}</td>
                <td className="p-4 text-gray-200">{match.home_score}-{match.away_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}