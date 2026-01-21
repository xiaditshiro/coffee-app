import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { BASE_URL, IMAGE_URL } from '../api';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';




const AddEditProductScreen = () => {
  const [productId, setProductId] = useState<number | null>(null);
  const [namaProduk, setNamaProduk] = useState('');
  const [harga, setHarga] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState<any>(null);
  const [oldImage, setOldImage] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const navigation = useNavigation<any>();
  const [categories, setCategories] = useState<any[]>([]);


  /* =========================
     LOAD KATEGORI DARI BACKEND
     ========================= */
  const loadCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/categories`);
      setCategories(res.data);
    } catch (err) {
      console.log('Gagal load kategori', err);
    }
  };


  /* =========================
     AMBIL SEMUA PRODUK
     ========================= */
  const loadProducts = async () => {
    const res = await axios.get(`${BASE_URL}/products`);
    setProducts(res.data);
  };

  useEffect(() => {
  loadProducts();
  loadCategories();
}, []);


  /* =========================
     PICK IMAGE
     ========================= */
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, res => {
      if (!res.didCancel && res.assets) {
        setImage(res.assets[0]);
      }
    });
  };

  /* =========================
     EDIT PRODUK
     ========================= */
  const handleEdit = (item: any) => {
    setProductId(item.id);
    setNamaProduk(item.nama_produk);
    setHarga(String(item.harga));
    setDeskripsi(item.deskripsi || '');
    setCategoryId(String(item.category_id));

    // ✅ PATH BENAR
    setOldImage(`${IMAGE_URL}/product/${item.gambar}`);
    setImage(null);
  };



  /* =========================
     SUBMIT FORM
     ========================= */
  const handleSubmit = async () => {
  if (!namaProduk || !harga || !categoryId) {
    Alert.alert('Validasi', 'Nama, harga & kategori wajib diisi');
    return;
  }

  


  const formData = new FormData();
  formData.append('nama_produk', namaProduk);
  formData.append('harga', harga);
  formData.append('deskripsi', deskripsi);
  formData.append('category_id', categoryId);

  // ⬇️ PENTING
  if (image) {
    // jika user pilih gambar baru
    formData.append('image', {
      uri: image.uri,
      type: image.type || 'image/jpeg',
      name: image.fileName || 'product.jpg',
    } as any);
  } else if (productId && oldImage) {
    // jika edit TANPA ganti gambar
    formData.append('old_image', oldImage.replace(`${IMAGE_URL}/product/`, ''));
  }

  try {
    if (productId) {
      await axios.put(`${BASE_URL}/products/${productId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Sukses', 'Produk berhasil diupdate');
    } else {
      await axios.post(`${BASE_URL}/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Sukses', 'Produk berhasil ditambahkan');
    }

    resetForm();
    loadProducts();
  } catch (err: any) {
    console.log(err.response?.data);
    Alert.alert('Error', 'Gagal menyimpan produk');
  }
};
  const handleDelete = (id: number) => {
  Alert.alert(
    'Konfirmasi',
    'Yakin ingin menghapus produk ini?',
    [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`${BASE_URL}/products/${id}`);
            Alert.alert('Sukses', 'Produk berhasil dihapus');
            resetForm();
            loadProducts();
          } catch {
            Alert.alert('Error', 'Gagal menghapus produk');
          }
        },
      },
    ]
  );
};


  const resetForm = () => {
    setProductId(null);
    setNamaProduk('');
    setHarga('');
    setDeskripsi('');
    setCategoryId('');
    setImage(null);
    setOldImage(null);
  };


  /* =========================
     UI
     ========================= */
  return (
  <SafeAreaView style={styles.safe}>
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={
        <>
          {/* HEADER */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {productId ? 'Edit Produk' : 'Tambah Produk'}
            </Text>
          </View>

          {/* FORM */}
          <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image.uri }} style={styles.image} />
            ) : oldImage ? (
              <Image source={{ uri: oldImage }} style={styles.image} />
            ) : (
              <Text style={{ color: '#999' }}>Pilih Gambar Produk</Text>
            )}
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Nama Produk"
            placeholderTextColor="#999"
            value={namaProduk}
            onChangeText={setNamaProduk}
          />

          <TextInput
            style={styles.input}
            placeholder="Harga"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={harga}
            onChangeText={setHarga}
          />

          <TextInput
            style={styles.input}
            placeholder="Deskripsi"
            placeholderTextColor="#999"
            value={deskripsi}
            onChangeText={setDeskripsi}
          />


          {/* ⬇️ PICKER KATEGORI DI SINI */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={categoryId}
              onValueChange={(value) => setCategoryId(String(value))}
              dropdownIconColor="#fff"
              style={[
                styles.picker,
                { color: categoryId ? '#fff' : '#999' }
              ]}
              mode="dropdown"
            >
              <Picker.Item label="Pilih Kategori" value="" />
              {categories.map(cat => (
                <Picker.Item
                  key={cat.id}
                  label={cat.nama_kategori}
                  value={String(cat.id)}
                />
              ))}
            </Picker>
          </View>



          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {productId ? 'Update Produk' : 'Tambah Produk'}
            </Text>
          </TouchableOpacity>
          {productId && (
  <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleDelete(productId)}
          >
            <Text style={styles.deleteButtonText}>Hapus Produk</Text>
          </TouchableOpacity>
        )}



          

          <Text style={styles.subTitle}>Daftar Produk</Text>
        </>
      }
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.productItem} onPress={() => handleEdit(item)}>
          <Image
            source={{ uri: `${IMAGE_URL}/product/${item.gambar}` }}
            style={styles.thumb}
          />
          <View>
            <Text style={styles.productName}>{item.nama_produk}</Text>
            <Text style={styles.price}>Rp {item.harga}</Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ padding: 20 }}
    />
  </SafeAreaView>


  );
};




const styles = StyleSheet.create({

safe: {
  flex: 1,
  backgroundColor: '#0D0D14',
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
},

headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
  paddingTop: 8,
},


backText: {
  fontSize: 22,
  color: '#E38B29',
  marginRight: 12,
},

headerTitle: {
  fontSize: 22,
  fontWeight: '600',
  color: '#fff',
},

  container: {
    flex: 1,
    backgroundColor: '#0D0D14',
    padding: 20,
  },
 
  imageBox: {
    backgroundColor: '#1E1E28',
    padding: 40,
    borderRadius: 12,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  input: {
  backgroundColor: '#1E1E28',
  color: '#fff',
  padding: 14,
  borderRadius: 12,
  marginBottom: 15,
},

pickerContainer: {
  backgroundColor: '#1E1E28',
  borderRadius: 12,
  marginBottom: 15,
  paddingHorizontal: 10,
  justifyContent: 'center',
},

picker: {
  height: 52,
  fontSize: 16,
},


  button: {
    backgroundColor: '#E38B29',
    padding: 15,
    borderRadius: 14,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  subTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 15,
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#1E1E28',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    color: '#E38B29',
    fontSize: 14,
    marginTop: 4,
  },

  deleteButton: {
  backgroundColor: '#C0392B',
},

deleteButtonText: {
  color: '#fff',
  fontSize: 18,
  textAlign: 'center',
  fontWeight: '600',
},

});

export default AddEditProductScreen;
