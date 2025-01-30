import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image, Text, View } from 'react-native';
import { Collapsible } from '@/components/Collapsible';

export function RWMListItem({ item }) {
    // let distanceFromUser = 10;
    // const routeDistance = 5;
    // const routePace = '5:30';
    // const routeHost = 'Bob Smith'

    return (
        <ThemedView>
            {/* <Collapsible title={item.RouteTitle}> */}
            <ThemedText type='subtitle' style={{
                color: 'red'
            }}>{item.routeTitle}
            </ThemedText>
            <Image></Image>
            <ThemedText type='defaultSemiBold'>Distance away:</ThemedText>
            <ThemedText id='distanceFromUser'>{item.distanceFromUser} miles</ThemedText>
            <ThemedText type='defaultSemiBold'>Approximate Route Distance:</ThemedText>
            <ThemedText id='routeDistance'>{item.routeDistance} miles</ThemedText>
            <ThemedText type='defaultSemiBold'>Estimated Pace:</ThemedText>
            <ThemedText id='routePace'>{item.routePace} min/mi</ThemedText>
            <ThemedText type='defaultSemiBold'>Hosted by:</ThemedText>
            <ThemedText id='routeHost'>{item.routeHost}</ThemedText>
            {/* </Collapsible> */}
        </ThemedView>
    )
}
