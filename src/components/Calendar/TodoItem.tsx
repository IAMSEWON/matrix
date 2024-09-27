import { Text, View } from 'react-native';

import ImportanceSquare from '../ImportanceSquare';

const TodoItem = () => {
  return (
    <View className="w-full flex-row items-center" style={{ gap: 5 }}>
      <View className="flex-1">
        <View className="flex-row items-center pt-[12.5px]" style={{ gap: 5 }}>
          <View className="h-[10px] w-[10px] rounded-[5px] border-[1px]" />
          <View>
            <Text>타이틀</Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="text-[#555]">17:50</Text>
        </View>
      </View>
      <View className="h-[48px] w-[48px] rounded-[8px] bg-[#f1f3f5]">
        <ImportanceSquare value="doit" />
      </View>
    </View>
  );
};

export default TodoItem;
