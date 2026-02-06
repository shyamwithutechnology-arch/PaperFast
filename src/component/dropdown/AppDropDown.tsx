import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { moderateScale } from '../../utils/responsiveSize';
import { Colors, Fonts } from '../../theme';
import { DropDownItem } from '../../screen/mypdf/mypdf/MyPdfScreen';
//   import AntDesign from '@expo/vector-icons/AntDesign';
type AppDropDownProps = {
    data: DropDownItem[],
    value: string | null,
    setValue: (value: string) => void,
    placeHolderText: string
}

const AppDropDown = ({ data, value, setValue, placeHolderText }: AppDropDownProps) => {
    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            // search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={placeHolderText}

            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
                setValue(item.value);
            }}
            itemContainerStyle={{
                borderWidth: .3,
                borderColor: Colors.InputStroke
            }}
            containerStyle={{
                marginBottom: moderateScale(30),
            }}
            showsVerticalScrollIndicator={false}
        // renderLeftIcon={() => (
        //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        // )}
        />
    );
};

export default AppDropDown;

const styles = StyleSheet.create({
    dropdown: {
        margin: moderateScale(16),
        height: moderateScale(50),
        //   borderBottomColor: 'gray',
        //   borderBottomWidth: 0.5,
        borderWidth: 1,
        padding: moderateScale(10),
        borderRadius: moderateScale(4),
        backgroundColor: Colors.white,
        borderColor: Colors.InputStroke,
        // marginTop:moderateScale(-10)
        // marginBottom:moderateScale(40)
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InterRegular,
        color: Colors?.InputText
    },
    iconStyle: {
        width: moderateScale(28),
        height: moderateScale(28),
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});