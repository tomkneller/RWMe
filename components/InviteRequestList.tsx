import { InviteRequestListItem } from '@/components/InviteRequestListItem';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Request } from '../app/models';

import { getPendingRequestsForUser, getRoutes } from '../app/db-service';
import { RefreshControl, ScrollView, Text } from 'react-native';
import AuthContext from '../app/AuthContext';
import { ThemedText } from './ThemedText';

export const InviteRequestList = () => {
    const { user } = useContext(AuthContext);

    const [refreshing, setRefreshing] = useState(false);
    const [pendingRequests, setPendingRequests] = useState<Request[]>([]);

    const loadDataCallback = useCallback(async () => {
        setRefreshing(true); // Set refreshing to true before fetching data
        try {
            setPendingRequests(await getPendingRequestsForUser(user.idusers));
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
        console.log("Refreshing");

        loadDataCallback();
    }, [loadDataCallback]);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {pendingRequests ? (pendingRequests.map((request) => (
                <InviteRequestListItem key={request.request_id} requestData={request} />
            ))
            ) : <ThemedText>LOLLOOOPOLL</ThemedText>}
        </ScrollView >
    );
}
