import React from 'react';
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { styles } from './styles';
import { Colors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
import { useNavigation } from '@react-navigation/native';
import { Icons } from '../../assets/icons';

export type scrollboardProps = {

}

const ScoreBoardScreen = (props: scrollboardProps) => {
    const navigation = useNavigation()
    const handleBack = () => {
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.lightThemeBlue} barStyle={'dark-content'} />
            <SafeAreaView style={{ backgroundColor: Colors?.lightThemeBlue }} edges={['top']}>
                <HeaderPaperModule title={'Score Board'} leftIconPress={handleBack} />
            </SafeAreaView>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.white }}
                edges={["left", "right", "bottom"]}>
                <Text style={styles.yourPerformanceText}>scrollboard component</Text>
                <Text style={styles.yourPerformanceText1}>In NEET > Biology > STD 11 - 3. Plant kingdom</Text>
                <View style={styles.mainBox}>
                <View style={styles.attemptBox}>
                    <View style={styles.attemptImgBox}>
                        <Image source={Icons.attempt} style={styles.attemptImg} resizeMode='contain'/>
                    </View>
                    <View>
                        <Text style={styles.attemptText}>Attempt</Text>
                        <Text style={styles.attemptText1}>5Qs</Text>
                    </View>
                </View>
                <View style={[styles.attemptBox,{backgroundColor:'#E3EBFF'}]}>
                    <View style={styles.attemptImgBox}>
                        <Image source={Icons.accurency} style={styles.attemptImg}resizeMode='contain'/>
                    </View>
                    <View>
                        <Text style={styles.attemptText}>Accurency</Text>
                        <Text style={styles.attemptText1}>20%</Text>
                    </View>
                </View>
                </View>
                <View style={styles.mainBox}>
                <View style={[styles.attemptBox,{backgroundColor:'#D5FDCB'}]}>
                    <View style={styles.attemptImgBox}>
                        <Image source={Icons.attempt} style={styles.attemptImg} resizeMode='contain'/>
                    </View>
                    <View>
                        <Text style={styles.attemptText}>Time Per Ques</Text>
                        <Text style={styles.attemptText1}>0.8 sec</Text>
                    </View>
                </View>
                <View style={[styles.attemptBox,{backgroundColor:'#FFF0F1'}]}>
                    <View style={styles.attemptImgBox}>
                        <Image source={Icons.accurency} style={styles.attemptImg}resizeMode='contain'/>
                    </View>
                    <View>
                        <Text style={styles.attemptText}>Attempts</Text>
                        <Text style={styles.attemptText1}>5Qs</Text>
                    </View>
                </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default ScoreBoardScreen
