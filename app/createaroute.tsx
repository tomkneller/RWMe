import { StyleSheet, Button, TextInput } from 'react-native';
import React, { useState } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';

export default function CreateARoute() {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectedTerrainType, setSelectedTerrainType] = useState();

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
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
      <TextInput style={{ backgroundColor: 'white' }} placeholder='Route Name'></TextInput>

      {/* TODO: select gpx file (optional?) 
      should display as a box with select a file option
      */}
      <ThemedText type='subtitle'>Choose a gpx file for the route</ThemedText>
      <Button onPress={() => DocumentPicker.getDocumentAsync({ type: ["application/gpx", "application/tcx", "application/fit"] })} title='pick a file' />


      {/* TODO: picker for Pace range (mandatory) */}
      <ThemedText type='subtitle'>Select your estimated average pace</ThemedText>
      <ThemedText type='default'>[pace range picker here]</ThemedText>

      {/* TODO: Start time (mandatory) - use time picker */}
      <ThemedText type='subtitle'>Time & Date</ThemedText>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <ThemedText>selected: {date.toLocaleString()}</ThemedText>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
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
