// import React from 'react';
// import {Text, View, TouchableOpacity} from 'react-native';
// import {Drawer} from 'react-native-drawer-layout';
// import Comment from './Comment';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const InfoSidebar = ({children, isOpen, onClose, onOpen,conversationId}) => {
//   console.log("infobar------->",conversationId)
//   return (
//     <Drawer
//       open={isOpen}
//       onOpen={onOpen}
//       onClose={onClose}
//       drawerType="front"
//       drawerPosition="right"
//       drawerStyle={{width: 300}}
//       renderDrawerContent={() => (
//         <View className="flex-1  p-4">
//           <View className="flex-row justify-between  mb-4">
//             <Text className="text-xl font-bold text-black">Menu</Text>
//             <TouchableOpacity onPress={onClose}>
//               <Text className="text-xl px-1 border border-red-400 rounded ">
//                 <Icon name="close" size={18} color="red" />
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity
//             className="p-3 bg-gray-400 rounded-md mb-2"
//             onPress={() => alert('Go to Settings')}>
//             <Text>Settings</Text>
//           </TouchableOpacity>

//           <Comment conversationId={conversationId} />
//         </View>
//       )}>
//       {/* Main Content */}
//       <View className="flex-1">{children}</View>
//     </Drawer>
//   );
// };

// export default InfoSidebar;










import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Comment from './Comment';

