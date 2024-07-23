import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';

const AddPostScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {products = []} = route.params || {};

  const [post, setPost] = useState({
    fname: '',
    mobilenumber: '',
    houseadress: '',
    Area: '',
    city: '',
    pincode: '',
    state: '',
    Landmark: '',
  });

  const handleChangeText = (name, text) => {
    setPost({...post, [name]: text});
  };

  const isFormValid = () => {
    const mobileNumberValid = /^[9876]\d{9}$/.test(post.mobilenumber.trim());
    return (
      post.fname.trim() !== '' &&
      mobileNumberValid &&
      post.houseadress.trim() !== '' &&
      post.Area.trim() !== '' &&
      post.city.trim() !== '' &&
      post.pincode.trim().length === 6 &&
      post.state.trim() !== '' &&
      post.Landmark.trim() !== ''
    );
  };

  const handleSubmit = async () => {
    try {
      if (isFormValid()) {
        await axios.post('http://localhost:4000/api/addresses', {
          ...post,
          products,
        });
        navigation.navigate('Home');
      } else {
        Alert.alert(
          'Validation Error',
          'Please fill out all required fields with valid data.',
        );
      }
    } catch (error) {
      console.error('Failed to add post. Please try again.', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>address</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={post.fname}
          onChangeText={text => handleChangeText('fname', text)}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={post.mobilenumber}
          onChangeText={text => handleChangeText('mobilenumber', text)}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="House Address"
          value={post.houseadress}
          onChangeText={text => handleChangeText('houseadress', text)}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Area"
          value={post.Area}
          onChangeText={text => handleChangeText('Area', text)}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={post.city}
          onChangeText={text => handleChangeText('city', text)}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          value={post.pincode}
          onChangeText={text => handleChangeText('pincode', text)}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={post.state}
          onChangeText={text => handleChangeText('state', text)}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Landmark"
          value={post.Landmark}
          onChangeText={text => handleChangeText('Landmark', text)}
          placeholderTextColor="#888"
        />
        <Text style={styles.productsTitle}>Products:</Text>
        {products.map((product, index) => (
          <Text key={index} style={styles.productText}>
            {product.title} (x{product.quantity})
          </Text>
        ))}
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  productsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  productText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
});

export default AddPostScreen;
