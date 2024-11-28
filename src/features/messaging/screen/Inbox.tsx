import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import { useGetConversationMessagesQuery} from '../../../redux/conversation/conversationApi';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Responders from './components/Responders';

export default function Inbox() {
  const navigation = useNavigation();
  const route = useRoute();
  const {conversationId,lead} = route.params;
  const [message, setMessage] = useState('');
  const flatListRef = useRef(null);

  const leads = lead.find((l) => l._id === conversationId);
  console.log('from inbox page',leads.name)

  // Fetch conversation messages using RTK Query
  const {
    data: conversation,
    isLoading,
    error,
  } = useGetConversationMessagesQuery(conversationId);
// console.log('inbox page for lead name',conversation)
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <View className="flex-1 bg-gray-200">
        <View className="bg-blue-400 p-4 flex-row justify-between">
          <View className="flex-row gap-2 items-center ">
            <Text
              onPress={() => navigation.goBack()}
              className="text-2xl font-bold text-white">
              <Icon name="arrow-back" size={24} />
            </Text>
            <Image
              source={require('../../../assets/836.jpg')}
              className="rounded-full h-10 w-10"
            />
            <View className="flex-col item-center">
              <Text className="font-bold text-lg text-white">{leads.name}</Text>
              <Text className="font-bold ">{leads?.status}</Text>
            </View>
          </View>
          {/* drop should appear bottom sheet modal ok  */}
          <View className="flex-row items-center gap-3">
            {['call', 'event', 'info'].map((iconName, index) => (
              <Icon key={index} name={iconName} size={24} color="#fff" />
            ))}
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={sortedMessages}
          keyExtractor={item => item.messageId}
          renderItem={renderMessage}
          contentContainerStyle={{paddingHorizontal: 10, paddingBottom: 10}}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({animated: true})
          }
        />

        <Responders leadId={conversationId} />
      </View>
    </KeyboardAvoidingView>
  );
}
