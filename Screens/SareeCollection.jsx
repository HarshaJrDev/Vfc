import React, {useEffect, useState} from 'react';
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
import {useDispatch} from 'react-redux';
import {addItem} from '../slices/cartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorFetch, setErrorFetch] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://localhost:4000/api/womenProducts')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => setErrorFetch('Please check your internet connection.'));
  }, []);

  const addToCart = item => {
    dispatch(addItem(item));
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('ProductDetailsScreen', {item, image: item.image})
      }>
      <Image source={{uri: item.image}} style={styles.image} />
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
          <View style={styles.searchContainer}>
            <TouchableOpacity
              style={styles.searchInputTouchable}
              onPress={() => navigation.navigate('SearchScreen')}>
              <Feather name="search" size={24} color="black" />
              <Text style={styles.searchPlaceholder}>Search products...</Text>
            </TouchableOpacity>
            <View style={styles.bellIcon}>
              <Feather name="bell" size={24} color="black" />
            </View>
          </View>
          <FlatList
            data={filteredProducts}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.list}
            keyExtractor={item => item._id.toString()}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  searchInputTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginRight: 10,
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: '#606060',
  },
  bellIcon: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  scrollContainer: {
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    flex: 0.48,
  },
  image: {
    width: '100%',
    height: 150,
  },
  details: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  addToCartButton: {
    alignSelf: 'flex-end',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
