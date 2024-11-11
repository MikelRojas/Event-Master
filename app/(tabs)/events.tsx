import React, {useEffect, useState} from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import EventCard from '@/components/EventCard';
import {Event} from "@/types/type.d";
import {useUserStore} from "@/store";
import { useTranslation } from 'react-i18next';

const events: React.FC = () => {
    const [myEvents, setMyEvents] = useState<Event[]>([]);
    const {email} = useUserStore();
    const { t } = useTranslation();

    const getUser = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}get_user_events?email_user=${email}`);
            const data = await response.json();
            setMyEvents(data.data);
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    };

    useEffect(() => {
        getUser();
    }, [myEvents,email]);
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{t('my_events')}</Text>
            <ScrollView>
                {myEvents.map(e => (
                    <EventCard key={e.id} event={e} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    }
});

export default events;
