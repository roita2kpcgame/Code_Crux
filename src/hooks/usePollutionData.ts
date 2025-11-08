import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPollutionData, initialCitiesData, type City } from '@/data/cities';

// Cache data in localStorage to reduce API calls
const CACHE_KEY = 'pollution_data_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheData {
  cities: City[];
  timestamp: number;
}

const getCachedData = (): City[] | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const data: CacheData = JSON.parse(cached);
      const now = Date.now();
      if (now - data.timestamp < CACHE_DURATION) {
        console.log('📦 Using cached pollution data');
        return data.cities;
      }
    }
  } catch (error) {
    console.error('Error reading cache:', error);
  }
  return null;
};

const setCachedData = (cities: City[]) => {
  try {
    const data: CacheData = {
      cities,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    console.log('💾 Cached pollution data');
  } catch (error) {
    console.error('Error saving cache:', error);
  }
};

export const usePollutionData = () => {
  const [cities, setCities] = useState<City[]>(() => getCachedData() || initialCitiesData);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(() => {
    const cached = getCachedData();
    return cached ? new Date() : null;
  });
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const isFetchingRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadPollutionData = useCallback(async (forceRefresh = false) => {
    // Prevent concurrent fetches
    if (isFetchingRef.current && !forceRefresh) {
      console.log('⏳ Fetch already in progress, skipping...');
      return;
    }

    // Check cache first if not forcing refresh
    if (!forceRefresh) {
      const cached = getCachedData();
      if (cached) {
        setCities(cached);
        console.log('✅ Using cached data');
        return;
      }
    }

    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController();

    try {
      console.log('🔄 Starting to fetch real-time pollution data...');
      const updatedCities = await fetchPollutionData();
      console.log('✅ Fetched cities data:', updatedCities.length, 'cities');
      
      // Update state
      setCities(updatedCities);
      setLastUpdated(new Date());
      setRetryCount(0);
      
      // Cache the data
      setCachedData(updatedCities);
      
      // Show success message
      const successCount = updatedCities.filter(c => c.actualAqi).length;
      if (successCount > 0) {
        console.log(`✨ Successfully updated ${successCount} cities with real-time data`);
      }
    } catch (error) {
      console.error('❌ Failed to load pollution data:', error);
      setError('Failed to fetch real-time data. Using cached data if available.');
      setRetryCount(prev => prev + 1);
      
      // Try to use cached data on error
      const cached = getCachedData();
      if (cached) {
        setCities(cached);
        console.log('📦 Fallback to cached data');
      }
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
      abortControllerRef.current = null;
    }
  }, []);

  // Initial load and periodic updates
  useEffect(() => {
    // Load data on mount (will use cache if available)
    loadPollutionData(false);
    
    // Set up periodic refresh - every 15 minutes for real-time updates
    // (Pollution data typically updates every 10-15 minutes)
    const interval = setInterval(() => {
      console.log('⏰ Scheduled refresh triggered');
      loadPollutionData(true); // Force refresh
    }, 15 * 60 * 1000); // 15 minutes
    
    return () => {
      clearInterval(interval);
      // Cancel any pending fetch on unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadPollutionData]);

  // Auto-retry failed requests with exponential backoff
  useEffect(() => {
    if (error && retryCount < 3 && !isFetchingRef.current) {
      const retryDelay = Math.pow(2, retryCount) * 10000; // 10s, 20s, 40s delays
      console.log(`🔄 Retrying in ${retryDelay / 1000}s... (Attempt ${retryCount + 1}/3)`);
      
      const retryTimeout = setTimeout(() => {
        loadPollutionData(true);
      }, retryDelay);
      
      return () => clearTimeout(retryTimeout);
    }
  }, [error, retryCount, loadPollutionData]);

  // Manual refresh function
  const refreshData = useCallback(() => {
    console.log('🔄 Manual refresh triggered');
    loadPollutionData(true);
  }, [loadPollutionData]);

  return {
    cities,
    loading,
    lastUpdated,
    error,
    refreshData,
    retryCount,
    isRefreshing: isFetchingRef.current
  };
};
