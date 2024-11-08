import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, Pressable } from 'react-native';
import {Supplier} from "@/types/type.d";
import SupplierSelector from "@/components/SupplierSelector";

const event: Supplier[] = [
    {
        name: "string",
        description: "string",
        url_image: "string",
        type: "string",
        email: "string",
    }
];

const Events: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string>(''); // Estado para el tipo seleccionado

    const handleTypeSelect = (type: string) => {
        setSelectedType(type); // Actualiza el tipo seleccionado
    };

    return (
      <View style={styles.container}>
          <Text style={styles.header}>Add Supplier</Text>

          {/* Botón Group */}
          <View style={styles.buttonGroup}>
              {["Decoration", "Entertainment", "Alimentation"].map((type) => (
                <Pressable
                  key={type}
                  onPress={() => handleTypeSelect(type)}
                  style={[
                      styles.button,
                      selectedType === type && styles.selectedButton // Aplica estilo si está seleccionado
                  ]}
                >
                    <Text style={selectedType === type ? styles.selectedButtonText : styles.buttonText}>
                        {type}
                    </Text>
                </Pressable>
              ))}
          </View>

          {/* Lista de Suppliers */}
          <ScrollView>
              {event.map((e, index) => (
                <SupplierSelector
                  supplier={e}
                />
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
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: '#e0e0e0',
    },
    selectedButton: {
        backgroundColor: '#007BFF',
    },
    buttonText: {
        color: '#333',
        fontWeight: 'bold',
    },
    selectedButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Events;
