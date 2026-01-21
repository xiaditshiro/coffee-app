import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { fetchCoffee, fetchCake, IMAGE_URL, addToCart } from '../api';




// ======================
// TIPE DATA PRODUK
// ======================
type Product = {
  id: number;
  nama_produk: string;
  harga: number;
  deskripsi: string;
  gambar: string;
  category_id: number;
  nama_kategori?: string;
};

const USER_ID = 1;

// ======================
// KATEGORI COFFEE
// ======================
const categories = ['All', 'Signature', 'Hot Coffee', 'Ice Coffee'];

const categoryMap: any = {
  Signature: 3,
  'Hot Coffee': 4,
  'Ice Coffee': 5,
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [activeCategory, setActiveCategory] = useState('All');
  const [coffeeProducts, setCoffeeProducts] = useState<Product[]>([]);
  const [cakeProducts, setCakeProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getCoffee = async () => {
      try {
        const categoryId = activeCategory !== 'All' ? categoryMap[activeCategory] : undefined;
        const res = await fetchCoffee(categoryId);
        setCoffeeProducts(res.data);
      } catch (err) {
        console.log('Error fetch coffee:', err);
      }
    };

    const getCake = async () => {
      try {
        const res = await fetchCake();
        setCakeProducts(res.data);
      } catch (err) {
        console.log('Error fetch cake:', err);
      }
    };

    getCoffee();
    getCake();
  }, [activeCategory]);

  const handleAddToCart = async (productId: number) => {
  try {
    await addToCart(USER_ID, productId);
    Alert.alert('Produk masuk ke cart');
  } catch (error) {
    Alert.alert('Gagal menambahkan ke cart');
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D14" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= HEADER ================= */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.logoRow}>
              <Image
                source={require('../img/Logo/Logo Shiro Creation 1.png')}
                style={styles.logo}
              />
              <Text style={styles.appName}>Shiro Coffee</Text>
            </View>
          </View>

          <Text style={styles.title}>Find the best coffee for you</Text>

          <TextInput
            placeholder="Find your coffee..."
            placeholderTextColor="#888"
            style={styles.search}
          />
        </View>

        {/* ================= CATEGORY ================= */}
        <View style={styles.categoryContainer}>
          {categories.map(item => (
            <TouchableOpacity key={item} onPress={() => setActiveCategory(item)}>
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === item && styles.categoryActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ================= COFFEE ================= */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {coffeeProducts.map(coffee => (
            <TouchableOpacity
              key={coffee.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate('ProductDetail', { product: coffee })
              }
            >
             <Image
                source={{ uri: `${IMAGE_URL}/product/${coffee.gambar}` }}
                style={styles.cardImage}
              />


              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{coffee.nama_produk}</Text>
                <Text style={styles.cardDesc}>{coffee.deskripsi}</Text>

                <View style={styles.priceRow}>
                  <Text style={styles.price}>Rp {coffee.harga}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleAddToCart(coffee.id)}
                  >
                    <Text style={{ color: '#fff' }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ================= CAKE ================= */}
        <Text style={styles.sectionTitle}>Cake</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cakeProducts.map(cake => (
            <TouchableOpacity
              key={cake.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate('ProductDetail', { product: cake })
              }
            >
              <Image
                source={{ uri: `${IMAGE_URL}/product/${cake.gambar}` }}
                style={styles.cardImage}
              />


              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{cake.nama_produk}</Text>
                <Text style={styles.cardDesc}>{cake.deskripsi}</Text>

                <View style={styles.priceRow}>
                  <Text style={styles.price}>Rp {cake.harga}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleAddToCart(cake.id)}
                  >
                    <Text style={{ color: '#fff' }}>+</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};


// 🧾 StyleSheet
const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#0D0D14',
    paddingHorizontal: 20,
    paddingBottom: 0, 
  },
  header: {
    marginTop: 20,
  },
  headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
},

logoRow: {
  flexDirection: 'row',
  alignItems: 'center',
},

logo: {
  width: 40,
  height: 40,
  borderRadius: 10,
  marginRight: 10,
},

appName: {
  color: '#fff',
  fontSize: 20,
  fontFamily: 'Calistoga-Regular',
},

profilePic: {
  width: 40,
  height: 40,
  borderRadius: 20,
  borderWidth: 2,
  borderColor: '#E38B29',
},

  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Calistoga-Regular',
  },
  search: {
    backgroundColor: '#1E1E28',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    marginTop: 15,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
    
  },
  categoryText: {
    color: '#888',
    fontSize: 20,
    fontFamily: 'Caveat-Regular',
    
  },
  categoryActive: {
    color: '#E38B29',
    borderBottomWidth: 2,
    borderBottomColor: '#E38B29',
    paddingBottom: 3,
  },
  cardScroll: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1E1E28',
    borderRadius: 15,
    marginRight: 15,
    width: 160,
    paddingBottom: 15,
    
    
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardInfo: {
    paddingHorizontal: 10,
    marginTop: 10,
    
  },
  rating: {
    alignSelf: 'flex-end',
  },
  ratingText: {
    color: '#E38B29',
    fontSize: 14,
    fontFamily: 'Courgette-Regular',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Inter-Italic-VariableFont_opsz,wght',
  },
  cardDesc: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Courgette-Regular',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Courgette-Regular',
  },
  addButton: {
    backgroundColor: '#E38B29',
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 15,
    fontFamily: 'Calistoga-Regular',
  },
 
});

export default HomeScreen;



