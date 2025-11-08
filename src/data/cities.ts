
export interface City {
  name: string;
  pm25: number;
  pm10: number;
  aqi: string;
  color: string;
  state: string;
  coordinates: [number, number];
  position?: { x: number; y: number };
  // Additional WAQI data
  actualAqi?: number;
  dominentPol?: string;
  lastUpdate?: string;
  humidity?: number;
  temperature?: number;
  pressure?: number;
  windSpeed?: number;
  no2?: number;
  o3?: number;
  so2?: number;
  co?: number;
}

// Enhanced city positions for 51 cities across India
// Positions calculated from actual coordinates (longitude, latitude)
// India bounds: Longitude 68-97°E, Latitude 8-37°N
// x = (lon - 68) / 29, y = 1 - (lat - 8) / 29 (inverted for screen coords)
export const cityPositions = {
  // North India
  'Delhi': { x: 0.317, y: 0.289 }, // [77.2090, 28.6139]
  'Gurgaon': { x: 0.311, y: 0.295 }, // [77.0266, 28.4595]
  'Noida': { x: 0.324, y: 0.292 }, // [77.3910, 28.5355]
  'Faridabad': { x: 0.321, y: 0.297 }, // [77.3178, 28.4089]
  'Chandigarh': { x: 0.303, y: 0.217 }, // [76.7794, 30.7333]
  'Amritsar': { x: 0.237, y: 0.185 }, // [74.8723, 31.6340]
  'Ludhiana': { x: 0.271, y: 0.210 }, // [75.8573, 30.9010]
  
  // Rajasthan
  'Jaipur': { x: 0.269, y: 0.349 }, // [75.7873, 26.9124]
  'Jodhpur': { x: 0.173, y: 0.371 }, // [73.0243, 26.2389]
  'Udaipur': { x: 0.197, y: 0.429 }, // [73.7125, 24.5854]
  'Kota': { x: 0.271, y: 0.407 }, // [75.8648, 25.2138]
  
  // Gujarat
  'Ahmedabad': { x: 0.158, y: 0.482 }, // [72.5714, 23.0225]
  'Surat': { x: 0.167, y: 0.546 }, // [72.8311, 21.1702]
  'Vadodara': { x: 0.180, y: 0.506 }, // [73.2081, 22.3072]
  'Rajkot': { x: 0.097, y: 0.507 }, // [70.8022, 22.3039]
  
  // Maharashtra
  'Mumbai': { x: 0.168, y: 0.618 }, // [72.8777, 19.0760]
  'Pune': { x: 0.202, y: 0.638 }, // [73.8567, 18.5204]
  'Nagpur': { x: 0.382, y: 0.547 }, // [79.0882, 21.1458]
  'Nashik': { x: 0.200, y: 0.586 }, // [73.7898, 19.9975]
  'Aurangabad': { x: 0.253, y: 0.590 }, // [75.3433, 19.8762]
  'Solapur': { x: 0.273, y: 0.667 }, // [75.9064, 17.6599]
  
  // Karnataka
  'Bangalore': { x: 0.331, y: 0.828 }, // [77.5946, 12.9716]
  'Mysore': { x: 0.298, y: 0.852 }, // [76.6394, 12.2958]
  'Hubli': { x: 0.245, y: 0.746 }, // [75.1240, 15.3647]
  'Mangalore': { x: 0.236, y: 0.831 }, // [74.8560, 12.9141]
  
  // Tamil Nadu
  'Chennai': { x: 0.423, y: 0.825 }, // [80.2707, 13.0827]
  'Coimbatore': { x: 0.309, y: 0.896 }, // [76.9558, 11.0168]
  'Madurai': { x: 0.349, y: 0.934 }, // [78.1198, 9.9252]
  'Salem': { x: 0.350, y: 0.874 }, // [78.1460, 11.6643]
  'Tiruchirappalli': { x: 0.369, y: 0.904 }, // [78.7047, 10.7905]
  
  // Andhra Pradesh & Telangana
  'Hyderabad': { x: 0.362, y: 0.676 }, // [78.4867, 17.3850]
  'Visakhapatnam': { x: 0.525, y: 0.666 }, // [83.2185, 17.6868]
  'Vijayawada': { x: 0.436, y: 0.707 }, // [80.6480, 16.5062]
  'Guntur': { x: 0.429, y: 0.714 }, // [80.4365, 16.3067]
  'Tirupati': { x: 0.394, y: 0.806 }, // [79.4192, 13.6288]
  
  // Kerala
  'Kochi': { x: 0.285, y: 0.934 }, // [76.2673, 9.9312]
  'Thiruvananthapuram': { x: 0.308, y: 0.982 }, // [76.9366, 8.5241]
  'Kozhikode': { x: 0.268, y: 0.888 }, // [75.7804, 11.2588]
  'Kottayam': { x: 0.294, y: 0.945 }, // [76.5222, 9.5916]
  
  // West Bengal
  'Kolkata': { x: 0.702, y: 0.499 }, // [88.3639, 22.5726]
  'Howrah': { x: 0.700, y: 0.502 }, // [88.3103, 22.5958]
  'Durgapur': { x: 0.666, y: 0.466 }, // [87.3119, 23.5204]
  'Asansol': { x: 0.654, y: 0.460 }, // [86.9842, 23.6739]
  
  // Odisha
  'Bhubaneswar': { x: 0.614, y: 0.575 }, // [85.8245, 20.2961]
  'Cuttack': { x: 0.616, y: 0.571 }, // [85.8790, 20.4625]
  'Rourkela': { x: 0.581, y: 0.507 }, // [84.8536, 22.2604]
  
  // Bihar & Jharkhand
  'Patna': { x: 0.591, y: 0.393 }, // [85.1376, 25.5941]
  'Gaya': { x: 0.586, y: 0.422 }, // [84.9994, 24.7914]
  'Ranchi': { x: 0.597, y: 0.471 }, // [85.3240, 23.3441]
  'Jamshedpur': { x: 0.627, y: 0.492 }, // [86.1844, 22.8046]
  
  // Uttar Pradesh
  'Lucknow': { x: 0.446, y: 0.352 }, // [80.9462, 26.8467]
  'Kanpur': { x: 0.425, y: 0.363 }, // [80.3319, 26.4499]
  'Agra': { x: 0.345, y: 0.340 }, // [78.0081, 27.1767]
  'Varanasi': { x: 0.516, y: 0.393 }, // [82.9739, 25.3176]

  // International cities for testing (keeping original positions)
  'Beijing': { x: 0.75, y: 0.15 },
  'Shanghai': { x: 0.78, y: 0.25 },
  'London': { x: 0.15, y: 0.15 }
};

