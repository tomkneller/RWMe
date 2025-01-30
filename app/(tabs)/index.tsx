import { Image, StyleSheet, Platform, ScrollView, TextInput, View, Text, FlatList } from 'react-native';
import { RWMList } from '@/components/RWMList';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {




  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <TextInput style={{
            backgroundColor: 'white',
            width: 150,
          }}
            placeholder='Current Location'></TextInput>
          <ThemedText>Within: </ThemedText>
          <TextInput style={{
            backgroundColor: 'white',
            width: 50,
          }}
            defaultValue='5'>
          </TextInput>
          <ThemedText> mi</ThemedText>
        </View>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <RWMList />


      </ThemedView>



    </ParallaxScrollView>

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
