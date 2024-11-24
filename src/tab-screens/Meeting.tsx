import React, { useCallback, useMemo, useState, useRef } from "react";
import { View, Text, ScrollView, Platform, Dimensions } from "react-native";
import { styled } from "nativewind";
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';

// Styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

// Constants
const CELL_WIDTH = 120;
const CELL_HEIGHT = 64;
const HEADER_HEIGHT = 64;

const TimeSlots = {
  START: 10,
  END: 18,
  FORMAT: "h:mm A",
};

// Types
interface Meeting {
  id: string;
  title: string;
  time: string;
  attendees: string[];
  teamMemberIndex: number;
  timeSlotIndex: number;
}

// Helper functions
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = TimeSlots.START; hour <= TimeSlots.END; hour++) {
    slots.push(
      new Date(new Date().setHours(hour, 0, 0, 0)).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      })
    );
  }
  return slots;
};

const generateMockMeetings = (salesTeam: string[], timeSlots: string[]): Meeting[] => {
  return salesTeam.flatMap((member, teamIndex) => 
    Array(Math.floor(Math.random() * 3)).fill(null).map((_, i) => {
      const timeSlotIndex = Math.floor(Math.random() * timeSlots.length);
      return {
        id: `${teamIndex}-${i}`,
        title: `Meeting ${teamIndex}-${i}`,
        time: timeSlots[timeSlotIndex],
        attendees: [member, salesTeam[Math.floor(Math.random() * salesTeam.length)]],
        teamMemberIndex: teamIndex,
        timeSlotIndex: timeSlotIndex,
      };
    })
  );
};

// MeetingCard component
const MeetingCard: React.FC<RenderItemParams<Meeting>> = ({ item, drag, isActive }) => {
  return (
    <ScaleDecorator>
      <StyledView
        className={`absolute p-2 rounded-lg shadow ${isActive ? 'bg-blue-200 z-10' : 'bg-blue-100'}`}
        style={{
          width: CELL_WIDTH - 4,
          height: CELL_HEIGHT - 4,
          left: item.timeSlotIndex * CELL_WIDTH,
          top: item.teamMemberIndex * CELL_HEIGHT,
        }}
        onLongPress={drag}
      >
        <StyledText className="font-bold text-xs text-blue-700" numberOfLines={1}>{item.title}</StyledText>
        <StyledText className="text-xs text-blue-500">{item.time}</StyledText>
        <StyledText className="text-xs text-blue-400" numberOfLines={1}>{item.attendees.join(', ')}</StyledText>
      </StyledView>
    </ScaleDecorator>
  );
};

