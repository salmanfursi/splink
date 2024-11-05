// babel.config.js
// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
//   plugins: [
//     'nativewind/babel',
//     'react-native-reanimated/plugin'
//   ]
// };


module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'nativewind/babel',
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-private-methods', { loose: true }],
      ['@babel/plugin-transform-private-property-in-object', { loose: true }],
      'react-native-reanimated/plugin' // Keep this as the last plugin
    ],
  };
};

