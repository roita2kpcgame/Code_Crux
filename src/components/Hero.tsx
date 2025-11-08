
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles, TrendingUp, Shield } from 'lucide-react';
import { AnimatedLogo } from './AnimatedLogo';
import { SmartSearchBar } from './SmartSearchBar';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);

  const scrollToMap = () => {
    document.getElementById('pollution-map')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Add intersection observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll('[data-animate]');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-blue-50/30 to-slate-200/40 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#00C853]/20 rounded-full blur-3xl float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF6F00]/20 rounded-full blur-3xl float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl float" style={{ animationDelay: '4s' }} />

      {/* Language Selector - Fixed position */}
      <div className="fixed top-6 right-6 z-50 fade-in">
        <LanguageSelector />
      </div>

      {/* Animated Logo */}
      <div className="mb-8 sm:mb-12 scale-in" data-animate style={{ animationDelay: '0.2s' }}>
        <AnimatedLogo />
      </div>

      {/* Main Content */}
      <div className="text-center max-w-6xl mx-auto mb-8 sm:mb-12 relative z-10">
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#00C853]/20 shadow-professional mb-6 slide-up"
          data-animate
          style={{ animationDelay: '0.3s' }}
        >
          <Sparkles className="w-4 h-4 text-[#00C853]" />
          <span className="text-sm font-medium text-[#263238]">Real-time Air Quality Monitoring</span>
        </div>

        <h1 
          className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 leading-tight px-4 slide-up"
          data-animate
          style={{ animationDelay: '0.4s' }}
        >
          <span className="text-[#263238] dark:text-white">{t('tagline')}</span>
          <br />
          <span className="gradient-text block mt-2">
            {t('appName')}
          </span>
        </h1>

        <p 
          className="text-xl sm:text-2xl md:text-3xl text-[#263238]/70 dark:text-gray-300 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-4 slide-up"
          data-animate
          style={{ animationDelay: '0.5s' }}
        >
          {t('heroDescription')}
        </p>
      </div>

      {/* Smart Search Bar */}
      <div 
        className="w-full mb-10 sm:mb-14 px-4 max-w-4xl mx-auto slide-up"
        data-animate
        style={{ animationDelay: '0.6s' }}
      >
        <SmartSearchBar />
      </div>

      {/* CTA Buttons */}
      <div 
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 sm:mb-16 px-4 slide-up"
        data-animate
        style={{ animationDelay: '0.7s' }}
      >
        <Button 
          onClick={scrollToMap}
          className="group relative bg-gradient-to-r from-[#00C853] to-[#00A844] hover:from-[#00A844] hover:to-[#008638] text-white px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl font-semibold rounded-2xl shadow-elevated hover:shadow-floating transition-all duration-300 hover:scale-105 w-full sm:w-auto overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            {t('exploreData')}
            <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </Button>

        <Button 
          variant="outline"
          onClick={() => document.getElementById('ai-forecasting')?.scrollIntoView({ behavior: 'smooth' })}
          className="group border-2 border-[#263238] dark:border-gray-300 text-[#263238] dark:text-white hover:bg-[#263238] dark:hover:bg-gray-100 hover:text-white dark:hover:text-[#263238] px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl font-semibold rounded-2xl shadow-professional hover:shadow-elevated transition-all duration-300 hover:scale-105 w-full sm:w-auto"
        >
          <span className="flex items-center gap-2">
            {t('viewPredictions')}
            <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </span>
        </Button>
      </div>

      {/* Stats Grid */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mb-12 sm:mb-16 px-4 w-full slide-up"
        data-animate
        style={{ animationDelay: '0.8s' }}
      >
        <div className="group glass hover:bg-white/40 rounded-3xl p-6 sm:p-8 hover-lift text-center border border-white/30 shadow-professional hover:shadow-elevated transition-all duration-300">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00C853]/10 mb-4 group-hover:bg-[#00C853]/20 transition-colors">
            <TrendingUp className="w-8 h-8 text-[#00C853]" />
          </div>
          <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">150+</div>
          <div className="text-base sm:text-lg text-[#263238]/70 dark:text-gray-300 font-medium">{t('stations')}</div>
        </div>

        <div className="group glass hover:bg-white/40 rounded-3xl p-6 sm:p-8 hover-lift text-center border border-white/30 shadow-professional hover:shadow-elevated transition-all duration-300">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FF6F00]/10 mb-4 group-hover:bg-[#FF6F00]/20 transition-colors">
            <Shield className="w-8 h-8 text-[#FF6F00]" />
          </div>
          <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">99.2%</div>
          <div className="text-base sm:text-lg text-[#263238]/70 dark:text-gray-300 font-medium">{t('accuracy')}</div>
        </div>

        <div className="group glass hover:bg-white/40 rounded-3xl p-6 sm:p-8 hover-lift text-center border border-white/30 shadow-professional hover:shadow-elevated transition-all duration-300">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00C853]/10 mb-4 group-hover:bg-[#00C853]/20 transition-colors">
            <Sparkles className="w-8 h-8 text-[#00C853]" />
          </div>
          <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">24/7</div>
          <div className="text-base sm:text-lg text-[#263238]/70 dark:text-gray-300 font-medium">{t('monitoring')}</div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 fade-in cursor-pointer group"
        onClick={scrollToMap}
        data-animate
        style={{ animationDelay: '1s' }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-[#263238]/60 dark:text-gray-400 font-medium group-hover:text-[#00C853] transition-colors">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-[#263238]/30 dark:border-gray-400 rounded-full flex items-start justify-center p-2 group-hover:border-[#00C853] transition-colors">
            <div className="w-1.5 h-1.5 bg-[#263238]/50 dark:bg-gray-400 rounded-full animate-bounce group-hover:bg-[#00C853] transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );
};
