import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useGetConversationMessagesQuery} from '../../../redux/conversation/conversationApi';
 
export default function Inbox() {
  const route = useRoute();
  const {conversationId} = route.params;
  const [message, setMessage] = useState('');
  const flatListRef = useRef(null);

  // Fetch conversation messages using RTK Query
  const {
    data: conversation,
    isLoading,
    error,
  } = useGetConversationMessagesQuery(conversationId);

  // Scroll to the bottom whenever new messages are loaded
  useEffect(() => {
    if (conversation?.messages) {
      flatListRef.current?.scrollToEnd({animated: true});
    }
  }, [conversation]);

  // Handle loading state
  if (isLoading) {
    return (
      <Text className="text-gray-500 text-center mt-4">
        Loading messages...
      </Text>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Text className="text-red-500 text-center mt-4">
        Error: {error.message}
      </Text>
    );
  }

  // Sort messages from oldest to newest (ascending order)
  const sortedMessages = conversation?.messages
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Render each message item styled like a chat bubble
  const renderMessage = ({item}) => (
    <View
      className={`max-w-3/4 rounded-lg px-3 py-2 my-1 ${
        item.sentByMe ? 'bg-green-100 self-end' : 'bg-white self-start'
      }`}>
      <Text className="text-base text-gray-800">{item.content}</Text>
      <Text className="text-xs text-gray-500 text-right mt-1">
        {new Date(item.date).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );

  const handleInteraction = (action: 'send' | 'attachment' | 'voice') => {
    switch (action) {
      case 'send':
        console.log('Sending message:', message);
        setMessage('');
        break;
      case 'attachment':
        console.log('Opening attachment options');
        break;
      case 'voice':
        console.log('Starting voice recording');
        break;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <View className="flex-1 bg-gray-200">
        <FlatList
          ref={flatListRef}
          data={sortedMessages}
          keyExtractor={item => item.messageId}
          renderItem={renderMessage}
          contentContainerStyle={{paddingHorizontal: 10, paddingBottom: 10}}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({animated: true})
          } // Scrolls to bottom when new content is added
        />

        <View className="flex-row items-center p-2 bg-gray-300 border-t border-gray-200">
          <TextInput
            className="flex-1 bg-white text-black rounded-full px-4 py-2 mx-2 text-base"
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            multiline
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
