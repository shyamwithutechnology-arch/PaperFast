import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import InternationalPhoneNumber, {
    Country,
} from "react-native-international-phone-number";
import { styles } from "./styles";
import { Colors } from "../../theme/color";

interface AppPhoneInputProps {
    value: string;
    onChange: (text: string) => void;
    defaultCountry?: string;
}

const AppPhoneInput: React.FC<AppPhoneInputProps> = ({
    value,
    onChange,
    defaultCountry = "IN",
}) => {
    //   const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [selectedCountry, setSelectedCountry] =
        useState<Country | undefined>(undefined);


    return (
        <View style={styles.container}>
            <InternationalPhoneNumber
                value={value}
                onChangeText={onChange}
                defaultCountry={defaultCountry}
                selectedCountry={selectedCountry}
                onChangeSelectedCountry={setSelectedCountry}
                textContainerStyle={{ paddingVertical: 0, backgroundColor: 'transparent' }}
                placeholder="Mobile number"
                language="en"
                phoneInputStyles={{
                    container: styles.inputContainer,
                    flagContainer: styles.flagContainer,
                    input: styles.input,
                    callingCode: styles.callingCode,
                }}
                // modalProps={{
                //     animationType: 'slide',
                //     presentationStyle: 'overFullScreen',
                // }}
            // modalStyles={{
            //   container: styles.modalContainer,
            // }}
            />
        </View>
    );
};

export default AppPhoneInput;



// ???????????????
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
// import React from "react";
// import { View, Text, TouchableOpacity, Image } from "react-native";
// import { styles } from "./styles";
// import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
// import { moderateScale } from "../../utils/responsiveSize";
// import { Icons } from "../../assets/icons";
// import { Colors } from "../../theme";
// import { useSelector } from "react-redux";
// interface HeaderpapermoduleProp {
//     title: string,
//     rightPress: () => void,
//     rightPressDisable: boolean,
//     leftIconPress: () => void,
//     titleStyle: object,
//     subjectName: Text,
//     rightPress2: () => void,
//     headerContainerStyle: object
// }
// const HeaderPaperModule: React.FC = ({ title, rightPress, rightPressDisable, leftIconPress, titleStyle, subjectName, rightPress2, headerContainerStyle }: HeaderpapermoduleProp) => {
//     const userRole = useSelector((state: any) => state?.userRole?.role);

//     return (
//         <View style={[styles.headerContainer, headerContainerStyle]}>
//             <View style={{
//                 flexDirection: 'row',
//                 // paddingLeft: moderateScale(15),
//                 alignItems: "center",
//                 // borderWidth:1,
//                 // marginBottom:moderateScale(-80)
//             }}>
//                 <TouchableOpacity onPress={leftIconPress} style={{ paddingLeft: moderateScale(1), borderWidth: 0, paddingRight: moderateScale(10), paddingVertical: moderateScale(10) }}>
//                     {/* <FontAwesome6 name="arrow-left" size={moderateScale(20)} color="#000"
//                     /> */}
//                     <Image source={Icons?.back} style={styles.backImg} resizeMode="contain" />
//                 </TouchableOpacity>
//                 {/* <Text style={[styles.title, titleStyle]}>{title}</Text> */}
//                 {/* <Text style={[styles.title, titleStyle]} numberOfLines={1}>
//                     {title}
//                     {subjectName && (
//                         <Text style={{ fontSize: moderateScale(13.5), fontWeight: '400' }}>
//                             {' '}({subjectName})
//                         </Text>
//                     )}
//                 </Text> */}
//                 <Text style={[styles.title, titleStyle]} numberOfLines={1}>
//                     {title}
//                     {subjectName && (
//                         <Text style={{ fontSize: moderateScale(13.5), fontWeight: '400' }}>
//                             {' '}({subjectName})
//                         </Text>
//                     )}
//                 </Text>
//             </View>
//             <View style={{ flexDirection: "row", alignItems: 'center' }}>
//                 {rightPress && <TouchableOpacity disabled={rightPressDisable} style={[styles.saveDraftBox, rightPress2 && { marginRight: moderateScale(10) }]} onPress={rightPress}>
//                     <Text style={[styles.saveDraftText, { color: Colors.black }]}>Save Draft</Text>
//                 </TouchableOpacity>
//                 }
//                 {rightPress2 && <TouchableOpacity style={[styles.generatePdftBox]} onPress={rightPress2}>
//                     <Text style={styles.saveDraftText}>Generate PDF</Text>
//                 </TouchableOpacity>
//                 }
//             </View>
//         </View >
//     );
// };

// export default HeaderPaperModule;
