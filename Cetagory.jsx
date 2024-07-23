import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Category = () => {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState('All');

  const handlePress = (category) => {
    setActiveButton(category);
    // Navigate to different screens based on category
    switch (category) {
      case 'Shirt':
        navigation.navigate('Shirt');
        break;
      case 'Topes':
        navigation.navigate('Shirt');
        break;
      case 'Kurtha':
        navigation.navigate('Shirt');
        break;
      case 'Bags':
        navigation.navigate('Shirt');
        break;
      case 'Lipstick':
        navigation.navigate('Shirt');
        break;
      default:
        // Handle 'All' or any other category navigation
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, activeButton === 'All' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => handlePress('All')}
        >
          <Text style={activeButton === 'All' ? styles.activeButtonText : styles.inactiveButtonText}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, activeButton === 'Shirt' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => handlePress('Shirt')}
        >
          <Text style={activeButton === 'Shirt' ? styles.activeButtonText : styles.inactiveButtonText}>
            Shirt
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, activeButton === 'Topes' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => handlePress('Topes')}
        >
          <Text style={activeButton === 'Topes' ? styles.activeButtonText : styles.inactiveButtonText}>
            Topes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, activeButton === 'Kurtha' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => handlePress('Kurtha')}
        >
          <Text style={activeButton === 'Kurtha' ? styles.activeButtonText : styles.inactiveButtonText}>
            Kurtha
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, activeButton === 'Bags' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => handlePress('Bags')}
        >
          <Text style={activeButton === 'Bags' ? styles.activeButtonText : styles.inactiveButtonText}>
            Bags
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, activeButton === 'Lipstick' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => handlePress('Lipstick')}
        >
          <Text style={activeButton === 'Lipstick' ? styles.activeButtonText : styles.inactiveButtonText}>
            Lipstick
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 25,
    fontFamily: 'Lato-Bold',
  },
  viewAllText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Light',
    fontWeight: '100',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  activeButton: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  inactiveButton: {
    backgroundColor: 'transparent',
    borderColor: 'grey',
  },
  activeButtonText: {
    color: 'white',
  },
  inactiveButtonText: {
    color: 'black',
  },
});
