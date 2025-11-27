import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';



type CoffeeItem = {
  id: string;
  name: string;
  desc: string;
  price: string;
  rating: number;
  image: any;
  category: string;
};
// Mengambil Data Produk yang Dikirim dari Screen Sebelumnya
export default function ProductDetailScreen() {
  const route = useRoute<RouteProp<{ params: { coffee: CoffeeItem } }, 'params'>>();
  const navigation = useNavigation();

  const coffee = route.params?.coffee;

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        {React.createElement(Ionicons as any, { name: 'arrow-back', size: 26, color: '#fff' })}
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Product Image */}
        <Image source={coffee.image} style={styles.image} />

        {/* Detail Content */}
        <View style={styles.details}>
          <Text style={styles.title}>{coffee.name}</Text>

          <Text style={styles.rating}>⭐ {coffee.rating}</Text>

          <Text style={styles.desc}>{coffee.desc}</Text>

          {/* Price + Add Button */}
          <View style={styles.bottomRow}>
            <Text style={styles.price}>{coffee.price}</Text>
            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addBtnText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}


// ===================== STYLE ======================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D14',
  },
  backBtn: {
    position: 'absolute',
    zIndex: 10,
    top: 40,
    left: 20,
    padding: 8,
    backgroundColor: '#1E1E28',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 350,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  details: {
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontFamily: 'Calistoga-Regular',
  },
  rating: {
    color: '#E38B29',
    fontSize: 18,
    marginVertical: 10,
    fontFamily: 'Courgette-Regular',
  },
  desc: {
    color: '#ccc',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
    fontFamily: 'Courgette-Regular',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Courgette-Regular',
  },
  addBtn: {
    backgroundColor: '#E38B29',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Courgette-Regular',
  },
});
