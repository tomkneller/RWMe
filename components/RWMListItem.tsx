import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Text } from 'react-native';

export function RWMListItem() {

    return (
        <ThemedView>
            <Text style={{
                color: 'red'
            }}>Test Item</Text>
        </ThemedView>
    )
}
