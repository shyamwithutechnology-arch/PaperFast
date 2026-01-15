import { StyleSheet } from "react-native";
import { moderateScale } from "../../utlis/responsiveSize";
import { Colors, Fonts } from "../../theme";

export const styles = StyleSheet.create({
    headerContainer: {
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(10),
        // borderWidth: 1,
        flexDirection: 'row',
        paddingLeft: moderateScale(15),
        alignItems: "center",
        backgroundColor: Colors.lightThemeBlue
    },
    title: {
        fontSize: moderateScale(16),
        color: Colors.primaryColor,
        fontFamily: Fonts.InstrumentSansMedium,
        marginLeft: moderateScale(15)
    }
})