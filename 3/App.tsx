import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LeagueTable } from '@/components/league-table';
import { NewLeagueDialog } from '@/components/new-league-dialog';
import { LeagueDetails } from '@/components/league-details';

function App() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedLeagueId, setSelectedLeagueId] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-fixed text-white">
      <header className="sticky top-0 z-50 border-b border-[#CCFF00]/10 backdrop-blur-md bg-black/70">
        <div className="container mx-auto">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">win<span className="text-[#CCFF00]">mix</span></span>
              <div className="px-2 py-1 bg-[#CCFF00]/10 rounded-md">
                <span className="text-xs font-medium text-[#CCFF00]">BETA</span>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
              <a href="#" className="text-white/60 hover:text-[#CCFF00] transition-colors">Predictions</a>
              <a href="#" className="text-white/60 hover:text-[#CCFF00] transition-colors">H2H</a>
              <a href="#" className="text-white/60 hover:text-[#CCFF00] transition-colors">Teams</a>
              <a href="#" className="bg-black text-[#CCFF00] border border-[#CCFF00] px-3 py-1 rounded-lg" aria-current="page">Matches</a>
              <a href="#" className="text-white/60 hover:text-[#CCFF00] transition-colors">Control Panel</a>
              <a href="#" className="text-white/60 hover:text-[#CCFF00] transition-colors">Settings</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {selectedLeagueId ? (
          <LeagueDetails 
            leagueId={selectedLeagueId} 
            onBack={() => setSelectedLeagueId(null)} 
          />
        ) : (
          <>
            <h1 className="text-4xl font-bold text-[#CCFF00] mb-6">Matches Schedule</h1>
            <div className="bg-black/70 backdrop-blur-md rounded-lg shadow-lg border border-white/10 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search seasons..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 bg-gray-800/70 border border-white/10 rounded-md focus:ring-[#CCFF00] focus:border-[#CCFF00] text-white"
                    />
                  </div>
                  <Button onClick={() => setDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    New League
                  </Button>
                </div>
                
                <LeagueTable onLeagueSelect={setSelectedLeagueId} searchTerm={searchTerm} />
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-[#CCFF00]/10 backdrop-blur-md bg-black/70">
        <div className="container mx-auto py-6 text-center text-gray-400">
          &copy; 2024 WinMix. All rights reserved.
        </div>
      </footer>

      <NewLeagueDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}

export default App;