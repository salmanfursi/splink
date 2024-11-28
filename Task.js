/**
 * ----->module:1
 * 
 * 
sticky timeslot lagbe and salesteam ache 





 * realtime conversation  -------------done-----------
 * 2.conversaton page image show -------------done-----------
 * 1.conversation page infinty scrolling
 * ----->module:2
 * 3.inbox page message show properly with bottom first 
 * 4.send message , & attachment & show attachment send emojie show emojie reply(message and emojie)
 * ----->module:3
 * 5.call history & making call (multiple number show )& call recording   
 * 
 * ----->module:4
 * 6.meeting like google calender 
 * 
 * 
 * 
 * 
 * */ 










// import React, { useRef } from "react";
// import { View, Text, ScrollView } from "react-native";

// const timeSlots = ["10:00","11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00"];
// const salesTeam = [
//   "Supto", "Nyim", "Sahmak", "Tom", "Mon", "Toli", "Boli", 
//   "dfdf", "djj", "ygvd", "jhneds", "yhse", "cannol", "plant", "delew"
// ];

//  const CELL_WIDTH = 120;

// const Scheduler = () => {
//   const mainVerticalScrollRef = useRef(null);
//   const mainHorizontalScrollRef = useRef(null);
//   const syncVerticalScrollRef = useRef(null);
//   const syncHorizontalScrollRef = useRef(null);

//   // Synchronize vertical scrolling
//   const handleVerticalScroll = (event) => {
//     const offsetY = event.nativeEvent.contentOffset.y;
//     mainVerticalScrollRef.current?.scrollTo({ y: offsetY, animated: false });
//     syncVerticalScrollRef.current?.scrollTo({ y: offsetY, animated: false });
//   };

//   // Synchronize horizontal scrolling
//   const handleHorizontalScroll = (event) => {
//     const offsetX = event.nativeEvent.contentOffset.x;
//     mainHorizontalScrollRef.current?.scrollTo({ x: offsetX, animated: false });
//     syncHorizontalScrollRef.current?.scrollTo({ x: offsetX, animated: false });
//   };

//   return (
//     <View className="flex-1 bg-gray-100">
//       {/* Header Row */}
//       <View className="flex-row">
//         {/* Static Sales Team Header */}
//         <View className=" h-16 justify-center items-center bg-white border-b border-r border-gray-300">
//           <Text style={{ width: 120 }} className="text-center font-bold text-gray-700">Sales Team</Text>
//         </View>

//         {/* Scrollable Time Slots Header */}
//         <ScrollView
//           horizontal
//           ref={mainHorizontalScrollRef}
//           onScroll={handleHorizontalScroll}
//           scrollEventThrottle={8}
//           showsHorizontalScrollIndicator={false}
//           className="bg-white border-b border-gray-300"
//         >
//           <View className="flex-row">
//             {timeSlots.map((time, index) => (
//               <View
//                 key={index}
//                 className=" h-16 justify-center items-center border-r border-gray-300"
//                 style={{ width: CELL_WIDTH }}
//               >
//                 <Text className="font-bold text-gray-700 ">{time}</Text>
//               </View>
//             ))}
//           </View>
//         </ScrollView>
//       </View>

//       {/* Main Content Area */}
//       <View className="flex-1 flex-row">
//         {/* Sales Team Column */}
//         <ScrollView
//           ref={mainVerticalScrollRef}
//           onScroll={handleVerticalScroll}
//           scrollEventThrottle={8}
//           showsVerticalScrollIndicator={false}
//           className="bg-gray-400 border-r border-gray-300"
//         >
//           {salesTeam.map((member, index) => (
//             <View
//               key={index}
//               className=" h-16 justify-center items-center border-b border-gray-300"
              
//             >
//               <Text
//               style={{ width: 180 }} 
//               className="text-sm text-center text-gray-700">{member}</Text>
//             </View>
//           ))}
//         </ScrollView>

