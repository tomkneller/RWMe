import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'react-native';

import { Route } from '../app/models';


export const RWMListItem: React.FC<{
    routeData: Route;
}> = ({ routeData: { idroutes, routeName, lat, long, distance, pace, hostName } }) => {

    return (
        <ThemedView>
            <ThemedText type='subtitle' style={{
                color: 'red'
            }}>{routeName}
            </ThemedText>
            <Image></Image>
            <ThemedText type='defaultSemiBold'>Distance away:</ThemedText>
            {/* <ThemedText id='distanceFromUser'>{item.distanceFromUser} miles</ThemedText> */}
            <ThemedText type='defaultSemiBold'>Approximate Route Distance:</ThemedText>
            <ThemedText id='routeDistance'>{distance} miles</ThemedText>
            <ThemedText type='defaultSemiBold'>Estimated Pace:</ThemedText>
            <ThemedText id='routePace'>{pace} min/mi</ThemedText>
            <ThemedText type='defaultSemiBold'>Hosted by:</ThemedText>
            <ThemedText id='routeHost'>{hostName}</ThemedText>
        </ThemedView>
    );
};
