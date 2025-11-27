import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';


const Icon: any = require('react-native-vector-icons/Ionicons').default;

export default function FavoriteScreen() {
  const navigation = useNavigation<any>();

  const [favorites, setFavorites] = useState([
    {
      id: '1',
      name: 'Cappuccino',
      price: 28000,
      image: require('../cappuccino/square/cappuccino_pic_1_square.png'),
    },
    {
      id: '2',
      name: 'Latte',
      price: 32000,
      image: require('../cappuccino/square/cappuccino_pic_2_square.png'),
    },
  ]);

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { coffee: item })}
    >
      <Image source={item.image} style={styles.image} />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>Rp {item.price.toLocaleString()}</Text>
      </View>

      <TouchableOpacity onPress={() => removeFavorite(item.id)}>
        <Icon name="heart-dislike-outline" size={26} color="#E38B29" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
     <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Favorites</Text>

      {favorites.length === 0 ? (
        <View style={styles.emptyBox}>
          <Icon name="heart-outline" size={60} color="#555" />
          <Text style={styles.emptyText}>Belum ada favorit</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D14',
    paddingHorizontal: 20,
    
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 20,
    fontFamily: 'Calistoga-Regular',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1E1E28',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 10,
    marginRight: 15,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter-Italic-VariableFont_opsz,wght',
  },
  price: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Courgette-Regular',
  },
  emptyBox: {
    marginTop: 120,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 17,
    color: '#aaa',
    marginTop: 10,
  },
});
