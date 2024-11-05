


// Meeting.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';

const Meeting = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [selectedSalesman, setSelectedSalesman] = useState(null);
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: "Client Meeting",
      salesmanId: 1,
      time: "10:00",
      date: new Date().toDateString()
    },
    {
      id: 2,
      title: "Product Demo",
      salesmanId: 2,
      time: "14:00",
      date: new Date().toDateString()
    }
  ]);

  const salesTeam = [
    { id: 1, name: "John Smith" },
    { id: 2, name: "Sarah Johnson" },
    { id: 3, name: "Mike Wilson" }
  ];

  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = i + 10;
    return `${hour}:00`;
  });

  const handleDateChange = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const handleSlotPress = (time, salesman) => {
    setSelectedSlot(time);
    setSelectedSalesman(salesman);
    setShowModal(true);
  };

  const handleAddMeeting = () => {
    if (meetingTitle.trim() === '') return;

    const newMeeting = {
      id: meetings.length + 1,
      title: meetingTitle,
      salesmanId: selectedSalesman.id,
      time: selectedSlot,
      date: currentDate.toDateString()
    };

    setMeetings([...meetings, newMeeting]);
    setShowModal(false);
    setMeetingTitle('');
    setSelectedSlot(null);
    setSelectedSalesman(null);
  };

  const renderMeetings = (time, salesman) => {
    return meetings.filter(
      m => m.salesmanId === salesman.id && 
      m.time === time && 
      m.date === currentDate.toDateString()
    ).map(meeting => (
      <TouchableOpacity
        key={meeting.id}
        className="bg-blue-500 p-2 rounded-md mb-1"
        onLongPress={() => {
          // Handle meeting edit/delete
        }}
      >
        <Text className="text-white font-medium text-sm">{meeting.title}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="p-4 bg-gray-50 border-b border-gray-200">
        <Text className="text-xl font-bold text-gray-800">Meeting Schedule</Text>
      </View>

      {/* Date Navigation */}
      <View className="flex-row justify-between items-center p-4 bg-white">
        <TouchableOpacity 
          onPress={() => handleDateChange(-1)}
          className="p-2"
        >
          <Text className="text-2xl text-blue-500">←</Text>
        </TouchableOpacity>
        <Text className="text-base font-medium text-gray-700">
          {currentDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })}
        </Text>
        <TouchableOpacity 
          onPress={() => handleDateChange(1)}
          className="p-2"
        >
          <Text className="text-2xl text-blue-500">→</Text>
        </TouchableOpacity>
      </View>

      {/* Salesman Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="border-b border-gray-200"
      >
        {salesTeam.map(salesman => (
          <TouchableOpacity
            key={salesman.id}
            className={`p-3 mx-1 rounded-lg ${
              selectedSalesman?.id === salesman.id 
                ? 'bg-blue-100' 
                : 'bg-transparent'
            }`}
            onPress={() => setSelectedSalesman(salesman)}
          >
            <Text className={`${
              selectedSalesman?.id === salesman.id
                ? 'text-blue-700'
                : 'text-gray-700'
            } font-medium`}>
              {salesman.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Schedule Grid */}
      <ScrollView className="flex-1">
        {timeSlots.map(time => (
          <View key={time} className="flex-row p-3 border-b border-gray-100">
            <Text className="w-16 text-sm text-gray-600">{time}</Text>
            <View className="flex-1">
              {selectedSalesman ? (
                <TouchableOpacity
                  className="flex-1 min-h-[50px] rounded-lg bg-gray-50 p-2"
                  onPress={() => handleSlotPress(time, selectedSalesman)}
                >
                  {renderMeetings(time, selectedSalesman)}
                </TouchableOpacity>
              ) : (
                <Text className="text-gray-500 text-center p-2">
                  Select a salesman
                </Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Add Meeting Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white p-5 rounded-t-3xl">
            <Text className="text-xl font-bold text-gray-800 mb-2">
              Add Meeting
            </Text>
            <Text className="text-base text-gray-600 mb-4">
              {selectedSalesman?.name} - {selectedSlot}
            </Text>
            <TextInput
              className="border border-gray-200 rounded-lg p-3 mb-4 text-gray-800"
              placeholder="Meeting Title"
              placeholderTextColor="#9CA3AF"
              value={meetingTitle}
              onChangeText={setMeetingTitle}
            />
            <View className="flex-row justify-end gap-3">
              <TouchableOpacity 
                className="px-4 py-3 rounded-lg bg-gray-200"
                onPress={() => setShowModal(false)}
              >
                <Text className="text-gray-800 font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="px-4 py-3 rounded-lg bg-blue-500"
                onPress={handleAddMeeting}
              >
                <Text className="text-white font-medium">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Meeting;










// // Meeting.js
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
//   TextInput,
// } from 'react-native';
// import {
//   CalendarDaysIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   ClockIcon,
//   UserGroupIcon,
//   PlusCircleIcon,
//   XMarkIcon,
//   CheckIcon,
//   PencilSquareIcon,
//   TrashIcon,
// } from "react-native-heroicons/outline";

// const Meeting = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [meetingTitle, setMeetingTitle] = useState('');
//   const [selectedSalesman, setSelectedSalesman] = useState(null);
//   const [meetings, setMeetings] = useState([
//     {
//       id: 1,
//       title: "Client Meeting",
//       salesmanId: 1,
//       time: "10:00",
//       date: new Date().toDateString()
//     },
//     {
//       id: 2,
//       title: "Product Demo",
//       salesmanId: 2,
//       time: "14:00",
//       date: new Date().toDateString()
//     }
//   ]);

//   const salesTeam = [
//     { id: 1, name: "John Smith" },
//     { id: 2, name: "Sarah Johnson" },
//     { id: 3, name: "Mike Wilson" }
//   ];

//   const timeSlots = Array.from({ length: 10 }, (_, i) => {
//     const hour = i + 10;
//     return `${hour}:00`;
//   });

//   const handleDateChange = (days) => {
//     const newDate = new Date(currentDate);
//     newDate.setDate(newDate.getDate() + days);
//     setCurrentDate(newDate);
//   };

//   const handleSlotPress = (time, salesman) => {
//     setSelectedSlot(time);
//     setSelectedSalesman(salesman);
//     setShowModal(true);
//   };

//   const handleAddMeeting = () => {
//     if (meetingTitle.trim() === '') return;

//     const newMeeting = {
//       id: meetings.length + 1,
//       title: meetingTitle,
//       salesmanId: selectedSalesman.id,
//       time: selectedSlot,
//       date: currentDate.toDateString()
//     };

//     setMeetings([...meetings, newMeeting]);
//     setShowModal(false);
//     setMeetingTitle('');
//     setSelectedSlot(null);
//     setSelectedSalesman(null);
//   };

//   const renderMeetings = (time, salesman) => {
//     return meetings.filter(
//       m => m.salesmanId === salesman.id && 
//       m.time === time && 
//       m.date === currentDate.toDateString()
//     ).map(meeting => (
//       <View key={meeting.id} className="bg-blue-500 p-2 rounded-md mb-1">
//         <View className="flex-row justify-between items-center">
//           <Text className="text-white font-medium text-sm flex-1">
//             {meeting.title}
//           </Text>
//           <View className="flex-row gap-2">
//             <TouchableOpacity>
//               <PencilSquareIcon size={16} color="white" />
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <TrashIcon size={16} color="white" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     ));
//   };

//   return (
//     <View className="flex-1 bg-white">
//       {/* Header */}
//       <View className="p-4 bg-gray-50 border-b border-gray-200">
//         <View className="flex-row items-center">
//           <CalendarDaysIcon size={24} color="#1F2937" />
//           <Text className="text-xl font-bold text-gray-800 ml-2">
//             Meeting Schedule
//           </Text>
//         </View>
//       </View>

//       {/* Date Navigation */}
//       <View className="flex-row justify-between items-center p-4 bg-white">
//         <TouchableOpacity 
//           onPress={() => handleDateChange(-1)}
//           className="p-2"
//         >
//           <ChevronLeftIcon size={24} color="#3B82F6" />
//         </TouchableOpacity>
//         <View className="flex-row items-center">
//           <Text className="text-base font-medium text-gray-700">
//             {currentDate.toLocaleDateString('en-US', {
//               weekday: 'short',
//               month: 'short',
//               day: 'numeric'
//             })}
//           </Text>
//         </View>
//         <TouchableOpacity 
//           onPress={() => handleDateChange(1)}
//           className="p-2"
//         >
//           <ChevronRightIcon size={24} color="#3B82F6" />
//         </TouchableOpacity>
//       </View>

//       {/* Salesman Tabs */}
//       <ScrollView 
//         horizontal 
//         showsHorizontalScrollIndicator={false}
//         className="border-b border-gray-200"
//       >
//         {salesTeam.map(salesman => (
//           <TouchableOpacity
//             key={salesman.id}
//             className={`p-3 mx-1 rounded-lg flex-row items-center ${
//               selectedSalesman?.id === salesman.id 
//                 ? 'bg-blue-100' 
//                 : 'bg-transparent'
//             }`}
//             onPress={() => setSelectedSalesman(salesman)}
//           >
//             <UserGroupIcon 
//               size={16} 
//               color={selectedSalesman?.id === salesman.id ? '#1D4ED8' : '#6B7280'} 
//             />
//             <Text className={`ml-2 ${
//               selectedSalesman?.id === salesman.id
//                 ? 'text-blue-700'
//                 : 'text-gray-700'
//             } font-medium`}>
//               {salesman.name}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Schedule Grid */}
//       <ScrollView className="flex-1">
//         {timeSlots.map(time => (
//           <View key={time} className="flex-row p-3 border-b border-gray-100">
//             <View className="w-16 flex-row items-center">
//               <ClockIcon size={14} color="#6B7280" />
//               <Text className="text-sm text-gray-600 ml-1">{time}</Text>
//             </View>
//             <View className="flex-1">
//               {selectedSalesman ? (
//                 <TouchableOpacity
//                   className="flex-1 min-h-[50px] rounded-lg bg-gray-50 p-2"
//                   onPress={() => handleSlotPress(time, selectedSalesman)}
//                 >
//                   {renderMeetings(time, selectedSalesman)}
//                   {meetings.filter(m => 
//                     m.salesmanId === selectedSalesman.id && 
//                     m.time === time && 
//                     m.date === currentDate.toDateString()
//                   ).length === 0 && (
//                     <View className="items-center justify-center h-full">
//                       <PlusCircleIcon size={20} color="#9CA3AF" />
//                     </View>
//                   )}
//                 </TouchableOpacity>
//               ) : (
//                 <View className="flex-row justify-center items-center p-2">
//                   <UserGroupIcon size={16} color="#9CA3AF" />
//                   <Text className="text-gray-500 ml-2">
//                     Select a salesman
//                   </Text>
//                 </View>
//               )}
//             </View>
//           </View>
//         ))}
//       </ScrollView>

//       {/* Add Meeting Modal */}
//       <Modal
//         visible={showModal}
//         transparent
//         animationType="slide"
//       >
//         <View className="flex-1 justify-end bg-black/50">
//           <View className="bg-white p-5 rounded-t-3xl">
//             <View className="flex-row justify-between items-center mb-4">
//               <Text className="text-xl font-bold text-gray-800">
//                 Add Meeting
//               </Text>
//               <TouchableOpacity 
//                 onPress={() => setShowModal(false)}
//                 className="p-1"
//               >
//                 <XMarkIcon size={24} color="#6B7280" />
//               </TouchableOpacity>
//             </View>
//             <View className="flex-row items-center mb-4">
//               <UserGroupIcon size={16} color="#6B7280" />
//               <Text className="text-base text-gray-600 ml-2">
//                 {selectedSalesman?.name}
//               </Text>
//               <ClockIcon size={16} color="#6B7280" className="ml-4" />
//               <Text className="text-base text-gray-600 ml-2">
//                 {selectedSlot}
//               </Text>
//             </View>
//             <TextInput
//               className="border border-gray-200 rounded-lg p-3 mb-4 text-gray-800"
//               placeholder="Meeting Title"
//               placeholderTextColor="#9CA3AF"
//               value={meetingTitle}
//               onChangeText={setMeetingTitle}
//             />
//             <View className="flex-row justify-end gap-3">
//               <TouchableOpacity 
//                 className="px-4 py-3 rounded-lg bg-gray-200 flex-row items-center"
//                 onPress={() => setShowModal(false)}
//               >
//                 <XMarkIcon size={20} color="#374151" />
//                 <Text className="text-gray-800 font-medium ml-2">Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity 
//                 className="px-4 py-3 rounded-lg bg-blue-500 flex-row items-center"
//                 onPress={handleAddMeeting}
//               >
//                 <CheckIcon size={20} color="white" />
//                 <Text className="text-white font-medium ml-2">Add</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default Meeting