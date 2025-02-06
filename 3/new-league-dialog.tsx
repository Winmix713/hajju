import React from 'react';
import { useLeagueStore } from '@/store/leagueStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface NewLeagueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewLeagueDialog({ open, onOpenChange }: NewLeagueDialogProps) {
  const [leagueId, setLeagueId] = React.useState('');
  const { addLeague } = useLeagueStore();

  const handleCreate = () => {
    if (leagueId) {
      addLeague({
        id: leagueId,
        season: `Virtuális Labdarúgás Liga Mód Retail ${leagueId}`,
        winner: "-",
        secondPlace: "-",
        thirdPlace: "-",
        status: "In Progress",
      });
      setLeagueId('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New League</DialogTitle>
          <DialogDescription>
            Enter the ID for the new league. The name will be automatically generated.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="league-id" className="text-sm font-medium text-gray-300">
              League ID
            </label>
            <input
              id="league-id"
              type="text"
              value={leagueId}
              onChange={(e) => setLeagueId(e.target.value)}
              className="w-full p-2 bg-gray-800/70 border border-white/10 rounded-md text-white focus:ring-[#CCFF00] focus:border-[#CCFF00]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreate}>Create League</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}