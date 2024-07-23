import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SignInScreen = () => {
  const navigation = useNavigation();
  const [Signinemail, setSigninemail] = useState('');
  const [Signinpassword, setSigninpassword] = useState('');

  useEffect(() => {
    const parentNavigator = navigation.getParent();
    if (parentNavigator) {
      parentNavigator.setOptions({ tabBarStyle: { display: 'none' } });
    }
    return () => {
      if (parentNavigator) {
        parentNavigator.setOptions({ tabBarStyle: { display: 'flex' } });
      }
    };
  }, [navigation]);


  const user = {
    Signinemail:Signinemail,
    Signinpassword:Signinpassword
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/signin', {
        Signinemail,Signinpassword
      });

      if (response.status === 200) {
        // await AsyncStorage.setItem('jwtToken', response.data.token);
        navigation.replace('HomeScreen');
      } else {
        Alert.alert('Login Failed', 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Login Failed', 'Unable to login. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/images/authentication-65.png')}
        />
        <Text style={styles.greetingText}>Hello!</Text>
        <Text style={styles.greetingText}>Welcome Back</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setSigninemail}
            value={Signinemail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={setSigninpassword}
            value={Signinpassword}
          />
          <TouchableOpacity onPress={() => navigation.navigate('ForgotScreen')}>
            <Text style={styles.forgotText}>Forgot Password</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={styles.signUpButton}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    marginTop: 50,
    marginLeft: 25,
    marginRight: 25,
  },
  image: {
    height: 250,
    width: '100%',
  },
  greetingText: {
    fontFamily: 'Lato-Thin',
    fontSize: 30,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 0.3,
    height: 40,
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 10,
  },
  forgotText: {
    textAlign: 'center',
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: '#303030',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 40,
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    justifyContent: 'center',
    marginTop: 12,
  },
  signUpButton: {
    height: 50,
    borderRadius: 10,
    borderWidth: 0.4,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  signUpButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#303030',
    justifyContent: 'center',
    marginTop: 14,
  },
});

export default SignInScreen;