// Initial cities data - will be updated with real WAQI data
export const initialCitiesData: City[] = [
  // North India
  { name: 'Delhi', pm25: 156, pm10: 234, aqi: 'Severe', color: '#8B0000', state: 'Delhi', coordinates: [77.2090, 28.6139] },
  { name: 'Gurgaon', pm25: 145, pm10: 220, aqi: 'Severe', color: '#8B0000', state: 'Haryana', coordinates: [77.0266, 28.4595] },
  { name: 'Noida', pm25: 142, pm10: 215, aqi: 'Severe', color: '#8B0000', state: 'Uttar Pradesh', coordinates: [77.3910, 28.5355] },
  { name: 'Faridabad', pm25: 138, pm10: 210, aqi: 'Very Poor', color: '#DC143C', state: 'Haryana', coordinates: [77.3178, 28.4089] },
  { name: 'Chandigarh', pm25: 89, pm10: 145, aqi: 'Moderate', color: '#FFA726', state: 'Chandigarh', coordinates: [76.7794, 30.7333] },
  { name: 'Amritsar', pm25: 95, pm10: 152, aqi: 'Poor', color: '#FF8F00', state: 'Punjab', coordinates: [74.8723, 31.6340] },
  { name: 'Ludhiana', pm25: 102, pm10: 165, aqi: 'Poor', color: '#FF8F00', state: 'Punjab', coordinates: [75.8573, 30.9010] },
  { name: 'Jaipur', pm25: 87, pm10: 142, aqi: 'Moderate', color: '#FFA726', state: 'Rajasthan', coordinates: [75.7873, 26.9124] },
  { name: 'Jodhpur', pm25: 78, pm10: 128, aqi: 'Moderate', color: '#FFA726', state: 'Rajasthan', coordinates: [73.0243, 26.2389] },
  { name: 'Udaipur', pm25: 65, pm10: 98, aqi: 'Satisfactory', color: '#4CAF50', state: 'Rajasthan', coordinates: [73.7125, 24.5854] },
  { name: 'Kota', pm25: 82, pm10: 135, aqi: 'Moderate', color: '#FFA726', state: 'Rajasthan', coordinates: [75.8648, 25.2138] },
  { name: 'Ahmedabad', pm25: 98, pm10: 167, aqi: 'Poor', color: '#FF8F00', state: 'Gujarat', coordinates: [72.5714, 23.0225] },
  { name: 'Surat', pm25: 85, pm10: 138, aqi: 'Moderate', color: '#FFA726', state: 'Gujarat', coordinates: [72.8311, 21.1702] },
  { name: 'Vadodara', pm25: 79, pm10: 125, aqi: 'Moderate', color: '#FFA726', state: 'Gujarat', coordinates: [73.2081, 22.3072] },
  { name: 'Rajkot', pm25: 72, pm10: 115, aqi: 'Moderate', color: '#FFA726', state: 'Gujarat', coordinates: [70.8022, 22.3039] },
  { name: 'Mumbai', pm25: 89, pm10: 145, aqi: 'Moderate', color: '#FFA726', state: 'Maharashtra', coordinates: [72.8777, 19.0760] },
  { name: 'Pune', pm25: 74, pm10: 119, aqi: 'Moderate', color: '#FFA726', state: 'Maharashtra', coordinates: [73.8567, 18.5204] },
  { name: 'Nagpur', pm25: 92, pm10: 148, aqi: 'Moderate', color: '#FFA726', state: 'Maharashtra', coordinates: [79.0882, 21.1458] },
  { name: 'Nashik', pm25: 68, pm10: 105, aqi: 'Satisfactory', color: '#4CAF50', state: 'Maharashtra', coordinates: [73.7898, 19.9975] },
  { name: 'Aurangabad', pm25: 76, pm10: 122, aqi: 'Moderate', color: '#FFA726', state: 'Maharashtra', coordinates: [75.3433, 19.8762] },
  { name: 'Solapur', pm25: 71, pm10: 112, aqi: 'Moderate', color: '#FFA726', state: 'Maharashtra', coordinates: [75.9064, 17.6599] },
  { name: 'Bangalore', pm25: 67, pm10: 98, aqi: 'Satisfactory', color: '#4CAF50', state: 'Karnataka', coordinates: [77.5946, 12.9716] },
  { name: 'Mysore', pm25: 58, pm10: 85, aqi: 'Satisfactory', color: '#4CAF50', state: 'Karnataka', coordinates: [76.6394, 12.2958] },
  { name: 'Hubli', pm25: 63, pm10: 92, aqi: 'Satisfactory', color: '#4CAF50', state: 'Karnataka', coordinates: [75.1240, 15.3647] },
  { name: 'Mangalore', pm25: 55, pm10: 78, aqi: 'Satisfactory', color: '#4CAF50', state: 'Karnataka', coordinates: [74.8560, 12.9141] },
  { name: 'Chennai', pm25: 78, pm10: 112, aqi: 'Moderate', color: '#FFA726', state: 'Tamil Nadu', coordinates: [80.2707, 13.0827] },
  { name: 'Coimbatore', pm25: 69, pm10: 103, aqi: 'Satisfactory', color: '#4CAF50', state: 'Tamil Nadu', coordinates: [76.9558, 11.0168] },
  { name: 'Madurai', pm25: 73, pm10: 116, aqi: 'Moderate', color: '#FFA726', state: 'Tamil Nadu', coordinates: [78.1198, 9.9252] },
  { name: 'Salem', pm25: 66, pm10: 98, aqi: 'Satisfactory', color: '#4CAF50', state: 'Tamil Nadu', coordinates: [78.1460, 11.6643] },
  { name: 'Tiruchirappalli', pm25: 71, pm10: 108, aqi: 'Moderate', color: '#FFA726', state: 'Tamil Nadu', coordinates: [78.7047, 10.7905] },
  { name: 'Hyderabad', pm25: 92, pm10: 156, aqi: 'Moderate', color: '#FFA726', state: 'Telangana', coordinates: [78.4867, 17.3850] },
  { name: 'Visakhapatnam', pm25: 75, pm10: 118, aqi: 'Moderate', color: '#FFA726', state: 'Andhra Pradesh', coordinates: [83.2185, 17.6868] },
  { name: 'Vijayawada', pm25: 81, pm10: 128, aqi: 'Moderate', color: '#FFA726', state: 'Andhra Pradesh', coordinates: [80.6480, 16.5062] },
  { name: 'Guntur', pm25: 77, pm10: 121, aqi: 'Moderate', color: '#FFA726', state: 'Andhra Pradesh', coordinates: [80.4365, 16.3067] },
  { name: 'Tirupati', pm25: 64, pm10: 95, aqi: 'Satisfactory', color: '#4CAF50', state: 'Andhra Pradesh', coordinates: [79.4192, 13.6288] },
  { name: 'Kochi', pm25: 52, pm10: 75, aqi: 'Satisfactory', color: '#4CAF50', state: 'Kerala', coordinates: [76.2673, 9.9312] },
  { name: 'Thiruvananthapuram', pm25: 48, pm10: 68, aqi: 'Good', color: '#2E7D32', state: 'Kerala', coordinates: [76.9366, 8.5241] },
  { name: 'Kozhikode', pm25: 54, pm10: 78, aqi: 'Satisfactory', color: '#4CAF50', state: 'Kerala', coordinates: [75.7804, 11.2588] },
  { name: 'Kottayam', pm25: 46, pm10: 65, aqi: 'Good', color: '#2E7D32', state: 'Kerala', coordinates: [76.5222, 9.5916] },
  { name: 'Kolkata', pm25: 134, pm10: 189, aqi: 'Very Poor', color: '#DC143C', state: 'West Bengal', coordinates: [88.3639, 22.5726] },
  { name: 'Howrah', pm25: 128, pm10: 182, aqi: 'Very Poor', color: '#DC143C', state: 'West Bengal', coordinates: [88.3103, 22.5958] },
  { name: 'Durgapur', pm25: 115, pm10: 168, aqi: 'Poor', color: '#FF8F00', state: 'West Bengal', coordinates: [87.3119, 23.5204] },
  { name: 'Asansol', pm25: 118, pm10: 172, aqi: 'Poor', color: '#FF8F00', state: 'West Bengal', coordinates: [86.9842, 23.6739] },
  { name: 'Bhubaneswar', pm25: 86, pm10: 138, aqi: 'Moderate', color: '#FFA726', state: 'Odisha', coordinates: [85.8245, 20.2961] },
  { name: 'Cuttack', pm25: 89, pm10: 142, aqi: 'Moderate', color: '#FFA726', state: 'Odisha', coordinates: [85.8790, 20.4625] },
  { name: 'Rourkela', pm25: 94, pm10: 152, aqi: 'Moderate', color: '#FFA726', state: 'Odisha', coordinates: [84.8536, 22.2604] },
  { name: 'Patna', pm25: 125, pm10: 185, aqi: 'Very Poor', color: '#DC143C', state: 'Bihar', coordinates: [85.1376, 25.5941] },
  { name: 'Gaya', pm25: 132, pm10: 195, aqi: 'Very Poor', color: '#DC143C', state: 'Bihar', coordinates: [84.9994, 24.7914] },
  { name: 'Ranchi', pm25: 98, pm10: 158, aqi: 'Poor', color: '#FF8F00', state: 'Jharkhand', coordinates: [85.3240, 23.3441] },
  { name: 'Jamshedpur', pm25: 105, pm10: 165, aqi: 'Poor', color: '#FF8F00', state: 'Jharkhand', coordinates: [86.1844, 22.8046] },
  { name: 'Lucknow', pm25: 148, pm10: 225, aqi: 'Severe', color: '#8B0000', state: 'Uttar Pradesh', coordinates: [80.9462, 26.8467] },
  { name: 'Kanpur', pm25: 165, pm10: 248, aqi: 'Severe', color: '#8B0000', state: 'Uttar Pradesh', coordinates: [80.3319, 26.4499] },
  { name: 'Agra', pm25: 138, pm10: 205, aqi: 'Very Poor', color: '#DC143C', state: 'Uttar Pradesh', coordinates: [78.0081, 27.1767] },
  { name: 'Varanasi', pm25: 142, pm10: 212, aqi: 'Severe', color: '#8B0000', state: 'Uttar Pradesh', coordinates: [82.9739, 25.3176] }
];

