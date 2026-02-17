// import React from 'react';
// import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
// import { styles } from './styles';
// import { Colors } from '../../theme';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { Icons } from '../../assets/icons';

// export type scrollboardProps = {

// }

// const ScoreBoardScreen = (props: scrollboardProps) => {
//     const navigation = useNavigation()
//     const route = useRoute()
//     const { chapterName, results, totalQuestions, totalTimeSpent } = route?.params
//     console.log('fffffffffffffffff', chapterName, results, totalQuestions, totalTimeSpent);
//     let attempt = results.correct + results?.wrong
//     let unAttempt = results?.skipped

//     const handleBack = () => {
//         navigation.goBack()
//     }

//     return (
//         <View style={styles.container}>
//             <StatusBar backgroundColor={Colors.lightThemeBlue} barStyle={'dark-content'} />
//             <SafeAreaView style={{ backgroundColor: Colors?.lightThemeBlue }} edges={['top']}>
//                 <HeaderPaperModule title={'Score Board'} leftIconPress={handleBack} />
//             </SafeAreaView>
//             <SafeAreaView
//                 style={{ flex: 1, backgroundColor: Colors.white }}
//                 edges={["left", "right", "bottom"]}>
//                 <Text style={styles.yourPerformanceText}>scrollboard component</Text>
//                 <Text style={styles.yourPerformanceText1}>In NEET > Biology > STD 11 - 3. Plant kingdom</Text>
//                 <View style={styles.mainBox}>
//                     <View style={styles.attemptBox}>
//                         <View style={styles.attemptImgBox}>
//                             <Image source={Icons.attempt} style={styles.attemptImg} resizeMode='contain' />
//                         </View>
//                         <View>
//                             <Text style={styles.attemptText}>Attempt</Text>
//                             <Text style={styles.attemptText1}>{attempt}Qs</Text>
//                         </View>
//                     </View>
//                     <View style={[styles.attemptBox, { backgroundColor: '#E3EBFF' }]}>
//                         <View style={styles.attemptImgBox}>
//                             <Image source={Icons.accurency} style={styles.attemptImg} resizeMode='contain' />
//                         </View>
//                         <View>
//                             <Text style={styles.attemptText}>Accurency</Text>
//                             <Text style={styles.attemptText1}>20%</Text>
//                         </View>
//                     </View>
//                 </View>
//                 <View style={styles.mainBox}>
//                     <View style={[styles.attemptBox, { backgroundColor: '#D5FDCB' }]}>
//                         <View style={styles.attemptImgBox}>
//                             <Image source={Icons.attempt} style={styles.attemptImg} resizeMode='contain' />
//                         </View>
//                         <View>
//                             <Text style={styles.attemptText}>Time Per Ques</Text>
//                             <Text style={styles.attemptText1}>0.8 sec</Text>
//                         </View>
//                     </View>
//                     <View style={[styles.attemptBox, { backgroundColor: '#FFF0F1' }]}>
//                         <View style={styles.attemptImgBox}>
//                             <Image source={Icons.accurency} style={styles.attemptImg} resizeMode='contain' />
//                         </View>
//                         <View>
//                             <Text style={styles.attemptText}>unAttempt</Text>
//                             <Text style={styles.attemptText1}>{unAttempt}Qs</Text>
//                         </View>
//                     </View>
//                 </View>
//             </SafeAreaView>
//         </View>
//     )
// }

// export default ScoreBoardScreen


import React from 'react';
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { styles } from './styles';
import { Colors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icons } from '../../assets/icons';

export type scrollboardProps = {

}

