import { Image, StyleSheet, Platform, TextInput, Button } from 'react-native';
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

export default function CreateAccount() {
    const [users, setUsers] = useState<UserAccount[]>([]);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPhone, setNewUserPhone] = useState(0);  // Make sure this is used somewhere, even if commented out

    const loadDataCallback = useCallback(async () => {
        try {
            const db = await getDBConnection();
            await createTable(db);
            const storedUsers = await getUsers(db);
            if (storedUsers.length) {
                console.log("stored users");

                setUsers(storedUsers);
            } else {
                const initUsers = [{ id: 1, name: 'go to shop', email: 'test@yahoo.com', phoneNo: 12391231 }]; // Start ID at 1
                await saveUsers(db, initUsers);
                setUsers(initUsers);
            }
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }, []);

    useEffect(() => {
        loadDataCallback();
    }, [loadDataCallback]);

    const addUser = async () => {
        if (!newUserName.trim()) return;

        try {
            const db = await getDBConnection();

            // Get the next available ID (important for avoiding conflicts)
            const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;  // Start at 1
            const newUser: UserAccount = {
                id: nextId,
                name: newUserName,
                email: newUserEmail,
                phoneNo: newUserPhone, // Use the phone number state here
            };

            const newUsers = [...users, newUser];
            setUsers(newUsers);
            await saveUsers(db, [newUser]); // Save only the new user

            setNewUserName('');
            setNewUserEmail(''); // Clear email input as well
            setNewUserPhone(0); // Clear phone input if used

        } catch (error) {
            console.error("Error adding user:", error);
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
                <Button
                    title='Create Account'
                    onPress={addUser}
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
