import { TeamForm } from '../types';

interface FormTableProps {
  teamForms: TeamForm[];
}

export function FormTable({ teamForms }: FormTableProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-[#CCFF00]">Form</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Pos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">GF</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">GA</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">PK</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Played</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Points</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Form</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {teamForms.map((team) => (
              <tr key={team.team} className="hover:bg-white/5">
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{team.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{team.team}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{team.goalsFor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{team.goalsAgainst}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{team.penaltyKicks}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{team.played}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{team.points}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{team.form}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}