import { useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '../../components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '../../components/ui/IconSymbol';

export default function GPXParsingTest() {

  const gpxfile =
    `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>

<gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" creator="Oregon 400t" version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd">
  <metadata>
    <link href="http://www.garmin.com">
      <text>Garmin International</text>
    </link>
    <time>2009-10-17T22:58:43Z</time>
  </metadata>
  <trk>
    <name>Example GPX Document</name>
    <trkseg>
      <trkpt lat="47.644548" lon="-122.326897">
        <ele>4.46</ele>
        <time>2009-10-17T18:37:26Z</time>
      </trkpt>
      <trkpt lat="48.644548" lon="-123.326897">
        <ele>4.94</ele>
        <time>2009-10-17T18:37:31Z</time>
      </trkpt>
      <trkpt lat="49.644548" lon="-124.326897">
        <ele>6.87</ele>
        <time>2009-10-17T18:37:34Z</time>
      </trkpt>
      <trkpt lat="149.644548" lon="-124.326897">
        <ele>6.87</ele>
        <time>2009-10-17T18:37:34Z</time>
      </trkpt>
    </trkseg>
  </trk>
</gpx>
`;

  const toRadians = (degrees: number) => {
    return degrees * (Math.PI / 180);
  };

  const [distances, setDistances] = useState([]);
  const [totalDistance, setTotalDistance] = useState(null);
  const [startLat, setRouteStartLat] = useState('0');
  const [startLong, setRouteStartLong] = useState('0');


  var XMLParser = require('react-xml-parser');
  var xml = new XMLParser().parseFromString(gpxfile);

  const getStartCoordinates = () => {
    setRouteStartLat(xml.getElementsByTagName('trkpt')[0].attributes.lat);
    setRouteStartLong(xml.getElementsByTagName('trkpt')[0].attributes.lon);
  }


  const calculateDistances = () => {
    const R = 6371; // Earth's radius in km
    const calculatedDistances = [];
    let total = 0;

    for (let index = 0; index < xml.getElementsByTagName('trkpt').length - 1; index++) {
      const lat1 = xml.getElementsByTagName('trkpt')[index].attributes.lat;
      const lon1 = xml.getElementsByTagName('trkpt')[index].attributes.lon;

      const lat2 = xml.getElementsByTagName('trkpt')[index + 1].attributes.lat;
      const lon2 = xml.getElementsByTagName('trkpt')[index + 1].attributes.lon;

      if (lat1 === '' || lon1 === '' || lat2 === '' || lon2 === '') {
        calculatedDistances.push(NaN);
        continue; // Skip calculation if any input is missing
      }

      const lat1Rad = toRadians(parseFloat(lat1));
      const lon1Rad = toRadians(parseFloat(lon1));
      const lat2Rad = toRadians(parseFloat(lat2));
      const lon2Rad = toRadians(parseFloat(lon2));

      const dlon = lon2Rad - lon1Rad;
      const dlat = lat2Rad - lat1Rad;

      const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c;
      calculatedDistances.push(distance.toFixed(2));
      total += distance;
    }
    setDistances(calculatedDistances);
    setTotalDistance(total.toFixed(2));

    console.log(totalDistance);

  }


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
      <Button
        title='Select GPX file'
      />
      <Button title='Calculate Distance' onPress={calculateDistances}></Button>
      <Button title='Get Start point' onPress={getStartCoordinates}></Button>
      <ThemedText>Total Distance: {totalDistance}</ThemedText>
      <ThemedText>Start Point: Latitude:{startLat} Longitude:{startLong}</ThemedText>
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