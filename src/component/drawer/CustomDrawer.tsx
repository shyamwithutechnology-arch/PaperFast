import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Colors } from '../../theme/color';
import { Fonts } from '../../theme/fonts';
import { moderateScale } from '../../utlis/responsiveSize';
import { styles } from './styles';
import { Icons } from '../../assets/icons';
import { Images } from '../../assets/images';

const MENU = [
    { id: 1, title: 'My Profile', icon: Icons.profile },
    { id: 2, title: 'Switch Role', icon: Icons.switchRole },
    { id: 3, title: 'My Draft Paper', icon: Icons.draft },
    { id: 4, title: 'My PDFs', icon: Icons.pdf },
    { id: 5, title: 'Subscription', icon: Icons.subscription },
    { id: 6, title: 'About Us', icon: Icons.about },
    { id: 7, title: 'Terms & Conditions', icon: Icons.termAndService },
    { id: 8, title: 'Privacy Policy', icon: Icons.privacy },
    { id: 9, title: 'Support', icon: Icons.support },
    { id: 10, title: 'Delete Account', icon: Icons.delete },
];

const CustomDrawer = ({ navigation }) => {
    const [role, setRole] = React.useState<'Teacher' | 'Student'>('Teacher');

    return (
        <View style={styles.container}>
            <DrawerContentScrollView showsVerticalScrollIndicator={false} style={styles.container}>

                {/* ===== Profile Section ===== */}
                <View style={styles.profileBox}>
                    <Image
                        source={Icons.withoutBgLogo}
                        style={styles.avatar}
                        resizeMode='contain'
                    />
                    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.closeDrawer()}>
                        <Image source={Icons.drawerCancel} style={{ height: moderateScale(11), width: moderateScale(11) }} />
                    </TouchableOpacity>
                </View>

                {/* ===== Menu List ===== */}
                {MENU.map((item, index) => {
                    const isSwitchRole = item.title === 'Switch Role';
                    return (
                        // <View>

                        //     <TouchableOpacity
                        //         key={index}
                        //         style={styles.menuItem}
                        //         onPress={() => {
                        //             // navigation.navigate('SomeScreen')
                        //             navigation.closeDrawer();
                        //         }}
                        //     >
                        //         <View style={styles.iconTextContainer}>
                        //             <View style={styles.iconBox} >
                        //                 <Image source={item?.icon} style={styles.iconSty} />
                        //             </View>
                        //             <Text style={styles.menuText}>{item?.title}</Text>
                        //         </View>
                        //         <Image source={Icons.next} style={styles.nextSty} resizeMode='contain' />
                        //         {/* </View> */}

                        //     </TouchableOpacity>

                        //     <View style={{ height: moderateScale(1), backgroundColor: 'rgba(12, 64, 111, 0.14)', marginHorizontal: moderateScale(20) }} />
                        // </View>
                        <View key={item.id}>
                            <View style={styles.menuItem}>
                                {/* Left icon + text */}
                                <View style={styles.iconTextContainer}>
                                    <View style={styles.iconBox}>
                                        <Image source={item.icon} style={styles.iconSty} />
                                    </View>
                                    <Text style={styles.menuText}>{item.title}</Text>
                                </View>

                                {/* Right side */}
                                {isSwitchRole ? (
                                    <View style={styles.roleSwitch}>
                                        <TouchableOpacity
                                            style={[
                                                styles.roleItem,
                                                role === 'Teacher' && styles.roleActive,
                                            ]}
                                            onPress={() => setRole('Teacher')}
                                        >
                                            <Text
                                                style={[
                                                    styles.roleText,
                                                    role === 'Teacher' && styles.roleTextActive,
                                                ]}
                                            >
                                                Teacher
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[
                                                styles.roleItem,
                                                role === 'Student' && styles.roleActive,
                                            ]}
                                            onPress={() => setRole('Student')}
                                        >
                                            <Text
                                                style={[
                                                    styles.roleText,
                                                    role === 'Student' && styles.roleTextActive,
                                                ]}
                                            >
                                                Student
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <Image source={Icons.next} style={styles.nextSty} />
                                )}
                            </View>

                            {/* Divider */}
                            <View
                                style={{
                                    height: moderateScale(1),
                                    backgroundColor: 'rgba(12, 64, 111, 0.14)',
                                    marginHorizontal: moderateScale(20),
                                }}
                            />
                        </View>
                    )
                })}
            </DrawerContentScrollView>

            {/* <View style={{height:moderateScale(50),width:moderateScale(50), backgroundColor:'#FB6464', borderRadius:moderateScale(40)}}> */}


            {/* </View> */}
            {/* ===== Footer ===== */}
            {/* <View style={styles.footer}>
                <Text style={styles.supportText}>Support</Text>
                <Text style={styles.phone}>+91-87099-52350</Text>
            </View> */}
            <View style={styles.logOutMainBox}>
                <Image source={Icons.logout} style={styles.logoutSty} resizeMode='contain' />
                <Text style={styles.logoutText}>Logout My Account</Text>
            </View>

            <View style={styles.mainMaskView}>
                <Image source={Icons.MaskGroup} style={styles.maskGroupImag} />

                <View style={{}}>
                    <View style={[styles.supportBox, { marginHorizontal: moderateScale(0) }]}>
                        <View style={styles.scrachLine} />
                        <View style={[styles.supportBox, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                            <Text style={styles.supportText}>Support</Text>
                            <View style={styles.numberTextBox} >
                                <Image source={Icons.plus} style={styles.plusImg} />
                                <Text style={styles.supportNumberText}>913445764523</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        </View>
    );
};

export default CustomDrawer;
