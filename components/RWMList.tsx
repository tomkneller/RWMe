import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlatList, Text, View } from 'react-native';
import { RWMListItem } from '@/components/RWMListItem';
import { Collapsible } from '@/components/Collapsible';

export function RWMList() {

    //TODO: Placeholder Data: move this to pull from database
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Great Guy',
            content: "This is my positive review of bob, he's a great guy",
            distanceFromUser: 5,
            routeDistance: 2,
            routePace: '5:30',
            routeHost: 'Giles',
            routeTitle: 'Muddy Miles',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Awesome Dude',
            content: "This is my positive review of bob, he's a very nice man",
            distanceFromUser: 4,
            routeDistance: 10,
            routePace: '5:00',
            routeHost: 'Art',
            routeTitle: 'Trail Miles',

        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Great Route',
            content: "This is my positive review of bob, he's a great guy and makes good routes",
            distanceFromUser: 5,
            routeDistance: 8,
            routePace: '7:30',
            routeHost: 'kelvin',
            routeTitle: 'Easy Roads',

        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d73',
            title: 'Rude',
            content: "This is my negative review of bob, he's a bad guy",
            distanceFromUser: 2,
            routeDistance: 3,
            routePace: '4:30',
            routeHost: 'Gunk',
            routeTitle: 'Mountain Dash',

        },
    ];

    return (
        <ThemedView>
            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                    <RWMListItem item={item} />
                )}
                keyExtractor={item => item.id}
            />
        </ThemedView>
    )
}
