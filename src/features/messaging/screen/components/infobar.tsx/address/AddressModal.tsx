import React, {useState, useEffect} from 'react';
import {View, Text, Modal, TouchableOpacity, ScrollView} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {TextInput} from 'react-native-paper';
import {styled} from 'nativewind';
import {useUpdateLeadsMutation} from '../../../../../../redux/conversation/conversationApi';
import {
  useGetAreasByDistrictQuery,
  useGetDistrictsByDivisionQuery,
  useGetDivisionsQuery,
  useSearchLocationQuery,
} from '../../../../../../redux/inboxInfoBar/map/mapApi';

// Styled components with NativeWind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

interface AddressModalProps {
  visible: boolean;
  onClose: () => void;
  leadId: string | undefined;
}

const AddressModal: React.FC<AddressModalProps> = ({
  visible,
  onClose,
  leadId,
}) => {
  const [division, setDivision] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);
  const [area, setArea] = useState<string | null>(null);
  const [specificAddress, setSpecificAddress] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>(''); // Address search query
  const [selectedSearchResult, setSelectedSearchResult] = useState<any>(null);
  const [isSuggestionVisible, setIsSuggestionVisible] =
    useState<boolean>(false); // State to handle suggestion visibility

  const [updateLeads, {isLoading: isUpdating}] = useUpdateLeadsMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  console.log('area', area);
  // Fetch data from APIs
  const {data: divisions} = useGetDivisionsQuery();
  const {data: districts, refetch: refetchDistricts} =
    useGetDistrictsByDivisionQuery(division, {skip: !division});
  const {data: areas, refetch: refetchAreas} = useGetAreasByDistrictQuery(
    district,
    {skip: !district},
  );
  const {data: searchResults} = useSearchLocationQuery(searchQuery, {
    skip: !searchQuery,
  });

  // Auto-select states based on search result

  useEffect(() => {
    if (selectedSearchResult) {
      console.log('selectedSearchResult-------->', selectedSearchResult);

      const {divisionId, districtId, _id: areaId} = selectedSearchResult;

      // Match Division
      if (divisionId && divisions) {
        const divisionData = divisions.find(div => div._id === divisionId);
        console.log('Matched Division:', divisionData);
        if (divisionData) setDivision(divisionData._id);
      }

      // Match District
      if (districtId && districts) {
        const districtData = districts.find(dist => dist._id === districtId);
        console.log('Matched District:', districtData);
        if (districtData) setDistrict(districtData._id);
      }

      // Match Area
      if (areaId && areas) {
        console.log('aria id', areaId);
        const areaData = areas.find(ar => ar.id === areaId);
        console.log('Matched Area:--------->', areaData);
        if (areaData) setArea(areaData.id); // Automatically set area to the matched _id
      }

      setIsSuggestionVisible(false); // Hide suggestions after selection
    }
  }, [selectedSearchResult, divisions, districts, areas]);

  // Refetch dependent fields when division or district changes
  useEffect(() => {
    if (division) {
      console.log('Fetching districts for Division ID:', division);
      refetchDistricts();
      setDistrict(null);
      setArea(null);
    }
  }, [division, refetchDistricts]);

  useEffect(() => {
    if (district) {
      console.log('Fetching areas for District ID:', district);
      refetchAreas();
      // setArea(null);
    }
  }, [district, refetchAreas]);

  const handleSubmit = async () => {
    setErrorMessage(null); // Reset error message

    if (!division || !district || !area) {
      setErrorMessage('Please select Division, District, and Area');
      return;
    }

    try {
      const selectedDivision =
        divisions?.find(div => div._id === division)?.division || '';
      const selectedDistrict =
        districts?.find(dist => dist._id === district)?.name || '';
      const selectedArea = areas?.find(ar => ar._id === area)?.name || '';

      const addressData = {
        division: selectedDivision,
        district: selectedDistrict,
        area: selectedArea,
        address: specificAddress,
      };

      console.log('Final Address Data:', addressData);

      await updateLeads({
        id: leadId,
        data: {address: addressData},
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
      onRequestClose={onClose}>
      <StyledView className="flex-1 justify-center bg-black/50">
        <StyledScrollView
          className="bg-white m-5 p-5 rounded-lg"
          keyboardShouldPersistTaps="handled">
          <StyledText className="text-black text-lg font-bold text-center mb-4">
            Add / Update Address
          </StyledText>

          {/* Address Search Input */}
          <StyledView className="mb-4">
            <TextInput
              label="Search Address"
              value={searchQuery}
              onChangeText={text => {
                setSearchQuery(text);
                setIsSuggestionVisible(true); // Show suggestions when typing
              }}
              className="w-full"
              placeholder="Search Division, District, Area..."
            />
            {isSuggestionVisible && searchResults?.length > 0 && (
              <StyledScrollView className="max-h-40 bg-white border border-gray-300 mt-2 rounded-md">
                {searchResults.map((result: any) => (
                  <StyledTouchableOpacity
                    key={result._id}
                    className="p-2 border-b border-gray-200"
                    onPress={() => {
                      setSelectedSearchResult(result);
                      setSearchQuery(result?.path);
                    }}>
                    <StyledText className="text-black">
                      {result?.path}
                    </StyledText>
                  </StyledTouchableOpacity>
                ))}
              </StyledScrollView>
            )}
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
              onChange={item => setDivision(item._id)}
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5,
                padding: 10,
              }}
              placeholderStyle={{
                color: 'black', // Black placeholder text
                fontSize: 14, // Optional: Adjust font size
              }}
              selectedTextStyle={{
                color: 'black', // Black selected text
                fontSize: 14, // Optional: Adjust font size
              }}
              itemTextStyle={{
                color: 'black', // Black text for dropdown items
                fontSize: 14, // Optional: Adjust font size
              }}
              dropdownStyle={{
                backgroundColor: 'white', // Ensures the dropdown's background is white
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5,
              }}
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
              onChange={item => setDistrict(item._id)}
              disable={!division}
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5,
                padding: 10,
                opacity: !division ? 0.5 : 1,
              }}
              placeholderStyle={{
                color: 'black',  
                fontSize: 14,  
              }}
              selectedTextStyle={{
                color: 'black',  
                fontSize: 14,  
              }}
              itemTextStyle={{
                color: 'black',  
                fontSize: 14,  
              }}
              dropdownStyle={{
                backgroundColor: 'white',  
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5,
              }}
            />
          </StyledView>

          {/* Area Dropdown */}
          <StyledView className="mb-4">
            <Text className="text-black mb-2">Area</Text>
            <Dropdown
              data={areas || []}  
              labelField="name"  
              valueField="id"  
              placeholder="Select Area"
              value={area}  
              onChange={item => {
                 console.log('Manually Selected Area item without:',item.id );  
                setArea(item.id);  
              }}
              disable={!district}
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5,
                padding: 10,
                opacity: !district ? 0.5 : 1,
              }}
              placeholderStyle={{
                color: 'black',
                fontSize: 14,
              }}
              selectedTextStyle={{
                color: 'black',
                fontSize: 14,
              }}
              itemTextStyle={{
                color: 'black',
                fontSize: 14,
              }}
              dropdownStyle={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5,
              }}
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
              isUpdating ? 'bg-gray-400' : 'bg-blue-500 active:bg-blue-600'
            }`}
            onPress={handleSubmit}
            disabled={isUpdating}>
            <StyledText className="text-white text-center font-bold">
              {isUpdating ? 'Updating...' : 'Submit'}
            </StyledText>
          </StyledTouchableOpacity>

          {/* Close Button */}
          <StyledTouchableOpacity
            className="p-4 rounded-md bg-gray-500 active:bg-gray-600"
            onPress={onClose}>
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