//         {/* Meeting Grid */}
//         <ScrollView
//           ref={syncHorizontalScrollRef}
//           horizontal
//           onScroll={handleHorizontalScroll}
//           scrollEventThrottle={8}
//           showsHorizontalScrollIndicator={false}
//          >
//           <ScrollView
//             ref={syncVerticalScrollRef}
//             onScroll={handleVerticalScroll}
//             scrollEventThrottle={8}
//             showsVerticalScrollIndicator={false}
//           >
//             <View>
//               {salesTeam.map((_, rowIndex) => (
//                 <View
//                   key={rowIndex}
//                   className="flex-row h-16"
//                   // style={{ height: CELL_HEIGHT }}
//                 >
//                   {timeSlots.map((_, colIndex) => (
//                     <View
//                       key={`${rowIndex}-${colIndex}`}
//                       className="border-r border-b border-gray-300 bg-white"
//                       style={{ width: CELL_WIDTH }}
                      
//                     >
//                       {/* Placeholder for meeting cards */}
//                     </View>
//                   ))}
//                 </View>
//               ))}
//             </View>
//           </ScrollView>
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// export default Scheduler;










// import React, { useRef, useCallback, useMemo } from "react";
// import { View, Text, ScrollView, Platform } from "react-native";

// // Constants
// const CELL_WIDTH = 120;
// const CELL_HEIGHT = 64; // Using a fixed height for better performance
// const HEADER_HEIGHT = 64;

// const TimeSlots = {
//   START: 10,
//   END: 18,
//   FORMAT: "h:mm A",
// };

// // Generate time slots more dynamically
// const generateTimeSlots = () => {
//   const slots = [];
//   for (let hour = TimeSlots.START; hour <= TimeSlots.END; hour++) {
//     slots.push(
//       new Date(new Date().setHours(hour, 0, 0, 0)).toLocaleTimeString('en-US', {
//         hour: 'numeric',
//         minute: '2-digit',
//       })
//     );
//   }
//   return slots;
// };

// const Scheduler = () => {
//   // Refs for scroll views
//   const mainVerticalScrollRef = useRef(null);
//   const mainHorizontalScrollRef = useRef(null);
//   const syncVerticalScrollRef = useRef(null);
//   const syncHorizontalScrollRef = useRef(null);

//   // Memoized data
//   const timeSlots = useMemo(() => generateTimeSlots(), []);
//   const salesTeam = useMemo(() => [
//     "Supto", "Nyim", "Sahmak", "Tom", "Mon", "Toli", "Boli",
//     "dfdf", "djj", "ygvd", "jhneds", "yhse", "cannol", "plant", "delew"
//   ], []);

//   // Optimized scroll handlers using useCallback
//   const handleVerticalScroll = useCallback(({ nativeEvent }) => {
//     const offsetY = nativeEvent.contentOffset.y;
//     if (mainVerticalScrollRef.current && syncVerticalScrollRef.current) {
//       Platform.OS === 'ios' 
//         ? requestAnimationFrame(() => {
//             mainVerticalScrollRef.current?.scrollTo({ y: offsetY, animated: false });
//             syncVerticalScrollRef.current?.scrollTo({ y: offsetY, animated: false });
//           })
//         : setTimeout(() => {
//             mainVerticalScrollRef.current?.scrollTo({ y: offsetY, animated: false });
//             syncVerticalScrollRef.current?.scrollTo({ y: offsetY, animated: false });
//           }, 0);
//     }
//   }, []);

//   const handleHorizontalScroll = useCallback(({ nativeEvent }) => {
//     const offsetX = nativeEvent.contentOffset.x;
//     if (mainHorizontalScrollRef.current && syncHorizontalScrollRef.current) {
//       Platform.OS === 'ios'
//         ? requestAnimationFrame(() => {
//             mainHorizontalScrollRef.current?.scrollTo({ x: offsetX, animated: false });
//             syncHorizontalScrollRef.current?.scrollTo({ x: offsetX, animated: false });
//           })
//         : setTimeout(() => {
//             mainHorizontalScrollRef.current?.scrollTo({ x: offsetX, animated: false });
//             syncHorizontalScrollRef.current?.scrollTo({ x: offsetX, animated: false });
//           }, 0);
//     }
//   }, []);

//   // Memoized cell renderer
//   const renderTimeSlotCell = useCallback((time, index) => (
//     <View
//       key={index}
//       className="justify-center items-center border-r border-blue-300"
//       style={{ width: CELL_WIDTH, height: HEADER_HEIGHT, backgroundColor: '#EBF8FF' }} // blue-100
//     >
//       <Text className="font-bold text-blue-700">{time}</Text>
//     </View>
//   ), []);

