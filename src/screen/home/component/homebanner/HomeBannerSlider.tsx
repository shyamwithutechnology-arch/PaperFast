// import React, { useEffect, useRef, useState } from 'react';
// import { View, Image, useWindowDimensions, StyleSheet } from 'react-native';
// import Carousel, { Pagination, ICarouselInstance } from 'react-native-reanimated-carousel';
// import { useSharedValue } from 'react-native-reanimated';
// import { Images } from '../../../../assets/images';
// import { styles } from './styles';
// import { showSnackbar } from '../../../../utils/snackbar';

// export default function HomeBannerSlider() {
//   const [banner, setBanner] = useState([])
//   const [loading, setLoading] = useState(false)
//   const ref = useRef<ICarouselInstance>(null);
//   const progress = useSharedValue(0);
//   const { width } = useWindowDimensions();

//   const BANNER_HEIGHT = width * 0.45;
//   const BORDER_RADIUS = 16;

//   const data = [
//     { id: '1', image: Images.banner },
//     { id: '2', image: Images.banner1 },
//     { id: '3', image: Images.banner },
//     // { id: '3', image: Images.banner2 },
//   ];


//   const handleBoardDataGet = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('https://www.papers.withupartners.in/api/banner')
//       console.log('Response status:rr', response);
//       const newRes = await response.json();
//       console.log('newRes:', newRes);

//       if (response.ok) {
//         if (newRes.status === '1') {
//           // setProfileData(new)
//           // console.log('newRes.statusss', newRes.result)
//           setBanner(newRes.result)
//         } else {
//           showSnackbar(newRes?.msg || 'OTP Failed', 'error');
//         }
//       }
//     } catch (error) {
//       console.error('API Error:', error);
//       if (error.message?.includes('Network')) {
//         showSnackbar('No internet connection', 'error');
//       } else {
//         showSnackbar(error.message, 'error');
//       }

//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleBoardDataGet()
//   }, [])

//   return (
//     <View style={styles.container}>
//       <Carousel
//         ref={ref}
//         width={width - 23}
//         height={BANNER_HEIGHT}
//         data={data}
//         autoPlay
//         loop
//         autoPlayInterval={3000}
//         onProgressChange={progress}
//         style={{ alignSelf: 'center' }}
//         renderItem={({ item }) => (
//           <View style={[styles.imageWrapper, { borderRadius: BORDER_RADIUS }]}>
//             <Image
//               source={item.image}
//               style={styles.image}
//               resizeMode="cover"
//             />
//           </View>
//         )}
//       />

//       {/* <Pagination.Basic
//         progress={progress}
//         data={data}
//         dotStyle={styles.dot}
//         activeDotStyle={styles.activeDot}
//       /> */}
//     </View>
//   );
// }


import React, { useRef } from 'react';
import { View, Image, useWindowDimensions, ActivityIndicator } from 'react-native';
import Carousel, { Pagination, ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { Images } from '../../../../assets/images';
import { styles } from './styles';
import Loader from '../../../../component/loader/Loader';

// Local fallback images
const FALLBACK_IMAGES = [
  { id: '1', image: Images.banner, imageUrl: null },
  { id: '2', image: Images.banner1, imageUrl: null },
  { id: '3', image: Images.banner, imageUrl: null },
  // { id: '3', image: Images.banner2, imageUrl: null },
];

export default function HomeBannerSlider({ banners = [], loading = false, onRefresh }) {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);
  const { width } = useWindowDimensions();

  const BANNER_HEIGHT = width * 0.45;
  const BORDER_RADIUS = 16;

  // Determine which data to use
  const getCarouselData = () => {
    if (loading) {
      return [];
    }

    // If API returned banners, use them
    if (banners && banners.length > 0) {
      return banners.map((banner, index) => ({
        id: banner?.ban_title?.toString(),
        imageUrl: banner?.ban_image,
        // You can add fallback image here
        fallbackImage: FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]?.image
      }));
    }

    // Fallback to local images
    return FALLBACK_IMAGES;
  };

  const carouselData = getCarouselData();

  // Handle image loading error
  const handleImageError = (item) => {
    console.log('Failed to load image:', item.imageUrl);
    // You could trigger a refresh here
    // onRefresh && onRefresh();
  };

  // Render banner item
  const renderBannerItem = ({ item }) => {
    // console.log('sssssssw', item);
    
    // For API images (with URL)
    if (item.imageUrl) {
      return (
        <View style={[styles.imageWrapper, { borderRadius: BORDER_RADIUS }]}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="cover"
            onError={() => handleImageError(item)}
          />
        </View>
      );
    }

    // For local images
    return (
      <View style={[styles.imageWrapper, { borderRadius: BORDER_RADIUS }]}>
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  };
  // if (loading && banners.length === 0) {
  //     return (
  //         <View style={[styles.container, { height: BANNER_HEIGHT }]}>
  //             <ActivityIndicator size="large" color="#008CE3" />
  //         </View>
  //     );
  // }
  if (loading && banners.length) {
    <Loader visible={loading} />
  }

  if (carouselData.length === 0) {
    return null; // Don't render anything if no data
  }

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        width={width - 23}
        height={BANNER_HEIGHT}
        data={carouselData}
        autoPlay={carouselData.length > 1}
        loop={carouselData.length > 1}
        autoPlayInterval={3000}
        onProgressChange={progress}
        style={{ alignSelf: 'center' }}
        renderItem={renderBannerItem}
      />
      {/* Show pagination only if there are multiple banners */}
      {/* {carouselData.length > 1 && (
                <Pagination.Basic
                    progress={progress}
                    data={carouselData}
                    dotStyle={styles.dot}
                    activeDotStyle={styles.activeDot}
                />
            )} */}
    </View>
  );
}