import { StyleSheet, Image, Platform, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import MapView, { Callout } from 'react-native-maps';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { getRoutes } from '../db-service'
import React, { useEffect, useState } from 'react';
import { MapMarkerDetails } from '@/components/MapMarkerDetails';

export default function MapViewer() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routes, setRoutes] = useState();
  const [markers, setProcessedMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);


  //TODO: Placeholder marker structures,should retrieve from db within filtered ranges to improve performance
  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true);
      try {
        const routeData = await getRoutes();
        // setRoutes(routeData);
        const processedMarkers = routeData.map((route: { idroutes: any; routeName: any; hostName: any; lat: any; longi: any; distance: any; pace: any; routeDateTime: any }) => {
          console.log(routeData);

          return {
            id: route.idroutes,
            title: route.routeName,
            description: "Hosted By:" + route.hostName,
            latlng: {
              latitude: route.lat,
              longitude: route.longi
            },

            distance: route.distance,
            pace: route.pace,
            hostName: route.hostName,
            dateTime: route.routeDateTime
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

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const handleMapPress = () => {
    setSelectedMarker(null);
  };

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}

        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress} // Deselect on map press
      >
        {markers.map((route) => (
          <Marker
            key={route.id}
            coordinate={{
              latitude: route.latlng.latitude,
              longitude: route.latlng.longitude
            }}
            title={route.title}
            description={route.description}
            onPress={() => handleMarkerPress(route)}
          >
          </Marker>
        ))}

      </MapView>
      {selectedMarker && (
        <MapMarkerDetails
          routename={selectedMarker.title}
          distance={selectedMarker.distance}
          pace={selectedMarker.pace}
          hostName={selectedMarker.hostName}
          dateTime={selectedMarker.dateTime}
          distanceAway='100' />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
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
