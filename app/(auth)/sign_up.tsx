import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {Link, Redirect} from "expo-router"; // Asegúrate de importar Link

const SignUpScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [name, setName] = useState(''); // Nuevo estado para el nombre
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignedUp, setIsSignedUp] = useState(false);


    const handleSignUp = () => {
        console.log('Registrando con', name, email, password);
        setIsSignedUp(true);
    };

    // Redirecciona si el usuario ha iniciado sesión
    if (isSignedUp) {
        return <Redirect href="/(tabs)/home" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrarse</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />
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
            <Button title="Registrarse" onPress={handleSignUp} />
            <Link href="/(auth)/sign_in">
                <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white', // Asegúrate de que el fondo sea blanco
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

export default SignUpScreen;
