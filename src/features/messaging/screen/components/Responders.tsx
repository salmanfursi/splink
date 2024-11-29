
// import React, { useState } from 'react';
// import { TextInput, Text, TouchableOpacity, View } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useSendMessageMutation } from '../../../../redux/message/messageApi';
 
// const Responders = ({ leadId }) => {
//     // console.log('near the input----->',leadId)
//   const [message, setMessage] = useState('');
//   const [sendMessage, { isLoading }] = useSendMessageMutation(); // Hook to call the API

//   const handleSendMessage = async () => {
//     if (message.trim() === '') {
//       return;
//     }
//     try {
//       await sendMessage({
//         leadId,
//         messageType: 'text',
//         content: { text: message },
//       }).unwrap();

//       setMessage(''); // Clear the input after sending
//     } catch (error) {
//       console.error('Failed to send message:', error);
//     }
//   };

//   return (
//     <View className="flex-row items-center p-2 border-t border-gray-200 bg-white">
//       {/* Attach File Icon */}
//       <TouchableOpacity className="px-2 py-2 rounded-full text-blue-400">
//         <Text className="text-blue-500">
//           <Icon name="attach-file" size={24} />
//         </Text>
//       </TouchableOpacity>

//       {/* Mic Icon */}
//       <TouchableOpacity className="px-2 py-2 rounded-full text-blue-400">
//         <Text className="text-blue-500">
//           <Icon name="mic" size={24} />
//         </Text>
//       </TouchableOpacity>

//       {/* Text Input */}
//       <TextInput
//         className="flex-1 h-10 border text-gray-600 font-sans border-gray-300 rounded-full px-4 mr-2"
//         placeholder="Type a message..."
//         value={message}
//         onChangeText={setMessage}
//       />

//       {/* Send Button */}
//       <TouchableOpacity
//         className="px-2 py-2 rounded-full  "
//         onPress={handleSendMessage}
//         disabled={isLoading} // Disable button when sending
//       >
//         {/* <Text className={`${isLoading }?  "text-blue-200 " : text-blue-400 `}> */}
//         <Text className={`${isLoading ? "text-blue-200" : "text-blue-500"}`}>
//           <Icon name="send" size={24} />
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Responders;












import React, { useState } from 'react';
import { 
  TextInput, 
  Text, 
  TouchableOpacity, 
  View, 
  Alert, 
  Platform 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
// import axios from 'axios'; // For file upload

import { 
  useSendMessageMutation, 
  useSendFileMessageMutation 
} from '../../../../redux/message/messageApi';
 
const Responders = ({ leadId }) => {
  const [message, setMessage] = useState('');
  const [sendMessage, { isLoading: isTextLoading }] = useSendMessageMutation();
  const [sendFileMessage, { isLoading: isFileLoading }] = useSendFileMessageMutation();

  // Handle text message send
  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    
    try {
      await sendMessage({
        leadId,
        messageType: 'text',
        content: { text: message },
      }).unwrap();

      setMessage(''); // Clear input after sending
    } catch (error) {
      console.error('Failed to send message:', error);
      Alert.alert('Error', 'Failed to send message');
    }
  };

  // Handle file attachment
  const handleAttachFile = async () => {
    try {
      // Open document picker
      const pickerResult = await DocumentPicker.pickSingle({
        allowMultiSelection: false,
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.audio,
          DocumentPicker.types.video,
          DocumentPicker.types.allFiles
        ],
      });

      // Validate file size (e.g., max 10MB)
      if (pickerResult.size > 10 * 1024 * 1024) {
        Alert.alert('Error', 'File size exceeds 10MB');
        return;
      }

      // Create FormData for upload
      const formData = new FormData();
      formData.append('file', {
        uri: Platform.OS === 'android' 
          ? pickerResult.uri 
          : pickerResult.uri.replace('file://', ''),
        type: pickerResult.type,
        name: pickerResult.name
      });

      // Upload to your preferred file hosting service
      // Example with a hypothetical file upload endpoint
      const uploadResponse = await axios.post('YOUR_FILE_UPLOAD_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Determine message type based on file type
      let messageType;
      if (pickerResult.type.startsWith('image/')) messageType = 'image';
      else if (pickerResult.type.startsWith('audio/')) messageType = 'audio';
      else if (pickerResult.type.startsWith('video/')) messageType = 'video';
      else messageType = 'file';

      // Send message with file URL
      await sendFileMessage({
        leadId,
        file: {
          type: pickerResult.type,
          cloudinaryUrl: uploadResponse.data.url // URL from upload response
        }
      }).unwrap();

      Alert.alert('Success', 'File sent successfully');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.error('File upload error:', err);
        Alert.alert('Error', 'Failed to upload file');
      }
    }
  };

  return (
    <View className="flex-row items-center p-2 border-t border-gray-200 bg-white">
      {/* Attach File Icon */}
      <TouchableOpacity 
        className="px-2 py-2 rounded-full"
        onPress={handleAttachFile}
        disabled={isFileLoading}
      >
        <Icon 
          name="attach-file" 
          size={24} 
          color={isFileLoading ? "#A0AEC0" : "#3B82F6"} 
        />
      </TouchableOpacity>

      {/* Other components remain the same */}
      {/* ... */}
    </View>
  );
};

export default Responders;