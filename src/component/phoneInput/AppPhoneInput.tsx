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
