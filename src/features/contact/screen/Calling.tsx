// import React, { useState, useCallback, useRef } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import {
//   BottomSheetModal,
//   BottomSheetModalProvider,
//   BottomSheetView,
// } from '@gorhom/bottom-sheet';

// const App = () => {
//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);
//   const [page, setPage] = useState(0);
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     slot: '',
//     budget: '',
//   });

//   const snapPoints = ['70%'];

//   const handlePresentModalPress = useCallback(() => {
//     bottomSheetModalRef.current?.present();
//   }, []);

//   const handleInputChange = useCallback((field: string, value: string) => {
//     setFormData(prevData => ({...prevData, [field]: value}));
//   }, []);

//   const handleNext = useCallback(() => {
//     if (page === 0 && (!formData.name || !formData.address)) {
//       Alert.alert('Error', 'Please fill in all fields before proceeding.');
//       return;
//     }
//     if (page < 2) setPage(page + 1);
//   }, [page, formData]);

//   const handlePrevious = useCallback(() => {
//     if (page > 0) setPage(page - 1);
//   }, [page]);

//   const handleSave = useCallback(() => {
//     if (!formData.slot || !formData.budget) {
//       Alert.alert('Error', 'Please fill in all fields before saving.');
//       return;
//     }
//     console.log('Form Data:', formData);
//     bottomSheetModalRef.current?.dismiss();
//     setPage(0); // Reset to the first page
//     setFormData({ name: '', address: '', slot: '', budget: '' }); // Reset form data
//   }, [formData]);

//   const renderPage = () => {
//     switch (page) {
//       case 0:
//         return (
//           <View className="flex-1">
//             <Text className="text-lg font-bold mb-2 text-gray-800">Name</Text>
//             <TextInput
//               className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-800 bg-white"
//               style={{ height: 50 }}
//               placeholder="Enter your name"
//               placeholderTextColor="#9CA3AF"
//               value={formData.name}
//               onChangeText={value => handleInputChange('name', value)}
//             />
//             <Text className="text-lg font-bold mb-2 text-gray-800">Address</Text>
//             <TextInput
//               className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-800 bg-white"
//               style={{ height: 50 }}
//               placeholder="Enter your Address"
//               placeholderTextColor="#9CA3AF"
//               value={formData.address}
//               onChangeText={value => handleInputChange('address', value)}
//             />
//           </View>
//         );
//       case 1:
//         return (
//           <View className="flex-1">
//             <Text className="text-lg font-bold mb-2 text-gray-800">Slot</Text>
//             <TextInput
//               className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-800 bg-white"
//               style={{ height: 50 }}
//               placeholder="Enter slot"
//               placeholderTextColor="#9CA3AF"
//               value={formData.slot}
//               onChangeText={value => handleInputChange('slot', value)}
//             />
//           </View>
//         );
//       case 2:
//         return (
//           <View className="flex-1">
//             <Text className="text-lg font-bold mb-2 text-gray-800">Budget</Text>
//             <TextInput
//               className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-800 bg-white"
//               style={{ height: 50 }}
//               placeholder="Enter budget"
//               placeholderTextColor="#9CA3AF"
//               value={formData.budget}
//               onChangeText={value => handleInputChange('budget', value)}
//               keyboardType="numeric"
//             />
//           </View>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <GestureHandlerRootView className="flex-1 justify-center bg-gray-100">
//       <BottomSheetModalProvider>
//         <View className="items-center">
//           <TouchableOpacity
//             onPress={handlePresentModalPress}
//             className="bg-blue-500 px-6 py-3 rounded-lg"
//           >
//             <Text className="text-white font-bold">Open Form</Text>
//           </TouchableOpacity>
//         </View>

//         <BottomSheetModal
//           ref={bottomSheetModalRef}
//           snapPoints={snapPoints}
//           enablePanDownToClose
//         >
//           <BottomSheetView className="flex-1 p-6 bg-white">
//             <Text className="text-2xl font-bold mb-6 text-center text-gray-800">
//               {page === 0 ? 'Personal Info' : page === 1 ? 'Slot Selection' : 'Budget'}
//             </Text>
//             {renderPage()}
//             <View className="flex-row justify-between mt-6">
//               {page > 0 && (
//                 <TouchableOpacity
//                   onPress={handlePrevious}
//                   className="bg-gray-300 px-6 py-3 rounded-lg"
//                 >
//                   <Text className="text-gray-800 font-bold">Previous</Text>
//                 </TouchableOpacity>
//               )}
//               {page < 2 ? (
//                 <TouchableOpacity
//                   onPress={handleNext}
//                   className="bg-blue-500 px-6 py-3 rounded-lg ml-auto"
//                 >
//                   <Text className="text-white font-bold">Next</Text>
//                 </TouchableOpacity>
//               ) : (
//                 <TouchableOpacity
//                   onPress={handleSave}
//                   className="bg-green-500 px-6 py-3 rounded-lg ml-auto"
//                 >
//                   <Text className="text-white font-bold">Save</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           </BottomSheetView>
//         </BottomSheetModal>
//       </BottomSheetModalProvider>
//     </GestureHandlerRootView>
//   );
// };

