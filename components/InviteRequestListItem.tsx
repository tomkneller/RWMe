import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, Image, Modal, Text, TextInput, View } from 'react-native';
import { Request } from '../app/models';
import { Avatar } from '@rneui/base';

export const InviteRequestListItem: React.FC<{
    requestData: Request;
}> = ({ requestData: { request_id, user_id, route_id, request_date, status } }) => {

    const handleAcceptRequest = (id: number) => {
        console.log("Accept request", id);
        console.log(id);
    }

    const handleRejectRequest = (id: number) => {
        console.log("reject request", id);
    }

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
                {/* replace with user name */}
                <ThemedText>{user_id}</ThemedText>
            </View>
            {/* replace with route name */}
            <ThemedText>{route_id}</ThemedText>
            <ThemedText type='subtitle'>{status}</ThemedText>
            <ThemedText>{request_date}</ThemedText>
            <View style={{ flexDirection: 'row' }}>
                <Button title='Accept' onPress={() => handleAcceptRequest(request_id)} />
                <Button title='Decline' onPress={() => handleRejectRequest(request_id)} />
            </View>

        </ThemedView>
    );
};
