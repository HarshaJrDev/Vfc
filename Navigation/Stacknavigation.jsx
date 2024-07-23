import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import SearchScreen from '../Screens/SearchScreen';
import CartScreen from '../Screens/CartScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import ProductDetailsScreen from '../Screens/ProductDetailsScreen';
import SignInScreen from '../LoginScreen/SignInScreen';
import SignUpScreen from '../LoginScreen/SignUpScreen';
import Sucessful from '../paymentScreen/Adress';

const Stack = createStackNavigator();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name='Adresss' component={Sucessful} />
    </Stack.Navigator>
  );
}

export function SearchStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name='Adresss' component={Sucessful} />
    </Stack.Navigator>
  );
}

export function CartStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name='Adresss' component={Sucessful} />
    </Stack.Navigator>
  );
}

export function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name='Adresss' component={Sucessful} />
    </Stack.Navigator>
  );
}

export function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name='Adresss' component={Sucessful} />
    </Stack.Navigator>
  );
}
