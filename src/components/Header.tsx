import { Menu, Bell, Settings, User } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#CCFF00]/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold flex items-center gap-2">
              <button
                aria-label="Toggle menu"
                className="focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1"
              >
                <Menu className="w-6 h-6 text-[#CCFF00]" />
              </button>
              <span className="sr-only">WinMix</span>
              win<span className="text-[#CCFF00]">mix</span>.hu
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="index.html" className="text-white/60 hover:text-[#CCFF00] transition-colors">
                Predictions
              </a>
              <a href="h2h.html" className="text-white/60 hover:text-[#CCFF00] transition-colors">
                H2H
              </a>
              <a href="teams.html" className="text-white/60 hover:text-[#CCFF00] transition-colors">
                Teams
              </a>
              <a href="matches.html" className="text-[#CCFF00] transition-colors">
                Matches
              </a>
              <a href="control-panel.html" className="text-white/60 hover:text-[#CCFF00] transition-colors">
                Control Panel
              </a>
              <a href="settings.html" className="text-white/60 hover:text-[#CCFF00] transition-colors">
                Settings
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button
              aria-label="Notifications"
              className="p-2 rounded-full hover:bg-gray-700 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#CCFF00] rounded-full" />
            </button>
            <button
              aria-label="Settings"
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-700">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium">John Doe</div>
                <div className="text-xs text-gray-400">Premium User</div>
              </div>
              <button
                aria-label="User profile"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center"
              >
                <User className="w-5 h-5 text-[#CCFF00]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}