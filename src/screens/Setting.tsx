import React, { useMemo } from 'react';
import { Switch, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useColorScheme } from 'nativewind';

import Layout from '@/components/Layout/Layout.tsx';
import Radio from '@/components/Radio.tsx';
import { onCheckNotificationPermission, onDisplayNotification } from '@/utils/notifications.ts';

type SettingItemType = {
  title: string;
  type: 'switch' | 'theme';
  value: boolean;
  onTheme?: () => void;
  onSwitch?: (value: boolean) => void;
};

const SettingItem = ({
  title,
  type,
  darkMode,
  value,
  onTheme,
  onSwitch,
}: SettingItemType & {
  darkMode: boolean;
}) => {
  const darkValue = useMemo(() => value, [value]);
  const lightValue = useMemo(() => !value, [value]);

  return (
    <View
      className="flex-row items-center justify-between rounded-xl"
      style={{
        backgroundColor: darkMode ? '#333' : '#f5f5f5',
        padding: 16,
      }}
    >
      <Text
        className="text-xl font-semibold"
        style={{
          color: darkMode ? '#fff' : '#000',
        }}
      >
        {title}
      </Text>
      {type === 'theme' && (
        <View className="flex-row" style={{ gap: 16 }}>
          <Radio
            value={lightValue}
            text="밝은"
            onChange={() => {
              if (lightValue) return;

              if (onTheme) {
                onTheme();
              }
            }}
            darkMode={darkMode}
          />
          <Radio
            value={darkValue}
            text="어두운"
            onChange={() => {
              if (darkValue) return;

              if (onTheme) {
                onTheme();
              }
            }}
            darkMode={darkMode}
          />
        </View>
      )}
      {type === 'switch' && (
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={value ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onSwitch}
          value={value}
        />
      )}
    </View>
  );
};

const Setting = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const onSwitchHandler = async () => {
    const isCheckNotification = await onCheckNotificationPermission();

    // 알림 권한 승인
    if (isCheckNotification) {
      await onDisplayNotification({
        id: 'test',
        title: '알림 테스트',
        body: '알림 테스트입니다.',
      });
    }
  };

  const settingItems: SettingItemType[] = useMemo(
    () => [
      {
        title: '테마',
        type: 'theme',
        value: colorScheme === 'dark',
        onTheme: toggleColorScheme,
      },
      {
        title: '일정 알림',
        type: 'switch',
        value: false,
        onSwitch: () => onSwitchHandler(),
      },
      {
        title: '매트릭스 색상 설정',
        type: 'switch',
        value: false,
      },
    ],
    [colorScheme],
  );

  return (
    <Layout>
      <FlashList
        estimatedItemSize={3}
        data={settingItems}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item }) => <SettingItem {...item} darkMode={colorScheme === 'dark'} />}
      />
    </Layout>
  );
};

export default Setting;
