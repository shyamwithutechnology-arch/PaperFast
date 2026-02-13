import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

export type indexProps = {
    title : string
    }


const index = ({title}: indexProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default index