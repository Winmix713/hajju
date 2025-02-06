import React from 'react';
import { useLeagueStore } from '@/store/leagueStore';

export function StandingsView() {
  const { standings } = useLeagueStore();

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#CCFF00]">Standings</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800/70">
            <tr>
              <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Pos</th>
              <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Team</th>
              <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">P</th>
              <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">W</th>
              <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">D</th>
              <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">L</th>
              <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">GF</th>
              <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">GA</th>
              <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">GD</th>
              <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Pts</th>
              <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Form</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team) => (
              <tr key={team.team} className="hover:bg-white/5 transition-colors border-t border-white/10">
                <td className="p-4 text-gray-200">{team.position}</td>
                <td className="p-4 text-gray-200">{team.team}</td>
                <td className="p-4 text-gray-200">{team.played}</td>
                <td className="p-4 text-gray-200">{team.won}</td>
                <td className="p-4 text-gray-200">{team.drawn}</td>
                <td className="p-4 text-gray-200">{team.lost}</td>
                <td className="p-4 text-gray-200">{team.goalsFor}</td>
                <td className="p-4 text-gray-200">{team.goalsAgainst}</td>
                <td className="p-4 text-gray-200">{team.goalDifference}</td>
                <td className="p-4 text-gray-200">{team.points}</td>
                <td className="p-4 text-gray-200">{team.form}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}