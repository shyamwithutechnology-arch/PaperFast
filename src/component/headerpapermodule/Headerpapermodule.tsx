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
import { View, Text } from "react-native";
import { styles } from "./styles";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { moderateScale } from "../../utlis/responsiveSize";
interface HeaderpapermoduleProp {
    title:string
}
const HeaderPaperModule: React.FC = ({title} : HeaderpapermoduleProp)  => {
    return (
        <View style={styles.headerContainer}>
            <FontAwesome6 name="arrow-left" size={moderateScale(20)} color="#000"
            />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

export default HeaderPaperModule;
