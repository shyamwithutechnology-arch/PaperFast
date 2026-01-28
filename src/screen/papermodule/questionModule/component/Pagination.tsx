// Pagination.tsx
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';
import { moderateScale } from '../../../../utils/responsiveSize';
import { Colors, Fonts } from '../../../../theme';
import Icons from "react-native-vector-icons/Ionicons";
import NextIcon from "react-native-vector-icons/MaterialIcons";
interface PaginationData {
    limit: number;
    page: number;
    pages: number;
    total: number;
}

interface PaginationProps {
    paginationData: PaginationData;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ paginationData, onPageChange }) => {
    const { page, pages, total } = paginationData;

    // Function to generate visible page numbers
    const getVisiblePages = () => {
        const visiblePages: (number | string)[] = [];
        const maxVisible = 5;

        if (pages <= maxVisible) {
            for (let i = 1; i <= pages; i++) {
                visiblePages.push(i);
            }
        } else {
            visiblePages.push(1);

            let startPage = Math.max(2, page - 1);
            let endPage = Math.min(pages - 1, page + 1);

            if (page <= 3) {
                startPage = 2;
                endPage = Math.min(4, pages - 1);
            }

            if (page >= pages - 2) {
                startPage = Math.max(2, pages - 3);
                endPage = pages - 1;
            }

            if (startPage > 2) {
                visiblePages.push('...');
            }

            for (let i = startPage; i <= endPage; i++) {
                visiblePages.push(i);
            }

            if (endPage < pages - 1) {
                visiblePages.push('...');
            }

            visiblePages.push(pages);
        }

        return visiblePages;
    };

    return (
        <View style={styles.container}>
            {/* Left side: Total items info */}
            <Text style={styles.totalText}>Page View : {total}</Text>

            {/* Center: Page numbers */}
            <View style={styles.pagesContainer}>
                {/* Previous button */}
                <TouchableOpacity
                    style={[styles.pageButton, page === 1 && styles.disabledButton]}
                    onPress={() => onPageChange(page - 1)}
                    disabled={page === 1}
                >
                    {/* <Text style={[styles.buttonText, page === 1 && styles.disabledText]}>
                        ←
                    </Text> */}
                    <Icons name="chevron-back-outline" size={moderateScale(14)} color={page === 1 ? '#ccc' : '#000'} />
                </TouchableOpacity>

                {/* Page numbers */}
                {getVisiblePages().map((pageNum, index) => {
                    if (pageNum === '...') {
                        return (
                            <Text key={`ellipsis-${index}`} style={styles.ellipsis}>
                                ...
                            </Text>
                        );
                    }

                    const pageNumber = pageNum as number;
                    const isActive = pageNumber === page;

                    return (
                        <TouchableOpacity
                            key={`page-${pageNumber}`}
                            style={[styles.pageButton, isActive && styles.activeButton]}
                            onPress={() => onPageChange(pageNumber)}
                            disabled={isActive}
                        >
                            <Text style={[styles.pageText, isActive && styles.activeText]}>
                                {pageNumber}
                            </Text>
                        </TouchableOpacity>
                    );
                })}

                {/* Next button */}
                <TouchableOpacity
                    style={[styles.pageButton, page === pages && styles.disabledButton]}
                    onPress={() => onPageChange(page + 1)}
                    disabled={page === pages}>
                    <NextIcon name="navigate-next" size={moderateScale(18)} color={page === pages ? '#ccc' : '#000'} />
                    {/* <Text style={[styles.buttonText, page === pages && styles.disabledText]}>
                        →
                    </Text> */}

                </TouchableOpacity>
            </View>

            {/* Right side: Page info
      <Text style={styles.pageInfo}>
        Page {page} of {pages}
      </Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(6),
        backgroundColor: '#F6FBFF',
        // borderTopWidth: 1,
        // borderTopColor: Colors.InputStroke || '#e0e0e0',
        // width: Dimensions.get('window').width,
        borderWidth: 1,
        width: '100%'
    },
    totalText: {
        fontSize: moderateScale(10),
        color: Colors.black,
        flex: 1,
        fontFamily: Fonts.InstrumentSansMedium
    },
    pagesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
        // backgroundColor:'red'
    },
    pageButton: {
        width: moderateScale(21),
        height: moderateScale(21),
        borderRadius: moderateScale(4),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: moderateScale(2),
        backgroundColor: '#F6FBFF',
    },
    activeButton: {
        backgroundColor: Colors.primaryColor,
    },
    disabledButton: {
        backgroundColor: '#F6FBFF',
    },
    pageText: {
        fontSize: moderateScale(12),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansMedium
    },
    activeText: {
        color: Colors.white,
        fontFamily: Fonts.InstrumentSansSemiBold
    },
    // buttonText: {
    //     fontSize: moderateScale(14),
    //     color: Colors.textPrimary || '#333',
    //     fontWeight: '500',
    // },
    // disabledText: {
    //     color: Colors.textDisabled || '#ccc',
    // },
    ellipsis: {
        fontSize: moderateScale(12),
        // color: Colors.textSecondary || '#999',
        color: Colors.black,
        marginHorizontal: moderateScale(8),
        fontWeight: '500',
    },
    // pageInfo: {
    //     fontSize: moderateScale(12),
    //     color: Colors.textSecondary || '#666',
    //     fontWeight: '500',
    //     textAlign: 'right',
    //     flex: 1,
    // },
});

export default Pagination;