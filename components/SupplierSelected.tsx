import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {Supplier} from "@/types/type.d";

function SupplierSeled({ supplier }: { supplier: Supplier }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpansion = () => {
    setIsExpanded(prevState => !prevState);
  };
  const supplier_email = supplier.email || '';
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{supplier.name}</Text>
      <Text style={styles.type}>Category: {supplier.type}</Text>

      <TouchableOpacity onPress={toggleExpansion}>
        <Text style={styles.toggleButton}>{isExpanded ? 'Ver menos' : 'Ver más'}</Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.details}>
          <Text><Text style={styles.bold}>Description:</Text>{supplier.description}</Text>
          <Image source={{ uri: supplier.url_image }} style={styles.image} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleButton: {
    color: '#007bff',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  details: {
    marginTop: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  type: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SupplierSeled;



