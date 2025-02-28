import { InviteRequestListItem } from '@/components/InviteRequestListItem';
import React, { useCallback, useEffect, useState } from 'react';
import { Route } from '../app/models';
import { Request } from '../app/models';

import { getRoutes } from '../app/db-service';
import { RefreshControl, ScrollView, Text } from 'react-native';
import { useLocation } from '@/hooks/useLocation';
import { filterByRouteDistance, filterByRouteLocation, calculateDistance, filterByRouteTerrain, filterByRoutePace } from '@/app/filterUtils';

export const InviteRequestList = () => {

    const { location, locationError, loading: locationLoading } = useLocation();

    const [routes, setRoutes] = useState<Route[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [filteredLocations, setFilteredLocations] = useState<Route[]>(routes);
    const [isilterByRouteLocationEnabled, setIsilterByRouteLocationEnabled] = useState(false);
    const [isFilterByRouteDistanceEnabled, setIsFilterByRouteDistanceEnabled] = useState(false);
    const [isFilterByTerrainTypeEnabled, setIsFilterByTerrainTypeEnabled] = useState(false);
    const [isFilterByPaceEnabled, setIsFilterByPaceEnabled] = useState(false);


    const [pendingRequests, setPendingRequests] = useState<Request[]>([]);

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


        //Temporary test requests
        setPendingRequests([{ id: 1, usersname: 'randomGuy', routeName: 'Big Hills', date: '16012025' }, { id: 2, usersname: 'Kekon', routeName: 'Big Hills', date: '16012025' }, { id: 3, usersname: 'RandomGirl', routeName: 'Coast Dash', date: '16012025' }])



        try {
            setRoutes(await getRoutes());
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setRefreshing(false); // Set refreshing to false after data is fetched (or error occurs)
        }
    }, []);



    useEffect(() => {
        loadDataCallback();

        //  applyFilters();

    }, [loadDataCallback, locationLoading, isFilterByRouteDistanceEnabled, isilterByRouteLocationEnabled, isFilterByTerrainTypeEnabled, isFilterByPaceEnabled]);

    const onRefresh = useCallback(() => { // Function for pull-to-refresh
        console.log("Refreshing");

        loadDataCallback();
    }, [loadDataCallback]);

    return (
        <ScrollView
            refreshControl={ // Add RefreshControl as a prop
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {pendingRequests.map((request) => (
                <InviteRequestListItem key={request.id} requestData={request} />
            ))}
        </ScrollView >
    );
}
