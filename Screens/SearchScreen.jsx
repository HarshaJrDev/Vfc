import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/womenProducts')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
    fetch('http://localhost:4000/api/womenProducts')
      .then(response => response.json())
      .then(data => setRecommendedProducts(data))
      .catch(error =>
        console.error('Error fetching recommended products:', error),
      );
  }, []);

  const handleSearch = text => {
    setSearchQuery(text);
    if (text !== '' && !recentSearches.includes(text)) {
      setRecentSearches([text, ...recentSearches.slice(0, 4)]); 
    }
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
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRecentSearch = ({item}) => (
    <TouchableOpacity
      style={styles.recentItem}
      onPress={() => handleSearch(item)}>
      <Text style={styles.recentText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.searchContainer}>
          <Feather
            name="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
            style={styles.backIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            onChangeText={text => handleSearch(text)}
            value={searchQuery}
          />
        </View>
        {searchQuery === '' && recentSearches.length > 0 && (
          <View style={styles.recentSearchesContainer}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <FlatList
              data={recentSearches}
              renderItem={renderRecentSearch}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              contentContainerStyle={styles.recentList}
            />
          </View>
        )}
        {searchQuery === '' && recommendedProducts.length > 0 && (
          <View style={styles.recommendedContainer}>
            <Text style={styles.sectionTitle}>Recommended Products</Text>
            <FlatList
              data={recommendedProducts}
              renderItem={renderItem}
              keyExtractor={item => item._id.toString()} // Assuming _id is a unique identifier
              horizontal
              contentContainerStyle={styles.recommendedList}
            />
          </View>
        )}
        <View style={styles.filteredProductsContainer}>
          <FlatList
            data={filteredProducts}
            renderItem={renderItem}
            keyExtractor={item => item._id.toString()} // Assuming _id is a unique identifier
            contentContainerStyle={styles.list}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginLeft: 10,
  },
  list: {
    flexGrow: 1,
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  recentSearchesContainer: {
    marginBottom: 20,
  },
  recentItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  recentText: {
    fontSize: 14,
  },
  recentList: {
    flexDirection: 'row',
  },
  recommendedContainer: {
    marginBottom: 20,
  },
  recommendedList: {
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filteredProductsContainer: {
    flex: 1,
  },
});

export default SearchScreen;
