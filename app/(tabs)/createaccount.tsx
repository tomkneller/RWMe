import { Image, StyleSheet, Platform, TextInput, Button, Alert } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { UserAccount } from '../models';
import { getDBConnection, getUsers, saveUsers, createTable, deleteUser } from '../db-service';
import { UserProfileComponent } from '../UserProfile';
import { createUser } from '../db-service';
import { router } from 'expo-router';
import AuthContext from '../AuthContext';

export default function CreateAccount() {
    const [users, setUsers] = useState<UserAccount[]>([]);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPhone, setNewUserPhone] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserVerifyPassword, setNewUserVerifyPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState(['']);

    const [isLoading, setIsLoading] = useState(false);

    const { login } = useContext(AuthContext); // Access the login function from the context

    const handleCreateAccount = async () => {
        setIsLoading(true); // Show loading indicator

        const errors: string[] = [];

        if (!newUserName) {
            errors.push("Name is required");
        }
        if (!newUserEmail) {
            errors.push("Email address is required");
        }
        if (!validateEmail(newUserEmail)) {
            errors.push("Please enter a valid Email address");
        }
        if (!newUserPhone) {
            errors.push("Phone No. is required");
        }
        if (!validatePhoneNo(newUserPhone)) {
            errors.push("Please enter a valid UK Phone No.");
        }
        if (!newUserPassword) {
            errors.push("Please enter a password");
        }
        if (!newUserVerifyPassword) {
            errors.push("Please repeat your password");
        }
        if (!verifyPasswordMatch(newUserPassword, newUserVerifyPassword)) {
            errors.push("Passwords should match");
        }

        console.log(errors);

        console.log(newUserPhone);


        if (errors.length > 0) {
            setValidationErrors(errors)

            Alert.alert("Theres a problem", errors.toString())

            return;
        }

        try {

            createUser(newUserName, newUserEmail, newUserPhone, newUserPassword)

            const name = newUserName;
            const password = newUserPassword;

            const userData = { name, password };

            await login(userData); // Call the login function
            router.push("/(tabs)/profile"); // Navigate after successful login

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

    const validateEmail = (email: string) => {
        //Regex for email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const validatePhoneNo = (phoneNo: string) => {
        //Regex for valid uk phone number
        const regex = /^(\S+)?((((\+44\s?([0–6]|[8–9])\d{3} | \(?0([0–6]|[8–9])\d{3}\)?)\s?\d{3}\s?(\d{2}|\d{3}))|((\+44\s?([0–6]|[8–9])\d{3}|\(?0([0–6]|[8–9])\d{3}\)?)\s?\d{3}\s?(\d{4}|\d{3}))|((\+44\s?([0–6]|[8–9])\d{1}|\(?0([0–6]|[8–9])\d{1}\)?)\s?\d{4}\s?(\d{4}|\d{3}))|((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4})))$/;
        return regex.test(phoneNo)
    }

    function verifyPasswordMatch(password: string, verificationPassword: string): boolean {

        if (password != verificationPassword) {
            console.log("password doesnt match");
            return false;
        } else {
            console.log("password match");
            return true;
        }


    }

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
                <TextInput
                    value={newUserName}
                    onChangeText={text => setNewUserName(text)}
                    style={styles.whiteBackground}
                    placeholder='Full Name'
                />
                <TextInput
                    keyboardType='email-address'
                    value={newUserEmail}
                    onChangeText={text => setNewUserEmail(text)}
                    style={styles.whiteBackground}
                    placeholder='Email'
                />
                <TextInput
                    keyboardType='number-pad'
                    value={newUserPhone}
                    onChangeText={no => setNewUserPhone(no)}
                    style={styles.whiteBackground}
                    placeholder='Phone No.'
                    autoComplete='tel'
                />
                <TextInput
                    secureTextEntry
                    passwordRules={"required: upper; minlength: 8;"}
                    value={newUserPassword}
                    onChangeText={password => setNewUserPassword(password)}
                    style={styles.whiteBackground}
                    placeholder='Password (min 8 characters)'
                />
                <TextInput
                    secureTextEntry
                    passwordRules={"required: upper; minlength: 8;"}
                    value={newUserVerifyPassword}
                    onChangeText={password => setNewUserVerifyPassword(password)}
                    style={styles.whiteBackground}
                    placeholder='Repeat Password'
                />
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
