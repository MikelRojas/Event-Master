import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Redirect, Link } from "expo-router"; // Asegúrate de importar Link

const SignInScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);

    const handleSignIn = () => {
        console.log('Iniciando sesión con', email, password);
        setIsSignedIn(true);
    };

    if (isSignedIn) {
        return <Redirect href="/(tabs)/home" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Iniciar" onPress={handleSignIn} />
            <Link href="/(auth)/sign_up">
                <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    link: {
        marginTop: 20,
        color: 'blue',
        textAlign: 'center',
    },
});

export default SignInScreen;
