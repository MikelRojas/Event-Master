import React, { useState } from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Button, Pressable} from "react-native";
import { Calendar } from 'react-native-calendars';
import MapView, { Marker } from 'react-native-maps';
import {Href, Redirect, router} from "expo-router";
import EventCard from "@/components/EventCard";
import SupplierSelector from "@/components/SupplierSelector";
import {useSupplierStore} from "@/store";
import SupplierSelected from "@/components/SupplierSelected";

const createEvents = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [locationDetails, setLocationDetails] = useState('');
    const [location, setLocation] = useState({ latitude: 10.3450, longitude: -84.5012 }); // Ciudad Quesada
    const [providers, setProviders] = useState('');
    const {suppliers} = useSupplierStore();

    const handleDayPress = (day: { dateString: React.SetStateAction<string>; }) => {
        setSelectedDate(day.dateString);
        setShowCalendar(false);
    };

    const handleCreateEvent = () => {
      console.log(`${selectedDate},${startTime},${endTime},${locationDetails},${locationDetails}`);
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Crear Evento</Text>
            <Text style={styles.subtitle}>Tipo de evento</Text>
            <TextInput
                style={styles.input}
                placeholder="Escribe aquí el tipo de evento"
                placeholderTextColor="#888"
            />
            <Text style={styles.subtitle}>Escoge el día de tu evento</Text>
            <TouchableOpacity style={styles.button} onPress={() => setShowCalendar(true)}>
                <Text style={styles.buttonText}>{selectedDate ? selectedDate : 'Abrir Calendario'}</Text>
            </TouchableOpacity>
            {showCalendar && (
                <View style={styles.calendarContainer}>
                    <Calendar
                        onDayPress={handleDayPress}
                        markedDates={{
                            [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
                        }}
                    />
                </View>
            )}

            <Text style={styles.subtitle}>Hora de inicio</Text>
            <TextInput
                style={styles.input}
                placeholder="HH:MM"
                placeholderTextColor="#888"
                value={startTime}
                onChangeText={setStartTime}
            />

            <Text style={styles.subtitle}>Hora de finalización</Text>
            <TextInput
                style={styles.input}
                placeholder="HH:MM"
                placeholderTextColor="#888"
                value={endTime}
                onChangeText={setEndTime}
            />

            <Text style={styles.subtitle}>Detalles de la ubicación</Text>
            <TextInput
                style={styles.input}
                placeholder="Escribe la ubicación aquí"
                placeholderTextColor="#888"
                value={locationDetails}
                onChangeText={setLocationDetails}
            />

            <Text style={styles.subtitle}>Ubicación en el mapa</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 10.3450, // Ciudad Quesada
                    longitude: -84.5012,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={(e) => setLocation(e.nativeEvent.coordinate)}
            >
                <Marker coordinate={location} />
            </MapView>

          <View style={styles.container}>
            <Text style={styles.subtitle}>My Suppliers</Text>
            <ScrollView>
              {suppliers.map((e, index) => (
                <SupplierSelected
                  supplier={e}
                />
              ))}
            </ScrollView>
          </View>

            <Pressable
              onPress={()=>{
                router.push("/select_supplier" as Href);
              }}
              style={[
                styles.button,
              ]}
            >
              <Text style={styles.buttonText}>
                Add Supplier
              </Text>
            </Pressable>

            <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
                <Text style={styles.buttonText}>Crear evento y cotizar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'left',
        width: '100%',
    },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    marginTop: 10,
  },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%',
        marginBottom: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    calendarContainer: {
        marginTop: 16,
        width: '100%',
    },
    map: {
        width: '100%',
        height: 200,
        marginTop: 16,
        borderRadius: 5,
    },
});

export default createEvents;
