import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps'


export default function MapViewer() {

  //TODO: Placeholder marker structures, replace with db locations
  const markers = [{
    title: "hello",
    description: "lolomon",
    latlng: {
      latitude: 37.78825,
      longitude: -122.4324
    },
  },
  {
    title: "goodbye",
    description: "wow",
    latlng: {
      latitude: 38.78825,
      longitude: -123.4324
    },
  }]

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
  return (
    <MapView
      style={styles.map}

      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }} >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
        />
      ))}
    </MapView>

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
