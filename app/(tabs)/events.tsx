import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import EventCard from '@/components/EventCard';

const event = [
    {
        id: '1',
        email_user: 'jojashley@gmail.com',
        type: 'Boda',
        date: '07/11/2024',
        start_time: '17:00',
        end_time: '22:00',
        ubication: 'En la catedral, San Carlos',
        suppliers: [
            { email_supplier: "holis", state: true },
            { email_supplier: "hello", state: true },
            { email_supplier: "hi", state: true }
        ]
    },
    {
        id: '2',
        email_user: 'juanperez@yahoo.com',
        type: 'Cumpleaños',
        date: '14/11/2024',
        start_time: '15:00',
        end_time: '19:00',
        ubication: 'En el salón del centro de eventos La Plaza',
        suppliers: [
            { email_supplier: "aaaa", state: true },
            { email_supplier: "bbbb", state: false },
            { email_supplier: "cccc", state: true }
        ]
    },
    {
        id: '3',
        email_user: 'mariagomez@gmail.com',
        type: 'Aniversario',
        date: '20/11/2024',
        start_time: '20:00',
        end_time: '23:00',
        ubication: 'Restaurante El Lago Azul',
        suppliers: [
            { email_supplier: "dddd", state: true },
            { email_supplier: "eeee", state: true },
            { email_supplier: "ffff", state: false }
        ]
    },
    {
        id: '4',
        email_user: 'carlosromero@outlook.com',
        type: 'Fiesta de empresa',
        date: '30/11/2024',
        start_time: '18:00',
        end_time: '02:00',
        ubication: 'Hotel Plaza Real',
        suppliers: [
            { email_supplier: "gggg", state: true },
            { email_supplier: "hhhh", state: true },
            { email_supplier: "iiii", state: true }
        ]
    },
    {
        id: '5',
        email_user: 'laurapadilla@hotmail.com',
        type: 'Concierto',
        date: '10/12/2024',
        start_time: '22:00',
        end_time: '02:00',
        ubication: 'Estadio Municipal',
        suppliers: [
            { email_supplier: "jjjj", state: true },
            { email_supplier: "kkkk", state: false },
            { email_supplier: "llll", state: true }
        ]
    }
];

const events: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Mis eventos</Text>
            <ScrollView>
                {event.map(e => (
                    <EventCard key={e.id} event={e} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
