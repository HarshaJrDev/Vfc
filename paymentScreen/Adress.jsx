import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
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
    <View style={styles.container}>
      <Text style={styles.title}>Add New Post</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={post.fname}
        onChangeText={text => handleChangeText('fname', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={post.mobilenumber}
        onChangeText={text => handleChangeText('mobilenumber', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="House Address"
        value={post.houseadress}
        onChangeText={text => handleChangeText('houseadress', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Area"
        value={post.Area}
        onChangeText={text => handleChangeText('Area', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={post.city}
        onChangeText={text => handleChangeText('city', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        value={post.pincode}
        onChangeText={text => handleChangeText('pincode', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={post.state}
        onChangeText={text => handleChangeText('state', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Landmark"
        value={post.Landmark}
        onChangeText={text => handleChangeText('Landmark', text)}
      />
      <Text>Products:</Text>
      {products.map((product, index) => (
        <Text key={index}>
          {product.title} (x{product.quantity})
        </Text>
      ))}
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default AddPostScreen;
