import { View } from "react-native";
import { Text, } from "react-native";

const AudioScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Audio Tab</Text>
        <Text className='text-green-700'>HistoryScreen</Text>
      </View>
    );
  };
  export default AudioScreen;



// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import { Play, Pause, Mic, Square } from 'lucide-react-native';

// const audioMessages = [
//   { id: '1', sender: 'John', duration: '0:30', timestamp: '10:30 AM' },
//   { id: '2', sender: 'You', duration: '1:15', timestamp: '11:45 AM' },
//   { id: '3', sender: 'Sarah', duration: '0:45', timestamp: '2:20 PM' },
//   { id: '4', sender: 'You', duration: '0:20', timestamp: '3:10 PM' },
//   { id: '5', sender: 'Mike', duration: '2:00', timestamp: '5:30 PM' },
// ];

// const AudioMessage = ({ item, isPlaying, onPlayPause }) => (
//   <View className="flex-row items-center bg-white p-4 mb-2 rounded-lg">
//     <View className={`w-10 h-10 rounded-full ${item.sender === 'You' ? 'bg-blue-500' : 'bg-gray-300'} justify-center items-center mr-3`}>
//       <Text className="text-white font-bold">{item.sender[0]}</Text>
//     </View>
//     <View className="flex-1">
//       <Text className="font-semibold">{item.sender}</Text>
//       <View className="flex-row items-center mt-1">
//         <TouchableOpacity onPress={() => onPlayPause(item.id)} accessibilityLabel={isPlaying ? "Pause audio" : "Play audio"}>
//           {isPlaying ? (
//             <Pause size={24} color={item.sender === 'You' ? "#3b82f6" : "#4b5563"} />
//           ) : (
//             <Play size={24} color={item.sender === 'You' ? "#3b82f6" : "#4b5563"} />
//           )}
//         </TouchableOpacity>
//         <View className="flex-1 h-1 bg-gray-200 mx-2 rounded-full">
//           <View className={`h-full ${item.sender === 'You' ? 'bg-blue-500' : 'bg-gray-500'} rounded-full`} style={{ width: '30%' }} />
//         </View>
//         <Text className="text-xs text-gray-500">{item.duration}</Text>
//       </View>
//     </View>
//     <Text className="text-xs text-gray-400">{item.timestamp}</Text>
//   </View>
// );

// export default function AudioScreen() {
//   const [playingId, setPlayingId] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);

//   const handlePlayPause = (id) => {
//     setPlayingId(playingId === id ? null : id);
//   };

//   const toggleRecording = () => {
//     setIsRecording(!isRecording);
//   };

//   return (
//     <View className="flex-1 bg-gray-100">
//       <FlatList
//         data={audioMessages}
//         renderItem={({ item }) => (
//           <AudioMessage
//             item={item}
//             isPlaying={playingId === item.id}
//             onPlayPause={handlePlayPause}
//           />
//         )}
//         keyExtractor={item => item.id}
//         contentContainerStyle={{ padding: 16 }}
//       />
//       <View className="bg-white p-4 border-t border-gray-200">
//         <TouchableOpacity
//           onPress={toggleRecording}
//           className={`w-16 h-16 rounded-full ${isRecording ? 'bg-red-500' : 'bg-blue-500'} justify-center items-center self-center`}
//           accessibilityLabel={isRecording ? "Stop recording" : "Start recording"}
//           accessibilityState={{ selected: isRecording }}
//         >
//           {isRecording ? (
//             <Square size={32} color="white" />
//           ) : (
//             <Mic size={32} color="white" />
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }