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
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addItem} from '../slices/cartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {useNavigation} from '@react-navigation/native';
import Cetagory from '../Cetagory';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const images = [
    {
      image:
        'https://img.freepik.com/free-vector/realistic-3d-sale-background_52683-62689.jpg',
      desc: 'Silent Waters in the mountains in midst of Himalayas',
    },
    {
      image:
        'https://img.freepik.com/free-vector/realistic-3d-sale-background_52683-62688.jpg',
      desc: 'Red fort in India New Delhi is a magnificent masterpiece of humans',
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('ProductDetailsScreen', {item, image: item.image, id: item._id})
      }>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>Rs.{item.price}</Text>
        <Text style={styles.price}>Id:{item._id}</Text>
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SareeCollection')}
                style={styles.categoryItem}>
                <Image
                  style={styles.categoryImage}
                  source={require('../assets/Cetagory/saree.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem}>
                <Image
                  style={styles.categoryImage}
                  source={require('../assets/Cetagory/crop-top.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem}>
                <Image
                  style={styles.categoryImage}
                  source={require('../assets/Cetagory/lingerie.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem}>
                <Image
                  style={styles.categoryImage}
                  source={require('../assets/Cetagory/tshirt.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem}>
                <Image
                  style={styles.categoryImage}
                  source={require('../assets/Cetagory/bride.png')}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.sliderContainer}>
            <FlatListSlider
              data={images}
              height={150}
              timer={5000}
              contentContainerStyle={styles.sliderContentContainer}
              indicatorContainerStyle={styles.sliderIndicatorContainer}
              indicatorActiveWidth={30}
              animation
              indicator
              onPress={item => console.log(item)}
              imageStyle={styles.imageStyle}
            />
          </View>
          <View>
            <Cetagory />
          </View>
          <FlatList
            data={products}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
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
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  searchInputTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    width: '80%',
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: 'gray',
  },
  bellIcon: {
    position: 'absolute',
    right: 7,
    zIndex: 20,
  },
  sliderContainer: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    borderTopEndRadius: 20,
  },
  list: {
    marginTop: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 0.48,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  details: {
    marginTop: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#eee',
  },
  errorContainer: {
    height: 800,
    backgroundColor: '#FDFDFD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorImage: {
    height: 400,
    width: 400,
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    marginTop: 20,
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  categoryItem: {
    backgroundColor: 'gray',
    borderRadius: 20,
  },
  categoryImage: {
    height: 60,
    width: 60,
  },
  sliderContentContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  sliderIndicatorContainer: {
    position: 'absolute',
    bottom: 20,
  },
  imageStyle: {
    borderRadius: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
});

export default ProductListScreen;
