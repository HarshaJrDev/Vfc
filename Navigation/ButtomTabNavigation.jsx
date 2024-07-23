import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux';

// Import screen components
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import SearchScreen from '../Screens/SearchScreen';
import CartScreen from '../Screens/CartScreen';
import SignInScreen from '../LoginScreen/SignInScreen';
import SignUpScreen from '../LoginScreen/SignUpScreen';
import ProductDetailsScreen from '../Screens/ProductDetailsScreen';
import { store } from '../store';
import { selectItems } from '../slices/cartSlice';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigators for each tab with headers hidden
function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

function CartStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

// Function to get the current route name from a stack
function getTabBarVisibility(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  if (routeName === 'SignUpScreen' || routeName === 'SignInScreen') {
    return 'none';
  }
  return 'flex';
}

// Bottom Tab Navigator
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
            <View>
              <Ionicons name={iconName} size={size} color={color} />
              {route.name === 'Cart' && itemCount > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badge}>{itemCount}</Text>
                </View>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { display: getTabBarVisibility(route) },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchStack} options={{ headerShown: false }} />
      <Tab.Screen name="Cart" component={CartStack} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
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

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </Provider>
  );
}
