// import React, { useState } from 'react';
// import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// // Import AppIntroSlider from its source or library
// // Assuming it's from react-native-app-intro-slider
// import AppIntroSlider from 'react-native-app-intro-slider';
// import SignInScreen from '../LoginScreen/SignInScreen';
// import SignUpScreen from '../LoginScreen/SignUpScreen';

// export default function App() {
//   const navigation = useNavigation();
//   const [showSlider, setShowSlider] = useState(false);

//   const slides = [
//     {
//       key: '1',
//       image: require('../assets/images/undraw_Online_shopping_re_k1sv.png'),
//       title: 'Explore Your Beauty',
//       backgroundColor: '#59b2ab',
//     },
//     {
//       key: '2',
//       image: require('../assets/images/undraw_Shopping_re_hdd9.png'),
//       backgroundColor: '#febe29',
//     },
//   ];

//   const handleDone = () => {
//     setShowSlider(false);
//     navigation.navigate('SignInScreen');
//   };

//   return (
//     <ScrollView>
//       <View>
//         {showSlider? (
//           <AppIntroSlider
//             data={slides}
//             renderItem={({ item }) => (
//               <View style={{ flex: 1 }}>
//                 <Image
//                   resizeMode="cover"
//                   source={item.image}
//                   style={{ width: '100%', height: '50%' }}
//                 />
//                 <Text style={{ textAlign: 'center', marginTop: 10 }}>{item.title}</Text>
//               </View>
//             )}
//             renderNextButton={() => (
//               <TouchableOpacity onPress={() => console.log('Next')}>
//                 <Text style={{ fontSize: 20, fontFamily: 'Raleway-ExtraBoldItalic' }}>Next</Text>
//               </TouchableOpacity>
//             )}
//             renderDoneButton={() => (
//               <TouchableOpacity onPress={handleDone}>
//                 <Text style={{ fontSize: 20, fontFamily: 'Raleway-ExtraBoldItalic' }}>Done</Text>
//               </TouchableOpacity>
//             )}
//             onSlideChange={(index) => {
//               console.log(`Current slide ${index + 1}`);
//             }}
//           />
//         ) : (
//           <View>
//            <SignUpScreen/>
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// }



import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BoardingScreen = () => {
  return (
    <View>
      <Text>BoardingScreevereerfn</Text>
    </View>
  )
}

export default BoardingScreen

const styles = StyleSheet.create({})
