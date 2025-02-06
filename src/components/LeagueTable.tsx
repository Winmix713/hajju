import { Trophy } from 'lucide-react';
import { useLeagueStore } from '../store/useLeagueStore';
import type { League } from '../types';

interface LeagueTableProps {
  onNewLeague: () => void;
}

export function LeagueTable({ onNewLeague }: LeagueTableProps) {
  const { leagues, setCurrentLeagueId, completeLeague, removeLeague } = useLeagueStore();
  
  const handleAction = (league: League, action: 'view' | 'edit' | 'complete' | 'delete') => {
    switch (action) {
      case 'view':
        setCurrentLeagueId(league.id);
        break;
      case 'complete':
        completeLeague(league.id);
        break;
      case 'delete':
        removeLeague(league.id);
        break;
    }
  };

  return (
    <div className="bg-white/5 rounded-2xl p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search seasons..."
            className="pl-10 w-full bg-[#141414] border border-[#CCFF00]/20 rounded-md focus:ring-[#CCFF00] focus:border-[#CCFF00]"
          />
        </div>
        <button
          onClick={onNewLeague}
          className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 transition-colors duration-200 px-4 py-2 rounded-md"
        >
          New League
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <Trophy className="w-5 h-5 text-[#CCFF00]" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Season
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">
                Winner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                Second Place
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                Third Place
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {leagues.map((league) => (
              <tr key={league.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Trophy className="w-5 h-5 text-[#CCFF00]" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{league.season}</td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">{league.winner}</td>
                <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">{league.secondPlace}</td>
                <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">{league.thirdPlace}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      league.status === "In Progress"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {league.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleAction(league, 'view')}
                    className="text-[#CCFF00] hover:text-[#CCFF00]/80"
                  >
                    View
                  </button>
                  {league.status === "In Progress" && (
                    <button
                      onClick={() => handleAction(league, 'complete')}
                      className="ml-2 text-[#CCFF00] hover:text-[#CCFF00]/80"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(league, 'delete')}
                    className="ml-2 text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}