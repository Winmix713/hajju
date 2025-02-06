import { useState } from 'react';
import { Header } from './components/Header';
import { LeagueTable } from './components/LeagueTable';
import { LeagueDetails } from './components/LeagueDetails';
import { NewLeagueModal } from './components/NewLeagueModal';
import { useLeagueStore } from './store/useLeagueStore';

function App() {
  const [isNewLeagueModalOpen, setIsNewLeagueModalOpen] = useState(false);
  const { currentLeagueId } = useLeagueStore();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {currentLeagueId ? (
          <LeagueDetails />
        ) : (
          <>
            <h1 className="text-4xl font-bold text-[#CCFF00] mb-6">Matches Schedule</h1>
            <LeagueTable onNewLeague={() => setIsNewLeagueModalOpen(true)} />
          </>
        )}
      </main>

      <footer className="bg-[#0A0A0A]/80 backdrop-blur-md border-t border-[#CCFF00]/20 py-4">
        <div className="container mx-auto px-4 text-center text-gray-400">
          &copy; 2024 WinMix. All rights reserved.
        </div>
      </footer>

      <NewLeagueModal
        isOpen={isNewLeagueModalOpen}
        onClose={() => setIsNewLeagueModalOpen(false)}
      />
    </div>
  );
}

export default App;