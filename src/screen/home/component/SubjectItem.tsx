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

    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % randomColor.length;
    return randomColor[index];
};

const SubjectItem = React.memo(({ item, selected, onPress }: Props) => {
    const bgColor = React.useMemo(
        () => getCardColor(item.id),
        [item.id]
    );
    return (
        <TouchableOpacity style={[styles.card, selected && styles.selectedCard,
        { backgroundColor: bgColor },
        ]}
            onPress={() => onPress(item?.id)}
            activeOpacity={0.7}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={styles.subjectBox}>
                    <View style={styles.radio}>
                        {selected && <View style={styles.radioInner} />}
                    </View>
                    <Text style={styles.label}>{item.label}</Text>
                </View>
                <View style={{ width: moderateScale(40), height: moderateScale(30) }}>
                    <Image source={Icons.dashBoardImg1} style={{ width: moderateScale(40), height: moderateScale(40) }} resizeMode='contain' />
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
        borderColor:Colors.InputStroke
    },
    selectedCard: {
        backgroundColor: 'rgba(12,64,111,0.12)',

    },
    label: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InstrumentSansMedium,
        color: Colors.black,
        marginLeft: moderateScale(8)
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
        width: scale(122),
        // width:scale(140),
        height: verticalScale(50),
        // borderWidth: .3,
        // borderWidth: 1,
        // borderColor: Colors.InputStroke,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        // alignSelf: 'center',
        // paddingHorizontal: moderateScale(10),
        borderRadius: moderateScale(5),
        marginLeft: moderateScale(4)
        // marginBottom:moderateScale(-25)
    }
})

// import React from 'react'
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
// import LinearGradient from 'react-native-linear-gradient'
// import { moderateScale, scale, verticalScale } from '../../../utils/responsiveSize'
// import { Colors, Fonts } from '../../../theme'

// const GOOGLE_PROFILE_GRADIENTS = [
//     { start: '#76a1e7', end: '#2d4433' }, // Blue to Green
//     { start: '#75332d', end: '#5c625d' }, // Red to Yellow
//     { start: '#474e5a', end: '#e35447' }, // Blue to Red
//     { start: '#34A853', end: '#4285F4' }, // Green to Blue
//     { start: '#380bdd', end: '#eea39d' }, // Yellow to Red
//     // { start: '#4285F4', end: '#FBBC05' }, // Blue to Yellow
//     { start: '#EA4335', end: '#4285F4' }, // Red to Blue
//     { start: '#709b7c', end: '#594f2f' }, // Green to Yellow
//     { start: '#7f765d', end: '#34A853' }, // Yellow to Green
//     { start: '#4285F4', end: '#673AB7' }, // Blue to Purple
//     { start: '#39302f', end: '#673AB7' }, // Red to Purple
//     { start: '#34A853', end: '#673AB7' }, // Green to Purple
// ]
// const getGradientFromText = (text: string) => {
//     let hash = 0
//     for (let i = 0; i < text.length; i++) {
//         hash = text.charCodeAt(i) + ((hash << 5) - hash)
//     }
//     const index = Math.abs(hash) % GOOGLE_PROFILE_GRADIENTS.length
//     return GOOGLE_PROFILE_GRADIENTS[index]
// }

// const SubjectItem = ({ item, selected, onPress }) => {

//     const gradient = getGradientFromText(item.label)

//     return (
//         <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() => onPress(item.id)}
//             style={styles.card}
//         >
//             <LinearGradient
//                 colors={[gradient.start, gradient.end]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.subjectBox}
//             >
//                 {/* Google profile icon */}
//                 {/* <View
//                     style={[
//                         styles.avatar,
//                         // { backgroundColor: gradient.start },
//                     ]}>
//                     <Text style={styles.avatarText}>
//                         {item.label.charAt(0).toUpperCase()}
//                     </Text>
//                 </View> */}

//                 <Text style={styles.label}>{item.label}</Text>

//                 {/* Radio */}
//                 <View style={styles.radio}>
//                     {selected && <View style={styles.radioInner} />}
//                 </View>
//             </LinearGradient>
//         </TouchableOpacity>
//     )
// }

// export default SubjectItem

// const styles = StyleSheet.create({
//     card: {
//         marginVertical: moderateScale(6),
//         marginHorizontal: moderateScale(7),
//         borderRadius: moderateScale(10),
//         overflow: 'hidden',
//     },
//     subjectBox: {
//         width: scale(167),
//         height: verticalScale(52),
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: moderateScale(10),
//         gap: moderateScale(8),
//     },

