import React, { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from '../../../../utils/responsiveSize';
import { Colors, Fonts } from '../../../../theme';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Icons } from '../../../../assets/icons';

export type ListItemComponentProps = {
}
export type DraftItem = {
    id: string;
    title: string;
    subject: string;
    marks: string;
    lastUpdated: string;
    status?: 'draft' | 'published' | 'archived';
    difficulty?: 'easy' | 'medium' | 'hard';
};
const ListItemComponent = (props: ListItemComponentProps) => {
    const [drafts, setDrafts] = useState<DraftItem[]>([
        {
            id: '1',
            title: 'Mydraft',
            subject: 'STD 6 Maths',
            marks: '3.0 Marks',
            lastUpdated: '23-12-2025',
            status: 'draft',
            difficulty: 'medium',
        },
        {
            id: '2',
            title: 'Final Draft',
            subject: 'STD 7 Science',
            marks: '5.0 Marks',
            lastUpdated: '24-12-2025',
            status: 'published',
            difficulty: 'hard',
        },
        {
            id: '3',
            title: 'Mid Term',
            subject: 'STD 8 Physics',
            marks: '4.0 Marks',
            lastUpdated: '25-12-2025',
            status: 'archived',
            difficulty: 'easy',
        },
    ]);

    const handleRendamItem = () => {
        return (
            <View style={styles.draftContent}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View>
                        <Text style={styles.myDraftText}>JEE Advance Questions PDF</Text>
                        <Text style={styles.decText}>30-12-2025 6:08 PM | English</Text>
                    </View>
                    <TouchableOpacity style={styles.deleteBox}>
                        <MaterialIcons name='delete-outline' size={moderateScale(25)} color={'#EA5858'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.questionTypeBox}>
                    <Pressable style={styles.questionBox}>
                        <Text style={styles.questionText}>Question</Text>
                        <Image source={Icons.down} style={styles.downArrow} resizeMode='contain' tintColor={'#4292FA'} />
                    </Pressable>
                    <Pressable style={styles.questionBox}>
                        <Text style={styles.questionText}>Solution</Text>
                        <Image source={Icons.down} style={styles.downArrow} resizeMode='contain' tintColor={'#4292FA'} />
                    </Pressable>
                    <Pressable style={[styles.questionBox, { backgroundColor: "rgba(75, 181, 67, 0.31)", borderColor: 'rgba(75, 181, 67, 0.28)' }]}>
                        <Text style={[styles.questionText, { color: "#38A230" }]}>Answer Key</Text>
                        <Image source={Icons.down} style={styles.downArrow} resizeMode='contain' tintColor={'#38A230'} />
                    </Pressable>

                </View>
            </View>
        )
    }
    return (
        <View>
            {/* <Text>ListItemComponent component</Text> */}
            <FlatList data={drafts} renderItem={handleRendamItem}
                windowSize={4}
                initialNumToRender={10} />
        </View>
    )
}

export default ListItemComponent

const styles = StyleSheet.create({
    draftContent: {
        // height:moderateScale()
        paddingVertical: moderateScale(15),
        paddingHorizontal: moderateScale(10),
        borderWidth: 1,
        marginHorizontal: moderateScale(16),
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        borderColor: 'rgba(0, 140, 227, 0.11)',
        marginTop: moderateScale(15),
        borderRadius: moderateScale(8),
        backgroundColor: Colors.white,
        
        elevation:20,
        shadowColor: 'rgba(0, 140, 227, .9)',
    },
    myDraftText: {
        fontSize: moderateScale(12),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansMedium
    },

    decText: {
        fontSize: moderateScale(10),
        color: '#8D8D8D',
        fontFamily: Fonts.InterRegular,
        marginVertical: moderateScale(8)
    },
    deleteBox: {
        height: moderateScale(35),
        width: moderateScale(35),
        borderRadius: moderateScale(4),
        backgroundColor: '#FFE0E0',
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: "flex-start"
    },
    questionText: {
        fontSize: moderateScale(12),
        color: '#3BA0F8',
        fontFamily: Fonts.InterMedium,
    },
    questionBox: {
        paddingHorizontal: moderateScale(6),
        width: '32%',
        paddingVertical: moderateScale(6),
        marginHorizontal: moderateScale(2),
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#B4DCFF',
        backgroundColor: '#E3F2FF',
        borderRadius: moderateScale(6),
    
        // marginTop: moderateScale(-60)

    },
    questionTypeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(5),
        alignSelf:"center"

    },
    downArrow: {
        height: moderateScale(20),
        width: moderateScale(20),
        marginLeft: moderateScale(2)
    }
})