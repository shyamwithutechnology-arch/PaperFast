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
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { moderateScale } from "../../utils/responsiveSize";
interface HeaderpapermoduleProp {
    title: string,
    rightPress: () => void,
    leftIconPress:() => void,
}
const HeaderPaperModule: React.FC = ({ title, rightPress ,leftIconPress}: HeaderpapermoduleProp) => {
    return (
        <View style={styles.headerContainer}>
            <View style={{
                flexDirection: 'row',
                // paddingLeft: moderateScale(15),
                alignItems: "center",
                // borderWidth:1,
                // marginBottom:moderateScale(-80)
            }}>
                <TouchableOpacity onPress={leftIconPress}>
                <FontAwesome6 name="arrow-left" size={moderateScale(20)} color="#000"
                />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </View>
            {rightPress && <TouchableOpacity style={styles.saveDraftBox} onPress={rightPress}><Text style={styles.saveDraftText}>Save Draft</Text></TouchableOpacity>
            }
        </View>
    );
};

export default HeaderPaperModule;
