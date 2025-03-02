import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, GestureResponderEvent, Image, View } from 'react-native';
import { Route } from '../app/models';
import { createRequest, getUser } from '../app/db-service';
import { useContext, useState } from 'react';
import AuthContext from '../app/AuthContext';

export const RWMListItem: React.FC<{
    routeData: Route;
}> = ({ routeData: { idroutes, routeName, lat, longi, distance, pace, host_id, distFromUser } }) => {

    const { user } = useContext(AuthContext);

    const [userName, setUserName] = useState('')

    async function getHostName() {
        const hostName = await getUser(host_id);

        setUserName(hostName);
    }

    getHostName();

    function requestJoin(route_id: number, sender_id: number): void {
        console.log('request join', route_id);
        createRequest(route_id, sender_id);
    }

    return (
        <ThemedView style={{ backgroundColor: '#002531', marginTop: 5 }}>
            <ThemedText type='subtitle' style={{
                color: 'white'
            }}>{routeName}
            </ThemedText>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image style={{ height: 25, width: 25, margin: 4 }} source={require("@/assets/images/avatar.png")} />
                <ThemedText style={{ fontSize: 12 }} type='defaultSemiBold'>Host: </ThemedText>
                <ThemedText id='routeHost'>{userName}</ThemedText>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={{ flexDirection: 'column' }}>
                    <ThemedText style={{ fontSize: 12 }} type='defaultSemiBold'>Distance away:</ThemedText>
                    {/* <ThemedText id='distanceFromUser'>{item.distanceFromUser} miles</ThemedText> */}
                    <ThemedText id='distanceFromUser'>{distFromUser.toFixed(2)} Km</ThemedText>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <ThemedText style={{ fontSize: 12 }} type='defaultSemiBold'>Route Distance:</ThemedText>
                    <ThemedText id='routeDistance'>{distance} miles</ThemedText>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <ThemedText style={{ fontSize: 12 }} type='defaultSemiBold'>Estimated Pace:</ThemedText>
                    <ThemedText id='routePace'>{pace} min/mi</ThemedText>
                </View>
            </View>
            <Image style={{ height: 150, width: '100%', flex: 1, justifyContent: 'center' }} source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?size=400x400&center=${lat},${longi}&zoom=12&key=` }} />
            <Button title='Join' onPress={() => requestJoin(idroutes, user.idusers)} />
            <Button title='Message' />
        </ThemedView>
    );
};
