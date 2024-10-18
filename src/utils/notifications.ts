import { Alert, Linking } from 'react-native';
import notifee, { AuthorizationStatus, TimestampTrigger, TriggerType } from '@notifee/react-native';

export const onDisplayNotification = async ({ id, title, body }: { id: string; title: string; body: string }) => {
  const channelId = await notifee.createChannel({
    id,
    name: 'Default Channel',
  });

  // Required for iOS
  // See https://notifee.app/react-native/docs/ios/permissions
  await notifee.requestPermission();

  // Sometime later...
  await notifee.displayNotification({
    id,
    title,
    body,
    android: {
      channelId,
    },
  });
};

export const onRequestNotificationPermission = async () => {
  const settings = await notifee.requestPermission();

  return settings.authorizationStatus === AuthorizationStatus.AUTHORIZED;
};

export const onCheckNotificationPermission = async () => {
  const settings = await notifee.getNotificationSettings();

  if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
    return true;
  }
  if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
    Alert.alert('권한 요청', '일정 알림 설정을 위한\n알림 권한이 필요합니다.', [
      {
        text: '앱 설정으로 이동',
        onPress: () => Linking.openSettings(),
        style: 'default',
      },
      {
        text: '취소',
        onPress: () => {},
        style: 'destructive',
      },
    ]);
  }
};

export const onRemoveNotification = async (id: string) => {
  await notifee.cancelNotification(id);
};

export const onCreateTriggerNotification = async ({
  id,
  time,
  title,
  body,
}: {
  id: string;
  time: Date;
  title: string;
  body: string;
}) => {
  // 알람 시간 설정
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: time.getTime(), // fire at 11:10am (10 minutes before meeting)
  };
  // 푸시 트리거 알람 생성
  await notifee.createTriggerNotification(
    {
      id,
      title,
      body,
      android: {
        channelId: id,
      },
    },
    trigger,
  );
};
