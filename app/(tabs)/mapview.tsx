import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { getRoutes } from '../db-service'
import React, { useEffect, useState } from 'react';
import { MapMarkerDetails } from '@/components/MapMarkerDetails';
import { useLocation } from '@/hooks/useLocation'; // Import the custom hook


interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Route {
  dateTime: string;
  description: string;
  distance: number;
  host_id: string;
  id: number;
  latlng: {
    latitude: number;
    longitude: number;
  };
  pace: string;
  title: string;
}

// interface Route {
//   id: number;
//   latlng: {
//     latitude: number;
//     longitude: number;
//   };
//   title: string;
//   description: string;
// }

export default function MapViewer() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState<Route | null>(null);
  const { location } = useLocation();
  const [region, setRegion] = useState<Region | null>(null); // Store region in state

  //TODO: Placeholder marker structures,should retrieve from db within filtered ranges to improve performance
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (!location) {
          return;
        }

        const routeData = await getRoutes();

        const processedMarkers = routeData.map((route: { idroutes: number, lat: number, longi: number, routeName: string, description: string, host_id: string, distance: number, pace: string, routeDateTime: string }) => ({
          id: route.idroutes,
          title: route.routeName,
          description: "Hosted By:" + route.host_id,
          latlng: { latitude: route.lat, longitude: route.longi },
          distance: route.distance,
          pace: route.pace,
          host_id: route.host_id,
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

      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Stop loading regardless of success/failure
      }
    };

    fetchData(); // Call the combined function
  }, [location]);



  const handleMarkerPress = (marker: Route) => {
    console.log(marker);



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
          {routes.map((route: Route) => (
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
    map: { ...StyleSheet.absoluteFillObject, flex: 1 },
    markerDetailsContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0, // Stretch to full width
      backgroundColor: 'black',
      padding: 10,
      // Add other styling as needed (shadows, borders, etc.)
    },
  });

  return (
    <View style={styles.container}>
      {renderMap()}
      {selectedMarker && (
        <View style={styles.markerDetailsContainer}>
          <MapMarkerDetails
            routename={selectedMarker.title}
            distance={selectedMarker.distance}
            pace={selectedMarker.pace}
            host_id={selectedMarker.host_id}
            dateTime={selectedMarker.dateTime}
            distanceAway='100'
          />
        </View>
      )}
    </View>
  );
}