//     // Google profile circle
//     avatar: {
//         width: moderateScale(34),
//         height: moderateScale(34),
//         borderRadius: moderateScale(17),
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     avatarText: {
//         color: '#fff',
//         fontSize: moderateScale(16),
//         fontFamily: Fonts.InstrumentSansBold,
//     },

//     label: {
//         flex: 1,
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansMedium,
//         color: '#fff',
//     },

//     radio: {
//         width: moderateScale(16),
//         height: moderateScale(16),
//         borderRadius: 8,
//         borderWidth: 2,
//         borderColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     radioInner: {
//         width: moderateScale(8),
//         height: moderateScale(8),
//         borderRadius: 4,
//         backgroundColor: '#fff',
//     },
// })


// import React from 'react'
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
// import { moderateScale, scale, verticalScale } from '../../../utils/responsiveSize'
// import { Colors, Fonts } from '../../../theme'

// interface Props {
//     item: { id: string, label: string },
//     selected: boolean,
//     onPress: (id: string) => void
// }

// // Google-like profile gradient colors (12 options)
// const GOOGLE_PROFILE_GRADIENTS = [
//     { start: '#4285F4', end: '#34A853' }, // Blue to Green
//     { start: '#EA4335', end: '#FBBC05' }, // Red to Yellow
//     { start: '#4285F4', end: '#EA4335' }, // Blue to Red
//     { start: '#34A853', end: '#4285F4' }, // Green to Blue
//     { start: '#FBBC05', end: '#EA4335' }, // Yellow to Red
//     { start: '#4285F4', end: '#FBBC05' }, // Blue to Yellow
//     { start: '#EA4335', end: '#4285F4' }, // Red to Blue
//     { start: '#34A853', end: '#FBBC05' }, // Green to Yellow
//     { start: '#FBBC05', end: '#34A853' }, // Yellow to Green
//     { start: '#4285F4', end: '#673AB7' }, // Blue to Purple
//     { start: '#EA4335', end: '#673AB7' }, // Red to Purple
//     { start: '#34A853', end: '#673AB7' }, // Green to Purple
// ]

// // Function to generate a consistent gradient for each item based on ID
// const getGradientForId = (id: string) => {
//     // Generate a consistent index based on the item's ID
//     const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
//     const index = hash % GOOGLE_PROFILE_GRADIENTS.length
//     return GOOGLE_PROFILE_GRADIENTS[index]
// }

// // Function to create gradient background without LinearGradient
// const GradientBackground = ({ colors, children, style }: any) => {
//     return (
//         <View style={[styles.gradientContainer, style]}>
//             <View style={[
//                 styles.gradientLayer,
//                 {
//                     backgroundColor: colors.start,
//                     opacity: 0.7
//                 }
//             ]} />
//             <View style={[
//                 styles.gradientLayer,
//                 {
//                     backgroundColor: colors.end,
//                     opacity: 0.7
//                 }
//             ]} />
//             {children}
//         </View>
//     )
// }

// const SubjectItem = React.memo(({ item, selected, onPress }: Props) => {
//     const gradientColors = getGradientForId(item.id)

//     return (
//         <TouchableOpacity
//             style={styles.container}
//             onPress={() => onPress(item?.id)}
//             activeOpacity={0.7}
//         >
//             <GradientBackground
//                 colors={gradientColors}
//                 style={[styles.card, selected && styles.selectedCard]}
//             >
//                 <View style={styles.subjectBox}>
//                     <Text style={[styles.label, selected && styles.selectedLabel]}>{item.label}</Text>

//                     {/* Radio Button */}
//                     <View style={styles.radio}>
//                         {selected && <View style={styles.radioInner} />}
//                     </View>
//                 </View>
//             </GradientBackground>
//         </TouchableOpacity>
//     )
// })

// export default SubjectItem

// const styles = StyleSheet.create({
//     container: {
//         marginBottom: moderateScale(3), // Consistent bottom spacing
//         marginHorizontal: moderateScale(7),
//         borderRadius: moderateScale(5),
//         overflow: 'hidden',
//         paddingVertical: moderateScale(4),
//     },
//     gradientContainer: {
//         flex: 1,
//         position: 'relative',
//         overflow: 'hidden',
//     },
//     gradientLayer: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//     },
//     card: {
//         borderRadius: moderateScale(5),
//         overflow: 'hidden',
//         alignSelf: 'center',
//         width: '100%',
//         height: '100%',
//     },
//     selectedCard: {
//         borderWidth: 1,
//         borderColor: 'rgba(255, 255, 255, 0.8)',
//     },
//     subjectBox: {
//         width: scale(167),
//         height: verticalScale(50),
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: moderateScale(10),
//         backgroundColor: 'rgba(255, 255, 255, 0.85)',
//         margin: 1, // Creates a small gap for gradient to show
//         borderRadius: moderateScale(5),
//     },
//     label: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansMedium,
//         color: Colors.black,
//         flex: 1,
//     },
//     selectedLabel: {
//         color: '#000',
//         fontWeight: '600',
//     },
//     radio: {
//         width: moderateScale(16),
//         height: moderateScale(16),
//         borderRadius: moderateScale(10),
//         borderWidth: 2,
//         borderColor: Colors.primaryColor,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'white',
//     },
//     radioInner: {
//         width: moderateScale(10),
//         height: moderateScale(10),
//         borderRadius: moderateScale(5),
//         backgroundColor: Colors.primaryColor
//     }
// })