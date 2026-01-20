import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from '../../../../utlis/responsiveSize';
import { Colors, Fonts } from '../../../../theme';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export type DraftPaperListProps = {

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
const DraftPaperList = (props: DraftPaperListProps) => {
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
                <View>
                    <Text style={styles.myDraftText}>Mydraft</Text>
                    <Text style={styles.myDraftSecText}>STD 6 Maths</Text>
                    <Text style={styles.decText}>3.0 Marks</Text>
                    <Text style={styles.decText}>Last Updates 23-12-2025</Text>
                </View>
                <TouchableOpacity style={styles.deleteBox}>
                    <MaterialIcons name='delete-outline' size={moderateScale(25)} color={'#EA5858'} />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View>
            {/* <Text>DraftPaperList component</Text> */}
            <FlatList data={drafts} renderItem={handleRendamItem}
                windowSize={4}
                initialNumToRender={10} />
        </View>
    )
}

export default DraftPaperList

const styles = StyleSheet.create({
    draftContent: {
        // height:moderateScale()
        paddingVertical: moderateScale(15),
        paddingHorizontal: moderateScale(15),
        borderWidth: 1,
        marginHorizontal: moderateScale(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: Colors.InputStroke,
        marginTop: moderateScale(15),
        borderRadius: moderateScale(4)
    },
    myDraftText: {
        fontSize: moderateScale(12),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansMedium
    },
    myDraftSecText: {
        fontSize: moderateScale(11),
        color: '#323232',
        fontFamily: Fonts.InterMedium
    },
    decText: {
        fontSize: moderateScale(10),
        color: '#8D8D8D',
        fontFamily: Fonts.InterRegular
    },
    deleteBox: {
        height: moderateScale(35),
        width: moderateScale(35),
        borderRadius: moderateScale(4),
        backgroundColor: '#FFE0E0',
        alignItems: 'center',
        justifyContent: "center"
    }
})