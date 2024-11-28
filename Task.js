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
 * 
// import React from 'react';
// import { View, Text, ScrollView } from 'react-native';
// import { styled } from 'nativewind';

// const timeslots = ['11:00 AM', '12:00 PM', '1:00 PM', '6:00 PM']; // Time slots
// const salesTeams = [
//   'Salman',
//   'Kawser',
//   'Mehnaj',
//   'Faruk',
//   'Mamon',
//   'Yeasin',
//   'Kunal',
//   'Natin',
//   'Yeasin',
//   'Takain',
// ];

// const StyledView = styled(View);
// const StyledText = styled(Text);

// export default function Scheduler() {
//   const renderCell = (time, rowIndex) => (
//     <StyledView
//       className="w-32 h-36 border border-gray-700 justify-center items-center"
//       key={`${time}-${rowIndex}`}
//     >
//       <StyledText className="text-white">Meeting</StyledText>
//     </StyledView>
//   );

//   const renderRow = (rowIndex) => (
//     <StyledView className="flex-row" key={rowIndex}>
//       {timeslots.map((time) => renderCell(time, rowIndex))}
//     </StyledView>
//   );

//   return (
//     <StyledView className="flex-1 bg-black">
//       {/* Outer Horizontal Scroll */}
//       <ScrollView horizontal={true} bounces={true}>
//         <StyledView>
//           {/* Sticky Time Slot Header */}
//           <StyledView
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               zIndex: 20,
//               flexDirection: 'row',
//               backgroundColor: '#333',
//             }}
//           >
//             {/* Add an empty cell to align with Sales Team Header */}
//             <StyledView className="w-24 h-12 bg-gray-800 border-b border-gray-600 justify-center items-center">
//               <StyledText className="text-white font-bold text-center">
//                 Sales Team
//               </StyledText>
//             </StyledView>
//             {timeslots.map((time) => (
//               <StyledView
//                 className="w-32 h-12 border-b border-gray-600 justify-center items-center"
//                 key={time}
//               >
//                 <StyledText className="text-white font-bold text-center">
//                   {time}
//                 </StyledText>
//               </StyledView>
//             ))}
//           </StyledView>

//           {/* Vertical Scroll for Content */}
//           <ScrollView bounces={true} style={{ marginTop: 48 }}>
//             <StyledView className="flex-row">
//               {/* Sticky Sales Team Column */}
//               <StyledView
//                 style={{
//                   position: 'absolute',
//                   left: 0,
//                   zIndex: 10,
//                   backgroundColor: '#333',
//                 }}
               
//               >
//                 {salesTeams.map((team, index) => (
//                   <StyledView
//                     className="w-24 h-36 border border-gray-700 justify-center items-center bg-gray-900"
//                     key={index}
//                   >
//                     <StyledText className="text-white font-bold text-center">
//                       {team}
//                     </StyledText>
//                   </StyledView>
//                 ))}
//               </StyledView>

//               {/* Meeting Grid */}
//               <StyledView className="ml-24">
//                 {salesTeams.map((_, rowIndex) => renderRow(rowIndex))}
//               </StyledView>
//             </StyledView>
//           </ScrollView>
//         </StyledView>
//       </ScrollView>
//     </StyledView>
//   );
// }






