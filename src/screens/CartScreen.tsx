import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchCart, IMAGE_URL, updateCartQty, deleteCartItem } from '../api';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { checkout } from '../api';




const USER_ID = 1;


const CartScreen: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const navigation = useNavigation<any>();

useFocusEffect(
  useCallback(() => {
    const loadCart = async () => {
      try {
        const res = await fetchCart(USER_ID);
        setCart(res.data);
      } catch (err) {
        console.log('Gagal ambil cart', err);
      }
    };

    loadCart();
  }, [])
);

// Update QTY
const handleQtyChange = async (cartId: number, newQty: number) => {
  if (newQty < 1) return;

  try {
    await updateCartQty(cartId, newQty);
    const res = await fetchCart(USER_ID);
    setCart(res.data);
  } catch (err) {
    console.log('Gagal update qty', err);
  }
};

// Delete Cart Item
const handleDelete = async (cartId: number) => {
  try {
    await deleteCartItem(cartId);
    const res = await fetchCart(USER_ID);
    setCart(res.data);
  } catch (err) {
    console.log('Gagal hapus cart', err);
  }
};

// Checkout
const handleCheckout = async () => {
  try {
    await checkout(USER_ID);
    Alert.alert('Checkout berhasil');
    navigation.navigate('OrderHistory');
  } catch {
    Alert.alert('Checkout gagal');
  }
};

  // TOTAL HARGA
  const totalPrice = cart
    .reduce((sum, item) => sum + item.harga * item.qty, 0)
    .toFixed(0);

  useEffect(() => {
    console.log('DATA CART:', cart);
  }, [cart]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D14" />

      <Text style={styles.header}>My Cart</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {cart.map(item => (
          <View key={item.id} style={styles.card}>
            <Image
              source={{ uri: `${IMAGE_URL}/product/${item.gambar}` }}
              style={styles.image}
            />


            <View style={styles.info}>
              <Text style={styles.title}>{item.nama_produk}</Text>
              <Text style={styles.desc}>{item.deskripsi}</Text>

              <View style={styles.row}>
                <Text style={styles.price}>Rp {item.harga}</Text>
              </View>

              {/* QTY */}
              <View style={styles.qtyContainer}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => handleQtyChange(item.id, item.qty - 1)}
                >
                  <Text style={styles.qtyText}>−</Text>
                </TouchableOpacity>

                <View style={styles.qtyBox}>
                  <Text style={styles.qtyNumber}>{item.qty}</Text>
                </View>

                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => handleQtyChange(item.id, item.qty + 1)}
                >
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>

            </View>
          </View>
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: Rp {totalPrice}</Text>

        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};





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
    flexDirection: 'row',
    backgroundColor: '#1E1E28',
    borderRadius: 20,
    padding: 12,
    marginBottom: 20,
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 15,
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter-Italic-VariableFont_opsz,wght',
  },

  desc: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 10,
    fontFamily: 'Courgette-Regular',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sizeBtn: {
    backgroundColor: '#0c132b',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  sizeText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Courgette-Regular',
  },

  price: {
    color: '#E38B29',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Courgette-Regular',
  },

  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },

  qtyBtn: {
    backgroundColor: '#E38B29',
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    
  },

  qtyBox: {
    width: 50,
    height: 35,
    borderRadius: 10,
    borderColor: '#E38B29',
    borderWidth: 2,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyNumber: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Courgette-Regular',
  },

  removeBtn: {
    marginTop: 15,
    backgroundColor: '#2a2f44',
    padding: 10,
    borderRadius: 10,
    
  },

  removeText: {
    color: '#ff6b6b',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Courgette-Regular',
  },

  // FOOTER TOTAL
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1E1E28',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  checkoutBtn: {
    backgroundColor: '#E38B29',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 12,
  },

  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen;
