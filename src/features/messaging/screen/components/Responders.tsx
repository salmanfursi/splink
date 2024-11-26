// import React from 'react';
// import { TextInput } from 'react-native';
// import {Text, TouchableOpacity, View} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';


// const Responders = () => {
//   return (
//     <View className="flex-row items-center p-2 border-t border-gray-200 bg-white">
//       <TouchableOpacity className="px-2 py-2 rounded-full text-blue-400">
//         <Text className="text-blue-400">
//           <Icon name="attach-file" size={24} />
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity className="px-2 py-2 rounded-full text-blue-400">
//         <Text className="text-blue-400">
//           <Icon name="mic" size={24} />
//         </Text>
//       </TouchableOpacity>
//       <TextInput
//         className="flex-1 h-10 border text-gray-600 font-sans border-gray-300 rounded-full px-4 mr-2"
//         placeholder="Type a message..."
//       />
//       <TouchableOpacity className="px-2 py-2 rounded-full text-blue-400">
//         <Text className="text-blue-400">
//           <Icon name="send" size={24} />
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Responders;


import React, { useState } from 'react';
import { TextInput, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSendMessageMutation } from '../../../../redux/message/messageApi';
 
const Responders = ({ leadId }) => {
    console.log('near the input----->',leadId)
  const [message, setMessage] = useState('');
  const [sendMessage, { isLoading }] = useSendMessageMutation(); // Hook to call the API

  const handleSendMessage = async () => {
    if (message.trim() === '') {
      return;
    }
    try {
      await sendMessage({
        leadId,
        messageType: 'text',
        content: { text: message },
      }).unwrap();

      setMessage(''); // Clear the input after sending
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <View className="flex-row items-center p-2 border-t border-gray-200 bg-white">
      {/* Attach File Icon */}
      <TouchableOpacity className="px-2 py-2 rounded-full text-blue-400">
        <Text className="text-blue-500">
          <Icon name="attach-file" size={24} />
        </Text>
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
        disabled={isLoading} // Disable button when sending
      >
        {/* <Text className={`${isLoading }?  "text-blue-200 " : text-blue-400 `}> */}
        <Text className={`${isLoading ? "text-blue-200" : "text-blue-500"}`}>
          <Icon name="send" size={24} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Responders;
