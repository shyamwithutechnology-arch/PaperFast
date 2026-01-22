import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Fonts } from '../../theme';
import { moderateScale } from '../../utils/responsiveSize';
import { Icons } from '../../assets/icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../component/header/AppHeader';
import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';

const SubscriptionScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            {/* <AppHeader/> */}
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lightThemeBlue} />

            {/* <SafeAreaView style={{ backgroundColor: Colors.lightThemeBlue }} edges={['top']}>
                <HeaderPaperModule title='Draft Papers' />
            </SafeAreaView> */}
            <View style={styles.content}>
                {/* Icon */}
                {/* <View style={styles.iconContainer}>
          <Image
            source={Icons.clockIcon}
            style={styles.icon}
            resizeMode="contain"
          />
        </View> */}

                {/* Title */}
                <Text style={styles.title}>Coming Soon!</Text>

                {/* Message */}
                <Text style={styles.message}>
                    This feature is currently under development.{'\n'}
                    We're working hard to bring it to you soon.
                </Text>

                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(24),
    },
    iconContainer: {
        width: moderateScale(120),
        height: moderateScale(120),
        borderRadius: moderateScale(60),
        backgroundColor: Colors.lightThemeBlue + '20', // 20 = 12% opacity
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: moderateScale(32),
    },
    icon: {
        width: moderateScale(60),
        height: moderateScale(60),
        tintColor: Colors.primaryColor,
    },
    title: {
        fontSize: moderateScale(25),
        fontFamily: Fonts.InterBold,
        color: Colors.black,
        textAlign: 'center',
        marginBottom: moderateScale(16),
    },
    message: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InterRegular,
        color: Colors.ParagraphAndShortTexts,
        textAlign: 'center',
        lineHeight: moderateScale(24),
        marginBottom: moderateScale(40),
    },
    backButton: {
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: moderateScale(25),
        paddingVertical: moderateScale(10),
        borderRadius: moderateScale(8),
    },
    backButtonText: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.InterSemiBold,
        color: Colors.white,
    },
});

export default SubscriptionScreen;