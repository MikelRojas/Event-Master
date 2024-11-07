import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Supplier {
  email_supplier: string;
  state: boolean;
}

interface Event {
  id: string;
  email_user: string;
  type: string;
  date: string;
  start_time: string;
  end_time: string;
  ubication: string;
  suppliers: Supplier[];
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(prevState => !prevState);
  };

  return (
      <View style={styles.card}>
        <Text style={styles.title}>{event.type}</Text>
        <Text>{event.date}</Text>

        <TouchableOpacity onPress={toggleExpansion}>
          <Text style={styles.toggleButton}>{isExpanded ? 'Ver menos' : 'Ver más'}</Text>
        </TouchableOpacity>

        {isExpanded && (
            <View style={styles.details}>
              <Text><Text style={styles.bold}>Ubicación:</Text> {event.ubication}</Text>
              <Text><Text style={styles.bold}>Hora de inicio:</Text> {event.start_time}</Text>
              <Text><Text style={styles.bold}>Hora de finalización:</Text> {event.end_time}</Text>

              <Text style={styles.suppliersTitle}>Proveedores:</Text>
              <View style={styles.table}>
                {event.suppliers.map((supplier, index) => (
                    <View style={styles.tableRow} key={index}>
                      <Text style={styles.tableCell}>{supplier.email_supplier}</Text>
                      <Text style={styles.tableCell}>
                        {supplier.state ? 'Aceptado' : 'Pendiente o rechazado'}
                      </Text>
                    </View>
                ))}
              </View>
            </View>
        )}
      </View>
  );
};

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
    textAlign: 'center',
  },
  details: {
    marginTop: 10,
  },
  suppliersTitle: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  table: {
    marginTop: 5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  tableCell: {
    fontSize: 14,
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  }
});

export default EventCard;
