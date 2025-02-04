import { ThemedView } from '@/components/ThemedView';
import { RWMListItem } from '@/components/RWMListItem';
import React, { useCallback, useEffect, useState } from 'react';
import { Route } from '../app/models';
import { getRoutes } from '../app/db-service';


export function RWMList() {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [newRouteName, setNewRouteName] = useState('');

    const loadDataCallback = useCallback(async () => {
        try {
            console.log("get routes");
            console.log(await getRoutes());
            setRoutes(await getRoutes());

        } catch (error) {
            console.error("Error loading data:", error);
        }
    }, []);

    useEffect(() => {
        loadDataCallback();
    }, [loadDataCallback]);

    return (
        <ThemedView>
            {routes.map((route) => (
                <RWMListItem key={route.idroutes} routeData={route} />
            ))}
        </ThemedView>
    )
}
