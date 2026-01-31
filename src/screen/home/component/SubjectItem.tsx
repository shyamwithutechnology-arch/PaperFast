import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { moderateScale, scale, verticalScale } from '../../../utils/responsiveSize'
import { Colors, Fonts } from '../../../theme'
import { Images } from '../../../assets/images'
import { Icons } from '../../../assets/icons'
interface Props {
    item: { id: string, label: string },
    selected: boolean,
    onPress: (id: string) => void
}

let randomColor = [
    '#FFF8DE',
    '#FFE8DE',
    '#DEEDFF',
    '#E5DEFF',
    '#DEF9FF',
    '#FFDEDE',
]

const getCardColor = (id: string) => {
    let hash = 0;

    for (let i = 0; i < id?.length; i++) {
        hash = id?.charCodeAt(i) + ((hash << 5) - hash)
    }
    const index = Math.abs(hash) % randomColor.length;
    return randomColor[index];
};

const SubjectItem = React.memo(({ item, selected, onPress }: Props) => {
    const bgColor = React.useMemo(
        () => getCardColor(item.subject_id),
        [item.subject_id]
    );
    return (
        <TouchableOpacity style={[styles.card, selected && styles.selectedCard,
        { backgroundColor: bgColor },
        ]}
            onPress={() => onPress(item?.subject_id)}
            activeOpacity={0.7}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={styles.subjectBox}>
                    <View style={styles.radio}>
                        {selected && <View style={styles.radioInner} />}
                    </View>
                    <Text style={styles.label} numberOfLines={1}>{item?.subject_name}</Text>
                </View>
                <View style={{ width: moderateScale(40), height: moderateScale(30) }}>
                    <Image source={{uri:item?.subject_image}} style={{ width: moderateScale(36), height: moderateScale(36) }} resizeMode='contain' />
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
        // backgroundColor: 'rgba(12,64,111,0.05)',
        // backgroundColor: '#fff',
        // paddingHorizontal: moderateScale(9),
        alignSelf: 'center',
        marginHorizontal: moderateScale(7),
        marginTop: moderateScale(6),
        // gap: moderateScale(40),
        // paddingHorizontal:moderateScale(4)
        width: scale(167),
        borderWidth: .5,
        borderColor: Colors.InputStroke
    },
    selectedCard: {
        backgroundColor: 'rgba(12,64,111,0.12)',

    },
    label: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InstrumentSansMedium,
        color: Colors.black,
        marginLeft: moderateScale(8),
        // borderWidth:1,
        width: moderateScale(98)
    },
    radio: {
        width: moderateScale(14),
        height: moderateScale(14),
        borderRadius: moderateScale(10),
        borderWidth: 1.2,
        borderColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        width: moderateScale(9),
        height: moderateScale(9),
        borderRadius: moderateScale(10),
        backgroundColor: Colors.primaryColor
    },
    subjectBox: {
        width: scale(122),
        height: verticalScale(50),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: moderateScale(5),
        // marginLeft: moderateScale(4),
        // borderWidth:1,
        paddingLeft: moderateScale(6)
    }
})
