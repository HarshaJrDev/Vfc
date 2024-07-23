import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Share,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem } from '../slices/cartSlice';

const ProductDetailsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { item, image } = route.params;
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const addToCart = () => {
    if (selectedSize && selectedColor) {
      const itemToAdd = { ...item, size: selectedSize, color: selectedColor };
      dispatch(addItem(itemToAdd));
      Alert.alert('Added to Cart', 'Your item has been added to the cart.');
    } else {
      Alert.alert('Selection Required', 'Please select size and color.');
    }
  };

  const shareProduct = async () => {
    try {
      const result = await Share.share({
        message: `Check out this product: ${item.title} - ${item.description} - $${item.price}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared via ${result.activityType}`);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing product:', error.message);
    }
  };

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'White', hexCode: '#FFFFFF' },
    { name: 'Blue', hexCode: '#3366CC' },
    { name: 'Green', hexCode: '#33CC99' },
    { name: 'Yellow', hexCode: '#FFCC00' },
  ];

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>Rs {item.price}</Text>
      </View>

      <View style={styles.selectionContainer}>
        <ScrollView
          
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonsContainer}>
          {sizes.map((size) => (
            
            <TouchableOpacity
              key={size}
              style={[
                styles.button,
                selectedSize === size ? styles.selectedButton : {},
              ]}
              onPress={() => handleSizeSelect(size)}>
              <Text
                style={[
                  styles.buttonText,
                  selectedSize === size ? styles.selectedButtonText : {},
                ]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.colorSelectionContainer}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color.name}
              style={[
                styles.colorButton,
                selectedColor === color.hexCode
                  ? styles.selectedColorButton
                  : {},
                { backgroundColor: color.hexCode },
              ]}
              onPress={() => handleColorSelect(color.hexCode)}>
              <Text
                style={[
                  styles.buttonText,
                  styles.colorButtonText,
                  selectedColor === color.hexCode
                    ? styles.selectedButtonText
                    : {},
                ]}>
                {color.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: selectedSize && selectedColor ? '#000' : '#ccc' },
          ]}
          onPress={addToCart}
          disabled={!selectedSize || !selectedColor}>
          <Text style={styles.buttonText}>
            {selectedSize && selectedColor ? 'Add to Cart' : 'Select Options'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.shareButton]}
          onPress={shareProduct}>
          <Text style={[styles.buttonText, styles.shareButtonText]}>
            Share Product
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    width: 300,
    height: 400,
    
    borderRadius: 10,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
    color: '#666',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'tomato',
  },
  selectionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 8,
  },
  selectedButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  selectedButtonText: {
    color: '#fff',
  },
  colorSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 12,
  },
  colorButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedColorButton: {
    borderColor: '#000',
  },
  colorButtonText: {
    textTransform: 'capitalize',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  shareButton: {
    backgroundColor: '#000',
  },
  shareButtonText: {
    color: '#fff',
  },
});

export default ProductDetailsScreen;