// Main Meeting component
const Meeting: React.FC = () => {
  // Refs for scroll views
  const mainVerticalScrollRef = useRef(null);
  const mainHorizontalScrollRef = useRef(null);
  const syncVerticalScrollRef = useRef(null);
  const syncHorizontalScrollRef = useRef(null);

  // Memoized data
  const timeSlots = useMemo(() => generateTimeSlots(), []);
  const salesTeam = useMemo(() => [
    "Supto", "Nyim", "Sahmak", "Tom", "Mon", "Toli", "Boli",
    "dfdf", "djj", "ygvd", "jhneds", "yhse", "cannol", "plant", "delew"
  ], []);

  // State for meetings
  const [meetings, setMeetings] = useState(() => generateMockMeetings(salesTeam, timeSlots));

  // Optimized scroll handlers using useCallback
  const handleVerticalScroll = useCallback(({ nativeEvent }) => {
    const offsetY = nativeEvent.contentOffset.y;
    if (mainVerticalScrollRef.current && syncVerticalScrollRef.current) {
      Platform.OS === 'ios' 
        ? requestAnimationFrame(() => {
            mainVerticalScrollRef.current?.scrollTo({ y: offsetY, animated: false });
            syncVerticalScrollRef.current?.scrollTo({ y: offsetY, animated: false });
          })
        : setTimeout(() => {
            mainVerticalScrollRef.current?.scrollTo({ y: offsetY, animated: false });
            syncVerticalScrollRef.current?.scrollTo({ y: offsetY, animated: false });
          }, 0);
    }
  }, []);

  const handleHorizontalScroll = useCallback(({ nativeEvent }) => {
    const offsetX = nativeEvent.contentOffset.x;
    if (mainHorizontalScrollRef.current && syncHorizontalScrollRef.current) {
      Platform.OS === 'ios'
        ? requestAnimationFrame(() => {
            mainHorizontalScrollRef.current?.scrollTo({ x: offsetX, animated: false });
            syncHorizontalScrollRef.current?.scrollTo({ x: offsetX, animated: false });
          })
        : setTimeout(() => {
            mainHorizontalScrollRef.current?.scrollTo({ x: offsetX, animated: false });
            syncHorizontalScrollRef.current?.scrollTo({ x: offsetX, animated: false });
          }, 0);
    }
  }, []);

  // Memoized cell renderers
  const renderTimeSlotCell = useCallback((time: string, index: number) => (
    <StyledView
      key={index}
      className="justify-center items-center border-r border-blue-300 bg-blue-100"
      style={{ width: CELL_WIDTH, height: HEADER_HEIGHT }}
    >
      <StyledText className="font-bold text-blue-700">{time}</StyledText>
    </StyledView>
  ), []);

  const renderTeamMemberCell = useCallback((member: string, index: number) => (
    <StyledView
      key={index}
      className="justify-center items-center border-b border-blue-300 bg-blue-100"
      style={{ height: CELL_HEIGHT }}
    >
      <StyledText
        className="text-sm text-center text-blue-700"
        style={{ width: CELL_WIDTH }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {member}
      </StyledText>
    </StyledView>
  ), []);

  const renderGridCell = useCallback((rowIndex: number, colIndex: number) => (
    <StyledView
      key={`${rowIndex}-${colIndex}`}
      className="border-r border-b border-blue-300 bg-blue-50"
      style={{ width: CELL_WIDTH, height: CELL_HEIGHT }}
    />
  ), []);

  const onDragEnd = useCallback(({ data, from, to }) => {
    const updatedMeetings = [...data];
    const movedMeeting = updatedMeetings[to];
    
    // Calculate new position
    const newTimeSlotIndex = Math.floor(to % timeSlots.length);
    const newTeamMemberIndex = Math.floor(to / timeSlots.length);

    // Update the moved meeting
    movedMeeting.timeSlotIndex = newTimeSlotIndex;
    movedMeeting.teamMemberIndex = newTeamMemberIndex;
    movedMeeting.time = timeSlots[newTimeSlotIndex];

    setMeetings(updatedMeetings);
  }, [timeSlots]);

  return (
    <StyledView className="flex-1 bg-blue-200">
      {/* Header Row */}
      <StyledView className="flex-row">
        {/* Static Sales Team Header */}
        <StyledView 
          className="justify-center items-center border-b border-r border-blue-300 bg-blue-200"
          style={{ height: HEADER_HEIGHT, width: 90 }}
        >
          <StyledText className="font-bold text-blue-700">Sales Team</StyledText>
        </StyledView>

        {/* Scrollable Time Slots Header */}
        <StyledScrollView
          horizontal
          ref={mainHorizontalScrollRef}
          onScroll={handleHorizontalScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          className="border-b border-blue-300 bg-blue-200"
          removeClippedSubviews={Platform.OS === 'android'}
        >
          <StyledView className="flex-row">
            {timeSlots.map(renderTimeSlotCell)}
          </StyledView>
        </StyledScrollView>
      </StyledView>

      {/* Main Content Area */}
      <StyledView className="flex-1 flex-row">
        {/* Sales Team Column */}
        <StyledScrollView
          ref={mainVerticalScrollRef}
          onScroll={handleVerticalScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          className="border-r border-blue-300 bg-blue-100"
          removeClippedSubviews={Platform.OS === 'android'}
        >
          {salesTeam.map(renderTeamMemberCell)}
        </StyledScrollView>

        {/* Meeting Grid */}
        <StyledScrollView
          ref={syncHorizontalScrollRef}
          horizontal
          onScroll={handleHorizontalScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={Platform.OS === 'android'}
        >
          <StyledScrollView
            ref={syncVerticalScrollRef}
            onScroll={handleVerticalScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={Platform.OS === 'android'}
          >
            <StyledView className="bg-blue-50" style={{ width: CELL_WIDTH * timeSlots.length, height: CELL_HEIGHT * salesTeam.length }}>
              {salesTeam.map((_, rowIndex) => (
                <StyledView key={rowIndex} className="flex-row">
                  {timeSlots.map((_, colIndex) => renderGridCell(rowIndex, colIndex))}
                </StyledView>
              ))}
              <DraggableFlatList
                data={meetings}
                onDragEnd={onDragEnd}
                keyExtractor={(item) => item.id}
                renderItem={MeetingCard}
                containerStyle={{ width: CELL_WIDTH * timeSlots.length, height: CELL_HEIGHT * salesTeam.length }}
                activationDistance={10}
              />
            </StyledView>
          </StyledScrollView>
        </StyledScrollView>
      </StyledView>
    </StyledView>
  );
};

export default Meeting;

