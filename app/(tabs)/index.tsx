import { StyleSheet, TextInput, View } from 'react-native';
import { RWMList } from '@/components/RWMList';
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function HomeScreen() {
  const [withinDistance, setWithinDistance] = useState('');
  const [terrainType, setTerrainType] = useState('');
  const [routeDistance, setRouteDistance] = useState('');
  const [pace, setPace] = useState('');

  return (
    <SafeAreaView
      style={{ paddingBottom: 45 }}
    >
      <ThemedView >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {/* <TextInput style={{
            backgroundColor: 'white',
            width: 150,
          }}
            placeholder='Current Location'></TextInput> */}
          <ThemedText>Max Pace: </ThemedText>
          <TextInput style={{
            backgroundColor: 'white',
            width: 50,
          }}
            // defaultValue='5'
            value={pace}
            onChangeText={setPace}>
          </TextInput>



          <ThemedText>Terrain: </ThemedText>
          <TextInput style={{
            backgroundColor: 'white',
            width: 50,
          }}
            // defaultValue='5'
            value={terrainType}
            onChangeText={setTerrainType}>
          </TextInput>


          <ThemedText>Maximum Distance: </ThemedText>
          <TextInput style={{
            backgroundColor: 'white',
            width: 50,
          }}
            // defaultValue='5'
            value={routeDistance}
            onChangeText={setRouteDistance}>
          </TextInput>



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
      </ThemedView>

      {/* <ThemedView style={styles.stepContainer}> */}
      <RWMList dist={parseInt(withinDistance)} terrain={terrainType} rtDist={parseInt(routeDistance)} maxPace={pace} />
      {/* </ThemedView> */}
    </SafeAreaView>

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
