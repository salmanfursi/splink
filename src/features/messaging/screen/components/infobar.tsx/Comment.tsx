import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAddCommentMutation} from '../../../../../redux/inboxInfoBar/infobarApi';
import {useGetSingleLeadQuery} from '../../../../../redux/conversation/conversationApi';
import {useSelector} from 'react-redux';

const Comment = ({conversationId}) => {
  const [comment, setComment] = useState('');
  const [commentsData, setCommentsData] = useState([]);

   const token = useSelector(state => state.auth.token);
  // console.log("token is hare------->",token);
  // const token = await AsyncStorage.getItem('token');
  // const user = await AsyncStorage.getItem('user');
  // console.log('token', token, 'user', user);
  console.log('state of commentsData-------->',commentsData);
  const {
    data: singleLead,
    isLoading,
    isError,
  } = useGetSingleLeadQuery(conversationId, {skip: !conversationId});
  const [addComment] = useAddCommentMutation();

  // console.log('singleLead-------->',singleLead?.comment[0].comment);

  useEffect(() => {
    
    if (singleLead) {

      // console.log('---------comments---->',singleLead?.comment);
      singleLead?.comments.map(comments => {
        // setCommentsData(comments?.comment);
        console.log('---------comments---->',comments);
      })
      
    }

  }, [singleLead]);


  const handleAddComment = async () => {
    try {
      const commentData = {
        comment: comment,
        images: [],
      };

      const result = await addComment({
        id: conversationId,
        comment: commentData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('result---->', result);
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  return (
    <View className="bg-gray-50 rounded-lg p-4 shadow-md w-full">
      {/* Comment Input Section */}
      <View className="flex-row items-center mb-4">
        <TextInput
          className="flex-1 text-black bg-white border border-gray-200 rounded-xl px-4 py-2 mr-3"
          placeholder="Add a comment?..."
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity
          className="bg-blue-500 rounded-full w-10 h-10 items-center justify-center"
          onPress={handleAddComment}>
          <Text className="text-white">➤</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Comments Section */}
      <View className="bg-white rounded-lg p-3">
        {/* {commentsData && commentsData?.length > 0 ? (
          <>
            {commentsData?.slice(0, 2).map(item => (
              <View
                key={item?.id}
                className="pb-2 mb-2 border-b border-gray-100">
                <Text className="text-gray-700 text-sm">{item?.text}</Text>
              </View>
            ))} */}

            {/* {commentsData.length > 2 && ( */}
            {commentsData.length > 0 && (
              <TouchableOpacity
                className="w-full items-center mt-2"
                onPress={() => {
                  // Navigate to full comments view or perform an action
                }}>
                <Text className="text-blue-600 font-semibold">
                  Show all {commentsData} comments

                </Text>
              </TouchableOpacity>
        //     )}
        //   </>
        // ) : (
        //   // Show message if no comments found
        //   <Text className="text-gray-500 text-center">
        //     There are no comments yet.
        //   </Text>
        )}
      </View>
    </View>
  );
};

export default Comment;
