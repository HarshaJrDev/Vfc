import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem } from '../slices/cartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Shirt = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorFetch, setErrorFetch] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://localhost:4000/api/womenProducts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => setProducts(data))
      .catch(error => setErrorFetch('Please check your internet connection.'));
  }, []);

  const addToCart = item => {
    dispatch(addItem(item));
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('ProductDetailsScreen', { item, image: item.image })
      }>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>Rs.{item.price}</Text>
        <TouchableOpacity
          onPress={() => addToCart(item)}
          style={styles.addToCartButton}>
          <Ionicons name="cart" size={20} color={'#606060'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {errorFetch ? (
        <View style={styles.errorContainer}>
          <Image
            source={require('../assets/images/undraw_access_denied_re_awnf.png')}
            style={styles.errorImage}
            resizeMode="contain"
          />
          <Text style={styles.errorText}>{errorFetch}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <FlatList
            data={filteredProducts}
            renderItem={renderItem}
            numColumns={2}
            // keyExtractor={item => item.id.toString()} // Assuming each item has an 'id' property
            contentContainerStyle={styles.list}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorImage: {
    width: 250,
    height: 250,
  },
  errorText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  details: {
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  addToCartButton: {
    marginTop: 5,
  },
  list: {
    flexGrow: 1,
  },
});

export default Shirt;
