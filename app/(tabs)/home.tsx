import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProviderCard from '@/components/ProviderCard'
import {useUserStore} from "@/store";



const providers = [
    {
        id: '1',
        name: 'Catering Delicioso',
        description: 'Proveedores de comida gourmet para tu evento.',
        image: 'https://example.com/catering.jpg', // Cambia por una URL real
    },
    {
        id: '2',
        name: 'Decoraciones Fantásticas',
        description: 'Decoraciones únicas para cualquier ocasión.',
        image: 'https://example.com/decoracion.jpg', // Cambia por una URL real
    },
    {
        id: '3',
        name: 'Música en Vivo',
        description: 'Músicos profesionales para amenizar tu evento.',
        image: 'https://example.com/musica.jpg', // Cambia por una URL real
    },
    // Agrega más proveedores según sea necesario
];

export default function HomeScreen() {
    const { name } = useUserStore();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido {name}</Text>
            <Text style={styles.subtitle}>Lista de posibles proveedores:</Text>
            <FlatList
                data={providers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProviderCard
                        name={item.name}
                        description={item.description}
                        image={item.image}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 16,
    },
});

