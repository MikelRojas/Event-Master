import React, { useState } from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Button, Pressable} from "react-native";
import { Calendar } from 'react-native-calendars';
import MapView, { Marker } from 'react-native-maps';
import { Alert } from 'react-native';
import {Href, router} from "expo-router";
import {useSupplierStore, useUserStore} from "@/store";
import SupplierSelected from "@/components/SupplierSelected";
import { useTranslation } from 'react-i18next';

const createEvents = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [details, setDetails] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [locationDetails, setLocationDetails] = useState('');
    const [location, setLocation] = useState({ latitude: 10.3450, longitude: -84.5012 }); // Ciudad Quesada
    const {suppliers,clearSuppliers} = useSupplierStore();
    const {email} = useUserStore();
    const { t } = useTranslation();

    const handleDayPress = (day: { dateString: React.SetStateAction<string>; }) => {
        setSelectedDate(day.dateString);
        setShowCalendar(false);
    };

    const handleCreateEvent = async () => {
      if (!selectedDate || !details || !startTime || !endTime || !locationDetails) {
        Alert.alert("Error", "Por favor, completa todos los campos.");
        return;
      }

      if (suppliers.length === 0) {
        Alert.alert("Error", "Por favor, agrega al menos un proveedor.");
        return;
      }
      console.log(`${selectedDate},${startTime},${endTime},${locationDetails},${locationDetails}`);
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}create_event`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email_user: email,
            date_event: selectedDate,
            details: details,
            start_time: startTime,
            end_time: endTime,
            ubication: locationDetails,
          }),
        });

        const result = await response.json();
        if(result.state){
          const id = result.data.event_id;
          console.log(id);
          suppliers.map(async (supplier) => {
            await fetch(`${process.env.EXPO_PUBLIC_API_URL}create_contracted_service`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id_event: id,
                email_supplier: supplier.email,
                state: false,
              }),
            });
          })
        }
        Alert.alert("Exito", "Evento creado.");
      } catch (error) {
        console.error('Error:', error);
      }
      setSelectedDate('');
      setDetails('');
      setStartTime('');
      setEndTime('');
      setLocationDetails('');
      clearSuppliers();
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{t("create_event")}</Text>
            <Text style={styles.subtitle}>{t("event_type")}</Text>
            <TextInput
                style={styles.input}
                placeholder={t("event_type")}
                placeholderTextColor="#888"
                onChangeText={setDetails}
            />
            <Text style={styles.subtitle}>{t("select_day")}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setShowCalendar(true)}>
                <Text style={styles.buttonText}>{selectedDate ? selectedDate : t("open_calendar")}</Text>
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

            <Text style={styles.subtitle}>{t("start_time")}</Text>
            <TextInput
                style={styles.input}
                placeholder="HH:MM"
                placeholderTextColor="#888"
                value={startTime}
                onChangeText={setStartTime}
            />

            <Text style={styles.subtitle}>{t("end_time")}</Text>
            <TextInput
                style={styles.input}
                placeholder="HH:MM"
                placeholderTextColor="#888"
                value={endTime}
                onChangeText={setEndTime}
            />

            <Text style={styles.subtitle}>{t("location_details")}</Text>
            <TextInput
                style={styles.input}
                placeholder={t("location_details")}
                placeholderTextColor="#888"
                value={locationDetails}
                onChangeText={setLocationDetails}
            />

            <Text style={styles.subtitle}>{t("location_map")}</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 10.3450,
                    longitude: -84.5012,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={(e) => setLocation(e.nativeEvent.coordinate)}
            >
                <Marker coordinate={location} />
            </MapView>

          <View style={styles.container}>
            <Text style={styles.subtitle}>{t("my_suppliers")}</Text>
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
                  {t("add_supplier")}
              </Text>
            </Pressable>

            <TouchableOpacity style={styles.buttonCreate} onPress={handleCreateEvent}>
                <Text style={styles.buttonText}>{t("create_event_and_quote")}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: 'white',
        marginTop: 10,
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
  buttonCreate: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    marginTop: 10,
    marginBottom: 20,
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
