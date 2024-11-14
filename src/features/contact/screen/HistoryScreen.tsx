
import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {styled} from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

const contacts = [
  {
    id: 1,
    name: 'John Smith',
    number: '+1 (555) 123-4567',
    time: '10:30 AM',
    type: 'incoming',
    date: 'Today',
  },
  {
    id: 2,
    name: 'Emma Wilson',
    number: '+1 (555) 987-6543',
    time: 'Yesterday',
    type: 'outgoing',
    date: 'Yesterday',
  },
  {
    id: 3,
    name: 'Michael Brown',
    number: '+1 (555) 246-8135',
    time: '9:15 AM',
    type: 'missed',
    date: 'Today',
  },
  {
    id: 4,
    name: 'Sarah Davis',
    number: '+1 (555) 369-8520',
    time: '8:45 AM',
    type: 'incoming',
    date: 'Today',
  },
];

const HistoryScreen = () => {
  const getCallIcon = (type: string) => {
    switch (type) {
      case 'incoming':
        return '↓';
      case 'outgoing':
        return '↑';
      case 'missed':
        return '✕';
      default:
        return '•';
    }
  };

  const getCallColor = (type: string) => {
    switch (type) {
      case 'incoming':
        return 'bg-green-500';
      case 'outgoing':
        return 'bg-blue-500';
      case 'missed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <StyledScrollView className="flex-1 bg-gray-100">
      <StyledView className="p-4">
        <StyledText className="text-2xl font-bold mb-4 text-gray-800">
          Recent Calls
        </StyledText>

        {contacts.map(contact => (
          <StyledTouchableOpacity
            key={contact.id}
            className="bg-white rounded-lg p-4 mb-3 flex-row items-center">
            <StyledView
              className={`w-10 h-10 rounded-full ${getCallColor(
                contact.type,
              )} justify-center items-center mr-3`}>
              <StyledText className="text-white text-xl">
                {getCallIcon(contact.type)}
              </StyledText>
            </StyledView>

            <StyledView className="flex-1">
              <StyledText className="text-lg font-semibold text-gray-800">
                {contact.name}
              </StyledText>
              <StyledText className="text-sm text-gray-600">
                {contact.number}
              </StyledText>
            </StyledView>

            <StyledView className="items-end">
              <StyledText className="text-sm text-gray-500">
                {contact.time}
              </StyledText>
              <StyledText className="text-xs text-gray-400">
                {contact.date}
              </StyledText>
            </StyledView>
          </StyledTouchableOpacity>
        ))}
      </StyledView>
    </StyledScrollView>
  );
};

export default HistoryScreen;