//   const renderTeamMemberCell = useCallback((member, index) => (
//     <View
//       key={index}
//       className="justify-center items-center border-b border-blue-300"
//       style={{ height: CELL_HEIGHT, backgroundColor: '#EBF8FF' }} // blue-100
//     >
//       <Text
//         style={{ width: CELL_WIDTH }}
//         className="text-sm text-center text-blue-700"
//         numberOfLines={1}
//         ellipsizeMode="tail"
//       >
//         {member}
//       </Text>
//     </View>
//   ), []);

//   const renderGridRow = useCallback((_, rowIndex) => (
//     <View
//       key={rowIndex}
//       className="flex-row"
//       style={{ height: CELL_HEIGHT }}
//     >
//       {timeSlots.map((_, colIndex) => (
//         <View
//           key={`${rowIndex}-${colIndex}`}
//           className="border-r border-b border-blue-300"
//           style={{ width: CELL_WIDTH, backgroundColor: '#F0F9FF' }} // blue-50
//         />
//       ))}
//     </View>
//   ), [timeSlots]);

//   return (
//     <View className="flex-1 bg-blue-200">
//       {/* Header Row */}
//       <View className="flex-row">
//         {/* Static Sales Team Header */}
//         <View 
//           className="justify-center items-center border-b border-r border-blue-300"
//           style={{ height: HEADER_HEIGHT, backgroundColor: '#BEE3F8' }} // blue-200
//         >
//           <Text className="w-[90px] text-center font-bold text-blue-700">Sales Team</Text>
//         </View>

//         {/* Scrollable Time Slots Header */}
//         <ScrollView
//           horizontal
//           ref={mainHorizontalScrollRef}
//           onScroll={handleHorizontalScroll}
//           scrollEventThrottle={16}
//           showsHorizontalScrollIndicator={false}
//           className="border-b border-blue-300"
//           style={{ backgroundColor: '#BEE3F8' }} // blue-200
//           removeClippedSubviews={Platform.OS === 'android'}
//         >
//           <View className="flex-row">
//             {timeSlots.map(renderTimeSlotCell)}
//           </View>
//         </ScrollView>
//       </View>

//       {/* Main Content Area */}
//       <View className="flex-1 flex-row">
//         {/* Sales Team Column */}
//         <ScrollView
//           ref={mainVerticalScrollRef}
//           onScroll={handleVerticalScroll}
//           scrollEventThrottle={16}
//           showsVerticalScrollIndicator={false}
//           className="border-r border-blue-300"
//           style={{ backgroundColor: '#EBF8FF' }} // blue-100
//           removeClippedSubviews={Platform.OS === 'android'}
//         >
//           {salesTeam.map(renderTeamMemberCell)}
//         </ScrollView>

//         {/* Meeting Grid */}
//         <ScrollView
//           ref={syncHorizontalScrollRef}
//           horizontal
//           onScroll={handleHorizontalScroll}
//           scrollEventThrottle={16}
//           showsHorizontalScrollIndicator={false}
//           removeClippedSubviews={Platform.OS === 'android'}
//         >
//           <ScrollView
//             ref={syncVerticalScrollRef}
//             onScroll={handleVerticalScroll}
//             scrollEventThrottle={16}
//             showsVerticalScrollIndicator={false}
//             removeClippedSubviews={Platform.OS === 'android'}
//           >
//             <View>
//               {salesTeam.map(renderGridRow)}
//             </View>
//           </ScrollView>
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// export default Scheduler;









// // reply message 
// Here’s a detailed suggestion to improve and extend the functionality of your messaging app:

// ---

// ### **Key Suggestions**

// #### 1. **Reply Feature**
// To enable a reply feature (like WhatsApp or Facebook Messenger):
// 1. **Track the Message Being Replied To**:
//    - Use state to keep track of the selected message for a reply.
//    ```javascript
//    const [replyingTo, setReplyingTo] = useState(null);
//    ```

// 2. **Allow Reply Selection**:
//    - Enable users to long-press a message to reply.
//    ```javascript
//    const handleReply = (message) => {
//      setReplyingTo(message);
//    };

//    <TouchableOpacity
//      onLongPress={() => handleReply(item)}
//    >
//      {renderMessage(item)}
//    </TouchableOpacity>;
//    ```

