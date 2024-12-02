import React, {useState} from 'react';
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

import {
  useSendMessageMutation,
  useSendFileMessageMutation,
} from '../../../../redux/message/messageApi';
import RNBlobUtil from 'react-native-blob-util';
 
const Responders = ({leadId}) => {
  const [message, setMessage] = useState('');
  const [sendMessage, {isLoading: isTextLoading}] = useSendMessageMutation();
  const [sendFileMessage, {isLoading: isFileLoading}] =
    useSendFileMessageMutation();

  // Handle text message send
  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    try {
      await sendMessage({
        leadId,
        messageType: 'text',
        content: {text: message},
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
      // Pick a file
      const file = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.audio,
          DocumentPicker.types.video,
          DocumentPicker.types.allFiles,
        ],
      });
  
      if (!file || !file.uri) {
        throw new Error('File is invalid or missing URI');
      }
  
      console.log('Picked file:', file);
  
      // Resolve content URI to a local path for Android
      let filePath = file.uri;
      if (Platform.OS === 'android' && file.uri.startsWith('content://')) {
        const fileName = file.name || 'temp_file';
        const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  
        // Use RNBlobUtil to copy the file to the app's directory
        await RNBlobUtil.fs.cp(file.uri, destPath);
        filePath = destPath;
      }
  
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        Alert.alert('Error', 'File size exceeds 10MB');
        return;
      }
  
      // Create FormData
      const formData = new FormData();
      formData.append('file', {
        uri: filePath, // Use the resolved file path
        name: file.name,
        type: file.type,
      });
  
      // Make the API call
      const response = await sendFileMessage({
        leadId,
        file: formData,
      }).unwrap();
  
      Alert.alert('Success', 'File sent successfully');
    } catch (error) {
      console.error('File upload error:', error);
      Alert.alert('Error', `Failed to upload file: ${error.message}`);
    }
  };
  

  return (
    <View className="flex-row items-center p-2 border-t border-gray-200 bg-white">
      {/* Attach File Icon */}
      <TouchableOpacity
        className="px-2 py-2 rounded-full"
        onPress={handleAttachFile}
        disabled={isFileLoading}>
        <Icon
          name="attach-file"
          size={24}
          color={isFileLoading ? '#A0AEC0' : '#3B82F6'}
        />
      </TouchableOpacity>

      {/* Mic Icon */}
      <TouchableOpacity className="px-2 py-2 rounded-full text-blue-400">
        <Text className="text-blue-500">
          <Icon name="mic" size={24} />
        </Text>
      </TouchableOpacity>

      {/* Text Input */}
      <TextInput
        className="flex-1 h-10 border text-gray-600 font-sans border-gray-300 rounded-full px-4 mr-2"
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
      />

      {/* Send Button */}
      <TouchableOpacity
        className="px-2 py-2 rounded-full  "
        onPress={handleSendMessage}
        // disabled={isLoading} // Disable button when sending
      >
        {/* <Text className={`${isLoading }?  "text-blue-200 " : text-blue-400 `}> */}
        <Text className={`text-blue-500`}>
          <Icon name="send" size={24} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Responders;
