import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

interface Coords {
    latitude: number;
    longitude: number;
}

interface Location {
    coords: Coords;
}

export const useLocation = () => {
    const [location, setLocation] = useState<Location | null>(null);
    const [locationError, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getLocation = async () => {
            setLoading(true);
            setError(null);

            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    throw new Error('Location permission denied');
                }
                const currLocation = await Location.getCurrentPositionAsync({});
                setLocation(currLocation);
            } catch (error: any) {
                console.error("Error getting location:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getLocation();
    }, []);

    return { location, locationError, loading };
};