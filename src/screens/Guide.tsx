import React, { useRef, useState } from 'react';
import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel/src/Carousel.tsx';
import { ICarouselInstance } from 'react-native-reanimated-carousel/src/types.ts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react-native';

import { Button } from '@/components/Button.tsx';
import GradientText from '@/components/GradientText.tsx';
import Layout from '@/components/Layout/Layout.tsx';
import { RootStackParamList } from '@/types/navigation.ts';
import { setData } from '@/utils/storage.ts';

type GuideNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Guide'>;

const matrixData = ['doit', 'schedule', 'delegate', 'eliminate'];

const { width, height } = Dimensions.get('window');

const matrixGuide = [
  {
    value: 'matrix',
    textComponent: (
      <View className="items-center">
        <View className="flex-row">
          <GradientText colors={['#4AC7FA', '#5b34f5']}>
            <Text className="text-center text-2xl font-semibold">아이젠하워 매트릭스</Text>
          </GradientText>
          <Text className="text-center text-2xl font-semibold">는</Text>
        </View>
        <Text className="text-center text-2xl font-semibold">긴급성과 중요도에 따라 업무의</Text>
        <Text className="text-center text-2xl font-semibold">우선순위를 지정하고 정리합니다.</Text>
      </View>
    ),
  },
  {
    value: 'doit',
    textComponent: (
      <View className="items-center">
        <View className="flex-row">
          <GradientText colors={['#4AC7FA', '#5b34f5']}>
            <Text className="text-center text-2xl font-semibold">긴급하고 중요한</Text>
          </GradientText>
        </View>
        <Text className="text-center text-2xl font-semibold">최우선 순위로</Text>
        <Text className="text-center text-2xl font-semibold">즉각적인 처리가 필요합니다.</Text>
      </View>
    ),
  },
  {
    value: 'schedule',
    textComponent: (
      <View className="items-center">
        <View className="flex-row">
          <GradientText colors={['#4AC7FA', '#5b34f5']}>
            <Text className="text-center text-2xl font-semibold">긴급하지않고 중요한</Text>
          </GradientText>
        </View>
        <Text className="text-center text-2xl font-semibold">충분한 시간을 가지고 계획을 세워</Text>
        <Text className="text-center text-2xl font-semibold">준비하는 과정이 필요합니다.</Text>
      </View>
    ),
  },
  {
    value: 'delegate',
    textComponent: (
      <View className="items-center">
        <View className="flex-row">
          <GradientText colors={['#4AC7FA', '#5b34f5']}>
            <Text className="text-center text-2xl font-semibold">긴급하고 중요하지 않은</Text>
          </GradientText>
        </View>
        <Text className="text-center text-2xl font-semibold">다른 사람에게 위임할 수 있는 업무</Text>
        <Text className="text-center text-2xl font-semibold">자신이 직접 처리하지 않을 수 있습니다.</Text>
      </View>
    ),
  },
  {
    value: 'eliminate',
    textComponent: (
      <View className="items-center">
        <View className="flex-row">
          <GradientText colors={['#4AC7FA', '#5b34f5']}>
            <Text className="text-center text-2xl font-semibold">긴급하지않고 중요하지않고</Text>
          </GradientText>
        </View>
        <Text className="text-center text-2xl font-semibold">우선적으로 정리하거나</Text>
        <Text className="text-center text-2xl font-semibold">삭제할 수 있는 일들을 말합니다.</Text>
      </View>
    ),
  },
];

const MatrixItem = ({ value }: { value: string }) => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-row gap-2">
        <View
          className="h-24 w-24 rounded-md bg-gray-300"
          style={{
            backgroundColor: value === matrixData[0] ? '#007bff' : '#e0f3ff',
          }}
        />
        <View
          className="h-24 w-24 rounded-md bg-gray-300"
          style={{
            backgroundColor: value === matrixData[1] ? '#007bff' : '#e0f3ff',
          }}
        />
      </View>
      <View className="flex-row gap-2 pt-2">
        <View
          className="h-24 w-24 rounded-md bg-gray-300"
          style={{
            backgroundColor: value === matrixData[2] ? '#007bff' : '#e0f3ff',
          }}
        />
        <View
          className="h-24 w-24 rounded-md bg-gray-300"
          style={{
            backgroundColor: value === matrixData[3] ? '#007bff' : '#e0f3ff',
          }}
        />
      </View>
    </View>
  );
};

const Guide = ({ navigation }: { navigation: GuideNavigationProp }) => {
  const carouselRef = useRef<ICarouselInstance>(null);

  const [carouselIndex, setCarouselIndex] = useState(0);

  const onSaveGuide = async () => {
    await setData('guideKey', true);
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Layout className="gap-12">
        <View className="mr-2 items-end">
          <Button variant="outline" className="border-0" onPress={onSaveGuide}>
            <Text>스킵하기</Text>
          </Button>
        </View>
        <View className="flex-1">
          <Carousel
            ref={carouselRef}
            width={width}
            height={height / 2}
            data={matrixGuide}
            loop={false}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setCarouselIndex(index)}
            renderItem={({ item, index }) => (
              <View style={{ flex: 1, gap: 20, alignItems: 'center', justifyContent: 'center' }}>
                {index > 0 && <MatrixItem value={item.value} key={item.value} />}
                {item.textComponent}
              </View>
            )}
          />
          <View className="mx-2 flex-row items-center justify-between">
            <Button variant="outline" className="border-0" onPress={() => carouselRef.current?.prev()}>
              <ChevronLeft color={carouselIndex === 0 ? 'gray' : 'black'} />
            </Button>
            <View className="flex-row justify-center gap-2">
              {matrixGuide.map((_, index) => (
                <View
                  key={_.value}
                  className="h-2 w-2 rounded-full bg-gray-300"
                  style={{
                    backgroundColor: carouselIndex === index ? '#007bff' : '#e0f3ff',
                  }}
                />
              ))}
            </View>
            <Button
              variant="outline"
              className="border-0"
              onPress={() => {
                if (carouselIndex === matrixGuide.length - 1) {
                  onSaveGuide();
                } else {
                  carouselRef.current?.next();
                }
              }}
            >
              {carouselIndex === matrixGuide.length - 1 ? (
                <Check color="#007bff" />
              ) : (
                <ChevronRight color={carouselIndex === matrixGuide.length - 1 ? 'gray' : 'black'} />
              )}
            </Button>
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

export default Guide;