const InfoSidebar = ({children, isOpen, onClose, onOpen, conversationId}) => {
  // State management for additional features
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Home', address: '123 Main St, Cityville, State 12345' },
    { id: 2, label: 'Work', address: '456 Business Park, Corporate Lane' }
  ]);
  const [newAddress, setNewAddress] = useState({ label: '', address: '' });
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressModalVisible, setAddressModalVisible] = useState(false);

  const [requirements, setRequirements] = useState([
    { id: 1, text: 'Complete project proposal', completed: false },
    { id: 2, text: 'Schedule team meeting', completed: true }
  ]);
  const [newRequirement, setNewRequirement] = useState('');

  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');

  // Address Handlers
  const addAddress = () => {
    if (newAddress.label && newAddress.address) {
      setAddresses([
        ...addresses, 
        { 
          id: Date.now(), 
          label: newAddress.label, 
          address: newAddress.address 
        }
      ]);
      setNewAddress({ label: '', address: '' });
      setAddressModalVisible(false);
    }
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const startEditAddress = (address) => {
    setEditingAddress(address);
    setNewAddress({ label: address.label, address: address.address });
    setAddressModalVisible(true);
  };

  const updateAddress = () => {
    setAddresses(addresses.map(addr => 
      addr.id === editingAddress.id 
        ? { ...addr, label: newAddress.label, address: newAddress.address }
        : addr
    ));
    setEditingAddress(null);
    setNewAddress({ label: '', address: '' });
    setAddressModalVisible(false);
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([
        ...requirements, 
        { 
          id: Date.now(), 
          text: newRequirement, 
          completed: false 
        }
      ]);
      setNewRequirement('');
    }
  };

  const toggleRequirementComplete = (id) => {
    setRequirements(requirements.map(req => 
      req.id === id ? { ...req, completed: !req.completed } : req
    ));
  };

  const deleteRequirement = (id) => {
    setRequirements(requirements.filter(req => req.id !== id));
  };

  const addReminder = () => {
    if (newReminder.trim()) {
      setReminders([
        ...reminders,
        {
          id: Date.now(),
          text: newReminder
        }
      ]);
      setNewReminder('');
    }
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  // Address Modal Rendering
  const renderAddressModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={addressModalVisible}
      onRequestClose={() => setAddressModalVisible(false)}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-11/12 bg-white rounded-xl p-5 items-center">
          <Text className="text-lg font-bold mb-4">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </Text>
          <TextInput
            placeholder="Label (e.g., Home, Work)"
            value={newAddress.label}
            onChangeText={(text) => setNewAddress({...newAddress, label: text})}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <TextInput
            placeholder="Full Address"
            value={newAddress.address}
            onChangeText={(text) => setNewAddress({...newAddress, address: text})}
            multiline
            className="w-full border border-gray-300 rounded-md p-2 h-24 mb-4"
          />
          <View className="flex-row justify-between w-full">
            <TouchableOpacity 
              className="bg-blue-500 p-2 rounded-md w-5/12" 
              onPress={editingAddress ? updateAddress : addAddress}
            >
              <Text className="text-white text-center font-bold">
                {editingAddress ? 'Update' : 'Save'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="bg-gray-400 p-2 rounded-md w-5/12" 
              onPress={() => setAddressModalVisible(false)}
            >
              <Text className="text-white text-center font-bold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <Drawer
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      drawerType="front"
      drawerPosition="right"
      drawerStyle={{width: 300}}
      renderDrawerContent={() => (
        <ScrollView className="flex-1 p-4">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-black">Sidebar Menu</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="red" />
            </TouchableOpacity>
          </View>

          {/* Addresses Section */}
          <View className="mb-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold">Addresses</Text>
              <TouchableOpacity 
                onPress={() => {
                  setEditingAddress(null);
                  setAddressModalVisible(true);
                }}
              >
                <Icon name="add-circle" size={24} color="green" />
              </TouchableOpacity>
            </View>
            {addresses.map((addr) => (
              <View key={addr.id} className="bg-gray-100 p-2 rounded-md mb-2 flex-row justify-between items-center">
                <View>
                  <Text className="font-bold">{addr.label}</Text>
                  <Text className="text-gray-600">{addr.address}</Text>
                </View>
                <View className="flex-row">
                  <TouchableOpacity 
                    onPress={() => startEditAddress(addr)}
                    className="mr-2"
                  >
                    <Icon name="edit" size={20} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteAddress(addr.id)}>
                    <Icon name="delete" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Requirements Section */}
          <View className="mb-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold">Requirements</Text>
              <TouchableOpacity>
                <Icon name="add-circle" size={24} color="green" />
              </TouchableOpacity>
            </View>
            <View className="flex-row mb-2">
              <TextInput
                placeholder="New Requirement"
                value={newRequirement}
                onChangeText={setNewRequirement}
                className="flex-1 border border-gray-300 rounded-md p-2 mr-2"
              />
              <TouchableOpacity 
                className="bg-blue-500 justify-center px-4 rounded-md"
                onPress={addRequirement}
              >
                <Text className="text-white">Add</Text>
              </TouchableOpacity>
            </View>
            {requirements.map((req) => (
              <View key={req.id} className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center">
                  <TouchableOpacity onPress={() => toggleRequirementComplete(req.id)} className="mr-2">
                    <Icon 
                      name={req.completed ? "check-box" : "check-box-outline-blank"} 
                      size={24} 
                      color={req.completed ? "green" : "gray"} 
                    />
                  </TouchableOpacity>
                  <Text className={req.completed ? "line-through text-gray-500" : ""}>
                    {req.text}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => deleteRequirement(req.id)}>
                  <Icon name="delete" size={20} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Reminders Section */}
          <View className="mb-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold">Reminders</Text>
              <TouchableOpacity>
                <Icon name="add-circle" size={24} color="green" />
              </TouchableOpacity>
            </View>
            {reminders.length === 0 && (
              <Text className="text-gray-600 text-center">No reminders yet</Text>
            )}
          </View>

          {/* Settings and Comments */}
          <TouchableOpacity
            className="p-3 bg-gray-200 rounded-md mb-2"
            onPress={() => alert('Go to Settings')}>
            <Text>Settings</Text>
          </TouchableOpacity>
          
          <Comment conversationId={conversationId} />

          {/* Address Modal */}
          {renderAddressModal()}
        </ScrollView>
      )}>
      {/* Main Content */}
      <View className="flex-1">{children}</View>
    </Drawer>
  );
};

export default InfoSidebar;