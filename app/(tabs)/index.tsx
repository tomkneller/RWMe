import { StyleSheet, TextInput, View } from 'react-native';
import { RWMList } from '@/components/RWMList';
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function HomeScreen() {
  const [withinDistance, setWithinDistance] = useState('');
  const [terrainType, setTerrainType] = useState('any');
  const [routeDistance, setRouteDistance] = useState('');
  const [pace, setPace] = useState('');

  return (
    <SafeAreaView
      style={{ paddingBottom: 45 }}
    >
      <ThemedView >
        <View style={{ flexDirection: 'column' }}>
          <View >
            <ThemedText>Max Pace: </ThemedText>
            <TextInput style={{
              backgroundColor: 'white',
              width: 50,
            }}
              defaultValue='200'
              value={pace}
              onChangeText={setPace}>
            </TextInput>
          </View>

          <View >
            <ThemedText>Terrain: </ThemedText>
            <Picker
              style={{
                backgroundColor: 'white'
              }}
              selectedValue={terrainType}
              onValueChange={(itemValue, itemIndex) =>
                setTerrainType(itemValue)
              }>
              <Picker.Item label="Any" value="any" />
              <Picker.Item label="Trail" value="trail" />
              <Picker.Item label="Road" value="road" />
              <Picker.Item label="Mixed" value="mixed" />
            </Picker>
          </View>

          <View >
            <ThemedText>Maximum Distance: </ThemedText>
            <TextInput style={{
              backgroundColor: 'white',
              width: 50,
            }}
              // defaultValue='5'
              value={routeDistance}
              onChangeText={setRouteDistance}>
            </TextInput>
          </View>

          <View >
            <ThemedText>Within: </ThemedText>
            <TextInput style={{
              backgroundColor: 'white',
              width: 50,
            }}
              // defaultValue='5'
              value={withinDistance}
              onChangeText={setWithinDistance}>
            </TextInput>
            <ThemedText> mi</ThemedText>
          </View>
        </View>
      </ThemedView>

      <RWMList dist={parseInt(withinDistance)} terrain={terrainType} rtDist={parseInt(routeDistance)} maxPace={pace} />
    </SafeAreaView >

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
