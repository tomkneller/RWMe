import { RWMListItem } from '@/components/RWMListItem';
import React, { useCallback, useEffect, useState } from 'react';
import { Route } from '../app/models';
import { getRoutes, getSpecificRoute } from '../app/db-service';
import { RefreshControl, ScrollView, Text } from 'react-native';
import { useLocation } from '@/hooks/useLocation';
import { filterByRouteDistance, filterByRouteLocation, calculateDistance } from '@/app/filterUtils';

export const RWMList = (props: { dist: number; terrain: string; rtDist: number; maxPace: string; }) => {

    const { dist, terrain, rtDist, maxPace } = props;

    const { location, locationError, loading: locationLoading } = useLocation();

    const [routes, setRoutes] = useState<Route[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [filteredLocations, setFilteredLocations] = useState<Route[]>(routes);
    const [isilterByRouteLocationEnabled, setIsilterByRouteLocationEnabled] = useState(false);
    const [isFilterByRouteDistanceEnabled, setIsFilterByRouteDistanceEnabled] = useState(false);


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
            setRoutes(await getRoutes());
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setRefreshing(false); // Set refreshing to false after data is fetched (or error occurs)
        }
    }, []);

    const applyFilters = () => {

        setIsFilterByRouteDistanceEnabled(rtDist !== null && !isNaN(Number(rtDist)) && Number(rtDist) >= 0);
        setIsilterByRouteLocationEnabled(dist !== null && !isNaN(Number(dist)) && Number(dist) >= 0);

        let filtered = routes;

        if (!locationLoading && location) {
            filtered = isilterByRouteLocationEnabled ? filterByRouteLocation(filtered, location.coords, dist) : filtered;
        }
        filtered = isFilterByRouteDistanceEnabled ? filterByRouteDistance(filtered, rtDist) : filtered;

        setFilteredLocations(filtered);
    }

    useEffect(() => {
        loadDataCallback();

        applyFilters();

    }, [loadDataCallback, locationLoading, dist, terrain, rtDist, maxPace, isFilterByRouteDistanceEnabled, isilterByRouteLocationEnabled]);

    const onRefresh = useCallback(() => { // Function for pull-to-refresh
        console.log("Refreshing");

        loadDataCallback();
    }, [loadDataCallback]);

    return (
        <ScrollView
            refreshControl={ // Add RefreshControl as a prop
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {!locationLoading && filteredLocations.map((route) => (
                <RWMListItem key={route.idroutes} routeData={route} />
            ))}
            <Text></Text>
        </ScrollView >
    );
}
