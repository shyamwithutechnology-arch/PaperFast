import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { Colors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
import { moderateScale } from '../../utils/responsiveSize';
import QuestionListComponent from './component/questionlist/QuestionListComponent';
import Loader from '../../component/loader/Loader';
import { showToast } from '../../utils/toast';
import { POST_FORM } from '../../api/request';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Pagination from './component/Pagination';

export type QuestionListScreenProps = {

}
const QuestionListScreen = (props: QuestionListScreenProps) => {
    const navigation = useNavigation()
    const [selectCheck, setSelectedCheck] = useState('Options')
    const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
    const [questionsData, setQuestionsData] = useState<any>({});
    const [loader, setLoader] = useState(false);

    const [pagination, setPagination] = useState({
        limit: 10,
        page: 1,
        pages: 1,
        total: 0,
    });

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.pages) {

            fetchQuestions(newPage);
            // Optional: Scroll to top when page changes
            // scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }
    };

    // Handle limit change
    const handleLimitChange = (newLimit: number) => {
        setPagination(prev => ({
            ...prev,
            limit: newLimit,
            page: 1 // Reset to first page
        }));
        // Fetch data with new limit
        fetchQuestions(1, newLimit);
    };
    const fetchQuestions = async (page: number = 1, limit: number = pagination?.limit) => {
        setLoader(true)
        try {
            let params = {
                'subject_id': '6',
                'difficulty': '3',
                // 'easy': '3',
                'page': page?.toString(),
                'limit': limit?.toString()
            }
            const response = await POST_FORM('question', params)
            if (response?.status === 200) {
                setQuestionsData(response || {});
                if (response?.pagination) {
                    setPagination({
                        limit: response.pagination.limit,
                        page: response.pagination.page,
                        pages: response.pagination.pages,
                        total: response.pagination.total,
                    });
                }
            }
        } catch (error: any) {
            if (error?.offline) {
                return;
            }
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                'Something went wrong. Please try again.';
            showToast('error', 'Error', errorMessage);
        } finally {
            setLoader(false)
        }
    };

    useFocusEffect(
        useCallback(() => {
            navigation.getParent()?.setOptions({
                tabBarStyle: { display: 'none' },
            });
            return () => {
                navigation.getParent()?.setOptions({
                    tabBarStyle: { display: 'flex' },
                });
            };
        }, []))

    useEffect(() => {
        fetchQuestions(pagination.page, pagination?.limit);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lightThemeBlue} />
            <SafeAreaView style={{ backgroundColor: Colors.lightThemeBlue }} edges={['top']}>
                <HeaderPaperModule title={'Numer System - M.C.Q [1 Marks Each]'} />
            </SafeAreaView>

            <SafeAreaView style={styles.homeContainer} edges={['left', 'right', 'bottom']}>
                <Loader visible={loader} />
                {pagination.pages > 1 && (
                    <Pagination
                        paginationData={pagination}
                        onPageChange={handlePageChange}
                        onLimitChange={handleLimitChange}
                    />)}

                {/* <Text style={styles.paperText}>PaperListScreen component</Text> */}
                <QuestionListComponent
                    selectCheck={selectCheck}
                    selectedMap={selectedMap}
                    setSelectedMap={setSelectedMap}
                    questionsData={questionsData?.result ?? []}
                    currentPage={pagination?.page}
                    limit={pagination.limit}
                />
            </SafeAreaView>
        </View>
    )
}

export default QuestionListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    homeContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    paperText: {
        fontSize: moderateScale(14)
    }
})