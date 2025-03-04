import { StyleSheet, Button, TextInput, View, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import { createRoute } from '../db-service';
import { getStartCoordinates, calculateDistances } from '../gpxParsingUtils';
import { router } from 'expo-router';
import AuthContext from '../AuthContext';
import { PacePicker } from '../../components/PacePicker';

interface PaceState {
  mins: string | undefined;
  secs: string | undefined;
}


export default function CreateARoute() {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [routeNameText, setRouteNameText] = useState('');

  const [selectedTerrainType, setSelectedTerrainType] = useState("");
  let [routeDistance, setRouteDistance] = useState(0);
  let [routeStartLat, setRouteStartLat] = useState(0);
  let [routeStartLong, setRouteStartLong] = useState(0);
  const [date, setDate] = useState<Date>(new Date());
  const [fileContent, setFileContent] = useState('');
  const [validationErrors, setValidationErrors] = useState(['']);
  const [showPacePickerModal, setShowPacePickerModal] = useState(false);
  const [selectedPaces, setSelectedPaces] = useState<PaceState>({ mins: "01", secs: "00" });

  const [additionalDetails, setAdditionalDetails] = useState('');

  const [routePaceMins, setRoutePaceMins] = useState<string | undefined>('01');
  const [routePaceSeconds, setRoutePaceSeconds] = useState<string | undefined>('00');

  const { user } = useContext(AuthContext);
  let accountName = "placeholder";

  if (user) {
    accountName = user.name;
  }

  useEffect(() => {
    if (fileContent) { // Check if fileContent has been updated (is not null)
      updateStartDist();
    }
  }, [fileContent]);

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate ?? new Date());
  };

  const handleRouteNameChange = (newRouteName: string) => {
    setRouteNameText(newRouteName); // Update the state with the new text
  };

  const handlePaceMinsChange = (newPaceMins: string) => {
    setRoutePaceMins(newPaceMins);
  };

  const handlePaceSecondsChange = (newPaceSeconds: string) => {
    setRoutePaceSeconds(newPaceSeconds);
  };

  const handlePaceChange = (newValues: { mins: string | undefined, secs: string | undefined }) => {
    // setSelectedPaces(newValues);
    setRoutePaceMins(newValues.mins);
    setRoutePaceSeconds(newValues.secs);

  }

  const handleDetailsChange = (newAdditionalDetails: string) => {
    setAdditionalDetails(newAdditionalDetails); // Update the state with the new text
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const showPacePicker = () => {
    setShowPacePickerModal(true)
  }


  const handleSubmit = async () => {
    const errors: string[] = [];

    const startDate = date.toISOString().slice(0, 19).replace('T', ' ');

    if (!routeNameText) {
      errors.push("Route name is required");
    }
    if (!fileContent) {
      errors.push("Route is required");
    }
    if (!routePaceMins || routePaceMins == '00') {
      errors.push("Valid Pace is Required");
    }
    if (!startDate) {
      errors.push("Valid start date and time required");
    }
    if (!accountName) {
      errors.push("You need to be logged in.");
    }


    console.log(errors);

    if (errors.length > 0) {
      setValidationErrors(errors)

      Alert.alert("Theres a problem", errors.toString())

      return;
    }

    //TODO: Currently using current users name for accountname, should probably pass name from ID
    await createRoute(routeNameText, routeDistance, routePaceMins + ':' + routePaceSeconds, routeStartLat, routeStartLong, startDate, accountName, additionalDetails, fileContent, selectedTerrainType)

    router.push("/"); // Navigate home after successful route creation
  }

  const readGPXRouteDistance = () => {
    setRouteDistance(calculateDistances(fileContent));
  }

  const readGPXRouteStartLoc = () => {
    setRouteStartLat(getStartCoordinates(fileContent).lat);
    setRouteStartLong(getStartCoordinates(fileContent).lon);
  }

  async function getDocumentAsString() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: ["application/octet-stream"]
      });

      //Checking if file selection was not cancelled
      if (!result.canceled) {
        const successResult = result as DocumentPicker.DocumentPickerSuccessResult;
        const selectedFileContent = await fetch(successResult.assets[0].uri).then(r => r.text());
        var XMLParser = require('react-xml-parser');
        var xml = new XMLParser().parseFromString(selectedFileContent);
        setFileContent(xml);
      }
      else {
        console.log("file selection cancelled");

      }
    } catch (error) {
      console.log("errored out", error);
    }
  }

  function updateStartDist() {
    readGPXRouteStartLoc();
    readGPXRouteDistance();
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
      <Button onPress={getDocumentAsString}
        title='pick a file'
      />
      <ThemedText type='default'>Distance: {routeDistance}</ThemedText>
      <ThemedText type='default'>Start Loc: {routeStartLat} {routeStartLong}</ThemedText>

      {/* Picker for estimated average pace */}
      <ThemedText type='subtitle'>Select your estimated average pace</ThemedText>
      <View>
        <PacePicker onPaceChange={handlePaceChange} />
      </View>
      <View
        style={{
          flexDirection: 'row'
        }}>
        <ThemedText>{routePaceMins} : {routePaceSeconds}</ThemedText>
        <ThemedText type='default'> min/km</ThemedText></View>



      {/* TODO: Start time (mandatory) - use time picker */}
      <ThemedText type='subtitle'>Time & Date</ThemedText>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <ThemedText>selected: {date.toISOString().slice(0, 19).replace('T', ' ')}</ThemedText>
      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onDateChange}
          minimumDate={new Date()}
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
      <TextInput style={{
        backgroundColor: 'white'
      }}
        multiline
        placeholder='any additional details?'
        maxLength={512}
        onChangeText={handleDetailsChange}
        value={additionalDetails}
      />
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
