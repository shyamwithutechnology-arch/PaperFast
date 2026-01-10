import React, { use, useCallback, useState } from 'react';
import { View, Text, StatusBar, Image, FlatList, TouchableOpacity, } from 'react-native';
import AppModal from '../../../../component/modal/AppModal';
import { styles } from './styles';
import { Icons } from '../../../../assets/icons';
import AppButton from '../../../../component/button/AppButton';

export const BoardModal = () => {
    const [visible, setVisible] = useState(false);
    
    const handleBordOpenModal = () => {
        setVisible(true)
    }

    const handleBordCloseModal = () => {
        setVisible(false)
    }

    const BordsData = [
        { id: 1, board: 'Rajasthan Board' },
        { id: 2, board: 'CBSE Board' },
        { id: 3, board: 'JEE/NEET' },
        { id: 4, board: 'Bihar Board' },
        { id: 5, board: 'UP Board' },
        { id: 6, board: 'Haryana Board' },
        { id: 7, board: 'Chattisgarh Board' },
        { id: 8, board: 'ICSE Board' },
        { id: 9, board: 'Jharkhand Board' },
        { id: 10, board: 'Maharashtra Board' },
    ]

    return (
        <AppModal visible={visible} onClose={handleBordCloseModal}>
            {/* <View style={styles.lineMainBox}>
                            <View style={styles.lineBox}/>
                            <TouchableOpacity style={styles.cancleBox}>
                                <Image source={Icons.cancel} style={styles.cancleIcon} resizeMode='contain' />
                            </TouchableOpacity>
                        </View> */}
            <View style={styles.lineMainBox}>
                <View style={styles.lineCenterWrapper}>
                    <View style={styles.lineBox} />
                </View>

                <TouchableOpacity style={styles.cancleBox}>
                    <Image
                        source={Icons.cancel}
                        style={styles.cancleIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.selectModal}>Select Board</Text>
            {BordsData.map(item => {
                return (
                    <View style={styles.bordItemBox}>
                        <TouchableOpacity style={styles.selectStanBox} key={item.id}>
                            <Text style={styles.boardItemText}>{item.board}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.selectStanBox} key={item.id}>
                            <Text style={styles.boardItemText}>{item.board}</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.selectStanBox} key={item.id}></TouchableOpacity> */}
                    </View>
                )
            })}

            <AppButton title='Submit' onPress={() => { }} />
        </AppModal>
    )
}