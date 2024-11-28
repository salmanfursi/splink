 
import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import SalesTeamList from '../features/meeting/components/SalesTeamList';
import MeetingGrid from '../features/meeting/components/MeetingGrid';

const MeetingScheduler = () => {
  const [timeSlots] = useState(['11:00 AM', '2:00 PM', '4:00 PM', '5:00 PM', '6:00 PM']);
  const [salesTeams] = useState([
    'Team A',
    'Team B',
    'Team C',
    'Team 2',
    'Team 5',
    'Team 6',
    'Team 7',
    'Team 8',
  ]);
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: 'Meeting 1',
      timeSlot: '11:00 AM',
      team: 'Team A',
      status: 'confirmed',
    },
    {
      id: 2,
      title: 'Meeting 2',
      timeSlot: '2:00 PM',
      team: 'Team B',
      status: 'pending',
    },
    {
      id: 3,
      title: 'Meeting 3',
      timeSlot: '4:00 PM',
      team: 'Team C',
      status: 'pending',
    },
  ]);

  const handleMeetingTap = (meeting) => {
    console.log('Meeting tapped:', meeting);
  };

  const handleNewMeeting = (team, slot) => {
    console.log('New meeting for', team, 'at', slot);
  };

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="p-4 flex-row justify-between bg-blue-500">
        <Text className="text-white text-lg font-bold">Meeting Scheduler</Text>
        <Text className="text-white text-lg font-bold">Date</Text>
      </View>

      {/* Scheduler */}
      <ScrollView className="flex-1">
        <View className="flex-row">
          {/* Sales Team List */}
          <SalesTeamList salesTeams={salesTeams} />
          {/* Horizontal Scrollable Grid */}
          <ScrollView horizontal>
            <View>
              {/* Time Slot Row */}
              <View className="flex-row border-b border-gray-300">
                {timeSlots.map((slot) => (
                  <View
                    key={slot}
                    className="h-20 p-2 w-24 items-center justify-center bg-gray-200 border-r border-gray-300"
                  >
                    <Text className="text-sm text-black font-bold">{slot}</Text>
                  </View>
                ))}
              </View>

              {/* Meeting Grid */}
              <MeetingGrid
                meetings={meetings}
                salesTeams={salesTeams}
                timeSlots={timeSlots}
                onMeetingTap={handleMeetingTap}
                onNewMeeting={handleNewMeeting}
              />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default MeetingScheduler;
