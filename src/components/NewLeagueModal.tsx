import { useState } from 'react';
import { useLeagueStore } from '../store/useLeagueStore';

interface NewLeagueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewLeagueModal({ isOpen, onClose }: NewLeagueModalProps) {
  const [leagueId, setLeagueId] = useState('');
  const { addLeague } = useLeagueStore();

  const handleSubmit = () => {
    if (leagueId) {
      addLeague({
        id: leagueId,
        season: `Virtuális Labdarúgás Liga Mód Retail ${leagueId}`,
        winner: '-',
        secondPlace: '-',
        thirdPlace: '-',
        status: 'In Progress',
      });
      setLeagueId('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#141414] rounded-xl p-6 w-96 border border-[#CCFF00]/20">
        <h2 className="text-2xl font-bold text-[#CCFF00] mb-4">Create New League</h2>
        <p className="mb-4 text-gray-400">
          Enter the ID for the new league. The name will be automatically generated.
        </p>
        <label htmlFor="new-league-id" className="block text-sm font-medium text-gray-300 mb-2">
          League ID
        </label>
        <input
          type="text"
          id="new-league-id"
          value={leagueId}
          onChange={(e) => setLeagueId(e.target.value)}
          className="w-full p-2 bg-[#141414] border border-[#CCFF00]/20 rounded-md text-white mb-4 focus:ring-[#CCFF00] focus:border-[#CCFF00]"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 transition-colors px-4 py-2 rounded-md"
          >
            Create League
          </button>
        </div>
      </div>
    </div>
  );
}