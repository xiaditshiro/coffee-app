// OrderHistoryScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


// Interface untuk tampilan history order
interface OrderHistoryItem {
  id: string;
  items: string[];
  total: number;
  date: string;
  status: 'Completed' | 'Ready for Pickup';
}

const OrderHistoryScreen = () => {
  const orders: OrderHistoryItem[] = [
    {
      id: '1',
      items: ['Cappuccino', 'Latte'],
      total: 8.50,
      date: '2025-02-01 14:35',
      status: 'Completed',
    },
    {
      id: '2',
      items: ['Espresso'],
      total: 3.20,
      date: '2025-02-03 10:12',
      status: 'Completed',
    },
    {
      id: '3',
      items: ['Iced Americano', 'Croissant'],
      total: 7.10,
      date: '2025-02-05 17:42',
      status: 'Ready for Pickup',
    },
  ];

  // Card
  const renderItem = ({ item }: { item: OrderHistoryItem }) => (
    <View style={styles.card}>
      <View style={{ marginBottom: 6 }}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <Text style={styles.items}>{item.items.join(', ')}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.total}>${item.total.toFixed(2)}</Text>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: item.status === 'Completed' ? '#4CAF50' : '#E38B29' },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.reorderBtn}>
        <Text style={styles.reorderText}>Reorder</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Order History</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <View style={{ height: 80 }} />
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D14',
    paddingHorizontal: 20,
  },

  header: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 20,
    fontFamily: 'Calistoga-Regular',
  },

  card: {
    backgroundColor: '#1E1E28',
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
  },

  orderId: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter-Italic-VariableFont_opsz,wght',
  },

  items: {
    color: '#ccc',
    marginTop: 2,
    fontSize: 13,
    fontFamily: 'Courgette-Regular',
  },

  date: {
    color: '#888',
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'Courgette-Regular',
  },

  footer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },

  total: {
    color: '#E38B29',
    fontSize: 18,
    fontFamily: 'Courgette-Regular',
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    
  },

  statusText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    fontFamily: 'Courgette-Regular',
  },

  reorderBtn: {
    marginTop: 12,
    backgroundColor: '#E38B29',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  reorderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Courgette-Regular',
  },
});
