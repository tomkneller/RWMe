import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, View } from 'react-native';
import { Request } from '../app/models';
import { Avatar } from '@rneui/base';
import { useState } from 'react';
import { getSpecificRoute, getUser } from '../app/db-service';
import { getDateTimeReadable, getTimeAgo } from '@/app/utils';

export const InviteRequestListItem: React.FC<{
    requestData: Request;
    onAccept: any;
    onReject: any;
}> = ({ requestData: { request_id, user_id, route_id, request_date, status }, onAccept, onReject }) => {

    const [userName, setUserName] = useState('');
    const [routeName, setRouteName] = useState('');


    async function getHostName() {
        const hostName = await getUser(user_id);

        setUserName(hostName);
    }

    getHostName();

    async function getRouteName() {
        try {
            const route = await getSpecificRoute(route_id);
            setRouteName(route.routeName);
        } catch (error) {
            console.error(error);
        }
    }

    getRouteName();





    return (
        <ThemedView>
            <View style={{ flexDirection: 'row' }}>
                <Avatar
                    size={25}
                    rounded
                    source={require('@/assets/images/avatar.png')}
                    title="BP"
                    containerStyle={{ backgroundColor: "blue" }}
                />
                <ThemedText> {userName}</ThemedText>
            </View>
            {/* replace with route name */}
            <ThemedText>{routeName}</ThemedText>
            <ThemedText type='subtitle'>{status}</ThemedText>
            <ThemedText>{getDateTimeReadable(request_date)} ({getTimeAgo(request_date)})</ThemedText>
            <View style={{ flexDirection: 'row' }}>
                <Button title='Accept' onPress={() => onAccept(request_id)} />
                <Button title='Decline' onPress={() => onReject(request_id)} />
            </View>

        </ThemedView>
    );
};
