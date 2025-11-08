
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, MapPin, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

export const SmartSearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchSuggestions = [
    'Air quality in Delhi',
    'PM2.5 levels Mumbai',
    'Health recommendations for today',
    'Best time for outdoor exercise',
    'Air pollution forecast tomorrow',
    'AQI comparison between cities',
    'Pollution hotspots near me',
    'Indoor air quality tips'
  ];

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (value.length > 2) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const quickFilters = [
    { label: 'Current AQI', icon: Zap, color: '#00C853' },
    { label: 'Forecast', icon: TrendingUp, color: '#FF6F00' },
    { label: 'Alerts', icon: AlertTriangle, color: '#F44336' },
    { label: 'Nearby', icon: MapPin, color: '#2196F3' }
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Main Search Bar */}
      <div className="relative group">
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
          <Search className="w-5 h-5 text-[#00C853] group-hover:scale-110 transition-transform" />
        </div>
        <Input
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Ask AakaashSetu AI: 'Air quality in my area', 'Health tips for today'..."
          className="pl-14 pr-24 py-6 text-lg bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-2 border-[#00C853]/20 focus:border-[#00C853] dark:border-gray-600 dark:focus:border-[#00C853] rounded-2xl shadow-elevated hover:shadow-floating focus:shadow-floating transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
        <Button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#00C853] to-[#00A844] hover:from-[#00A844] hover:to-[#008638] text-white px-6 py-5 rounded-xl shadow-professional hover:shadow-elevated transition-all duration-300 hover:scale-105 group/btn"
        >
          <Search className="w-4 h-4 mr-2 group-hover/btn:rotate-90 transition-transform duration-300" />
          <span className="font-semibold">Search</span>
        </Button>
        
        {/* Glow effect on focus */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00C853]/20 to-[#FF6F00]/20 opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity duration-300" />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3 mt-6 justify-center">
        {quickFilters.map((filter, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="group/filter glass hover:bg-white/60 dark:hover:bg-slate-700/60 border-2 rounded-xl px-4 py-2 hover:scale-105 hover:shadow-professional transition-all duration-300"
            style={{ borderColor: filter.color + '40' }}
          >
            <filter.icon className="w-4 h-4 mr-2 group-hover/filter:scale-110 transition-transform" style={{ color: filter.color }} />
            <span className="font-medium" style={{ color: filter.color }}>{filter.label}</span>
          </Button>
        ))}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full mt-3 w-full glass border border-white/30 dark:border-gray-700 rounded-2xl shadow-floating z-30 fade-in overflow-hidden">
          <div className="p-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="group/suggestion p-4 hover:bg-[#00C853]/10 dark:hover:bg-[#00C853]/20 rounded-xl cursor-pointer transition-all duration-200 hover:translate-x-1"
                onClick={() => {
                  setQuery(suggestion);
                  setShowSuggestions(false);
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00C853]/10 dark:bg-[#00C853]/20 flex items-center justify-center group-hover/suggestion:bg-[#00C853]/20 dark:group-hover/suggestion:bg-[#00C853]/30 transition-colors">
                    <Search className="w-4 h-4 text-[#00C853]" />
                  </div>
                  <span className="text-sm font-medium text-[#263238] dark:text-gray-200 flex-1">{suggestion}</span>
                  <div className="opacity-0 group-hover/suggestion:opacity-100 transition-opacity">
                    <div className="w-2 h-2 rounded-full bg-[#00C853]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
