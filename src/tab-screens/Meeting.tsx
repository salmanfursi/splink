
import React, { useState } from 'react';
import { ScrollView, Text, View, TextInput } from 'react-native';
import { styled } from 'nativewind';

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledTextInput = styled(TextInput);

const ExcelLikeApp = () => {
  const initialData = Array.from({ length: 20 }, (_, rowIndex) =>
    Array.from({ length: 10 }, (_, colIndex) => `R${rowIndex + 1}C${colIndex + 1}`)
  );

  const [gridData, setGridData] = useState(initialData);

  // Handle cell edit
  const handleEdit = (rowIndex, colIndex, newValue) => {
    const updatedData = [...gridData];
    updatedData[rowIndex][colIndex] = newValue;
    setGridData(updatedData);
  };

  return (
    <StyledView className="flex-1 bg-black">
      {/* Horizontal Scroll for Columns */}
      <ScrollView horizontal>
        <StyledView>
          {/* Header Row */}
          <StyledView className="flex-row bg-gray-800 border-b border-gray-600">
            <StyledText className="w-24 h-10 text-center justify-center items-center bg-gray-700 text-white font-bold">
              #
            </StyledText>
            {gridData[0].map((_, colIndex) => (
              <StyledText
                key={colIndex}
                className="w-24 h-10 text-center justify-center items-center bg-gray-800 text-white"
              >
                Col {colIndex + 1}
              </StyledText>
            ))}
          </StyledView>

          {/* Scrollable Grid */}
          <ScrollView>
            {gridData.map((row, rowIndex) => (
              <StyledView key={rowIndex} className="flex-row">
                {/* Index Column */}
                <StyledText className="w-24 h-10 text-center justify-center items-center bg-gray-700 text-white">
                  Row {rowIndex + 1}
                </StyledText>
                {/* Data Cells */}
                {row.map((cell, colIndex) => (
                  <StyledTextInput
                    key={colIndex}
                    className="w-24 h-10 text-center justify-center items-center border border-gray-600 bg-gray-900 text-white"
                    value={cell}
                    onChangeText={(newValue) =>
                      handleEdit(rowIndex, colIndex, newValue)
                    }
                  />
                ))}
              </StyledView>
            ))}
          </ScrollView>
        </StyledView>
      </ScrollView>
    </StyledView>
  );
};

export default ExcelLikeApp;


 







