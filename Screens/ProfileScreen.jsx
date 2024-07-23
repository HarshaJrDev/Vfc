// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React from 'react';
// import { useNavigation,useRoute } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// const ProfileScreen = () => {
//   const route = useRoute()
//   const { Signinname, Signinemail } = route.params;
//   const navigation = useNavigation();

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem('jwtToken');
//     navigation.replace('SignInScreen');
//   };

//   return (
//     <View style={styles.container}>
//          <Text style={styles.profileText}>Profile Details</Text>
//         <Text style={styles.detailText}>Name: {Signinname}</Text>
//         <Text style={styles.detailText}>Email: {Signinemail}</Text>
//       <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logoutButton: {
//     backgroundColor: '#ff6347',
//     padding: 10,
//     borderRadius: 5,
//   },
//   logoutText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   profileContainer: {
//     padding: 20,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//     width: '80%',
//   },
//   profileText: {
//     fontSize: 24,
//     fontFamily: 'Lato-Bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   detailText: {
//     fontSize: 18,
//     fontFamily: 'Lato-Regular',
//     marginBottom: 5,
//   },
// });


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfileScreen = () => {
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})