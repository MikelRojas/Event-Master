import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Redirect, Link } from "expo-router";
import {useUserStore} from "@/store";
import {UserData} from "@/types/type.d";


const SignInScreen: React.FC = () => {
    const [emailLogIn, setEmail] = useState('');
    const [passwordIn, setPassword] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const {setUser,email,password} = useUserStore();
    const [userData, setUserData] = useState<UserData|null>(null);

    const handleSignIn = async () => {
        //console.log('Iniciando sesión con', emailLogIn, password);
        getUser(emailLogIn);
        //getUser("mik@gmail.com");
        if(userData){
            if(userData.password == passwordIn){
                setUser({email: userData.email, name: userData.name, password: userData.password});
                setIsSignedIn(true);
            }
        }
    };


    const getUser = async (email:string) => {
        try {
            const response = await fetch(`http://192.168.0.15:5000/getuser?email=${email}`);
            const data = await response.json();
            setUserData(data.data);
            return data;
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    };

    useEffect(() => {
        if(email!=""){
            setEmail(email);
            setPassword(password);
            handleSignIn()
        }
    }, []);

    if (isSignedIn) {
        return <Redirect href="/(tabs)/home" />;
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo"
                value={emailLogIn}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={passwordIn}
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
