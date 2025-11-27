import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { coffeeBeans } from '../data/cakecard';
import { coffeeCards } from '../data/CoffeeCards';
import { useNavigation } from '@react-navigation/native';




// 🟤 Tipe data untuk kopi

const categories = ['All', 'Signature', 'Hot Coffee', 'Ice Coffee'];

const HomeScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const navigation = useNavigation<any>();

  // Filter berdasarkan kategori aktif
const filteredCoffees =
  activeCategory === 'All'
    ? coffeeCards
    : coffeeCards.filter((item) => item.category === activeCategory);


  const statusBarHeight =
    StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D14" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.logoRow}>
              <Image
                source={require('../img/Logo/Logo Shiro Creation 1.png')} 
                style={styles.logo}
              />
              <Text style={styles.appName}>Shiro Coffee</Text>
            </View>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Profile')}
            >
              <Image
                source={require('../img/Profile/COLUMBINA.jpeg')} 
                style={styles.profilePic}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Find the best coffee for you</Text>
          <TextInput
            placeholder="Find your coffee..."
            placeholderTextColor="#888"
            style={styles.search}
          />
        </View>

        {/* Categories */}
        <View style={styles.categoryContainer}>
          {categories.map((item) => (
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

        {/* Coffee Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardScroll}
        >
          {filteredCoffees.map((coffee) => (
            <TouchableOpacity
              key={coffee.id}
              style={styles.card}
              onPress={() => navigation.navigate('ProductDetail', { coffee })}
            >
              <Image source={typeof coffee.image === 'string' ? { uri: coffee.image } : coffee.image} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <View style={styles.rating}>
                  <Text style={styles.ratingText}>⭐ {coffee.rating}</Text>
                </View>
                <Text style={styles.cardTitle}>{coffee.name}</Text>
                <Text style={styles.cardDesc}>{coffee.desc}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>{coffee.price}</Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>



        {/* cake */}
<Text style={styles.sectionTitle}>Cake</Text>
<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  style={styles.cardScroll}
>
  {coffeeBeans.map((coffee) => (
    <TouchableOpacity
      key={coffee.id}
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetail", { coffee })}
    >
      <Image source={typeof coffee.image === 'string' ? { uri: coffee.image } : coffee.image} style={styles.cardImage} />


      <View style={styles.cardInfo}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>⭐ {coffee.rating}</Text>
        </View>

        <Text style={styles.cardTitle}>{coffee.name}</Text>
        <Text style={styles.cardDesc}>{coffee.desc}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{coffee.price}</Text>

          <TouchableOpacity style={styles.addButton}>
            <Text style={{ color: '#fff', fontSize: 16 }}>+</Text>
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



