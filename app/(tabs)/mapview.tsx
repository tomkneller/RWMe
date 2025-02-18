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
import { useLocation } from '@/hooks/useLocation'; // Import the custom hook

export default function MapViewer() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [markers, setProcessedMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { location, locationError, loading: locationLoading } = useLocation();
  const [region, setRegion] = useState(null); // Store region in state

  //TODO: Placeholder marker structures,should retrieve from db within filtered ranges to improve performance
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (!location) {
          return;
        }

        const routeData = await getRoutes();

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
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
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
  }, [location]);



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
    return null;
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