import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import i18next from "@/services/i18next";
import { useTranslation } from "react-i18next";

const profile: React.FC = () => {
    const [name, setName] = useState<string>("Juan Pérez");
    const [email, setEmail] = useState<string>("juan.perez@example.com");

    const { t } = useTranslation();

    const changeLanguage = (lng: string | undefined) => {
        i18next.changeLanguage(lng);
    };

    //Mikel esta es la funcion que tiene que cambiar para que muestre el nombre y el email bien
    const handleProfileData = () => {
        setName("Ana García");
        setEmail("ana.garcia@example.com");
    };

    useEffect(() => {
        handleProfileData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('profile')}</Text>

            <Text style={styles.label}>{t('name')}</Text>
            <Text style={styles.textDisplay}>{name}</Text>

            <Text style={styles.label}>{t('email')}</Text>
            <Text style={styles.textDisplay}>{email}</Text>

            <Text style={styles.label}>{t('language')}</Text>

            <View style={styles.buttonContainer}>
                <Button title={t('english')} onPress={() => changeLanguage('en')} />
                <Button title={t('spanish')} onPress={() => changeLanguage('es')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f4f4f4",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
        marginBottom: 5,
        alignSelf: "flex-start",
        marginLeft: 10,
    },
    textDisplay: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#e9e9e9",
        fontSize: 16,
        marginBottom: 20,
        color: "#555",
    },
    buttonContainer: {
        marginTop: 20,
        width: "100%",
        justifyContent: "space-around",
        flexDirection: "row",
    },
});

export default profile;
