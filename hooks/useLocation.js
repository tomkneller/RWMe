import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
    const [location, setLocation] = useState(null);
    const [locationError, setError] = useState(null);
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
            } catch (err) {
                console.error("Error getting location:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getLocation();
    }, []);

    return { location, locationError, loading }; // Return location, error, and loading state
};