// export default App;

import React from 'react';
import { Text, View } from 'react-native';

const Calling = () => {
  return (
    <View>
      <Text className=' text-black'>calling</Text>
    </View>
  );
};

export default App;














// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const savedContacts = [
//   { id: '1', name: 'John Doe', number: '+1 234 567 890' },
//   { id: '2', name: 'Sarah Connor', number: '+1 987 654 321' },
//   { id: '3', name: 'Mike Ross', number: '+1 456 789 123' },
//   { id: '4', name: 'Rachel Green', number: '+1 321 654 987' },
//   { id: '5', name: 'Monica Geller', number: '+1 123 456 789' },
// ];

// export default function Calling() {
//   const [currentCall, setCurrentCall] = useState(null); // Stores the current call info
//   const [callStatus, setCallStatus] = useState('idle'); // 'idle', 'calling', 'ended'

//   const startCall = (contact) => {
//     setCurrentCall(contact);
//     setCallStatus('calling');
//   };

//   const endCall = () => {
//     setCallStatus('ended');
//     setTimeout(() => {
//       setCurrentCall(null);
//       setCallStatus('idle');
//     }, 2000); // Reset after 2 seconds
//   };

//   const renderContact = ({ item }) => (
//     <TouchableOpacity
//       style={styles.contactContainer}
//       onPress={() => startCall(item)}
//     >
//       <View style={styles.iconContainer}>
//         <Text style={styles.iconText}>{item.name[0]}</Text>
//       </View>
//       <View style={{ flex: 1 }}>
//         <Text style={styles.contactName}>{item.name}</Text>
//         <Text style={styles.contactNumber}>{item.number}</Text>
//       </View>
//       <Icon name="phone" size={24} color="#10b981" />
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {callStatus === 'idle' && (
//         <>
//           <Text style={styles.headerText}>Saved Contacts</Text>
//           <FlatList
//             data={savedContacts}
//             renderItem={renderContact}
//             keyExtractor={(item) => item.id}
//             contentContainerStyle={styles.contactList}
//           />
//         </>
//       )}

//       {callStatus === 'calling' && currentCall && (
//         <View style={styles.callScreen}>
//           <Text style={styles.callStatusText}>Calling...</Text>
//           <View style={styles.iconContainerLarge}>
//             <Text style={styles.iconTextLarge}>{currentCall.name[0]}</Text>
//           </View>
//           <Text style={styles.contactNameLarge}>{currentCall.name}</Text>
//           <Text style={styles.contactNumberLarge}>{currentCall.number}</Text>
//           <TouchableOpacity style={styles.endCallButton} onPress={endCall}>
//             <Icon name="call-end" size={28} color="white" />
//             <Text style={styles.endCallText}>End Call</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {callStatus === 'ended' && currentCall && (
//         <View style={styles.callScreen}>
//           <Text style={styles.callStatusText}>Call Ended</Text>
//           <View style={styles.iconContainerLarge}>
//             <Icon name="call-end" size={48} color="#9ca3af" />
//           </View>
//           <Text style={styles.contactNameLarge}>{currentCall.name}</Text>
//           <Text style={styles.contactNumberLarge}>{currentCall.number}</Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fafb',
//     padding: 16,
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#111827',
//   },
//   contactList: {
//     paddingBottom: 16,
//   },
//   contactContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 12,
//     elevation: 2,
//   },
//   iconContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: '#3b82f6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   iconText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   contactName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#111827',
//   },
//   contactNumber: {
//     fontSize: 14,
//     color: '#6b7280',
//   },
//   callScreen: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   callStatusText: {
//     fontSize: 18,
//     color: '#6b7280',
//     marginBottom: 16,
//   },
//   iconContainerLarge: {
//     width: 96,
//     height: 96,
//     borderRadius: 48,
//     backgroundColor: '#3b82f6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   iconTextLarge: {
//     color: 'white',
//     fontSize: 36,
//     fontWeight: 'bold',
//   },
//   contactNameLarge: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginBottom: 8,
//   },
//   contactNumberLarge: {
//     fontSize: 18,
//     color: '#6b7280',
//   },
//   endCallButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ef4444',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 24,
//     marginTop: 32,
//   },
//   endCallText: {
//     color: 'white',
//     fontSize: 16,
//     marginLeft: 8,
//   },
// });
