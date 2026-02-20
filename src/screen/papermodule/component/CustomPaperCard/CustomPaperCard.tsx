import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { styles } from './styles';
import { Icons } from '../../../../assets/icons';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  DraftPaperScreen: undefined;
};

interface CustomaPaperProps {
  onPress: (type: string) => void
}

const CustomPaperCard = ({ onPress }: CustomaPaperProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  return (
    <View >
      <View style={styles.mainBox}>
        <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => onPress('Manual')}>
          <View style={styles.imgeCurcel}>
            <Image source={Icons.regularpaper} style={styles.icon} />
          </View>
          <Text style={styles.title}>Manual Paper</Text>
          <Text style={styles.subtitle}>Select question of your {`\n`}choice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, { backgroundColor: '#FFF6D4' }]} activeOpacity={0.8} >
          <View style={styles.imgeCurcel}>
            <Image source={Icons.custompaper} style={styles.icon} /></View>
          <Text style={styles.title}>Custom Paper</Text>
          <Text style={styles.subtitle}>Select question of your{`\n`}choice</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainBox}>
        <TouchableOpacity style={[styles.card, { backgroundColor: '#DAFEFF' }]} activeOpacity={0.8} onPress={() => onPress('Random')}>
          <View style={styles.imgeCurcel}>
            <Image source={Icons.randompaper} style={styles.icon} />
          </View>
          <Text style={styles.title}>Rendom Paper</Text>
          <Text style={styles.subtitle}>Select question of your {`\n`}choice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, { backgroundColor: '#F1E9FF' }]} activeOpacity={0.8} onPress={() => navigation?.navigate('DraftPaperScreen')}>
          <View style={styles.imgeCurcel}>
            <Image source={Icons.draftpaper} style={styles.icon} /></View>
          <Text style={styles.title}>Draft Paper</Text>
          <Text style={styles.subtitle}>Select question of your{`\n`}choice</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.bannerBox}>
        <Image source={Images?.papertypeBanner} resizeMode='contain' style={styles.paperBannerImg} />
      </View> */}
      {/* 
      <HomeBannerSlider
        banners={banners}
        loading={loading}
        onRefresh={handleRefreshBanners}
      /> */}
    </View>
  );
};

export default CustomPaperCard;
