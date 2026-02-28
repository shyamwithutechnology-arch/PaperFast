import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { styles } from './styles';
import { Colors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icons } from '../../assets/icons';
import { localStorage, storageKeys } from '../../storage/storage';
export type scrollboardProps = {
}

const ScoreCardScreen = (props: scrollboardProps) => {
    const navigation = useNavigation()
    const route = useRoute()
    // console.log('selectedBoard', selectedBoard);
    const [userPath, setUserPath] = useState({
        board: "",
        subjectName: ''
    })
    const { chapterName, results, totalQuestions, totalTimeSpent } = route?.params

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

    useEffect(() => {
        const userData = async () => {
            let board = await localStorage.getItem(storageKeys.selectedBoard)
            const subjectName = await localStorage.getItem(storageKeys.selectedSubject);
            setUserPath({ board: board || '', subjectName: subjectName || '' })
            // setSubjectName(subjectName)     
        }
        userData()
    }, [])

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
                    {userPath?.board} > {userPath?.subjectName} > {chapterName || 'STD 11 - 3. Plant kingdom'}
                </Text>

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

            </SafeAreaView>
        </View>
    )
}

export default ScoreCardScreen