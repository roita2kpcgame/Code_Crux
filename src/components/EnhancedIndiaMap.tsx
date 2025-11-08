
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Zap, Activity } from 'lucide-react';
import { cityPositions } from '@/data/cities';

interface City {
  name: string;
  pm25: number;
  pm10: number;
  aqi: string;
  color: string;
  state: string;
  coordinates: [number, number];
  position?: { x: number; y: number };
  actualAqi?: number;
  temperature?: number;
  humidity?: number;
}

interface EnhancedIndiaMapProps {
  cities: City[];
  selectedCity: string;
  onCitySelect: (cityName: string) => void;
}

export const EnhancedIndiaMap = ({ cities, selectedCity, onCitySelect }: EnhancedIndiaMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mapImageRef = useRef<HTMLImageElement | null>(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 600, height: 480 });
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const citiesWithPositions = useMemo(() => cities.map(city => ({
    ...city,
    position: cityPositions[city.name as keyof typeof cityPositions] || { x: 0.5, y: 0.5 }
  })), [cities]);

  // Load India map SVG as image
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      mapImageRef.current = img;
      setMapLoaded(true);
    };
    img.onerror = () => {
      // Fallback: create map programmatically if image fails to load
      setMapLoaded(true);
    };
    img.src = '/india-map.svg';
  }, []);

  const drawRealisticIndiaMap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Enhanced gradient background
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#E3F2FD');
    bgGradient.addColorStop(0.5, '#E8F5E8');
    bgGradient.addColorStop(1, '#F3E5F5');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Draw accurate India outline based on real geographic coordinates
    // India bounds: Longitude 68-97°E, Latitude 8-37°N
    // Coordinates normalized to match our city position system
    ctx.fillStyle = '#E8F5E8';
    ctx.strokeStyle = '#00C853';
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(0, 200, 83, 0.4)';
    ctx.shadowBlur = 10;

    ctx.beginPath();
    
    // Northwest (Punjab/Kashmir region) - starting from Amritsar area
    ctx.moveTo(width * 0.237, height * 0.185);
    
    // Northern border - through Punjab, Haryana, Delhi, UP
    ctx.bezierCurveTo(
      width * 0.26, height * 0.17,
      width * 0.30, height * 0.165,
      width * 0.32, height * 0.18
    );
    ctx.bezierCurveTo(
      width * 0.36, height * 0.19,
      width * 0.40, height * 0.195,
      width * 0.45, height * 0.20
    );
    ctx.bezierCurveTo(
      width * 0.50, height * 0.21,
      width * 0.55, height * 0.225,
      width * 0.60, height * 0.24
    );
    ctx.bezierCurveTo(
      width * 0.65, height * 0.255,
      width * 0.68, height * 0.27,
      width * 0.70, height * 0.29
    );
    
    // Northeast region - Assam, Manipur, etc.
    ctx.bezierCurveTo(
      width * 0.72, height * 0.31,
      width * 0.73, height * 0.34,
      width * 0.735, height * 0.37
    );
    ctx.bezierCurveTo(
      width * 0.74, height * 0.40,
      width * 0.738, height * 0.43,
      width * 0.73, height * 0.46
    );
    
    // Eastern border - West Bengal, Odisha
    ctx.bezierCurveTo(
      width * 0.72, height * 0.49,
      width * 0.705, height * 0.51,
      width * 0.685, height * 0.525
    );
    ctx.lineTo(width * 0.66, height * 0.54);
    ctx.bezierCurveTo(
      width * 0.64, height * 0.56,
      width * 0.62, height * 0.58,
      width * 0.605, height * 0.60
    );
    
    // Eastern coast - Odisha, Andhra Pradesh
    ctx.bezierCurveTo(
      width * 0.59, height * 0.62,
      width * 0.575, height * 0.645,
      width * 0.56, height * 0.67
    );
    ctx.bezierCurveTo(
      width * 0.545, height * 0.695,
      width * 0.53, height * 0.72,
      width * 0.515, height * 0.745
    );
    
    // Tamil Nadu coast
    ctx.bezierCurveTo(
      width * 0.50, height * 0.77,
      width * 0.485, height * 0.795,
      width * 0.47, height * 0.82
    );
    ctx.bezierCurveTo(
      width * 0.455, height * 0.845,
      width * 0.44, height * 0.87,
      width * 0.425, height * 0.89
    );
    
    // Southern tip - Kanyakumari
    ctx.bezierCurveTo(
      width * 0.41, height * 0.91,
      width * 0.395, height * 0.925,
      width * 0.38, height * 0.935
    );
    ctx.bezierCurveTo(
      width * 0.365, height * 0.945,
      width * 0.35, height * 0.95,
      width * 0.335, height * 0.952
    );
    ctx.bezierCurveTo(
      width * 0.32, height * 0.954,
      width * 0.305, height * 0.95,
      width * 0.29, height * 0.945
    );
    
    // Western coast - Kerala
    ctx.bezierCurveTo(
      width * 0.275, height * 0.94,
      width * 0.26, height * 0.93,
      width * 0.245, height * 0.915
    );
    ctx.bezierCurveTo(
      width * 0.23, height * 0.90,
      width * 0.215, height * 0.88,
      width * 0.20, height * 0.86
    );
    
    // Karnataka, Goa coast
    ctx.bezierCurveTo(
      width * 0.185, height * 0.84,
      width * 0.17, height * 0.815,
      width * 0.155, height * 0.79
    );
    ctx.bezierCurveTo(
      width * 0.14, height * 0.765,
      width * 0.125, height * 0.74,
      width * 0.11, height * 0.715
    );
    
    // Maharashtra coast
    ctx.bezierCurveTo(
      width * 0.095, height * 0.69,
      width * 0.08, height * 0.665,
      width * 0.07, height * 0.64
    );
    ctx.bezierCurveTo(
      width * 0.06, height * 0.615,
      width * 0.055, height * 0.59,
      width * 0.05, height * 0.565
    );
    
    // Gujarat coast
    ctx.bezierCurveTo(
      width * 0.045, height * 0.54,
      width * 0.042, height * 0.515,
      width * 0.04, height * 0.49
    );
    ctx.bezierCurveTo(
      width * 0.038, height * 0.465,
      width * 0.037, height * 0.44,
      width * 0.037, height * 0.415
    );
    ctx.bezierCurveTo(
      width * 0.037, height * 0.39,
      width * 0.038, height * 0.365,
      width * 0.041, height * 0.34
    );
    ctx.bezierCurveTo(
      width * 0.044, height * 0.315,
      width * 0.048, height * 0.29,
      width * 0.054, height * 0.265
    );
    ctx.bezierCurveTo(
      width * 0.06, height * 0.24,
      width * 0.068, height * 0.215,
      width * 0.078, height * 0.19
    );
    
    // Northwest - Rajasthan, back to Punjab
    ctx.bezierCurveTo(
      width * 0.088, height * 0.175,
      width * 0.10, height * 0.165,
      width * 0.115, height * 0.16
    );
    ctx.bezierCurveTo(
      width * 0.13, height * 0.155,
      width * 0.145, height * 0.153,
      width * 0.16, height * 0.155
    );
    ctx.bezierCurveTo(
      width * 0.175, height * 0.157,
      width * 0.19, height * 0.162,
      width * 0.205, height * 0.17
    );
    ctx.bezierCurveTo(
      width * 0.22, height * 0.178,
      width * 0.23, height * 0.182,
      width * 0.237, height * 0.185
    );

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw Andaman and Nicobar Islands (east of mainland)
    ctx.fillStyle = '#E8F5E8';
    ctx.strokeStyle = '#00C853';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(width * 0.88, height * 0.75, width * 0.025, height * 0.018, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(width * 0.91, height * 0.77, width * 0.020, height * 0.014, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Draw Lakshadweep Islands (west of Kerala)
    ctx.beginPath();
    ctx.arc(width * 0.20, height * 0.75, width * 0.012, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  };

  const drawAnimatedCities = (ctx: CanvasRenderingContext2D, time: number) => {
    citiesWithPositions.forEach((city, index) => {
      const x = city.position.x * mapDimensions.width;
      const y = city.position.y * mapDimensions.height;
      const isSelected = city.name === selectedCity;
      const isHovered = city.name === hoveredCity;
      const baseSize = 6;
      const intensity = Math.min(city.pm25 / 200, 1);
      const size = baseSize + intensity * 12;

      // Breathing animation for severe pollution
      const breathingScale = city.pm25 > 150 ? 
        1 + Math.sin(time * 0.003 + index * 0.5) * 0.2 : 1;
      const animatedSize = size * breathingScale;

      // Enhanced glow effect for selected/hovered cities
      if (isSelected || isHovered) {
        const glowSize = animatedSize + 20;
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
        glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        glowGradient.addColorStop(0.5, isSelected ? 'rgba(0, 200, 83, 0.4)' : 'rgba(255, 255, 255, 0.3)');
        glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(x, y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
      }

      // Pollution cloud visualization
      const cloudGradient = ctx.createRadialGradient(x, y, 0, x, y, animatedSize + 8);
      const alpha = Math.min(intensity * 0.8 + 0.2, 0.9);
      cloudGradient.addColorStop(0, city.color + 'FF');
      cloudGradient.addColorStop(0.4, city.color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
      cloudGradient.addColorStop(1, city.color + '00');
      
      ctx.beginPath();
      ctx.arc(x, y, animatedSize + 8, 0, Math.PI * 2);
      ctx.fillStyle = cloudGradient;
      ctx.fill();

      // Main city marker
      const cityGradient = ctx.createRadialGradient(x, y, 0, x, y, animatedSize);
      cityGradient.addColorStop(0, '#FFFFFF');
      cityGradient.addColorStop(0.3, city.color);
      cityGradient.addColorStop(1, city.color + '88');
      
      ctx.beginPath();
      ctx.arc(x, y, animatedSize, 0, Math.PI * 2);
      ctx.fillStyle = cityGradient;
      ctx.fill();

      // Enhanced border
      ctx.beginPath();
      ctx.arc(x, y, animatedSize, 0, Math.PI * 2);
      ctx.strokeStyle = isSelected ? '#FFFFFF' : city.color;
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.stroke();

      // AQI value display for selected city
      if (isSelected && city.actualAqi) {
        ctx.fillStyle = '#263238';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(city.actualAqi.toString(), x, y + 3);
      }

      // City name for selected/hovered cities
      if (isSelected || isHovered) {
        ctx.fillStyle = '#263238';
        ctx.font = isSelected ? 'bold 13px sans-serif' : '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(city.name, x, y - animatedSize - 12);
      }
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const container = canvas.parentElement;
      if (container) {
        const containerWidth = container.clientWidth;
        const width = Math.min(containerWidth - 32, 700);
        const height = width * 0.8;
        setMapDimensions({ width, height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = mapDimensions.width;
    canvas.height = mapDimensions.height;

    const animate = (time: number) => {
      ctx.clearRect(0, 0, mapDimensions.width, mapDimensions.height);
      
      drawRealisticIndiaMap(ctx, mapDimensions.width, mapDimensions.height);
      drawAnimatedCities(ctx, time);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mapDimensions, citiesWithPositions, selectedCity, hoveredCity]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    citiesWithPositions.forEach((city) => {
      const cityX = city.position.x * mapDimensions.width;
      const cityY = city.position.y * mapDimensions.height;
      const distance = Math.sqrt((clickX - cityX) ** 2 + (clickY - cityY) ** 2);
      
      if (distance < 25) {
        onCitySelect(city.name);
      }
    });
  };

  const handleCanvasHover = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const hoverX = event.clientX - rect.left;
    const hoverY = event.clientY - rect.top;

    let foundCity = null;
    citiesWithPositions.forEach((city) => {
      const cityX = city.position.x * mapDimensions.width;
      const cityY = city.position.y * mapDimensions.height;
      const distance = Math.sqrt((hoverX - cityX) ** 2 + (hoverY - cityY) ** 2);
      
      if (distance < 25) {
        foundCity = city.name;
      }
    });

    setHoveredCity(foundCity);
  };

  // CSS styles as a string for the scrollbar
  const scrollbarStyles = `
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #00C853 transparent;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #00C853;
      border-radius: 2px;
    }
  `;

  return (
    <div className="relative w-full">
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      
      <div className="flex justify-center mb-4">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasHover}
          onMouseLeave={() => setHoveredCity(null)}
          className="cursor-pointer rounded-xl shadow-xl border-2 border-white/60 bg-gradient-to-br from-blue-50/90 to-green-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
      
      <div className="absolute top-2 right-2 md:top-4 md:right-4 flex space-x-2">
        <Badge className="bg-[#00C853] text-white animate-pulse">
          <Activity className="w-3 h-3 mr-1" />
          Live Data
        </Badge>
        <Badge className="bg-[#FF6F00] text-white">
          <Zap className="w-3 h-3 mr-1" />
          Real-time
        </Badge>
      </div>

      {/* Enhanced city selector grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4 text-xs max-h-56 overflow-y-auto custom-scrollbar">
        {citiesWithPositions.slice(0, 25).map((city) => (
          <button
            key={city.name}
            onClick={() => onCitySelect(city.name)}
            className={`p-2 rounded-lg transition-all duration-300 text-left transform hover:scale-105 ${
              selectedCity === city.name
                ? 'bg-gradient-to-r from-[#00C853]/20 to-[#00C853]/10 border-2 border-[#00C853]/50 shadow-lg scale-105'
                : hoveredCity === city.name
                ? 'bg-white/80 border border-[#00C853]/30 shadow-md'
                : 'bg-white/60 border border-white/50 hover:bg-white/80'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0 animate-pulse"
                style={{ backgroundColor: city.color }}
              />
              <div className="min-w-0 flex-1">
                <div className="font-medium text-[#263238] truncate">{city.name}</div>
                <div className="text-[#263238]/60 truncate flex items-center space-x-1">
                  <span>{city.aqi}</span>
                  {city.actualAqi && (
                    <span className="text-[#00C853] font-semibold">({city.actualAqi})</span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {citiesWithPositions.length > 25 && (
        <div className="text-center mt-2">
          <span className="text-xs text-[#263238]/60">
            Showing 25 of {citiesWithPositions.length} cities. Click map or search for more.
          </span>
        </div>
      )}
    </div>
  );
};
