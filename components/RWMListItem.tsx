import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image, View } from 'react-native';

import { Route } from '../app/models';


export const RWMListItem: React.FC<{
    routeData: Route;
}> = ({ routeData: { idroutes, routeName, lat, long, distance, pace, hostName } }) => {

    return (
        <ThemedView style={{ backgroundColor: '#002531', marginTop: 5 }}>
            <ThemedText type='subtitle' style={{
                color: 'white'
            }}>{routeName}
            </ThemedText>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image style={{ height: 25, width: 25, margin: 4 }} source={require("@/assets/images/avatar.png")} />
                <ThemedText style={{ fontSize: 12 }} type='defaultSemiBold'>Host: </ThemedText>
                <ThemedText id='routeHost'>{hostName}</ThemedText>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={{ flexDirection: 'column' }}>
                    <ThemedText style={{ fontSize: 12 }} type='defaultSemiBold'>Distance away:</ThemedText>
                    {/* <ThemedText id='distanceFromUser'>{item.distanceFromUser} miles</ThemedText> */}
                    <ThemedText id='distanceFromUser'>100 miles</ThemedText>
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

            <Image style={{ height: 150, width: '100%', flex: 1, justifyContent: 'center' }} source={require("@/assets/images/placeholdermap.png")} />
        </ThemedView>
    );
};
