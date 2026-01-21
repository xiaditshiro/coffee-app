import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IMAGE_URL } from '../api';
import { useNavigation } from '@react-navigation/native';



const ProfileScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40;
    const user = {
    username: 'Shiro Neko',
    email: 'shiro@example.com',
    profile_image: '1768628696580.png',
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D14" />

      <Text style={styles.header}>Profile</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: `${IMAGE_URL}/profile/${user.profile_image}` }} // ganti foto profilmu
            style={styles.profileImage}
          />

          <View style={{ marginLeft: 15 }}>
            <Text style={styles.profileName}>Shiro Neko</Text>
            <Text style={styles.profileEmail}>shiro@example.com</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Account Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Payment Methods</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Help & Support</Text>
          </TouchableOpacity>

          

        </View>
        <TouchableOpacity
            style={[styles.menuItem, styles.addProduct]}
            onPress={() => navigation.navigate('AddEditProduct')}
          >
            <Text style={styles.menuText}>➕ Tambah Produk</Text>
          </TouchableOpacity>
        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 80 }} />
        
      </ScrollView>
      
    </SafeAreaView>
  );
};

// Styles
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

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E28',
    padding: 15,
    borderRadius: 20,
    marginBottom: 30,
  },

  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },

  profileName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter-Italic-VariableFont_opsz,wght',
  },

  profileEmail: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 3,
    fontFamily: 'Inter-Italic-VariableFont_opsz,wght',
  },

  menuContainer: {
    backgroundColor: '#1E1E28',
    paddingVertical: 10,
    borderRadius: 18,
  },

  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },

  menuText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Caveat-Regular',
  },

  addProduct: {
    backgroundColor: '#1E1E28',
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 5,
    
  },

  logoutBtn: {
    backgroundColor: '#E38B29',
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
  },

  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ProfileScreen;
