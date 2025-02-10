import { useContext, useState } from "react";
import { Button, TextInput, View, StyleSheet, ActivityIndicator } from "react-native";
import AuthContext from '../AuthContext';
import { router } from 'expo-router';


const LoginScreen = ({ navigation }) => {  // You might receive the navigation prop
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // For loading indicator
    const { login } = useContext(AuthContext); // Access the login function from the context

    const { user } = useContext(AuthContext);

    const handleLogin = async () => {
        setIsLoading(true); // Show loading indicator

        try {
            const userData = { name, password }; // Prepare user data
            await login(userData); // Call the login function from the context
            router.push("/(tabs)/profile"); // Navigate after successful login
        } catch (error) {
            console.error("Login Error:", error);
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false);
        }

        console.log(user);

    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={setUsername}
                value={name}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} disabled={isLoading} />

            {isLoading && <ActivityIndicator size="small" color="#0000ff" />}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default LoginScreen;