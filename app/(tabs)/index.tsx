import { StyleSheet, TextInput, View } from 'react-native';
import { RWMList } from '@/components/RWMList';
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {

  return (
    <SafeAreaView
      style={{ paddingBottom: 45 }}
    >
      <ThemedView >
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

      {/* <ThemedView style={styles.stepContainer}> */}
      <RWMList />
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
