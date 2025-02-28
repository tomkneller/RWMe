import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, Image, Modal, Text, TextInput, View } from 'react-native';
import { Request } from '../app/models';
import { Avatar } from '@rneui/base';

export const InviteRequestListItem: React.FC<{
    requestData: Request;
}> = ({ requestData: { id, routeName, usersname, date } }) => {


    const handleAcceptRequest = (id: number) => {
        console.log("Accept request");
        console.log(id);

        //TODO: {usersname} should be added to db of attending people / or db of atteending people should contain all pending and have a boolean modifier for confirmed/ unconfirmed?

    }

    const handleRejectRequest = (id: number) => {
        console.log("reject request");
        console.log(id);
    }

    return (
        // <ThemedView style={{ backgroundColor: '#002531', marginTop: 5 }}>
        //     <ThemedText type='subtitle' style={{
        //         color: 'white'
        //     }}>{routeName}
        //     </ThemedText>
        //     <View style={{ flex: 1, flexDirection: 'row' }}>
        //         <Image style={{ height: 25, width: 25, margin: 4 }} source={require("@/assets/images/avatar.png")} />
        //         <ThemedText style={{ fontSize: 12 }} type='defaultSemiBold'>Host: </ThemedText>
        //         <ThemedText id='routeHost'>{routeName}</ThemedText>
        //     </View>
        //     <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        //         <View style={{ flexDirection: 'column' }}>
        //             <ThemedText style={{ fontSize: 12 }} type='defaultSemiBold'>Distance away:</ThemedText>
        //             {/* <ThemedText id='distanceFromUser'>{item.distanceFromUser} miles</ThemedText> */}
        //             <ThemedText id='distanceFromUser'>{distFromUser.toFixed(2)} Km</ThemedText>
        //         </View>
        //         <View style={{ flexDirection: 'column' }}>
        //             <ThemedText style={{ fontSize: 12 }} type='defaultSemiBold'>Route Distance:</ThemedText>
        //             <ThemedText id='routeDistance'>{distance} miles</ThemedText>
        //         </View>
        //         <View style={{ flexDirection: 'column' }}>
        //             <ThemedText style={{ fontSize: 12 }} type='defaultSemiBold'>Estimated Pace:</ThemedText>
        //             <ThemedText id='routePace'>{pace} min/mi</ThemedText>
        //         </View>
        //     </View>
        //     <Image style={{ height: 150, width: '100%', flex: 1, justifyContent: 'center' }} source={require('@/assets/images/avatar.png')} />
        //     <Button title='Accept' />
        //     <Button title='Decline' />


        // </ThemedView>

        <ThemedView>
            <Avatar
                size={25}
                rounded
                source={require('@/assets/images/avatar.png')}
                title="BP"
                containerStyle={{ backgroundColor: "blue" }}
            />
            <ThemedText>{usersname}</ThemedText>
            <ThemedText type='subtitle'>{routeName}</ThemedText>
            <ThemedText>{date}</ThemedText>
            <View style={{ flexDirection: 'row' }}>
                <Button title='Accept' onPress={() => handleAcceptRequest(id)} />
                <Button title='Decline' onPress={() => handleRejectRequest(id)} />
            </View>

        </ThemedView>
    );
};
