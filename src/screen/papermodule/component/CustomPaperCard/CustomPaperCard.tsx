import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { styles } from './styles';
import { Icons } from '../../../../assets/icons';
import { moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const CustomPaperCard = ({ onPress }) => {
  const navigation = useNavigation()
  return (
    <View >
      <View style={styles.mainBox}>
      <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={ () => onPress('Regular Paper')}>
        <Image source={Icons.customPaper} style={styles.icon} />

        <Text style={styles.title}>Regular Paper</Text>
        <Text style={styles.subtitle}>Select question of {`\n`}your choice</Text>

        <View style={styles.arrowButton}>
          <Image source={Icons.rightArrow} style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={ () => onPress('Custom Paper')}>
        <Image source={Icons.textPaper} style={styles.icon} />

        <Text style={styles.title}>Custom Paper</Text>
        <Text style={styles.subtitle}>Select question of {`\n`}your choice</Text>

        <View style={styles.arrowButton}>
          <Image source={Icons.rightArrow} style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>
      </View>

         <TouchableOpacity style={[styles.card,{marginTop:moderateScale(15), marginLeft:moderateScale(15), }]} activeOpacity={0.8} onPress={ () => onPress('Random Paper')}>
        <Image source={Icons.randomPaper} style={styles.icon} />

        <Text style={styles.title}>Rendom Paper</Text>
        <Text style={styles.subtitle}>Select question of {`\n`}your choice</Text>

        <View style={styles.arrowButton}>
          <Image source={Icons.rightArrow} style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>
      </View>
  );
};

export default CustomPaperCard;
