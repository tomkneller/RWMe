import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import * as SecureStore from 'expo-secure-store'; // For storing/retrieving user info
import defaultProfileImage from '@/assets/images/avatar.png';

const ProfileHeaderIcon = () => {
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        setProfileImage(defaultProfileImage); // fallback on error

    }, []);

    const handleProfilePress = () => {
        navigation.navigate('profile'); // Replace 'Profile' with your profile screen name
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleProfilePress}>
            <Image
                source={profileImage}
                style={styles.profileImage}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 15, // Circular image
    },
});

export default ProfileHeaderIcon;