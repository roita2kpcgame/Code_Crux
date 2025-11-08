import React, { useState, useEffect, useRef } from 'react';
import { Hero } from '@/components/Hero';
import { PollutionMap } from '@/components/PollutionMap';
import { EnhancedDataDashboard } from '@/components/EnhancedDataDashboard';
import { AIForecasting } from '@/components/AIForecasting';
import { FeatureGrid } from '@/components/FeatureGrid';
import { ParticleBackground } from '@/components/ParticleBackground';
import { AIAssistant } from '@/components/AIAssistant';
import { Earth3D } from '@/components/Earth3D';
import { UniqueTools } from '@/components/UniqueTools';
import { VayuRakshak2030 } from '@/components/VayuRakshak2030';
import { CityComparison } from '@/components/CityComparison';
import { CitySelector } from '@/components/CitySelector';
import { usePollutionData } from '@/hooks/usePollutionData';
import { Card } from '@/components/ui/card';

const Index = () => {
  const { cities } = usePollutionData();
  const [selectedCityName, setSelectedCityName] = useState(cities[0]?.name || 'Delhi');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedCity = cities.find(city => city.name === selectedCityName) || cities[0];

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = containerRef.current?.querySelectorAll('[data-animate]');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      <ParticleBackground />
      
      <div ref={containerRef} className="relative z-10">
        <Hero />
        
        {/* Enhanced 3D Earth Section */}
        <section className="py-16 sm:py-24 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent dark:via-slate-900/50" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="fade-in" data-animate>
              <Earth3D />
            </div>
          </div>
        </section>
        
        {/* Pollution Map Section */}
        <section id="pollution-map" className="py-16 sm:py-24 px-4 relative">
          <div className="absolute inset-0 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="fade-in" data-animate>
              <PollutionMap />
            </div>
          </div>
        </section>
        
        {/* City Comparison Section */}
        <section className="py-16 sm:py-24 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent dark:via-slate-900/50" />
          <div className="max-w-7xl mx-auto relative z-10">
            <Card className="p-6 sm:p-8 glass border border-white/30 dark:border-slate-700/50 mb-8 shadow-elevated hover:shadow-floating transition-all duration-300 fade-in" data-animate>
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold gradient-text">
                  Select a city to compare:
                </h3>
                <CitySelector 
                  cities={cities} 
                  onCityChange={setSelectedCityName}
                  selectedCity={selectedCityName}
                />
              </div>
            </Card>
            <div className="fade-in" data-animate style={{ animationDelay: '0.2s' }}>
              <CityComparison selectedCity={selectedCity} allCities={cities} />
            </div>
          </div>
        </section>
        
        {/* VayuRakshak 2030 Vision Section */}
        <section className="py-16 sm:py-24 px-4 relative">
          <div className="absolute inset-0 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm" />
          <div className="relative z-10 fade-in" data-animate>
            <VayuRakshak2030 />
          </div>
        </section>
        
        {/* Enhanced Data Dashboard */}
        <section className="py-16 sm:py-24 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent dark:via-slate-900/50" />
          <div className="relative z-10 fade-in" data-animate>
            <EnhancedDataDashboard />
          </div>
        </section>
        
        {/* AI Forecasting */}
        <section id="ai-forecasting" className="py-16 sm:py-24 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent dark:via-slate-900/50" />
          <div className="relative z-10 fade-in" data-animate>
            <AIForecasting />
          </div>
        </section>
        
        {/* Unique Tools */}
        <section className="py-16 sm:py-24 px-4 relative">
          <div className="absolute inset-0 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm" />
          <div className="relative z-10 fade-in" data-animate>
            <UniqueTools />
          </div>
        </section>
        
        {/* Feature Grid */}
        <section className="py-16 sm:py-24 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent dark:via-slate-900/50" />
          <div className="relative z-10 fade-in" data-animate>
            <FeatureGrid />
          </div>
        </section>
      </div>

      {/* AI Assistant - Floating */}
      <AIAssistant />
    </div>
  );
};

export default Index;
