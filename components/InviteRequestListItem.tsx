import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, Image, Modal, Text, TextInput, View } from 'react-native';
import { Request } from '../app/models';
import { Avatar } from '@rneui/base';
import { useState } from 'react';
import { acceptRequest, getUser, rejectRequest } from '../app/db-service';

export const InviteRequestListItem: React.FC<{
    requestData: Request;
    onAccept: any;
    onReject: any;
}> = ({ requestData: { request_id, user_id, route_id, request_date, status }, onAccept, onReject }) => {

    const [userName, setUserName] = useState('')

    async function getHostName() {
        const hostName = await getUser(user_id);

        setUserName(hostName);
    }

    getHostName();

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
                <ThemedText>{userName}</ThemedText>
            </View>
            {/* replace with route name */}
            <ThemedText>{route_id}</ThemedText>
            <ThemedText type='subtitle'>{status}</ThemedText>
            <ThemedText>{request_date}</ThemedText>
            <View style={{ flexDirection: 'row' }}>
                <Button title='Accept' onPress={() => onAccept(request_id)} />
                <Button title='Decline' onPress={() => onReject(request_id)} />
            </View>

        </ThemedView>
    );
};
