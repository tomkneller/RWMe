import { ThemedView } from '@/components/ThemedView';
import { RWMListItem } from '@/components/RWMListItem';
import React, { useCallback, useEffect, useState } from 'react';
import { Route } from '../app/models';
import { getRoutes, getSpecificRoute } from '../app/db-service';
import { RefreshControl, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { useLocation } from '@/hooks/useLocation'; // Import the custom hook

export function RWMList() {
    const insets = useSafeAreaInsets();

    const [routes, setRoutes] = useState<Route[]>([]);
    const [newRouteName, setNewRouteName] = useState('');
    const [refreshing, setRefreshing] = useState(false); // State for refreshing
    const { location, locationError, loading: locationLoading } = useLocation();

    const deg2rad = (deg: number) => {
        return deg * (Math.PI / 180);
    };

    /**
     * 
     * @param lat1 latitude of users origin point
     * @param lon1 longitude of users origin point
     * @param lat2 latitude of event origin
     * @param lon2 longitude of event origin
     * @returns distance away of event start from the users location in kilometers
     */
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        // Haversine formula for calculating distance between two coordinates
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    };


    if (!locationLoading) {
        if (location && routes) {
            for (let index = 0; index < routes.length; index++) {
                routes[index].distFromUser = calculateDistance(location.coords.latitude, location.coords.longitude, routes[index].lat, routes[index].longi);
            }
        } else {
            console.error(locationError);
        }
    }



    const loadDataCallback = useCallback(async () => {
        setRefreshing(true); // Set refreshing to true before fetching data

        try {
            console.log("get routes");
            // console.log(await getRoutes());
            setRoutes(await getRoutes());

            console.log(await getSpecificRoute(657693));


        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setRefreshing(false); // Set refreshing to false after data is fetched (or error occurs)
        }
    }, []);

    useEffect(() => {
        loadDataCallback();
    }, [loadDataCallback]);

    const onRefresh = useCallback(() => { // Function for pull-to-refresh
        console.log("Refresh");

        loadDataCallback();
    }, [loadDataCallback]);

    return (
        <ScrollView
            refreshControl={ // Add RefreshControl as a prop
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {!locationLoading && routes.map((route) => (
                <RWMListItem key={route.idroutes} routeData={route} />
            ))}

            <Text></Text>
        </ScrollView >
    );
}
