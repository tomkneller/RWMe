import { Image, StyleSheet, Platform, TextInput, Button, Alert } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useCallback, useEffect, useState } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { UserAccount } from '../models';
import { getDBConnection, getUsers, saveUsers, createTable, deleteUser } from '../db-service';
import { UserProfileComponent } from '../UserProfile';
import { createUser } from '../db-service';
import { router } from 'expo-router';

export default function CreateAccount() {
    const [users, setUsers] = useState<UserAccount[]>([]);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPhone, setNewUserPhone] = useState(0);
    const [newUserPassword, setNewUserPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const handleCreateAccount = async () => {
        setIsLoading(true); // Show loading indicator

        try {
            router.push("/(tabs)/profile"); // Navigate after successful login

            createUser(newUserName, newUserEmail, newUserPhone, newUserPassword)

            //await login(userData); // Call the login function
        } catch (error) {
            console.error("Login Error:", error);
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteItem = async (id: number) => {
        try {
            const db = await getDBConnection();
            await deleteUser(db, id);
            const updatedUsers = users.filter(user => user.id !== id); // Filter users array
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Create Account</ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <TextInput value={newUserName} onChangeText={text => setNewUserName(text)} style={styles.whiteBackground} placeholder='Full Name' />
                <TextInput keyboardType='email-address' value={newUserEmail} onChangeText={text => setNewUserEmail(text)} style={styles.whiteBackground} placeholder='Email' />
                <TextInput keyboardType='number-pad' onChangeText={no => setNewUserPhone(Number(no))} style={styles.whiteBackground} placeholder='Phone No.' />
                <TextInput passwordRules={"required: upper; minlength: 8;"} value={newUserPassword} onChangeText={password => setNewUserPassword(password)} style={styles.whiteBackground} />
                <Button
                    title='Create Account'
                    onPress={handleCreateAccount}
                />
            </ThemedView>
            <ThemedView>
                {users.map((user) => (
                    <UserProfileComponent key={user.id} userProfile={user} deleteItem={deleteItem} />
                ))}
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    whiteText: {
        color: 'white',
    },
    whiteBackground: {
        backgroundColor: 'white',
    }
});
