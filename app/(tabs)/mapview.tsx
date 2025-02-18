import { StyleSheet, Image, Platform, View, ActivityIndicator, Text } from 'react-native';

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
import * as Location from 'expo-location';

export default function MapViewer() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [markers, setProcessedMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [location, setLocation] = useState();
  const [region, setRegion] = useState(null); // Store region in state

  //TODO: Placeholder marker structures,should retrieve from db within filtered ranges to improve performance
  useEffect(() => {
    const fetchData = async () => {  // Combined fetch function
      try {
        setLoading(true); // Start loading
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Location permission denied'); // Throw error to be caught
        }

        const currLocation = await Location.getCurrentPositionAsync({});
        setLocation(currLocation); // Set location first

        const routeData = await getRoutes(); // Then fetch routes

        const processedMarkers = routeData.map((route) => ({
          id: route.idroutes,
          title: route.routeName,
          description: "Hosted By:" + route.hostName,
          latlng: { latitude: route.lat, longitude: route.longi },
          distance: route.distance,
          pace: route.pace,
          hostName: route.hostName,
          dateTime: route.routeDateTime,
        }));
        setRoutes(processedMarkers);

        // Calculate region *after* location and routes
        const calculatedRegion = {
          latitude: currLocation.coords.latitude,
          longitude: currLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setRegion(calculatedRegion); // Set region last

      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Stop loading regardless of success/failure
      }
    };

    fetchData(); // Call the combined function
  }, []);



  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const handleMapPress = () => {
    setSelectedMarker(null);
  };
  const renderMap = () => {
    if (loading) {
      return <View style={styles.map}><ActivityIndicator size="large" />
      </View>;
    }

    if (error) {
      return <View style={styles.map}><Text>Error: {error}</Text></View>;
    }

    if (region && routes && routes.length > 0) {
      return (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          onPress={handleMapPress}
        >
          {routes.map((route: { id: number, latlng: { latitude: number, longitude: number }, title: string, description: string }) => (
            <Marker key={route.id} coordinate={route.latlng}
              title={route.title} description={route.description}
              onPress={() => handleMarkerPress(route)} />
          ))}
        </MapView>
      );
    }

    return null; // Or a placeholder if needed





  };


  const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
    map: { ...StyleSheet.absoluteFillObject },
  });

  return (
    <View style={styles.container}>
      {renderMap()} {/* Render the map conditionally */}
      {selectedMarker && (
        <MapMarkerDetails
          routename={selectedMarker.title}
          distance={selectedMarker.distance}
          pace={selectedMarker.pace}
          hostName={selectedMarker.hostName}
          dateTime={selectedMarker.dateTime}
          distanceAway='100'
        />
      )}
    </View>
  );
}