const ScoreCardScreen = (props: scrollboardProps) => {
    const navigation = useNavigation()
    const route = useRoute()
    const { chapterName, results, totalQuestions, totalTimeSpent } = route?.params
    // console.log('fffffffffffffffff', chapterName, results, totalQuestions, totalTimeSpent);

    // Calculate metrics
    let attempt = results.correct + results?.wrong
    let unAttempt = results?.skipped

    // Calculate accuracy percentage
    const accuracy = totalQuestions > 0
        ? ((results.correct / totalQuestions) * 100).toFixed(1)
        : '0.0'

    // Calculate average time per question in seconds
    const avgTimePerQuestion = totalQuestions > 0
        ? (totalTimeSpent / totalQuestions).toFixed(1)
        : '0.0'

    // Format time for display (convert seconds to minutes:seconds if needed)
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleBack = () => {
        navigation.goBack()
    }

    const cardData = [
        { id: 1, img: Icons.attempt, text: 'Attempts', result: `${attempt} Qs`, color: '#FBF0FF' },
        { id: 1, img: Icons.accurency, text: 'Accurency', result: `${accuracy}%`, color: '#E3EBFF' },
        { id: 1, img: Icons.time, text: 'Total Time', result: `${formatTime(totalTimeSpent)} sec`, color: '#FFEDED' },
        { id: 1, img: Icons.right, text: 'Total Correct Answers', result: `${results?.correct}`, color: '#D5FDCB' },
        { id: 1, img: Icons.wrong, text: 'Total Incorrect Answers', result: `${results?.wrong}`, color: '#FFF9F0' },
        { id: 1, img: Icons.avgicon, text: 'Avg. per question time', result: `${avgTimePerQuestion} sec`, color: '#F3F0FF' },
    ]

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.lightThemeBlue} barStyle={'dark-content'} />
            <SafeAreaView style={{ backgroundColor: Colors?.lightThemeBlue }} edges={['top']}>
                <HeaderPaperModule title={'Score Card'} leftIconPress={handleBack} />
            </SafeAreaView>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.white }}
                edges={["left", "right", "bottom"]}>

                <Text style={styles.yourPerformanceText}>Your Performance</Text>
                <Text style={styles.yourPerformanceText1}>
                    In NEET > Biology > {chapterName || 'STD 11 - 3. Plant kingdom'}
                </Text>

                {/* <View></View> */}
                <>
                    {cardData.map(item => (
                        <View style={[styles.attemptBox, { backgroundColor: item?.color }]}>
                            <View style={styles.imgTextBox}>
                                <View style={styles.attemptImgBox}>
                                    <Image source={item?.img} style={styles.attemptImg} resizeMode='contain' />
                                </View>
                                <Text style={styles.attemptText}>{item?.text}</Text>
                            </View>
                            <Text style={styles.attemptText1}>{item?.result}</Text>
                        </View>
                    ))}
                </>

                {/* Accuracy Box */}
                {/* <View style={[styles.attemptBox, { backgroundColor: '#E3EBFF' }]}>
                        <View style={styles.attemptImgBox}>
                            <Image source={Icons.accurency} style={styles.attemptImg} resizeMode='contain' />
                        </View>
                        <View>
                            <Text style={styles.attemptText}>Accuracy</Text>
                            <Text style={styles.attemptText1}>{accuracy}%</Text>
                        </View>
                    </View> */}
                {/* </View> */}

                {/* <View style={styles.mainBox}> */}
                {/* Time Per Question Box */}
                {/* <View style={[styles.attemptBox, { backgroundColor: '#D5FDCB' }]}>
                        <View style={styles.attemptImgBox}>
                            <Image source={Icons.time} style={styles.attemptImg} resizeMode='contain' />
                        </View>
                        <View>
                            <Text style={styles.attemptText}>Time Per Ques</Text>
                            <Text style={styles.attemptText1}>{avgTimePerQuestion} sec</Text>
                        </View>
                    </View> */}

                {/* Unattempted Box */}
                {/* <View style={[styles.attemptBox, { backgroundColor: '#FFF0F1' }]}>
                        <View style={styles.attemptImgBox}>
                            <Image source={Icons.accurency} style={styles.attemptImg} resizeMode='contain' />
                        </View>
                        <View>
                            <Text style={styles.attemptText}>Unattempted</Text>
                            <Text style={styles.attemptText1}>{unAttempt} Qs</Text>
                        </View>
                    </View> */}
                {/* </View> */}

                {/* Optional: Show total time taken */}
                {/* <View style={styles.totalTimeContainer}>
                    <Text style={styles.totalTimeLabel}>Total Time Taken:</Text>
                    <Text style={styles.totalTimeValue}>{formatTime(totalTimeSpent || 0)}</Text>
                </View> */}
            </SafeAreaView>
        </View>
    )
}

export default ScoreCardScreen