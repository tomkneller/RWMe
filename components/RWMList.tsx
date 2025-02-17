import { ThemedView } from '@/components/ThemedView';
import { RWMListItem } from '@/components/RWMListItem';
import React, { useCallback, useEffect, useState } from 'react';
import { Route } from '../app/models';
import { getRoutes, getSpecificRoute } from '../app/db-service';
import { RefreshControl, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';

export function RWMList() {
    const insets = useSafeAreaInsets();

    const [routes, setRoutes] = useState<Route[]>([]);
    const [newRouteName, setNewRouteName] = useState('');
    const [refreshing, setRefreshing] = useState(false); // State for refreshing


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
            {routes.map((route) => (
                <RWMListItem key={route.idroutes} routeData={route} />
            ))}

            <Text></Text>
        </ScrollView >
    );
}
