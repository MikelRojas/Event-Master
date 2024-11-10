import React, {useEffect, useState} from 'react';
import { ScrollView, View, StyleSheet, Text, Pressable } from 'react-native';
import {Supplier} from "@/types/type.d";
import SupplierSelector from "@/components/SupplierSelector";
import {useSupplierStore, useUserStore} from "@/store";

const Events: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string>(''); // Estado para el tipo seleccionado
    const [ suppliersS, setSuppliers ] = useState<Supplier[]>([]);
    const [ filteredSuppliers, setFilteredSuppliers ] = useState<Supplier[]>([]);
    const {suppliers} = useSupplierStore();
    const handleTypeSelect = (type: string) => {
        setSelectedType(type);
    };


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

    const removeExistingSuppliers = (receivedSuppliers: Supplier[]) => {
        setSuppliers((currentSuppliers) =>
          currentSuppliers.filter(
            (supplier) =>
              !receivedSuppliers.some(
                (received) => received.email === supplier.email
              )
          )
        );
    };

    const fetchSuppliers = async () => {
        const valor: Supplier[] = await getSuppliers();
        setSuppliers(valor);
        setFilteredSuppliers(valor);
        removeExistingSuppliers(suppliers);
        setSelectedType("Decoration");
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    useEffect(() => {
        setFilteredSuppliers(
          suppliersS.filter(
            (supplier) => supplier.type.toLowerCase() === selectedType.toLowerCase()
          )
        );
    }, [selectedType, suppliersS]); // Vuelve a filtrar cuando `selectedType` o `suppliersS` cambien


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

          <ScrollView>
              {filteredSuppliers.map((e) => (
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
        marginTop: 30,
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
