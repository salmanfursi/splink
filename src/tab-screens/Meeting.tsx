
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




















// import React, { useRef } from "react";
// import { View, Text, ScrollView } from "react-native";

// const CELL_WIDTH = 120;

// // TimeSlotsHeader Component
// const TimeSlotsHeader = ({ timeSlots, onHorizontalScroll, horizontalScrollRef }) => (
//   <ScrollView
//     horizontal
//     ref={horizontalScrollRef}
//     onScroll={onHorizontalScroll}
//     scrollEventThrottle={8}
//     showsHorizontalScrollIndicator={false}
//     className="bg-white border-b border-gray-300"
//   >
//     <View className="flex-row">
//       {timeSlots.map((time, index) => (
//         <View
//           key={index}
//           className="h-16 justify-center items-center border-r border-gray-300"
//           style={{ width: CELL_WIDTH }}
//         >
//           <Text className="font-bold text-gray-700">{time}</Text>
//         </View>
//       ))}
//     </View>
//   </ScrollView>
// );

// // SalesTeamColumn Component
// const SalesTeamColumn = ({ salesTeam, onVerticalScroll, verticalScrollRef }) => (
//   <ScrollView
//     ref={verticalScrollRef}
//     onScroll={onVerticalScroll}
//     scrollEventThrottle={8}
//     showsVerticalScrollIndicator={false}
//     className="bg-gray-400 border-r border-gray-300"
//   >
//     {salesTeam.map((member, index) => (
//       <View
//         key={index}
//         className="h-16 justify-center items-center border-b border-gray-300"
//       >
//         <Text style={{ width: 180 }} className="text-sm text-center text-gray-700">
//           {member}
//         </Text>
//       </View>
//     ))}
//   </ScrollView>
// );

// // MeetingGrid Component
// const MeetingGrid = ({
//   salesTeam,
//   timeSlots,
//   onHorizontalScroll,
//   onVerticalScroll,
//   verticalScrollRef,
//   horizontalScrollRef,
// }) => {
//   // Sample meeting data
//   const meetings = [
//     { timeIndex: 1, teamIndex: 0, title: "Client A" }, // 11:00, Supto
//     { timeIndex: 3, teamIndex: 2, title: "Client B" }, // 1:00, Sahmak
//     { timeIndex: 5, teamIndex: 5, title: "Client C" },
//   ];

//   return (
//     <ScrollView
//       ref={horizontalScrollRef}
//       horizontal
//       onScroll={onHorizontalScroll}
//       scrollEventThrottle={8}
//       showsHorizontalScrollIndicator={false}
//     >
//       <ScrollView
//         ref={verticalScrollRef}
//         onScroll={onVerticalScroll}
//         scrollEventThrottle={8}
//         showsVerticalScrollIndicator={false}
//       >
//         <View>
//           {salesTeam.map((_, rowIndex) => (
//             <View
//               key={rowIndex}
//               className="flex-row h-16"
//             >
//               {timeSlots.map((_, colIndex) => {
//                 // Check if there's a meeting at this cell
//                 const meeting = meetings.find(
//                   (m) => m.timeIndex === colIndex && m.teamIndex === rowIndex
//                 );

//                 return (
//                   <View
//                     key={`${rowIndex}-${colIndex}`}
//                     className="border-r border-b border-gray-300 bg-white"
//                     style={{ width: CELL_WIDTH }}
//                   >
//                     {meeting && (
//                       <View className="h-full w-full bg-purple-500 justify-center items-center rounded-md">
//                         <Text className="text-white text-xs font-bold">{meeting.title}</Text>
//                       </View>
//                     )}
//                   </View>
//                 );
//               })}
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </ScrollView>
//   );
// };

// // Main Scheduler Component
// const Scheduler = () => {
//   const timeSlots = ["10:00", "11:00", "12:00", "1:00", "2:00", "3:00"];
//   const salesTeam = [
//     "Supto", "Nyim", "Sahmak", "Tom", "Mon", "Toli", "Boli",
//     "dfdf", "djj", "ygvd"
//   ];

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
//         <View className="h-16 justify-center items-center bg-white border-b border-r border-gray-300">
//           <Text style={{ width: 120 }} className="text-center font-bold text-gray-700">Sales Team</Text>
//         </View>

