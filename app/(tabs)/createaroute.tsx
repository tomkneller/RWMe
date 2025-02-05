import { StyleSheet, Button, TextInput, View } from 'react-native';
import React, { useState } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import { createRoute } from '../db-service';
import { getStartCoordinates, calculateDistances } from '../gpxParsingUtils';

export default function CreateARoute() {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [routeNameText, setRouteNameText] = useState('');

  const [selectedTerrainType, setSelectedTerrainType] = useState();
  const [routeDistance, setRouteDistance] = useState(5);
  const [routeStartLat, setRouteStartLat] = useState(123);
  const [routeStartLong, setRouteStartLong] = useState(456);
  const [date, setDate] = useState(new Date(1598051730000));

  const [routePaceMins, setRoutePaceMins] = useState('00');
  const [routePaceSeconds, setRoutePaceSeconds] = useState('00');

  const onDateChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const handleRouteNameChange = (newRouteName: String) => {
    setRouteNameText(newRouteName); // Update the state with the new text
  };

  const handlePaceMinsChange = (newPaceMins: String) => {
    setRoutePaceMins(newPaceMins);
  };

  const handlePaceSecondsChange = (newPaceSeconds: String) => {
    setRoutePaceSeconds(newPaceSeconds);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  const handleSubmit = () => {
    console.log("handle");

    const submitDate = date.toISOString().slice(0, 19).replace('T', ' ');
    console.log(submitDate);
    createRoute(routeNameText, 1, routePaceMins + ':' + routePaceSeconds, routeStartLat, routeStartLong, submitDate, "currentuser")
  }


  const readGPXRouteDistance = () => {
    //Placeholder TODO: Read the distance of the GPX Route

    // setRouteDistance(5);

    console.log("setting dist");
    console.log(calculateDistances());
  }

  const readGPXRouteStartLoc = () => {
    //Placeholder TODO: Read the start location of GPX Route

    // setRouteStartLat(123);
    // setRouteStartLong(456);

    console.log("setting start loc");
    console.log(getStartCoordinates().lat);
    console.log(getStartCoordinates().lon);
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
      <ThemedText type='title'>Create a new Route</ThemedText>

      {/* TODO: Route Name (mandatory) */}
      <ThemedText type='subtitle'>Event Name</ThemedText>
      <TextInput style={{ backgroundColor: 'white' }} placeholder='Route Name' onChangeText={handleRouteNameChange} value={routeNameText}></TextInput>

      {/* TODO: select gpx file (optional?) 
      should display as a box with select a file option
      */}
      <ThemedText type='subtitle'>Choose a gpx file for the route</ThemedText>
      <Button onPress={() => DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        // type: ["application/gpx", "application/tcx", "application/fit"]
      })}
        title='pick a file'
      />

      <Button title='DEV: GPX Tester Loc' onPress={() => { readGPXRouteStartLoc() }} />
      <Button title='DEV: GPX Tester Dist' onPress={() => { readGPXRouteDistance() }} />

      <ThemedText type='default'>Distance: {calculateDistances()}</ThemedText>
      <ThemedText type='default'>Start Loc: {getStartCoordinates().lat} {getStartCoordinates().lon}</ThemedText>

      {/* TODO: picker for Pace range (mandatory) */}
      <ThemedText type='subtitle'>Select your estimated average pace</ThemedText>
      <View
        style={{
          flexDirection: 'row'
        }}>
        <TextInput style={{ backgroundColor: 'white' }} maxLength={2} inputMode='numeric' placeholder='00' onChangeText={handlePaceMinsChange} value={routePaceMins}></TextInput>
        <ThemedText type='default'>:</ThemedText>
        <TextInput style={{ backgroundColor: 'white' }} maxLength={2} inputMode='numeric' placeholder='00' onChangeText={handlePaceSecondsChange} value={routePaceSeconds}></TextInput>
        <ThemedText type='default'>min/mi</ThemedText>
      </View>

      {/* TODO: Start time (mandatory) - use time picker */}
      <ThemedText type='subtitle'>Time & Date</ThemedText>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <ThemedText>selected: {date.toISOString().slice(0, 19).replace('T', ' ')}</ThemedText>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onDateChange}
          minimumDate={new Date(2025, 6, 1)} //TODO: change to todays date
        />
      )}

      {/* TODO: Terrain Type (app could smart select this based on gpx) */}
      <ThemedText type='subtitle'>Terrain Type</ThemedText>
      <Picker
        style={{
          backgroundColor: 'white'
        }}
        selectedValue={selectedTerrainType}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedTerrainType(itemValue)
        }>
        <Picker.Item label="Trail" value="trail" />
        <Picker.Item label="Road" value="road" />
        <Picker.Item label="Mixed" value="mixed" />

      </Picker>

      <Button title='Create' onPress={() => { handleSubmit() }} />

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
