import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { getRoutes } from '../db-service'
import { useEffect, useState } from 'react';

export default function MapViewer() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routes, setRoutes] = useState();
  const [markers, setProcessedMarkers] = useState([]);



  //TODO: Placeholder marker structures,should retrieve from db within filtered ranges to improve performance
  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true);
      try {
        const routeData = await getRoutes();
        // setRoutes(routeData);
        const processedMarkers = routeData.map((route: { idroutes: any; routeName: any; hostName: any; lat: any; longi: any; }) => {
          return {
            id: route.idroutes,
            title: route.routeName,
            description: route.hostName,
            latlng: {
              latitude: route.lat,
              longitude: route.longi
            }

          };
        });
        setProcessedMarkers(processedMarkers);

      } catch (err) {
        // setError(err);
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);

      }
    };

    fetchRoutes();
  }, []);

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
      {markers.map((route) => (
        <Marker
          key={route.id}
          coordinate={{
            latitude: route.latlng.latitude,
            longitude: route.latlng.longitude
          }}
          title={route.title}
          description={route.description}
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
