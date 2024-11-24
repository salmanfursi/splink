/**
 * ----->module:1
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








