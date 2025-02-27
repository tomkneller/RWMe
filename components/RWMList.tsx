import { RWMListItem } from '@/components/RWMListItem';
import React, { useCallback, useEffect, useState } from 'react';
import { Route } from '../app/models';
import { getRoutes } from '../app/db-service';
import { RefreshControl, ScrollView, Text } from 'react-native';
import { useLocation } from '@/hooks/useLocation';
import { filterByRouteDistance, filterByRouteLocation, calculateDistance, filterByRouteTerrain, filterByRoutePace } from '@/app/filterUtils';

export const RWMList = (props: { dist: number; terrain: string; rtDist: number; maxPace: string; }) => {

    const { dist, terrain, rtDist, maxPace } = props;

    const { location, locationError, loading: locationLoading } = useLocation();

    const [routes, setRoutes] = useState<Route[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [filteredLocations, setFilteredLocations] = useState<Route[]>(routes);
    const [isilterByRouteLocationEnabled, setIsilterByRouteLocationEnabled] = useState(false);
    const [isFilterByRouteDistanceEnabled, setIsFilterByRouteDistanceEnabled] = useState(false);
    const [isFilterByTerrainTypeEnabled, setIsFilterByTerrainTypeEnabled] = useState(false);
    const [isFilterByPaceEnabled, setIsFilterByPaceEnabled] = useState(false);


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
        console.log(terrain);

        setIsFilterByRouteDistanceEnabled(rtDist !== null && !isNaN(Number(rtDist)) && Number(rtDist) >= 0);
        setIsilterByRouteLocationEnabled(dist !== null && !isNaN(Number(dist)) && Number(dist) >= 0);
        setIsFilterByTerrainTypeEnabled(terrain != "any");
        setIsFilterByPaceEnabled(maxPace != null && maxPace != '00:00' && maxPace != '');


        let filtered = routes;

        if (!locationLoading && location) {
            filtered = isilterByRouteLocationEnabled ? filterByRouteLocation(filtered, location.coords, dist) : filtered;
        }
        filtered = isFilterByRouteDistanceEnabled ? filterByRouteDistance(filtered, rtDist) : filtered;

        filtered = isFilterByTerrainTypeEnabled ? filterByRouteTerrain(filtered, terrain) : filtered;

        filtered = isFilterByPaceEnabled ? filterByRoutePace(filtered, maxPace) : filtered;

        setFilteredLocations(filtered);
    }

    useEffect(() => {
        loadDataCallback();

        applyFilters();

    }, [loadDataCallback, locationLoading, dist, terrain, rtDist, maxPace, isFilterByRouteDistanceEnabled, isilterByRouteLocationEnabled, isFilterByTerrainTypeEnabled, isFilterByPaceEnabled]);

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
        </ScrollView >
    );
}
