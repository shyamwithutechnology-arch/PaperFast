import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { moderateScale, scale, verticalScale } from '../../../utlis/responsiveSize'
import { Colors, Fonts } from '../../../theme'
interface Props {
    item: { id: string, label: string },
    selected: boolean,
    onPress: (id: string) => void
}

// const SubjectItem = React.memo({ item, selected, onPress }: Props) => {
const SubjectItem = React.memo(({ item, selected, onPress }: Props) => {
    return (
        <TouchableOpacity style={[styles.card, selected && styles.selectedCard]}
            onPress={() => onPress(item?.id)}
            activeOpacity={0.7}>
            <View style={styles.subjectBox}>
                <Text style={styles.label}>{item.label}</Text>

                {/* Radio Button */}
                <View style={styles.radio}>
                    {selected && <View style={styles.radioInner} />}
                </View>
            </View>
        </TouchableOpacity>
    )   

})
export default SubjectItem;
const styles = StyleSheet.create({
    card: {
        marginVertical: moderateScale(6),
        borderRadius: moderateScale(5),
        backgroundColor: 'rgba(12,64,111,0.05)',
        // paddingHorizontal: moderateScale(9),
        alignSelf: 'center',
        marginHorizontal: moderateScale(7),
        marginTop: moderateScale(6),
        // gap: moderateScale(40),
        // paddingHorizontal:moderateScale(4)

    },
    selectedCard: {
        backgroundColor: 'rgba(12,64,111,0.12)',

    },
    label: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InstrumentSansMedium,
        color: Colors.black
    },
    radio: {
        width: moderateScale(16),
        height: moderateScale(16),
        borderRadius: moderateScale(10),
        borderWidth: 2,
        borderColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        width: moderateScale(10),
        height: moderateScale(10),
        borderRadius: moderateScale(5),
        backgroundColor: Colors.primaryColor
    },
    subjectBox: {
        width: scale(167),
        height: verticalScale(50),
        borderWidth: .3,
        borderColor: Colors.InputStroke,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: moderateScale(10),
        borderRadius: moderateScale(5),
        // marginBottom:moderateScale(-25)
    }
})