//         {/* TimeSlotsHeader */}
//         <TimeSlotsHeader
//           timeSlots={timeSlots}
//           onHorizontalScroll={handleHorizontalScroll}
//           horizontalScrollRef={mainHorizontalScrollRef}
//         />
//       </View>

//       {/* Main Content Area */}
//       <View className="flex-1 flex-row">
//         {/* SalesTeamColumn */}
//         <SalesTeamColumn
//           salesTeam={salesTeam}
//           onVerticalScroll={handleVerticalScroll}
//           verticalScrollRef={mainVerticalScrollRef}
//         />

//         {/* MeetingGrid */}
//         <MeetingGrid
//           salesTeam={salesTeam}
//           timeSlots={timeSlots}
//           onHorizontalScroll={handleHorizontalScroll}
//           onVerticalScroll={handleVerticalScroll}
//           verticalScrollRef={syncVerticalScrollRef}
//           horizontalScrollRef={syncHorizontalScrollRef}
//         />
//       </View>
//     </View>
//   );
// };

// export default Scheduler;











import React, { useRef, useState } from "react";
import { View, Text, ScrollView, PanResponder, Animated } from "react-native";

const CELL_WIDTH = 120;
const CELL_HEIGHT = 80;

const TimeSlotsHeader = ({ timeSlots, onHorizontalScroll, horizontalScrollRef }) => (
  <ScrollView
    horizontal
    ref={horizontalScrollRef}
    onScroll={onHorizontalScroll}
    scrollEventThrottle={8}
    showsHorizontalScrollIndicator={false}
    className="bg-white border-b border-gray-300"
  >
    <View className="flex-row">
      {timeSlots.map((time, index) => (
        <View
          key={index}
          className="h-16 justify-center items-center border-r border-gray-300"
          style={{ width: CELL_WIDTH }}
        >
          <Text className="font-bold text-gray-700">{time}</Text>
        </View>
      ))}
    </View>
  </ScrollView>
);

const SalesTeamColumn = ({ salesTeam, onVerticalScroll, verticalScrollRef }) => (
  <ScrollView
    ref={verticalScrollRef}
    onScroll={onVerticalScroll}
    scrollEventThrottle={8}
    showsVerticalScrollIndicator={false}
    className="bg-gray-400 border-r border-gray-300"
  >
    {salesTeam.map((member, index) => (
      <View
        key={index}
        className="h-16 justify-center items-center border-b border-gray-300"
      >
        <Text style={{ width: 180 }} className="text-sm text-center text-gray-700">
          {member}
        </Text>
      </View>
    ))}
  </ScrollView>
);

