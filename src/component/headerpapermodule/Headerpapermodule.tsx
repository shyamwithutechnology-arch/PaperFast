// import React from "react";
// import {View,Text, Image} from "react-native";
// import { styles } from "./styles";

// const Headerpapermodule = () => {
//     return(
//         <View style={styles.headerContainer}>
//             {/* <Image source={}/> */}
//             <Text>Create Exam Paper - Maths</Text>
//         </View>
//     )
// }

// export default Headerpapermodule
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { moderateScale } from "../../utils/responsiveSize";
import { Icons } from "../../assets/icons";
import { Colors } from "../../theme";
import { useSelector } from "react-redux";
interface HeaderpapermoduleProp {
    title: string,
    rightPress: () => void,
    rightPressDisable: boolean,
    leftIconPress: () => void,
    titleStyle: object,
    subjectName: Text,
    rightPress2: () => void,
    headerContainerStyle: object
}
const HeaderPaperModule: React.FC = ({ title, rightPress, rightPressDisable, leftIconPress, titleStyle, subjectName, rightPress2, headerContainerStyle }: HeaderpapermoduleProp) => {
    const formtedText = (text, limit) => {
        if (text.length > limit) {
            return text.substring(0, limit) + '...'
        }
        return text
    }
    let visibleText = formtedText(title, 35)
    const userRole = useSelector(state => state?.userRole.role)
    console.log('userrrrrrrreee', userRole);

    return (
        <View style={[styles.headerContainer, headerContainerStyle]}>
            <View style={{
                flexDirection: 'row',
                alignItems: "center",
            }}>
                <TouchableOpacity onPress={leftIconPress} style={styles?.leftIcon}>
                    <Image source={Icons?.back} style={styles.backImg} resizeMode="contain" />
                </TouchableOpacity>
                <Text style={[styles.title, titleStyle]}>
                    {visibleText}
                    {subjectName && (
                        <Text style={{ fontSize: moderateScale(13.5), fontWeight: '400' }}>
                            {' '}({subjectName})
                        </Text>
                    )}
                </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                {userRole === 'tutor' && rightPress && <TouchableOpacity disabled={rightPressDisable} style={[styles.saveDraftBox, rightPress2 && { marginRight: moderateScale(10) }]} onPress={rightPress}>
                    <Text style={[styles.saveDraftText, { color: Colors.black }]}>Save Draft</Text>
                </TouchableOpacity>
                }
                {rightPress2 && <TouchableOpacity style={[styles.generatePdftBox]} onPress={rightPress2}>
                    <Text style={styles.saveDraftText}>Generate PDF</Text>
                </TouchableOpacity>
                }
            </View>
        </View >
    );
};

export default HeaderPaperModule
