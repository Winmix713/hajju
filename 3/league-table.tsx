import React from 'react';
import { useLeagueStore } from '@/store/leagueStore';
import { Button } from './ui/button';
import { Eye, Pencil, Check, Trash2, Trophy } from 'lucide-react';

export function LeagueTable() {
  const { leagues, updateLeagueStatus, deleteLeague } = useLeagueStore();

  const handleAction = (id: string, action: 'view' | 'edit' | 'complete' | 'delete') => {
    switch (action) {
      case 'complete':
        updateLeagueStatus(id, 'Completed');
        break;
      case 'delete':
        deleteLeague(id);
        break;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-800/70">
            <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">
              <Trophy className="w-5 h-5 text-[#CCFF00]" />
            </th>
            <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Season</th>
            <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold hidden md:table-cell">Winner</th>
            <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold hidden lg:table-cell">Second Place</th>
            <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold hidden lg:table-cell">Third Place</th>
            <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Status</th>
            <th className="text-left p-4 text-gray-400 text-sm uppercase font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leagues.map((league) => (
            <tr key={league.id} className="hover:bg-white/5 transition-colors border-t border-white/10">
              <td className="p-4">
                <Trophy className="w-5 h-5 text-[#CCFF00]" />
              </td>
              <td className="p-4">
                <span className="text-gray-200 font-medium">{league.season}</span>
              </td>
              <td className="p-4 hidden md:table-cell">
                <span className="text-gray-200 font-medium">{league.winner}</span>
              </td>
              <td className="p-4 hidden lg:table-cell">
                <span className="text-gray-200 font-medium">{league.secondPlace}</span>
              </td>
              <td className="p-4 hidden lg:table-cell">
                <span className="text-gray-200 font-medium">{league.thirdPlace}</span>
              </td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  league.status === "In Progress"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}>
                  {league.status}
                </span>
              </td>
              <td className="p-4">
                <div className="flex gap-4">
                  <Button variant="ghost" size="icon" onClick={() => handleAction(league.id, 'view')}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleAction(league.id, 'edit')}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  {league.status === "In Progress" && (
                    <Button variant="ghost" size="icon" onClick={() => handleAction(league.id, 'complete')}>
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="danger" size="icon" onClick={() => handleAction(league.id, 'delete')}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}