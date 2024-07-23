import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import SignInScreen from './LoginScreen/SignInScreen';
import SignUpScreen from './LoginScreen/SignUpScreen';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import SearchScreen from './Screens/SearchScreen';
import CartScreen from './Screens/CartScreen';
import ProductDetailsScreen from './Screens/ProductDetailsScreen';
import FinalView from './paymentScreen/FinalView';
import Category from './Cetagory'; // Corrected import path
import BeautyProducts from './Screens/Location'; // Corrected import path
import { selectItems } from './slices/cartSlice';
import Shirt from './Collections/Shirt';
import location from './Screens/Location'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [AuthLogin, setAuthLogin] = useState(false);

  function HomeStack() {
    return (
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FinalView"
          component={FinalView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Shirt"
          component={Shirt}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  function AuthStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: true }}>
         <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SignInScreen" component={SignInScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

  function SearchStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    );
  }

  function CartStack() {
    return (
      <Stack.Navigator
        initialRouteName="Cart"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="FinalView" component={FinalView} />
        <Stack.Screen name="BeautyProducts" component={BeautyProducts} />
        <Stack.Screen
          name="Location"
          component={location}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  function ProfileStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  function MyTabs() {
    const items = useSelector(selectItems);
    const itemCount = items.length;

    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return (
              <View style={styles.tabBarIcon}>
                <Ionicons name={iconName} size={size} color={color} />
                {route.name === 'Cart' && itemCount > 0 && (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badge}>{itemCount}</Text>
                  </View>
                )}
              </View>
            );
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStack}    options={{ headerShown: false }}/>
        <Tab.Screen name="Search" component={SearchStack}   options={{ headerShown: false }} />
        <Tab.Screen name="Cart" component={CartStack}    options={{ headerShown: false }}/>
        <Tab.Screen name="Profile" component={ProfileStack}    options={{ headerShown: false }}/>
      </Tab.Navigator>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        {AuthLogin ? <AuthStack /> : <MyTabs />}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 6,
    padding: 2,
    paddingHorizontal: 5,
    zIndex: 1,
  },
  badge: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
