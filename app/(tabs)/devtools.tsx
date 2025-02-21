import { StyleSheet, Button, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';
import { useContext, useState } from 'react';
import AuthContext from '../AuthContext';
import { PacePicker } from '../../components/PacePicker';
import { ThemedText } from '../../components/ThemedText';

// interface PaceState {
//   mins: string | undefined;
//   secs: string | undefined;
// }

export default function DevTools({ }) {
  useContext(AuthContext);

  // const [selectedPaces, setSelectedPaces] = useState<PaceState>({ mins: "01", secs: "00" });


  // const handlePaceChange = (newValues: { mins: string | undefined, secs: string | undefined }) => {
  //   setSelectedPaces(newValues);
  // }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>

      <Button title='Create Route Listing' onPress={() => { router.push("/createaroute") }} />
      <Button title='Create User Account' onPress={() => { router.push("/createaccount") }} />
      <Button title='View User Profile' onPress={() => { router.push("/profile") }} />
      <Button title='Login Screen' onPress={() => { router.push("/loginScreen") }} />
      {/* <PacePicker onPaceChange={handlePaceChange} /> */}
      {/* <ThemedText>{selectedPaces.mins} : {selectedPaces.secs}</ThemedText> */}

    </ParallaxScrollView>
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
