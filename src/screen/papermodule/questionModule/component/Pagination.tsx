import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    Pressable,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import { moderateScale } from '../../../../utils/responsiveSize';
import { Colors, Fonts } from '../../../../theme';
import LeftIcons from "react-native-vector-icons/Ionicons";
import NextIcon from "react-native-vector-icons/MaterialIcons";
import { Icons } from '../../../../assets/icons';

interface PaginationData {
    limit: number;
    page: number;
    pages: number;
    total: number;
}

interface PaginationProps {
    paginationData: PaginationData;
    onPageChange: (page: number) => void;
    onLimitChange?: (limit: number) => void;
}

const PAGE_SIZE_OPTIONS = [25, 50, 75, 100];

const Pagination: React.FC<PaginationProps> = ({
    paginationData,
    onPageChange,
    onLimitChange
}) => {
    const [showLimitDropdown, setShowLimitDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
    // const [selectedLimit, setSelectedLimit] = useState(paginationData.limit || 25); // Default to 25
    const paginationBoxRef = useRef<View>(null);
    const { page, pages, total, limit } = paginationData;

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

    const handleLimitSelect = (selectedLimit: number) => {
        // setSelectedLimit(selectedLimit);
        if (onLimitChange) {
            onLimitChange(selectedLimit);
        }
        setShowLimitDropdown(false);
    };

    // const handlePageSizePress = () => {
    //     setShowLimitDropdown(!showLimitDropdown);
    // };
    const handlePageSizePress = () => {
        // Measure the position of the pagination box
        if (paginationBoxRef.current) {
            paginationBoxRef.current.measure((x, y, width, height, pageX, pageY) => {
                setDropdownPosition({
                    x: pageX,
                    y: pageY + height + moderateScale(5), // 5px below the box
                });
                setShowLimitDropdown(true);
            });
        }
    };
    const handleCloseDropdown = () => {
        setShowLimitDropdown(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            if (showLimitDropdown) {
                setShowLimitDropdown(false);
            }
        };

        return () => { };
    }, [showLimitDropdown]);
    // // Close dropdown when clicking outside
    // useEffect(() => {
    //     const handleClickOutside = () => {
    //         if (showLimitDropdown) {
    //             setShowLimitDropdown(false);
    //         }
    //     };

    //     // You might want to use a more sophisticated click-outside detection
    //     // depending on your app's requirements
    //     return () => {
    //         handleClickOutside() // comment
    //     };
    // }, [showLimitDropdown]);
    return (
        <View style={styles.container}>
            {/* Left side: Total items info and page size selector */}
            <View style={styles.leftContainer}>
                <Text style={styles.totalText}>Page View</Text>
                <Pressable
                    style={styles.paginationBox}
                    onPress={handlePageSizePress}
                    ref={paginationBoxRef}
                >
                    <Text style={[styles.totalText, { fontSize: moderateScale(13.5) }]}>
                        {limit}{' '}
                    </Text>
                    <Image
                        source={Icons.downArrow}
                        style={[
                            styles.arrow,
                            { transform: [{ rotate: showLimitDropdown ? "180deg" : "0deg" }] },
                        ]}
                    />
                </Pressable>

                {/* Dropdown Modal */}
                {showLimitDropdown &&
                    <Modal
                        visible={showLimitDropdown}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={handleCloseDropdown}
                    >
                        <TouchableWithoutFeedback onPress={handleCloseDropdown}>
                            <View style={styles.modalOverlay}>
                                <TouchableWithoutFeedback>
                                    <View
                                        style={[
                                            styles.dropdownContainer,
                                            {
                                                position: 'absolute',
                                                // top: dropdownPosition.x,
                                                // left: dropdownPosition.y,
                                                top:moderateScale(155),
                                                left:moderateScale(82)
                                            }
                                        ]}
                                    >
                                        {PAGE_SIZE_OPTIONS.map((option) => (
                                            <TouchableOpacity
                                                key={`limit-${option}`}
                                                style={[
                                                    styles.dropdownItem,
                                                    limit === option && styles.dropdownItemSelected
                                                ]}
                                                onPress={() => handleLimitSelect(option)}
                                            >
                                                <Text style={[
                                                    styles.dropdownItemText,
                                                    limit === option && styles.dropdownItemTextSelected
                                                ]}>
                                                    {option}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>}
            </View>

            {/* Center: Page numbers */}
            <View style={styles.pagesContainer}>
                {/* Previous button */}
                <TouchableOpacity
                    style={[styles.pageButton, page === 1 && styles.disabledButton]}
                    onPress={() => onPageChange(page - 1)}
                    disabled={page === 1}
                >
                    <LeftIcons
                        name="chevron-back-outline"
                        size={moderateScale(14)}
                        color={page === 1 ? '#ccc' : '#000'}
                    />
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
                            disabled={isActive}>
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
                    <NextIcon
                        name="navigate-next"
                        size={moderateScale(18)}
                        color={page === pages ? '#ccc' : '#000'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(16.5),
        paddingVertical: moderateScale(6),
        backgroundColor: '#EBF6FF',
        width: '100%',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    totalText: {
        fontSize: moderateScale(12),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansMedium,
    },
    arrow: {
        height: moderateScale(15),
        width: moderateScale(15),
        tintColor: Colors.primaryColor,
    },
    paginationBox: {
        width: moderateScale(50),
        paddingHorizontal: moderateScale(6),
        // marginHorizontal:moderateScale(4),
        paddingVertical: moderateScale(2),
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
        borderRadius: moderateScale(2),
        elevation: 0.2,
        marginLeft: moderateScale(8),
        // borderWidth:1
    },
    // Modal and Dropdown styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    dropdownContainer: {
        position: 'absolute',
        backgroundColor: Colors.white,
        borderRadius: moderateScale(4),
        paddingVertical: moderateScale(5),
        minWidth: moderateScale(50),
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // zIndex: 10,
    },
    dropdownItem: {
        paddingHorizontal: moderateScale(12),
        // width:moderateScale(40),
        paddingVertical: moderateScale(8),
    },
    dropdownItemSelected: {
        backgroundColor: Colors.primaryColor + '20', // 20 for 12% opacity
    },
    dropdownItemText: {
        fontSize: moderateScale(14),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansMedium,
    },
    dropdownItemTextSelected: {
        color: Colors.primaryColor,
        fontFamily: Fonts.InstrumentSansSemiBold,
    },
    // Existing styles
    pagesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
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
    ellipsis: {
        fontSize: moderateScale(12),
        color: Colors.black,
        marginHorizontal: moderateScale(8),
        fontWeight: '500',
    },
});

export default Pagination;