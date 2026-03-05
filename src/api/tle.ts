// src/api/tle.ts

// NORAD Catalog Numbers for QZSS (Michibiki)
const QZSS_CATALOG_NUMBERS = [
    49336, // QZS-1R (MICHIBIKI-1R)
    42738, // QZS-2 (MICHIBIKI-2)
    42917, // QZS-3 (MICHIBIKI-3)
    42965, // QZS-4 (MICHIBIKI-4)
    62876  // QZS-6 (QZSS/PRN 200)
];

const CACHE_KEY = 'qzss_tle_cache_v2';
const CACHE_EXPIRE_MS = 1000 * 60 * 60 * 4; // 4 hours

interface TLECache {
    timestamp: number;
    data: string;
}

// Fallback TLE data (as of recent epoch) just in case CelesTrak is down
// This ensures the application always shows *something* for demonstration
const FALLBACK_TLE = `QZS-1R (MICHIBIKI-1R)   
1 49336U 21097A   24160.77124376 -.00000282  00000-0  00000+0 0  9997
2 49336  41.0504 250.7936 0752119 270.0469  84.0934  1.00287848  9826
QZS-2 (MICHIBIKI-2)     
1 42738U 17028A   24160.84439077 -.00000277  00000-0  00000+0 0  9999
2 42738  44.1802 248.8049 0748119 270.1982  83.8207  1.00262194 25777
QZS-3 (MICHIBIKI-3)     
1 42917U 17048A   24160.87186252 -.00000209  00000-0  00000+0 0  9995
2 42917   0.0635 233.1557 0001099 261.2619 144.5977  1.00273760 24898
QZS-4 (MICHIBIKI-4)     
1 42965U 17062A   24160.79815033 -.00000272  00000-0  00000+0 0  9999
2 42965  40.5401 251.3532 0753041 270.0763  83.7441  1.00273881 24344
QZS-6 (QZSS/PRN 200)    
1 62876U 25023A   26063.71919897 -.00000243  00000+0  00000+0 0  9997
2 62876   0.0435 310.3847 0001869  28.3826 173.1004  1.00270084  3913`;


export const fetchQZSSTLE = async (): Promise<string> => {
    // Check localStorage cache first
    const cachedDataStr = localStorage.getItem(CACHE_KEY);
    if (cachedDataStr) {
        try {
            const cachedData: TLECache = JSON.parse(cachedDataStr);
            if (Date.now() - cachedData.timestamp < CACHE_EXPIRE_MS && cachedData.data.trim().length > 0) {
                console.log('Using cached TLE data');
                return cachedData.data;
            }
        } catch (e) {
            console.warn('Failed to parse cached TLE data', e);
        }
    }

    // Fetch from CELESTRAK API using specific catalog numbers (GROUP=qzss is deprecated)
    console.log('Fetching new TLE data from CelesTrak using explicit Catalog IDs...');
    try {
        const fetchPromises = QZSS_CATALOG_NUMBERS.map(async (catnr) => {
            const url = `https://celestrak.org/NORAD/elements/gp.php?CATNR=${catnr}&FORMAT=tle`;
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Accept': 'text/plain' },
            });
            if (!response.ok) return null;
            const text = await response.text();
            return text && text.includes('QZS') ? text.trim() : null;
        });

        const results = await Promise.all(fetchPromises);
        const validResults = results.filter(r => r !== null) as string[];

        if (validResults.length === 0) {
            throw new Error('Received invalid/empty TLE data for all requested satellites.');
        }

        const compiledData = validResults.join('\n');

        // Save to cache
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: compiledData
        }));

        return compiledData;
    } catch (error) {
        console.error('Failed to fetch TLE data. Falling back to static data:', error);
        return FALLBACK_TLE;
    }
};
