import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [Signinname, setSigninname] = useState('');
  const [Signinemail, setSigninemail] = useState('');
  const [Signinpassword, setSigninpassword] = useState('');
  const [confirmSigninpassword, setConfirmSigninpassword] = useState('');

  const handleSignUp = async () => {
   
    try {
      if (
        Signinpassword.length >= 8 &&
        confirmSigninpassword === Signinpassword &&
        Signinemail.trim() !== '' &&
        Signinname.trim() !== ''
      ) {
        const response = await axios.post('http://localhost:4000/api/signup', {
          Signinname,
          Signinemail,
          Signinpassword,
        });

        console.log('Sign Up Response:', response);

        if (response.status === 201) {
          Alert.alert({message:"Successfully Create a account"})
          navigation.navigate('HomeScreen')


        } else {
          Alert.alert(
            'Sign Up Failed',
            'Failed to create account. Please try again.',
          );
        }
      } else {
        Alert.alert(
          'Validation Error',
          'Please fill in all details correctly.',
        );
      }
    } catch (error) {
      console.error('Sign Up Error:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  return (
    <SafeAreaView>
      <View style={{marginTop: 100, marginLeft: 25, marginRight: 25}}>
        <Text style={{fontFamily: 'Lato-Thin', fontSize: 30, color: 'gray'}}>
          Hello!
        </Text>
        <Text style={{fontFamily: 'Lato-Thin', fontSize: 30}}>
          Welcome Back
        </Text>

        <View style={{gap: 20, marginTop: 20}}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={setSigninname}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setSigninemail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setSigninpassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={setConfirmSigninpassword}
          />

          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={[styles.signInText, styles.signInLink]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.3,
    height: 40,
    borderRadius: 10,
    paddingLeft: 20,
  },
  button: {
    backgroundColor: '#303030',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Lato-Thin',
    color: '#fff',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    fontFamily: 'Lato-Thin',
    fontSize: 15,
    color: 'gray',
  },
  signInLink: {
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
