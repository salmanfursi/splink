
import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';

const Calling = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const bottomSheetRef = useRef(null);
  const [message, setMessage] = useState('');

  // Handles switching to the next step
  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  // Handles switching to the previous step
  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  // Handles the save action at the final step
  const handleSave = () => {
    console.log('Meeting details saved!');
    setStep(1);
    setIsOpen(false);
    bottomSheetRef.current?.close();
  };

  // Renders the content for each step
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Text>Step 1: Enter meeting title</Text>;
      case 2:
        return <Text>Step 2: Add participants</Text>;
      case 3:
        return <Text>Step 3: Schedule the meeting</Text>;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row justify-between items-center p-4 bg-blue-500">
          <Text className="text-xl font-bold text-white">Inbox</Text>
          <TouchableOpacity
            className="flex-row items-center bg-white bg-opacity-30 px-3 py-2 rounded-full"
            onPress={() => {
              setIsOpen(true);
              bottomSheetRef.current?.expand();
            }}
          >
            <Text className="text-white ml-2">Meeting</Text>
          </TouchableOpacity>
        </View>

        {/* Message List */}
        <ScrollView className="flex-1">
          <Text className="text-center mt-5 text-gray-500">
            Your inbox messages will appear here
          </Text>
        </ScrollView>

        {/* Message Input */}
        <View className="flex-row items-center p-2 border-t border-gray-200 bg-white">
          <TextInput
            className="flex-1 h-10 border border-gray-300 rounded-full px-4 mr-2"
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-full"
            onPress={() => {
              if (message) {
                console.log('Message sent:', message);
                setMessage('');
              }
            }}
          >
            <Text className="text-white font-bold">Send</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Sheet */}
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
            <ScrollView className="flex-1">{renderStep()}</ScrollView>
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                className={`flex-row items-center ${
                  step === 1 ? 'bg-gray-300' : 'bg-blue-500'
                } px-4 py-2 rounded-lg`}
                onPress={handlePrevious}
                disabled={step === 1}
              >
                <Text className="text-white font-bold ml-2">Previous</Text>
              </TouchableOpacity>
              {step < 3 ? (
                <TouchableOpacity
                  className="flex-row items-center bg-blue-500 px-4 py-2 rounded-lg"
                  onPress={handleNext}
                >
                  <Text className="text-white font-bold mr-2">Next</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="flex-row items-center bg-blue-500 px-4 py-2 rounded-lg"
                  onPress={handleSave}
                >
                  <Text className="text-white font-bold mr-2">Save</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </BottomSheet>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Calling;
