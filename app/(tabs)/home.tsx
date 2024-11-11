import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProviderCard from '@/components/ProviderCard'
import {useUserStore} from "@/store";
import {Supplier} from "@/types/type.d";
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
    const { name } = useUserStore();
    const [ suppliers, setSuppliers ] = useState<Supplier[]>([]);
    const { t } = useTranslation();

    const getSuppliers = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}getsuppliers`);
            let data = await response.json();
            return data.data;
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    };

    const fetchSuppliers = async () => {
        const valor: Supplier[] = await getSuppliers();
        setSuppliers(valor);
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('welcome')} {name}</Text>
            <Text style={styles.subtitle}>{t('subtitle')}</Text>
            <FlatList
                showsHorizontalScrollIndicator={true}
                data={suppliers}
                keyExtractor={(item) => item.email}
                renderItem={({ item }) => (
                    <ProviderCard
                        name={item.name}
                        description={item.description}
                        image={item.url_image}
                        type={item.type}
                    />
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
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

