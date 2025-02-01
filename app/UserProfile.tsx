import React from 'react';
import { UserAccount } from './models';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';

/**
 * Placeholder Component for Displaying newly created user profile details 
 * */
export const UserProfileComponent: React.FC<{
    userProfile: UserAccount;
    deleteItem: Function;
}> = ({ userProfile: { id, name, email, phoneNo } }) => {

    return (
        <ThemedView>
            <ThemedText type='subtitle' style={{
                color: 'red'
            }}>{name}
            </ThemedText>
            <ThemedText id='email'>Email: {email}</ThemedText>
            <ThemedText id='phoneNo'>Phone: {phoneNo}</ThemedText>
        </ThemedView>
    );
};