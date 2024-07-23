import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';

import { useNavigation } from '@react-navigation/native';
const FinalView = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView>
      <View style={{position:"relative"}}>
        {/* <LottieView
          style={{height: 700, width: 400}}
          source={require('../assets/images/woman-shopping-online.json')}
          autoPlay
          loop
        /> */}
        <View>
          <Text style={{zIndex:10, top:-100,textAlign:"center",fontFamily: 'Lato-Bold',fontSize:23}}>Thank For Shoping Have a nice Day</Text>
          <TouchableOpacity  onPress={navigation.goBack("Home")}
          style={styles.button}>
            <Text style={styles.buttonText}>Back To Home</Text>
          </TouchableOpacity>
        </View>
      
        

        </View>
    </SafeAreaView>
  );
};

export default FinalView;

const styles = StyleSheet.create({
    button: {
        height: 50,
        backgroundColor: '#000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        top:-80
      },
      buttonText: {
        fontSize: 20,
        color: 'white',
      },
});
