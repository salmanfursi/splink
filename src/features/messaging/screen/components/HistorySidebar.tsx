// // components/DrawerComponent.js
// import React, { useState } from 'react';
// import { Text, View, TouchableOpacity } from 'react-native';
// import { Drawer } from 'react-native-drawer-layout';

// const HistorySidebar = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDrawer = () => {
//     setIsOpen((prev) => !prev);
//   };

//   return (
//     <Drawer
//       open={isOpen}
//       onOpen={() => setIsOpen(true)}
//       onClose={() => setIsOpen(false)}
//       drawerType="slide"
//       drawerPosition="left"
//       drawerStyle={{ width: 200 }} // Adjust width here for Tailwind
//       renderDrawerContent={() => (
//         <View className="flex-1 bg-gray-200 p-4">
//           <Text className="text-xl font-bold mb-4">Drawer Menu</Text>
//           <TouchableOpacity className="p-3 bg-white rounded-md mb-2" onPress={toggleDrawer}>
//             <Text>Close Drawer</Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="p-3 bg-white rounded-md mb-2" onPress={() => alert('Go to Settings')}>
//             <Text>Settings</Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="p-3 bg-white rounded-md" onPress={() => alert('Go to Profile')}>
//             <Text>Profile</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     >
//       <View className="flex-1 items-center justify-center">
//         <TouchableOpacity
//           className="bg-blue-500 px-4 py-2 rounded-md"
//           onPress={toggleDrawer}
//         >
//           <Text className="text-white text-lg">Toggle Drawer</Text>
//         </TouchableOpacity>
//         {children}
//       </View>
//     </Drawer>
//   );
// };

// export default HistorySidebar;










import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';

const HistorySidebar = ({ children, isOpen, onClose, onOpen }) => {
  return (
    <Drawer
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      drawerType="front"
      drawerPosition="right"
      drawerStyle={{ width: 200 }}
      renderDrawerContent={() => (
        <View className="flex-1  p-4">
          <Text className="text-xl font-bold mb-4 text-black">Drawer Menu</Text>
          <TouchableOpacity className="p-3 bg-gray-400 rounded-md mb-2" onPress={onClose}>
            <Text>Close Drawer</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-3 bg-gray-400 rounded-md mb-2" onPress={() => alert('Go to Settings')}>
            <Text>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-3 bg-gray-400 rounded-md" onPress={() => alert('Go to Profile')}>
            <Text>Profile</Text>
          </TouchableOpacity>
        </View>
      )}
    >
      {/* Main Content */}
      <View className="flex-1">
        {children}
      </View>
    </Drawer>
  );
};

export default HistorySidebar;
