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

// History Screen Component
// const Calling = () => {
//   return (
// <<<<<<< HEAD
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text className="text-purple-500">History Tab</Text>
//       <Text className="text-green-700">HistoryScreen</Text>
//     </View>
//   );
// };

// export default Calling;





import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
// import { MessageCircle, ArrowLeft, ArrowRight, Save } from 'lucide-react-native';

const Calling=()=> {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    budget: '',
  });
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleInputChange = useCallback((name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleNext = useCallback(() => {
    setStep((prevStep) => Math.min(prevStep + 1, 3));
  }, []);

  const handlePrevious = useCallback(() => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  }, []);

  const handleSave = useCallback(() => {
    console.log('Saving data:', formData);
    setIsOpen(false);
    setStep(1);
    bottomSheetRef.current?.close();
    // Here you would typically send the data to your backend
  }, [formData]);

  const renderStep = useCallback(() => {
    switch (step) {
      case 1:
        return (
          <View className="mb-4">
            <Text className="text-base mb-2">Name</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-2"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Enter your name"
            />
          </View>
        );
      case 2:
        return (
          <View className="mb-4">
            <Text className="text-base mb-2">Address</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-2"
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
              placeholder="Enter your address"
            />
          </View>
        );
      case 3:
        return (
          <View className="mb-4">
            <Text className="text-base mb-2">Budget</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-2"
              value={formData.budget}
              onChangeText={(value) => handleInputChange('budget', value)}
              placeholder="Enter your budget"
              keyboardType="numeric"
            />
          </View>
        );
      default:
        return null;
    }
  }, [step, formData, handleInputChange]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-row justify-between items-center p-4 bg-blue-500">
          <Text className="text-xl font-bold text-white">Inbox</Text>
          <TouchableOpacity
            className="flex-row items-center bg-white bg-opacity-30 px-3 py-2 rounded-full"
            onPress={() => {
              setIsOpen(true);
              bottomSheetRef.current?.expand();
            }}
          >
            {/* <MessageCircle size={20} color="#fff" /> */}
            <Text className="text-white ml-2">Meeting</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1">
          <Text className="text-center mt-5 text-gray-500">Your inbox messages will appear here</Text>
        </ScrollView>

        <View className="flex-row items-center p-2 border-t border-gray-200 bg-white">
          <TextInput
            className="flex-1 h-10 border border-gray-300 rounded-full px-4 mr-2"
            placeholder="Type a message..."
          />
          <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-full">
            <Text className="text-white font-bold">Send</Text>
          </TouchableOpacity>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={['70%']}
          enablePanDownToClose={true}
          onClose={() => setIsOpen(false)}
        >
          <View className="flex-1 p-4">
            <Text className="text-xl font-bold mb-4">Meeting Details</Text>
            <View className="flex-row justify-between mb-6">
              {[1, 2, 3].map((i) => (
                <View key={i} className="flex-1 items-center">
                  <Text
                    className={`${
                      i === step ? 'text-blue-500 font-bold' : 'text-gray-400'
                    }`}
                  >
                    Step {i}
                  </Text>
                </View>
              ))}
            </View>
            <ScrollView className="flex-1">
              {renderStep()}
            </ScrollView>
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                className={`flex-row items-center ${
                  step === 1 ? 'bg-gray-300' : 'bg-blue-500'
                } px-4 py-2 rounded-lg`}
                onPress={handlePrevious}
                disabled={step === 1}
              >
                {/* <ArrowLeft size={20} color="#fff" /> */}
                <Text className="text-white font-bold ml-2">Previous</Text>
              </TouchableOpacity>
              {step < 3 ? (
                <TouchableOpacity
                  className="flex-row items-center bg-blue-500 px-4 py-2 rounded-lg"
                  onPress={handleNext}
                >
                  <Text className="text-white font-bold mr-2">Next</Text>
                  {/* <ArrowRight size={20} color="#fff" /> */}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="flex-row items-center bg-blue-500 px-4 py-2 rounded-lg"
                  onPress={handleSave}
                >
                  <Text className="text-white font-bold mr-2">Save</Text>
                  {/* <Save size={20} color="#fff" /> */}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </BottomSheet>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export default Calling



