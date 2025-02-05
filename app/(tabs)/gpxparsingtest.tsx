import { StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GPXParsingTest() {


  return (
    <SafeAreaView>
      <Button
        title='Select GPX file'
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