// 3. **Show the Reply Context**:
//    - Display the message being replied to above the input field.
//    ```javascript
//    {replyingTo && (
//      <View className="bg-gray-200 p-2 rounded mb-2">
//        <Text className="text-blue-400">Replying to: {replyingTo.content}</Text>
//        <TouchableOpacity onPress={() => setReplyingTo(null)}>
//          <Text className="text-red-500">Cancel</Text>
//        </TouchableOpacity>
//      </View>
//    )}
//    ```

// 4. **Update API Payload**:
//    - Include a `replyTo` field in the API call.
//    ```javascript
//    const handleSendMessage = async () => {
//      if (message.trim() === '') return;
//      try {
//        await sendMessage({
//          leadId,
//          messageType: 'text',
//          content: { text: message },
//          replyTo: replyingTo?.messageId, // Pass the ID of the replied message
//        }).unwrap();
//        setMessage('');
//        setReplyingTo(null); // Reset reply state
//      } catch (error) {
//        console.error('Failed to send message:', error);
//      }
//    };
//    ```

// 5. **Display Reply Context in Messages**:
//    - Check if a message has a `replyTo` field and show the quoted message in the UI.
//    ```javascript
//    {item.replyTo && (
//      <View className="bg-gray-100 p-2 rounded">
//        <Text className="text-gray-500">Replied to: {item.replyTo.content}</Text>
//      </View>
//    )}
//    ```

// ---

// #### 2. **Typing Indicator**
// Add a typing indicator to show when the user is typing:
// - Use state to track typing:
//   ```javascript
//   const [isTyping, setIsTyping] = useState(false);
//   ```
// - Detect typing activity:
//   ```javascript
//   const handleTyping = (text) => {
//     setMessage(text);
//     setIsTyping(true);
//     clearTimeout(typingTimeout);
//     typingTimeout = setTimeout(() => setIsTyping(false), 1000);
//   };
//   ```
// - Show the indicator in the UI:
//   ```javascript
//   {isTyping && (
//     <Text className="text-gray-500 text-center mb-2">User is typing...</Text>
//   )}
//   ```

// ---

// #### 3. **Improved UI for File Attachments**
// Enhance the file attachment functionality:
// - Add functionality to pick files using libraries like `react-native-document-picker` or `react-native-image-picker`.
//   ```javascript
//   const handleAttachFile = async () => {
//     try {
//       const result = await DocumentPicker.pickSingle();
//       console.log('File picked:', result);
//       // Add logic to send the file to the backend
//     } catch (err) {
//       console.error('Error picking file:', err);
//     }
//   };
//   ```

// - Update the `TouchableOpacity` for the attachment button:
//   ```javascript
//   <TouchableOpacity onPress={handleAttachFile} className="px-2 py-2 rounded-full text-blue-400">
//     <Text className="text-blue-500">
//       <Icon name="attach-file" size={24} />
//     </Text>
//   </TouchableOpacity>
//   ```

// ---

// #### 4. **Smooth Scroll and Keyboard Handling**
// To ensure smooth scrolling and avoid UI overlap when the keyboard opens:
// - Use `KeyboardAvoidingView` (already implemented).
// - Ensure the list scrolls to the bottom on new messages or input focus:
//   ```javascript
//   <TextInput
//     onFocus={() => flatListRef.current?.scrollToEnd({ animated: true })}
//   />
//   ```

// ---

// #### 5. **Real-Time Updates (Optional)**
// Implement real-time updates using WebSockets or polling:
// - Add a WebSocket connection to listen for new messages:
//   ```javascript
//   useEffect(() => {
//     const socket = io('http://your-socket-url');
//     socket.on('newMessage', (newMessage) => {
//       // Append the new message to the conversation
//       setConversation((prev) => ({
//         ...prev,
//         messages: [...prev.messages, newMessage],
//       }));
//     });
//     return () => socket.disconnect();
//   }, []);
//   ```

// ---

// ### **Key Additions Summary**
// 1. **Reply Feature**:
//    - Long-press to select a message.
//    - Show reply context above the input field.
//    - Include `replyTo` in the API payload.
//    - Display replies in the chat UI.

// 2. **Typing Indicator**:
//    - Detect typing and display feedback.

// 3. **File Attachments**:
//    - Allow users to attach and send files.

// 4. **Smooth Scroll**:
//    - Ensure the chat scrolls to the latest message on input focus.

// 5. **Real-Time Updates**:
//    - Use WebSockets to fetch new messages instantly.

// ---

// Let me know if you need help implementing any of these features!