const MeetingGrid = ({
  salesTeam,
  timeSlots,
  onHorizontalScroll,
  onVerticalScroll,
  verticalScrollRef,
  horizontalScrollRef,
}) => {
  const [meetings, setMeetings] = useState([
    { id: 1, timeIndex: 1, teamIndex: 0, title: "Client A" },
    { id: 2, timeIndex: 3, teamIndex: 2, title: "Client B" },
    { id: 3, timeIndex: 5, teamIndex: 5, title: "Client C" },
  ]);

  const [dragging, setDragging] = useState(null);
  const dragPosition = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        dragPosition.setOffset({
          x: gestureState.x0 - gestureState.moveX,
          y: gestureState.y0 - gestureState.moveY,
        });
        dragPosition.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: dragPosition.x, dy: dragPosition.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        // Calculate new indices
        const colIndex = Math.floor(gestureState.moveX / CELL_WIDTH);
        const rowIndex = Math.floor(gestureState.moveY / CELL_HEIGHT);

        if (
          colIndex >= 0 &&
          colIndex < timeSlots.length &&
          rowIndex >= 0 &&
          rowIndex < salesTeam.length
        ) {
          setMeetings((prevMeetings) =>
            prevMeetings.map((m) =>
              m.id === dragging
                ? { ...m, timeIndex: colIndex, teamIndex: rowIndex }
                : m
            )
          );
        }

        setDragging(null); // Clear dragging state
        dragPosition.setValue({ x: 0, y: 0 });
        dragPosition.flattenOffset();
      },
    })
  ).current;

  return (
    <ScrollView
      ref={horizontalScrollRef}
      horizontal
      onScroll={onHorizontalScroll}
      scrollEventThrottle={8}
      showsHorizontalScrollIndicator={false}
    >
      <ScrollView
        ref={verticalScrollRef}
        onScroll={onVerticalScroll}
        scrollEventThrottle={8}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {salesTeam.map((_, rowIndex) => (
            <View key={rowIndex} className="flex-row h-16">
              {timeSlots.map((_, colIndex) => {
                const meeting = meetings.find(
                  (m) => m.timeIndex === colIndex && m.teamIndex === rowIndex
                );

                return (
                  <View
                    key={`${rowIndex}-${colIndex}`}
                    className="border-r border-b border-gray-300"
                    style={{
                      width: CELL_WIDTH,
                      height: CELL_HEIGHT,
                    }}
                  >
                    {meeting && dragging !== meeting.id && (
                      <View
                        className="h-full w-full bg-purple-500 justify-center items-center rounded-md"
                        onStartShouldSetResponder={() => {
                          setDragging(meeting.id);
                        }}
                      >
                        <Text className="text-white text-xs font-bold">{meeting.title}</Text>
                      </View>
                    )}

                    {dragging === meeting?.id && (
                      <Animated.View
                        {...panResponder.panHandlers}
                        style={[
                          {
                            position: "absolute",
                            zIndex: 10,
                            width: CELL_WIDTH,
                            height: CELL_HEIGHT,
                            backgroundColor: "purple",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 5,
                          },
                          {
                            transform: dragPosition.getTranslateTransform(),
                          },
                        ]}
                      >
                        <Text className="text-white text-xs font-bold">
                          {meeting.title}
                        </Text>
                      </Animated.View>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const Scheduler = () => {
  const timeSlots = ["10:00", "11:00", "12:00", "1:00", "2:00", "3:00"];
  const salesTeam = ["Supto", "Nyim", "Sahmak", "Tom", "Mon", "Toli", "Boli"];

  const mainVerticalScrollRef = useRef(null);
  const mainHorizontalScrollRef = useRef(null);
  const syncVerticalScrollRef = useRef(null);
  const syncHorizontalScrollRef = useRef(null);

  const handleVerticalScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    mainVerticalScrollRef.current?.scrollTo({ y: offsetY, animated: false });
    syncVerticalScrollRef.current?.scrollTo({ y: offsetY, animated: false });
  };

  const handleHorizontalScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    mainHorizontalScrollRef.current?.scrollTo({ x: offsetX, animated: false });
    syncHorizontalScrollRef.current?.scrollTo({ x: offsetX, animated: false });
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-row">
        <View className="h-16 justify-center items-center bg-white border-b border-r border-gray-300">
          <Text style={{ width: 120 }} className="text-center font-bold text-gray-700">
            Sales Team
          </Text>
        </View>
        <TimeSlotsHeader
          timeSlots={timeSlots}
          onHorizontalScroll={handleHorizontalScroll}
          horizontalScrollRef={mainHorizontalScrollRef}
        />
      </View>

      <View className="flex-1 flex-row">
        <SalesTeamColumn
          salesTeam={salesTeam}
          onVerticalScroll={handleVerticalScroll}
          verticalScrollRef={mainVerticalScrollRef}
        />

        <MeetingGrid
          salesTeam={salesTeam}
          timeSlots={timeSlots}
          onHorizontalScroll={handleHorizontalScroll}
          onVerticalScroll={handleVerticalScroll}
          verticalScrollRef={syncVerticalScrollRef}
          horizontalScrollRef={syncHorizontalScrollRef}
        />
      </View>
    </View>
  );
};

export default Scheduler;










