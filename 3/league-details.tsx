import React from 'react';
import { ArrowLeft, Edit, Upload, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { useLeagueStore } from '@/store/leagueStore';
import { MatchesView } from './matches-view';
import { StandingsView } from './standings-view';
import { FormView } from './form-view';
import Papa from 'papaparse';
import { Match } from '@/types/league';

interface LeagueDetailsProps {
  leagueId: string;
  onBack: () => void;
}

export function LeagueDetails({ leagueId, onBack }: LeagueDetailsProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [fileName, setFileName] = React.useState<string>('No file chosen');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { leagues, matches, setMatches, updateLeagueStatus } = useLeagueStore();
  const league = leagues.find(l => l.id === leagueId);

  if (!league) return null;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      Papa.parse<Match>(file, {
        complete: (result) => {
          setMatches(result.data);
          updateLeagueStatus(leagueId, 'In Progress');
        },
        header: true,
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Leagues
        </Button>
        <h2 className="text-3xl font-bold text-[#CCFF00]">
          League {leagueId} Details
        </h2>
        <Button onClick={() => setIsEditing(!isEditing)} className="ml-auto gap-2">
          <Edit className="w-4 h-4" />
          {isEditing ? 'Cancel Edit' : 'Edit League'}
        </Button>
      </div>

      {isEditing && (
        <div className="bg-black/70 backdrop-blur-md rounded-lg border border-white/10 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="season" className="text-sm font-medium text-gray-300">
                Season
              </label>
              <input
                type="text"
                id="season"
                value={league.season}
                className="w-full p-2 bg-gray-800/70 border border-white/10 rounded-md text-white focus:ring-[#CCFF00] focus:border-[#CCFF00]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="winner" className="text-sm font-medium text-gray-300">
                Winner
              </label>
              <input
                type="text"
                id="winner"
                value={league.winner}
                className="w-full p-2 bg-gray-800/70 border border-white/10 rounded-md text-white focus:ring-[#CCFF00] focus:border-[#CCFF00]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="secondPlace" className="text-sm font-medium text-gray-300">
                Second Place
              </label>
              <input
                type="text"
                id="secondPlace"
                value={league.secondPlace}
                className="w-full p-2 bg-gray-800/70 border border-white/10 rounded-md text-white focus:ring-[#CCFF00] focus:border-[#CCFF00]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="thirdPlace" className="text-sm font-medium text-gray-300">
                Third Place
              </label>
              <input
                type="text"
                id="thirdPlace"
                value={league.thirdPlace}
                className="w-full p-2 bg-gray-800/70 border border-white/10 rounded-md text-white focus:ring-[#CCFF00] focus:border-[#CCFF00]"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-full sm:w-auto flex-grow">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex items-center gap-4">
                <Button onClick={handleUploadClick} className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload CSV
                </Button>
                <span className="text-sm text-gray-400">{fileName}</span>
              </div>
            </div>
            <Button className="gap-2" disabled={!matches.length}>
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>
      )}

      <div className="bg-black/70 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden">
        <Tabs defaultValue="matches">
          <TabsList>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="standings">Standings</TabsTrigger>
            <TabsTrigger value="form">Form</TabsTrigger>
          </TabsList>
          <TabsContent value="matches" className="p-6">
            <MatchesView matches={matches} />
          </TabsContent>
          <TabsContent value="standings" className="p-6">
            <StandingsView />
          </TabsContent>
          <TabsContent value="form" className="p-6">
            <FormView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}