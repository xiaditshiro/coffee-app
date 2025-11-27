import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// screens
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';

// tipe route name
export type BottomTabParamList = {
  Home: undefined;
  Cart: undefined;
  OrderHistory: undefined;
  Profile: undefined;
  Favorite: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = () => {
  return (
    
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1E1E28',
            borderTopWidth: 0,
            paddingBottom: 5,
            height: 60,
          },
          tabBarActiveTintColor: '#E38B29',
          tabBarInactiveTintColor: '#888',

          tabBarLabelStyle: {
          fontFamily: 'Calistoga-Regular',
          fontSize: 12,
        },
          // ikon dinamis
          tabBarIcon: ({ color }) => {
            let iconName: string;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Cart':
                iconName = 'cart';
                break;
              case 'Favorite':
                iconName = 'heart';
                break;
              case 'OrderHistory':
                iconName = 'receipt-outline';
                break;
              case 'Profile':
                iconName = 'person';
                break;
              default:
                iconName = 'home';
            }

            return React.createElement(Ionicons as any, { name: iconName, size: 22, color });
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Favorite" component={FavoriteScreen} />
        <Tab.Screen name="OrderHistory" component={OrderHistoryScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    
  );
};

export default BottomTabs;
