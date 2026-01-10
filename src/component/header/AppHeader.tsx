import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { styles } from "../header/styles";
import { moderateScale } from "../../utlis/responsiveSize";

interface AppHeaderProps {
    title: string;
    onBackPress?: () => void;
    rightText?: string;
    onRightPress?: () => void;
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    discriptionText: string

}

const AppHeader: React.FC<AppHeaderProps> = ({
    title,
    onBackPress,
    rightText,
    rightIcon,
    onRightPress,
    leftIcon,
    discriptionText
}) => {
    return (
        <ImageBackground source={require('../../assets/images/headerBg.png')} style={styles.headerImg} >
            {/* Left */}
            <View style={styles.side}>
                {onBackPress && (
                    <TouchableOpacity onPress={onBackPress}>
                        <Image source={leftIcon} style={{ height: moderateScale(40), width: moderateScale(40) }} />
                    </TouchableOpacity>
                )}
            </View>

            {/* Center */}
            <View style={styles.centeBox}>
                <Text style={styles.title}>{title}</Text>
                {/* <Text style={styles.subHeaderText}>Paper Generate In Minute</Text> */}
                <Text style={styles.subHeaderText}>{discriptionText}</Text>
            </View>

            {/* Right */}
            <View style={styles.side}>
                {rightText && (
                    <TouchableOpacity onPress={onRightPress}>
                        <Text style={styles.rightText}>{rightText}</Text>
                    </TouchableOpacity>
                )}
                {
                    rightIcon && (
                        <TouchableOpacity onPress={onRightPress}>
                            <Image source={rightIcon} style={{ height: moderateScale(40), width: moderateScale(40) }} />
                        </TouchableOpacity>
                    )
                }
            </View>
        </ImageBackground>
    );
};

export default AppHeader;


//// <View style={styles.side}>
//   {onBackPress && (
//     <TouchableOpacity onPress={onBackPress}>
//       {leftIcon}
//     </TouchableOpacity>
//   )}
// </View>