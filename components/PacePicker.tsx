import ScrollPicker from "react-native-wheel-scrollview-picker";
import { ThemedText } from './ThemedText';
import { View } from 'react-native';
import { useState } from 'react';

interface PaceType {
    mins: string | undefined;
    secs: string | undefined;
}

interface PacePickerProps {
    onValuesChange: (values: PaceType) => void;
}

export const PacePicker: React.FC<PacePickerProps> = ({ onValuesChange }) => {
    const [selectedPaceMins, setSelectedPaceMins] = useState<string | undefined>("00");
    const [selectedPaceSecs, setSelectedPaceSecs] = useState<string | undefined>("00");

    const values = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

    const handleMinsChange = (updatedMins?: string) => {
        setSelectedPaceMins(updatedMins)

        if (onValuesChange) {
            onValuesChange({ mins: updatedMins, secs: selectedPaceSecs });
        }
    }

    const handleSecsChange = (updatedSecs?: string) => {
        setSelectedPaceSecs(updatedSecs)

        if (onValuesChange) {
            onValuesChange({ mins: selectedPaceMins, secs: updatedSecs });
        }
    }


    return (
        <View style={{ backgroundColor: '#353636', flexDirection: 'row', alignItems: 'center' }}>
            <ScrollPicker
                dataSource={values}
                selectedIndex={1}
                onValueChange={(mins) => {
                    handleMinsChange(mins)

                }}
                wrapperHeight={140}
                wrapperBackground={'transparent'}
                itemHeight={60}
                activeItemTextStyle={{ color: 'white' }}
                highlightColor="#d8d8d8"
                highlightBorderWidth={2}
            />
            <ThemedText>:</ThemedText>
            <ScrollPicker
                dataSource={values}
                selectedIndex={0}
                onValueChange={(secs) => {
                    handleSecsChange(secs)
                }}
                wrapperHeight={140}
                wrapperBackground={'transparent'}
                itemHeight={60}
                activeItemTextStyle={{ color: 'white' }}
                highlightColor="#d8d8d8"
                highlightBorderWidth={2}
            />
        </View >
    );
};
