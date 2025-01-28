import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Text } from 'react-native';
import { Collapsible } from '@/components/Collapsible';

export function RWMListItem() {
    let distanceFromUser = 10;
    const routeDistance = 5;
    const routePace = '5:30';
    const routeHost = 'Bob Smith'
    return (
        <ThemedView>
            <Collapsible title='Placeholder Route Name/Info'>
                <ThemedText style={{
                    color: 'red'
                }}>Test Item</ThemedText>
                <ThemedText>Distance away:</ThemedText>
                <ThemedText id='distanceFromUser'>{distanceFromUser} miles</ThemedText>
                <ThemedText>Approximate Route Distance:</ThemedText>
                <ThemedText id='routeDistance'>{routeDistance} miles</ThemedText>
                <ThemedText>Estimated Pace:</ThemedText>
                <ThemedText id='routePace'>{routePace} min/mi</ThemedText>
                <ThemedText>Hosted by:</ThemedText>
                <ThemedText id='routeHost'>{routeHost}</ThemedText>
            </Collapsible>
        </ThemedView>
    )
}
