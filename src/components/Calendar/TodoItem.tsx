import { Text, View } from 'react-native';
import dayjs from 'dayjs';

import { TodoType } from '@/types/matrix';

import ImportanceSquare from '../ImportanceSquare';

export interface ICalendarTotoItem {
  date: Date;
  contents: ({
    categoryId: number;
    matrixKey: string;
  } & TodoType)[];
}

interface ICalendarTotoItemProps extends ICalendarTotoItem {}

const TodoItem = (props: ICalendarTotoItemProps) => {
  const { date, contents } = props;
  if (date) {
    // console.log('asdo');
  }

  if (contents.length === 0) return null;
  return (
    <View>
      {contents.length > 0 && (
        <View style={{ gap: 10 }}>
          {contents.map((c) => {
            return (
              <View
                key={`${c.categoryId}_${c.matrixKey}_${c.content}`}
                className="w-full flex-row items-center"
                style={{ gap: 5 }}
              >
                <View className="flex-1 flex-row" style={{ gap: 15 }}>
                  <View className="flex-1 flex-row items-center" style={{ gap: 5 }}>
                    <View className="h-[10px] w-[10px] rounded-[5px] border-[1px]" />
                    <View>
                      <Text numberOfLines={1} ellipsizeMode="tail">
                        {c.content}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-[#555]">{dayjs(c.endDate).format('HH:mm')}</Text>
                  </View>
                </View>
                <View className="h-[48px] w-[48px] rounded-[8px] bg-[#f1f3f5]">
                  <ImportanceSquare value="doit" />
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default TodoItem;
