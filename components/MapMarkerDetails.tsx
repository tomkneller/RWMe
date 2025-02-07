import { ThemedText } from '@/components/ThemedText';
import { View } from 'react-native';


export const MapMarkerDetails = (props) => {
    return (
        <View style={{ backgroundColor: 'black', width: '100%', height: '20%' }}>
            <ThemedText type='subtitle' id='routeName'>{props.routename}</ThemedText>
            <ThemedText type='defaultSemiBold'>Approximate Route Distance:</ThemedText>
            <ThemedText id='routeDistance'>{props.distance} miles</ThemedText>
            <ThemedText type='defaultSemiBold'>Estimated Pace:</ThemedText>
            <ThemedText id='routePace'>{props.pace} min/mi</ThemedText>
            <ThemedText type='defaultSemiBold'>Hosted by:</ThemedText>
            <ThemedText id='routeHost'>{props.hostName}</ThemedText>
            <ThemedText type='defaultSemiBold'>Distance away:</ThemedText>
            <ThemedText id='distanceFromUser'>{props.distanceAway} miles</ThemedText>
            <ThemedText type='defaultSemiBold'>Date:</ThemedText>
            <ThemedText id='routeDateTime'>{props.dateTime}</ThemedText>
        </View >
    );
};
