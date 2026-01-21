import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AddEditProductScreen from '../screens/AddEditProductScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Login/Register dulu */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* Halaman utama pakai BottomTabs */}
      <Stack.Screen name="MainTabs" component={BottomTabs} />

      {/* Halaman Detail */}
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />

      {/* Halaman Add/Edit Produk */}
      <Stack.Screen name="AddEditProduct" component={AddEditProductScreen} />
    </Stack.Navigator>
  );
}
