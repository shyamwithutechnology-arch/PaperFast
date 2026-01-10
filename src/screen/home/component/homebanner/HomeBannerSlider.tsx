import React, { useRef } from 'react';
import { View, Image, useWindowDimensions, StyleSheet } from 'react-native';
import Carousel, { Pagination, ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { Images } from '../../../../assets/images';
import { styles } from './styles';

export default function HomeBannerSlider() {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);
  const { width } = useWindowDimensions();

  const BANNER_HEIGHT = width * 0.45;
  const BORDER_RADIUS = 16;

  const data = [
    { id: '1', image: Images.banner },
    { id: '2', image: Images.banner1 },
    { id: '3', image: Images.banner },
    // { id: '3', image: Images.banner2 },
  ];

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        width={width - 23}           
        height={BANNER_HEIGHT}
        data={data}
        autoPlay
        loop
        autoPlayInterval={3000}
        onProgressChange={progress}
        style={{ alignSelf: 'center' }}
        renderItem={({ item }) => (
          <View style={[styles.imageWrapper,{borderRadius:BORDER_RADIUS}]}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
      />

      {/* <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      /> */}
    </View>
  );
}
