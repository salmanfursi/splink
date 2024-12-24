import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSearchResult, setSelectedSearchResult] = useState<any>(null);
  const [isSuggestionVisible, setIsSuggestionVisible] =
    useState<boolean>(false);

  const [updateLeads, {isLoading: isUpdating}] = useUpdateLeadsMutation();
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

  // useEffect(() => {
  //   if (selectedSearchResult) {
  //     setDivision(selectedSearchResult.divisionId || null);
  //     setDistrict(selectedSearchResult.districtId || null);
  //     setArea(selectedSearchResult._id || null);
  //     setSpecificAddress(selectedSearchResult.name || '');
  //     setIsSuggestionVisible(false);
  //   }
  // }, [selectedSearchResult]);
  console.log('divisions', divisions);
  console.log('districts', districts);
  console.log('areas', areas);
  console.log('division', division);
  console.log('district', district);
  console.log('area', area);

  useEffect(() => {
    if (selectedSearchResult) {
      console.log('Selected Search Result:', selectedSearchResult); // Log the entire result for inspection

      // Log specific parts of the selected result
      console.log('Division ID:', selectedSearchResult.divisionId);
      console.log('District ID:', selectedSearchResult.districtId);
      console.log('Area ID (_id):', selectedSearchResult._id);
      console.log('Specific Address Name:', selectedSearchResult.name);

      // Update state based on the result
      setDivision(selectedSearchResult.divisionId || null);
      console.log(
        'Updated Division State:',
        selectedSearchResult.divisionId || null,
      );

      setDistrict(selectedSearchResult.districtId || null);
      console.log(
        'Updated District State:',
        selectedSearchResult.districtId || null,
      );

      setArea(selectedSearchResult._id || null);
      console.log('Updated Area State:', selectedSearchResult._id || null);

      setSpecificAddress(selectedSearchResult.name || '');
      console.log(
        'Updated Specific Address State:',
        selectedSearchResult.name || '',
      );

      setIsSuggestionVisible(false); // Hide suggestions
      console.log('Suggestions Hidden');
    }
  }, [selectedSearchResult]);

  // useEffect(() => {
  //   if (division) {
  //     refetchDistricts();
  //     setDistrict(null);
  //     setArea(null);
  //   }
  // }, [division, refetchDistricts]);

  // useEffect(() => {
  //   if (district) {
  //     refetchAreas();
  //     setArea(null);
  //   }
  // }, [district, refetchAreas]);

  useEffect(() => {
    if (division) {
      refetchDistricts();
      console.log('Fetched Districts for Division:', division, districts);
      setDistrict(null);
      setArea(null);
    }
  }, [division, refetchDistricts]);

  useEffect(() => {
    if (district) {
      refetchAreas();
      console.log('Fetched Areas for District:', district, areas);
      setArea(null);
    }
  }, [district, refetchAreas]);

  const handleSubmit = async () => {
    if (!division || !district || !area) {
      alert('Please fill out all fields.');
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

      await updateLeads({
        id: leadId,
        data: {address: addressData},
      }).unwrap();

      onClose();
    } catch (error) {
      alert('Failed to update address. Please try again.');
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

          <StyledView className="mb-4">
            <TextInput
              style={styles.input}
              placeholder="Search Address"
              value={searchQuery}
              onChangeText={text => {
                setSearchQuery(text);
                setIsSuggestionVisible(true);
              }}
            />
            {isSuggestionVisible && searchResults?.length > 0 && (
              <StyledScrollView className="max-h-40 bg-white border border-gray-300 mt-2 rounded-md">
                {searchResults.map(result => (
                  <StyledTouchableOpacity
                    key={result._id}
                    className="p-2 border-b border-gray-200"
                    onPress={() => {
                      setSelectedSearchResult(result);
                      setSearchQuery(result.path);
                    }}>
                    <StyledText className="text-black">
                      {result.path}
                    </StyledText>
                  </StyledTouchableOpacity>
                ))}
              </StyledScrollView>
            )}
          </StyledView>

          <StyledView className="mb-4">
            <Text className="text-black mb-2">Division</Text>
            <Dropdown
              data={divisions || []}
              labelField="division"
              valueField="_id"
              placeholder="Select Division"
              value={division}
              onChange={item => setDivision(item._id)}
              style={styles.dropdown}
            />
          </StyledView>

          <StyledView className="mb-4">
            <Text className="text-black mb-2">District</Text>
            <Dropdown
              data={districts || []}
              labelField="name"
              valueField="_id"
              placeholder="Select District"
              value={district}
              onChange={item => {
                setDistrict(item._id);
                console.log('District Selected from Dropdown:', item._id);
              }}
              disabled={!division}
              style={styles.dropdown}
            />
          </StyledView>

          <StyledView className="mb-4">
            <Text className="text-black mb-2">Area</Text>
            <Dropdown
              data={areas || []}
              labelField="name"
              valueField="_id"
              placeholder="Select Area"
              value={area}
              onChange={item => {
                setArea(item._id);
                console.log('Area Selected from Dropdown:', item._id);
              }}
              disabled={!district}
              style={styles.dropdown}
            />
          </StyledView>

          <StyledView className="mb-4">
            <TextInput
              style={styles.input}
              placeholder="Specific Address"
              value={specificAddress}
              onChangeText={setSpecificAddress}
            />
          </StyledView>

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

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default AddressModal;
