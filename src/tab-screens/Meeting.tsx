// import React from "react";
// import { View, Text, FlatList } from "react-native";
// import { styled } from "nativewind";

// const timeslots = ["11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"];
// const rows = Array.from({ length: 50 }, (_, i) => i + 1); // For 50 rows example

// const StyledView = styled(View);
// const StyledText = styled(Text);

// export default function Scheduler() {
//   const renderCell = (time, rowIndex) => (
//     <StyledView className="flex-1 h-12 border border-gray-700 justify-center items-center" key={`${time}-${rowIndex}`}>
//       {/* Meeting details can go here */}
//       <StyledText className="text-white"></StyledText>
//     </StyledView>
//   );

//   const renderRow = ({ item: rowIndex }) => (
//     <StyledView className="flex-row" key={rowIndex}>
//       {timeslots.map((time) => renderCell(time, rowIndex))}
//     </StyledView>
//   );

//   return (
//     <StyledView className="flex-1 bg-black">
//       {/* Header Row */}
//       <StyledView className="flex-row bg-gray-800">
//         {timeslots.map((time) => (
//           <StyledView className="flex-1 p-3 border-b border-gray-600" key={time}>
//             <StyledText className="text-white font-bold text-center">{time}</StyledText>
//           </StyledView>
//         ))}
//       </StyledView>

//       {/* Content Rows */}
//       <FlatList
//         data={rows}
//         renderItem={renderRow}
//         keyExtractor={(item) => item.toString()}
//       />
//     </StyledView>
//   );
// }

// import React from 'react';
// import {View, Text, ScrollView, FlatList} from 'react-native';
// import {styled} from 'nativewind';
// import Icon from 'react-native-vector-icons/FontAwesome';

// // Define your data
// const timeslots = ['11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM']; // Example time slots
// const salesTeams = ['Salman', 'Kawser', 'Mehnaj', 'Faruk', 'Mamon', 'Yeasin']; // Example sales team names
// const rows = Array.from({length: salesTeams.length}, (_, i) => i); // Rows based on sales team count

// const StyledView = styled(View);
// const StyledText = styled(Text);

// export default function Scheduler() {
//   const renderCell = (time, rowIndex) => (
//     <StyledView
//       className="w-24 h-12 border border-gray-700 justify-center items-center"
//       key={`${time}-${rowIndex}`}>
//       {/* Meeting details can go here */}
//       <StyledText className="text-white"></StyledText>
//     </StyledView>
//   );

//   const renderRow = ({item: rowIndex}) => (
//     <StyledView className="flex-row" key={rowIndex}>
//       {timeslots.map(time => renderCell(time, rowIndex))}
//     </StyledView>
//   );

//   return (
//     <StyledView className="flex-1 bg-black">
//       {/* Main container with horizontal scroll for the time slots */}
//       <ScrollView horizontal={true} bounces={false}>
//         <StyledView className="flex-row">
//           {/* Sales Team Column (Fixed Left Side) */}
//           <StyledView>
//             <StyledView className="w-24 h-12 bg-gray-800 border-b border-gray-600 justify-center items-center">
//               <StyledText className="text-white font-bold text-center">
//                 Sales Team
//               </StyledText>
//             </StyledView>
//             {salesTeams.map((team, index) => (
//               <StyledView
//                 className="w-24 h-12 border border-gray-700 justify-center items-center bg-gray-900"
//                 key={index}>
//                 <StyledText className="text-white font-bold text-center">
//                   {team}
//                 </StyledText>
//               </StyledView>
//             ))}
//           </StyledView>

//           {/* Time Slots Header */}
//           <StyledView className="flex-1">
//             <StyledView className="flex-row bg-gray-800">
//               {timeslots.map(time => (
//                 <StyledView
//                   className="w-24 h-12 border-b border-gray-600 justify-center items-center"
//                   key={time}>
//                   <StyledText className="text-white font-bold text-center">
//                     {time}
//                   </StyledText>
//                 </StyledView>
//               ))}
//             </StyledView>

//             {/* Scrollable Rows for Meetings */}
//             <ScrollView bounces={false}>
//               <FlatList
//                 data={rows}
//                 renderItem={renderRow}
//                 keyExtractor={item => item.toString()}
//                 scrollEnabled={false} // Disable internal scrolling of FlatList
//               />
//             </ScrollView>
//             <View>
//               <Icon name="rocket" size={30} color="#900" />;
//             </View>
//           </StyledView>
//         </StyledView>
//       </ScrollView>
//     </StyledView>
//   );
// }

import React from 'react';
import {Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Meeting = () => {
  console.log('icon is hare ----->', Icon);
  return (
    <View className="w-72 mx-auto items-center mt-12 bg-blue-600 border rounded-lg p-4">
      <Text className="text-white text-6xl    text-center    ">Meeting</Text>
      <Text>
        <Icon name="home" size={30} color="#ffff" />
        <Icon
          name="format-shapes"
          size={30}
          color="#ffff"
        />
      </Text>
    </View>
  );
};

export default Meeting;
