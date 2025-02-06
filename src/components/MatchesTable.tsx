import { useState } from 'react';
import { Match } from '../types';

interface MatchesTableProps {
  matches: Match[];
  roundView: 'rounds' | 'all';
  onViewChange: (view: 'rounds' | 'all') => void;
}

export function MatchesTable({ matches, roundView, onViewChange }: MatchesTableProps) {
  const matchesByRound = matches.reduce((acc, match) => {
    const key = match.round;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(match);
    return acc;
  }, {} as Record<string, Match[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-[#CCFF00]">Matches</h3>
        <select
          value={roundView}
          onChange={(e) => onViewChange(e.target.value as 'rounds' | 'all')}
          className="bg-[#141414] border border-[#CCFF00]/20 text-white text-sm rounded-lg focus:ring-[#CCFF00] focus:border-[#CCFF00] p-2.5"
        >
          <option value="rounds">View by Rounds</option>
          <option value="all">View All Matches</option>
        </select>
      </div>

      {roundView === 'rounds' ? (
        Object.entries(matchesByRound).map(([round, roundMatches]) => (
          <div key={round} className="space-y-4">
            <h4 className="text-lg font-semibold text-[#CCFF00]">Round: {round}</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Home Team</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Away Team</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Half Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Full Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {roundMatches.map((match, idx) => (
                    <tr key={idx} className="hover:bg-white/5">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{match.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{match.home_team}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{match.away_team}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {match.ht_home_score}-{match.ht_away_score}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {match.home_score}-{match.away_score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Round</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Home Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Away Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Half Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Full Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {matches.map((match, idx) => (
                <tr key={idx} className="hover:bg-white/5">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{match.round}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{match.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{match.home_team}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{match.away_team}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {match.ht_home_score}-{match.ht_away_score}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {match.home_score}-{match.away_score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}