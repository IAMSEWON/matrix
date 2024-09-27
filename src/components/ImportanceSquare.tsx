import { View } from 'react-native';

const matrixData = ['doit', 'schedule', 'delegate', 'eliminate'];

const ImportanceSquare = ({ value }: { value: string }) => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-row gap-1">
        <View
          className="h-3 w-3 rounded bg-gray-300"
          style={{
            backgroundColor: value === matrixData[0] ? '#007bff' : '#e0f3ff',
          }}
        />
        <View
          className="h-3 w-3 rounded bg-gray-300"
          style={{
            backgroundColor: value === matrixData[1] ? '#007bff' : '#e0f3ff',
          }}
        />
      </View>
      <View className="flex-row gap-1 pt-1">
        <View
          className="h-3 w-3 rounded bg-gray-300"
          style={{
            backgroundColor: value === matrixData[2] ? '#007bff' : '#e0f3ff',
          }}
        />
        <View
          className="h-3 w-3 rounded bg-gray-300"
          style={{
            backgroundColor: value === matrixData[3] ? '#007bff' : '#e0f3ff',
          }}
        />
      </View>
    </View>
  );
};

export default ImportanceSquare;