// Function to get AQI category and color based on PM2.5 value
export const getAQIFromPM25 = (pm25: number): { aqi: string; color: string } => {
  if (pm25 <= 12) return { aqi: 'Good', color: '#2E7D32' };
  if (pm25 <= 35) return { aqi: 'Satisfactory', color: '#4CAF50' };
  if (pm25 <= 55) return { aqi: 'Moderate', color: '#FFA726' };
  if (pm25 <= 150) return { aqi: 'Poor', color: '#FF8F00' };
  if (pm25 <= 250) return { aqi: 'Very Poor', color: '#DC143C' };
  return { aqi: 'Severe', color: '#8B0000' };
};

// Enhanced function to fetch real pollution data from WAQI API with better error handling
export const fetchPollutionData = async (): Promise<City[]> => {
  const apiToken = '4a7e5798b31fe9f2ea647092cab3df39005039d9';
  const updatedCities: City[] = [];
  
  console.log('Starting WAQI API data fetch for', initialCitiesData.length, 'cities');
  
  // Process cities in batches to avoid rate limiting
  const batchSize = 5;
  const batches = [];
  for (let i = 0; i < initialCitiesData.length; i += batchSize) {
    batches.push(initialCitiesData.slice(i, i + batchSize));
  }
  
  for (const batch of batches) {
    // Process batch in parallel
    const batchPromises = batch.map(async (city) => {
      try {
        let apiData = null;
        
        // Try multiple approaches to get data for the city
        const attempts = [
          // 1. Try by city name (WAQI format: city/country or just city)
          async () => {
            const cityName = city.name.toLowerCase().replace(/\s+/g, '-');
            const url = `https://api.waqi.info/feed/${cityName}/?token=${apiToken}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === 'ok' && data.data && data.data.aqi && data.data.aqi !== '-') {
              return data.data;
            }
            return null;
          },
          
          // 2. Try by coordinates (more reliable)
          async () => {
            const [lon, lat] = city.coordinates;
            const url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${apiToken}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === 'ok' && data.data && data.data.aqi && data.data.aqi !== '-') {
              return data.data;
            }
            return null;
          },
          
          // 3. Try city name with India country code
          async () => {
            const cityName = city.name.toLowerCase().replace(/\s+/g, '-');
            const url = `https://api.waqi.info/feed/${cityName}/india/?token=${apiToken}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === 'ok' && data.data && data.data.aqi && data.data.aqi !== '-') {
              return data.data;
            }
            return null;
          },
          
          // 4. Try search API as fallback
          async () => {
            const cityName = encodeURIComponent(city.name);
            const url = `https://api.waqi.info/search/?keyword=${cityName}&token=${apiToken}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === 'ok' && data.data && data.data.length > 0) {
              // Get the first result's UID and fetch its data
              const uid = data.data[0].uid;
              const feedUrl = `https://api.waqi.info/feed/@${uid}/?token=${apiToken}`;
              const feedResponse = await fetch(feedUrl);
              const feedData = await feedResponse.json();
              if (feedData.status === 'ok' && feedData.data && feedData.data.aqi && feedData.data.aqi !== '-') {
                return feedData.data;
              }
            }
            return null;
          }
        ];
        
        // Try each approach until one succeeds
        for (const attempt of attempts) {
          try {
            apiData = await attempt();
            if (apiData) {
              console.log(`✓ Successfully fetched data for ${city.name}`);
              break;
            }
          } catch (err) {
            // Continue to next attempt
            continue;
          }
        }
        
        if (apiData) {
          // Extract pollution data from API response
          const pm25 = apiData.iaqi?.pm25?.v || apiData.iaqi?.pm25?.value || city.pm25;
          const pm10 = apiData.iaqi?.pm10?.v || apiData.iaqi?.pm10?.value || city.pm10;
          const aqiValue = typeof apiData.aqi === 'number' ? apiData.aqi : parseInt(apiData.aqi) || pm25;
          const aqiInfo = getAQIFromPM25(pm25);
          
          return {
            ...city,
            pm25,
            pm10,
            aqi: aqiInfo.aqi,
            color: aqiInfo.color,
            actualAqi: aqiValue,
            dominentPol: apiData.dominentpol || 'pm25',
            lastUpdate: apiData.time?.s || new Date().toISOString(),
            humidity: apiData.iaqi?.h?.v || apiData.iaqi?.h?.value,
            temperature: apiData.iaqi?.t?.v || apiData.iaqi?.t?.value,
            pressure: apiData.iaqi?.p?.v || apiData.iaqi?.p?.value,
            windSpeed: apiData.iaqi?.w?.v || apiData.iaqi?.w?.value,
            no2: apiData.iaqi?.no2?.v || apiData.iaqi?.no2?.value,
            o3: apiData.iaqi?.o3?.v || apiData.iaqi?.o3?.value,
            so2: apiData.iaqi?.so2?.v || apiData.iaqi?.so2?.value,
            co: apiData.iaqi?.co?.v || apiData.iaqi?.co?.value,
            position: cityPositions[city.name as keyof typeof cityPositions]
          };
        } else {
          // Use default data if API call fails
          console.log(`⚠ Using default data for ${city.name} - API data not available`);
          return {
            ...city,
            position: cityPositions[city.name as keyof typeof cityPositions]
          };
        }
      } catch (error) {
        console.error(`✗ Failed to fetch data for ${city.name}:`, error);
        return {
          ...city,
          position: cityPositions[city.name as keyof typeof cityPositions]
        };
      }
    });
    
    // Wait for batch to complete
    const batchResults = await Promise.all(batchPromises);
    updatedCities.push(...batchResults);
    
    // Add delay between batches to avoid rate limiting (WAQI allows ~1000 calls/day)
    if (batches.indexOf(batch) < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  const successCount = updatedCities.filter(c => c.actualAqi).length;
  console.log(`✅ Completed WAQI API data fetch. Updated ${successCount}/${updatedCities.length} cities with real data`);
  
  return updatedCities;
};
