import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
 
const MeetingBottomSheet = React.forwardRef(({ onClose }, ref) => {
  const snapPoints = ['50%', '90%']; // Define snap points for the bottom sheet
  

  return (
    <BottomSheet
      ref={ref}
      index={-1} // Hidden by default
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
    >
      <View className="flex-1 p-4">
        <Text className="text-xl font-bold mb-4">Meeting Details</Text>
        <ScrollView>
          <Text className="text-gray-500 mb-4">Step 1: Enter meeting title</Text>
          <Text className="text-gray-500 mb-4">Step 2: Add participants</Text>
          <Text className="text-gray-500">Step 3: Schedule the meeting</Text>
        </ScrollView>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-lg mt-4"
          onPress={onClose}
        >
          <Text className="text-white text-center font-bold">Close</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
});

export default MeetingBottomSheet;
