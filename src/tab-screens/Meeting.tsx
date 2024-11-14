

import React, { useState, useCallback, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { format, addDays, isSameDay, parseISO } from 'date-fns';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  withTiming,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

const CELL_HEIGHT = 80;
const CELL_WIDTH = 144;
const SIDEBAR_WIDTH = 96;
const HEADER_HEIGHT = 60;

const Meeting = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
  // Refs and Animated Values
  const scrollViewRef = useRef(null);
  const horizontalScrollRef = useRef(null);
  
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const draggedScale = useSharedValue(1);
  const isDragging = useSharedValue(false);

  // States
  const [meetings, setMeetings] = useState([
    { 
      id: '1',
      salesperson: 'John Doe',
      time: '10:00 - 11:00',
      date: '2024-11-07',
      note: 'Client A Meeting',
      clientName: 'ABC Corp',
      status: 'confirmed'
    },
    {
      id: '2',
      salesperson: 'Jane Smith',
      time: '14:00 - 15:00',
      date: '2024-11-07',
      note: 'Client B Meeting',
      clientName: 'XYZ Ltd',
      status: 'confirmed'
    }
  ]);

  const [visibleDates, setVisibleDates] = useState(
    Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))
  );
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [draggedMeeting, setDraggedMeeting] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  
  const salesTeam = [
    { id: 1, name: 'John Doe', color: '#4CAF50' },
    { id: 2, name: 'Jane Smith', color: '#2196F3' },
    { id: 3, name: 'Alice Johnson', color: '#9C27B0' },
  ];

  const timeSlots = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    time: `${10 + i}:00 - ${11 + i}:00`,
    label: `${10 + i}:00`
  }));

  // Helper function marked as a worklet
  const getGridPosition = (x, y) => {
    'worklet';
    const dateIndex = Math.floor((x - SIDEBAR_WIDTH) / CELL_WIDTH);
    const timeIndex = Math.floor((y - HEADER_HEIGHT) / CELL_HEIGHT);
    const salesIndex = Math.floor(y / CELL_HEIGHT) % salesTeam.length;

    if (dateIndex >= 0 && timeIndex >= 0 && salesIndex >= 0 && dateIndex < visibleDates.length) {
      return {
        dateIndex,
        timeIndex,
        salesIndex
      };
    }
    return null;
  };

  // Handle meeting drop as a regular function
  const handleDrop = useCallback((dateIndex, timeIndex, salesIndex) => {
    if (draggedMeeting && dateIndex >= 0 && dateIndex < visibleDates.length) {
      setMeetings(prevMeetings => 
        prevMeetings.map(m => {
          if (m.id === draggedMeeting.id) {
            return {
              ...m,
              date: format(visibleDates[dateIndex], 'yyyy-MM-dd'),
              time: timeSlots[timeIndex].time,
              salesperson: salesTeam[salesIndex].name
            };
          }
          return m;
        })
      );
    }
  }, [draggedMeeting, visibleDates, timeSlots, salesTeam]);

  // Gesture handler properly marked as a worklet
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      'worklet';
      context.startX = translateX.value;
      context.startY = translateY.value;
      isDragging.value = true;
      draggedScale.value = withSpring(1.1);
    },
    onActive: (event, context) => {
      'worklet';
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
      
      const position = getGridPosition(
        event.absoluteX,
        event.absoluteY
      );
      
      if (position) {
        runOnJS(setDropTarget)(position);
      }
    },
    onEnd: (event) => {
      'worklet';
      isDragging.value = false;
      draggedScale.value = withSpring(1);
      
      const position = getGridPosition(
        event.absoluteX,
        event.absoluteY
      );
      
      if (position) {
        runOnJS(handleDrop)(
          position.dateIndex,
          position.timeIndex,
          position.salesIndex
        );
      }
      
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      
      runOnJS(setDraggedMeeting)(null);
      runOnJS(setDropTarget)(null);
    },
  });

  // Animated style for dragged meeting
  const draggedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: draggedScale.value }
      ],
      zIndex: isDragging.value ? 1000 : 1,
    };
  });

  // Render meeting card
  const MeetingCard = ({ meeting, onDragStart }) => {
    const salesperson = salesTeam.find(s => s.name === meeting.salesperson);
    
    return (
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[
          draggedMeeting?.id === meeting.id && draggedStyle
        ]}>
          <TouchableOpacity
            onPressIn={() => onDragStart(meeting)}
            style={[
              {
                backgroundColor: salesperson?.color + '20',
                borderRadius: 8,
                padding: 8,
                margin: 4,
              }
            ]}
          >
            <Text style={{ 
              color: salesperson?.color,
              fontWeight: '500',
              fontSize: 14
            }}>
              {meeting.clientName}
            </Text>
            <Text style={{
              fontSize: 12,
              color: '#666'
            }}>
              {meeting.note}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    );
  };

  // Render time grid
  const TimeGrid = () => (
    <ScrollView
      ref={horizontalScrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View style={{ flexDirection: 'row' }}>
        {/* Sidebar with sales team */}
        <View style={{ width: SIDEBAR_WIDTH, backgroundColor: '#f9fafb' }}>
          {salesTeam.map(person => (
            <View
              key={person.id}
              style={{
                height: CELL_HEIGHT,
                padding: 8,
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#e5e7eb'
              }}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: '500',
                color: '#374151',
                textAlign: 'center'
              }}>
                {person.name}
              </Text>
            </View>
          ))}
        </View>

        {/* Time slots grid */}
        {visibleDates.map((date, dateIndex) => (
          <View key={format(date, 'yyyy-MM-dd')} style={{ width: CELL_WIDTH }}>
            {timeSlots.map((slot, timeIndex) => (
              <View key={slot.id}>
                {salesTeam.map((person, salesIndex) => (
                  <View
                    key={`${date}-${slot.id}-${person.id}`}
                    style={{
                      height: CELL_HEIGHT,
                      borderBottomWidth: 1,
                      borderLeftWidth: 1,
                      borderColor: '#e5e7eb'
                    }}
                  >
                    {meetings
                      .filter(m => 
                        m.salesperson === person.name &&
                        m.time === slot.time &&
                        isSameDay(parseISO(m.date), date)
                      )
                      .map(meeting => (
                        <MeetingCard
                          key={meeting.id}
                          meeting={meeting}
                          onDragStart={setDraggedMeeting}
                        />
                      ))
                    }
                    
                    {dropTarget &&
                      dropTarget.dateIndex === dateIndex &&
                      dropTarget.timeIndex === timeIndex &&
                      dropTarget.salesIndex === salesIndex && (
                        <View
                          style={{
                            position: 'absolute',
                            inset: 4,
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            borderWidth: 2,
                            borderColor: '#60a5fa',
                            borderRadius: 8
                          }}
                        />
                      )}
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );

  // Header with dates
  const Header = () => (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb'
    }}>
      <View style={{ width: SIDEBAR_WIDTH }} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {visibleDates.map((date, index) => (
          <View
            key={index}
            style={{ width: CELL_WIDTH, paddingHorizontal: 8 }}
          >
            <Text style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#1f2937'
            }}>
              {format(date, 'EEE d')}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{
          padding: 16,
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb'
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#1f2937'
            }}>
              Meeting Scheduler
            </Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: '#eff6ff',
                borderRadius: 8
              }}
            >
              <Text style={{
                color: '#2563eb',
                fontWeight: '500'
              }}>
                {format(selectedDate, 'MMM d, yyyy')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Header />
        <TimeGrid />

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(_, date) => {
              setShowDatePicker(false);
              if (date) {
                setSelectedDate(date);
                setVisibleDates(
                  Array.from({ length: 7 }, (_, i) => addDays(date, i))
                );
              }
            }}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default Meeting;