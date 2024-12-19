
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-paper';
import { styled } from 'nativewind';
import { useUpdateLeadsMutation } from '../../../../../../redux/conversation/conversationApi';
import { useGetAreasByDistrictQuery, useGetDistrictsByDivisionQuery, useGetDivisionsQuery, useSearchLocationQuery } from '../../../../../../redux/inboxInfoBar/map/mapApi';
 
interface AddressModalProps {
  visible: boolean;
  onClose: () => void;
  leadId: string | undefined;
}

// Styled components with NativeWind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const AddressModal: React.FC<AddressModalProps> = ({
  visible,
  onClose,
  leadId,
}) => {
  const [division, setDivision] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);
  const [area, setArea] = useState<string | null>(null);
  const [specificAddress, setSpecificAddress] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSearchResult, setSelectedSearchResult] = useState<any>(null);

  const [updateLeads, { isLoading: isUpdating }] = useUpdateLeadsMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch data from APIs
  const { data: divisions, isLoading: divisionsLoading } = useGetDivisionsQuery();
  const { 
    data: districts, 
    isLoading: districtsLoading,
    refetch: refetchDistricts 
  } = useGetDistrictsByDivisionQuery(division, { skip: !division });
  const { 
    data: areas, 
    isLoading: areasLoading,
    refetch: refetchAreas 
  } = useGetAreasByDistrictQuery(district, { skip: !district });

  const { data: searchResults } = useSearchLocationQuery(searchQuery, {
    skip: !searchQuery,
  });

  useEffect(() => {
    if (selectedSearchResult) {
      setDivision(selectedSearchResult.divisionId);
      setDistrict(selectedSearchResult.districtId);
      setArea(selectedSearchResult._id);
    }
  }, [selectedSearchResult]);

  useEffect(() => {
    if (division) {
      refetchDistricts();
      // Reset dependent fields
      setDistrict(null);
      setArea(null);
    }
  }, [division]);

  useEffect(() => {
    if (district) {
      refetchAreas();
      // Reset dependent field
      setArea(null);
    }
  }, [district]);

  const handleSubmit = async () => {
    // Reset error message at the start of submission
    setErrorMessage(null);

    // Validate inputs before submission
    if (!division || !district || !area) {
      setErrorMessage('Please select Division, District, and Area');
      return;
    }

    try {
      const selectedDivision = 
        divisions?.find(div => div._id === division)?.division || '';
      const selectedDistrict = 
        districts?.find(dist => dist._id === district)?.name || '';
      const selectedArea = 
        areas?.find(ar => ar._id === area)?.name || '';

      const addressData = {
        division: selectedDivision,
        district: selectedDistrict,
        area: selectedArea,
        address: specificAddress,
      };

      await updateLeads({
        id: leadId,
        data: { address: addressData },
      }).unwrap();

      onClose();
    } catch (error) {
      setErrorMessage('Failed to update address. Please try again.');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <StyledView className="flex-1 justify-center bg-black/50">
        <StyledScrollView 
          className="bg-white m-5 p-5 rounded-lg"
          keyboardShouldPersistTaps="handled"
        >
          <StyledText className="text-black text-lg font-bold text-center mb-4">
            Add / Update Address
          </StyledText>

          {/* Search Input */}
          <StyledView className="mb-4">
            <TextInput
              label="Search Location"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="w-full"
            />
          </StyledView>

          {/* Division Dropdown */}
          <StyledView className="mb-4">
            <Text className="text-black mb-2">Division</Text>
            <Dropdown
              data={divisions || []}
              labelField="division"
              valueField="_id"
              placeholder="Select Division"
              value={division}
              onChange={(item) => {
                setDivision(item._id);
              }}
              // Styling props to ensure visibility
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5,
                padding: 10,
              }}
              placeholderStyle={{ color: 'gray' }}
              selectedTextStyle={{ color: 'black' }}
              containerStyle={{ backgroundColor: 'white' }}
              activeColor="lightgray"
              renderItem={(item) => (
                <View style={{ 
                  padding: 10, 
                  backgroundColor: 'white' 
                }}>
                  <Text style={{ color: 'black' }}>{item.division}</Text>
                </View>
              )}
            />
          </StyledView>

          {/* District Dropdown */}
          <StyledView className="mb-4">
            <Text className="text-black mb-2">District</Text>
            <Dropdown
              data={districts || []}
              labelField="name"
              valueField="_id"
              placeholder="Select District"
              value={district}
              onChange={(item) => {
                setDistrict(item._id);
              }}
              disable={!division}
              // Styling props to ensure visibility
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5,
                padding: 10,
                opacity: !division ? 0.5 : 1
              }}
              placeholderStyle={{ color: 'gray' }}
              selectedTextStyle={{ color: 'black' }}
              containerStyle={{ backgroundColor: 'white' }}
              activeColor="lightgray"
              renderItem={(item) => (
                <View style={{ 
                  padding: 10, 
                  backgroundColor: 'white' 
                }}>
                  <Text style={{ color: 'black' }}>{item.name}</Text>
                </View>
              )}
            />
          </StyledView>

          {/* Area Dropdown */}
          <StyledView className="mb-4">
            <Text className="text-black mb-2">Area</Text>
            <Dropdown
              data={areas || []}
              labelField="name"
              valueField="_id"
              placeholder="Select Area"
              value={area}
              onChange={(item) => {
                setArea(item._id);
              }}
              disable={!district}
              // Styling props to ensure visibility
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5,
                padding: 10,
                opacity: !district ? 0.5 : 1
              }}
              placeholderStyle={{ color: 'gray' }}
              selectedTextStyle={{ color: 'black' }}
              containerStyle={{ backgroundColor: 'white' }}
              activeColor="lightgray"
              renderItem={(item) => (
                <View style={{ 
                  padding: 10, 
                  backgroundColor: 'white' 
                }}>
                  <Text style={{ color: 'black' }}>{item.name}</Text>
                </View>
              )}
            />
          </StyledView>

          {/* Specific Address Input */}
          <StyledView className="mb-4">
            <TextInput
              label="Specific Address"
              value={specificAddress}
              onChangeText={setSpecificAddress}
              className="w-full"
            />
          </StyledView>

          {/* Error Message */}
          {errorMessage && (
            <StyledText className="text-red-500 text-center mb-4">
              {errorMessage}
            </StyledText>
          )}

          {/* Submit Button */}
          <StyledTouchableOpacity 
            className={`p-4 rounded-md mb-2 ${
              isUpdating 
                ? 'bg-gray-400' 
                : 'bg-blue-500 active:bg-blue-600'
            }`}
            onPress={handleSubmit}
            disabled={isUpdating}
          >
            <StyledText className="text-white text-center font-bold">
              {isUpdating ? 'Updating...' : 'Submit'}
            </StyledText>
          </StyledTouchableOpacity>

          {/* Close Button */}
          <StyledTouchableOpacity 
            className="p-4 rounded-md bg-gray-500 active:bg-gray-600"
            onPress={onClose}
          >
            <StyledText className="text-white text-center font-bold">
              Close
            </StyledText>
          </StyledTouchableOpacity>
        </StyledScrollView>
      </StyledView>
    </Modal>
  );
};

export default AddressModal;