import React, { useMemo } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Alert,
} from 'react-native';
import { DrawerContent, DrawerContentScrollView } from '@react-navigation/drawer';
import { Colors } from '../../theme/color';
import { Fonts } from '../../theme/fonts';
import { moderateScale } from '../../utils/responsiveSize';
import { styles } from './styles';
import { Icons } from '../../assets/icons';
import { Images } from '../../assets/images';
import { WorkletsModule } from 'react-native-worklets';
import { logout } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { localStorage, reduxStorage } from '../../storage/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../header/AppHeader';
import { useNavigation } from '@react-navigation/native';

const MENU = [
    { id: 1, title: 'My Profile', icon: Icons.profile, route: 'ProfileScreen' },
    { id: 2, title: 'Switch Role', icon: Icons.switchRole, route: 'ProfileScreen' },
    { id: 3, title: 'My Draft Paper', icon: Icons.draft, route: 'DraftPaperScreen' },
    { id: 4, title: 'My PDFs', icon: Icons.pdf, route: 'MyPdfScreen' },
    { id: 5, title: 'Subscription', icon: Icons.subscription, route: 'SubscriptionScreen' },
    { id: 6, title: 'About Us', icon: Icons.about, route: 'AboutUsScreen' },
    { id: 7, title: 'Terms & Conditions', icon: Icons.termAndService, route: 'TermandconditionScreen' },
    { id: 8, title: 'Privacy Policy', icon: Icons.privacy, route: 'PrivacyPolicyScreen' },
    { id: 9, title: 'Support', icon: Icons.support, route: 'SupportScreen' },
    { id: 10, title: 'Delete Account', icon: Icons.delete, route: 'DeleteAccountScreen' },
];


const CustomDrawer = ({ navigation }) => {
    const [role, setRole] = React.useState<'Teacher' | 'Student'>('Teacher');
    // const navigation = useNavigation()
    const dispatch = useDispatch()
    // const handleLoggeOut = async () => {
    // Alert.alert('', 'Are You Sure You Want to LogOut')
    //     await reduxStorage.removeItem('token');
    //     await localStorage.clearAll();
    //     dispatch(logout());
    // };
    // const formatedData = () => {
    //     MENU.filter(item => role === 'Student' ? !['DraftPaperScreen', 'DraftPaperScreen', 'MyPdfScreen', 'SubscriptionScreen'].includes(item?.route) : true)
    // }
    // const HIDDEN_ROUTES = {
    //     Student: ['DraftPaperScreen', 'MyPdfScreen', 'SubscriptionScreen'],
    //     Teacher: [],
    // };
    // const formattedData = () =>
    //     MENU.filter(item =>
    //         role === 'Student'
    //             ? ['DraftPaperScreen', 'MyPdfScreen', 'SubscriptionScreen'].includes(item.route)
    //             : item
    //     );

    //     const menuData = useMemo(() => MENU.filter(item => !HIDDEN_ROUTES[role].includes(item?.route)), [role])
    // console.log('menuData',menuData);
    const HIDDEN_ROUTES: Record<string, string[]> = {
        Student: ['DraftPaperScreen', 'MyPdfScreen', 'SubscriptionScreen'],
        Teacher: [],
    };

    const menuData = useMemo(
        () => MENU.filter(item => !HIDDEN_ROUTES[role]?.includes(item.route)),
        [role]
    );
    console.log('rrrrr', menuData);

    const handleLoggeOut = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await reduxStorage.removeItem('token');
                            await localStorage.clearAll();
                            dispatch(logout());
                        } catch (error) {
                            console.log('Logout error:', error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView
            style={styles.mainContainer}
        //  edges={['left', 'right', 'bottom']}
        >
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.profileBox}>
                    <Image
                        source={Icons.withoutBgLogo}
                        style={styles.avatar}
                        resizeMode='contain'
                    />
                    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.closeDrawer()}>
                        <Image source={Icons.drawerCancel} resizeMode='contain' style={{ height: moderateScale(12.8), width: moderateScale(12.8) }} />
                    </TouchableOpacity>
                </View>

                {/* ===== SCROLLABLE MENU ONLY ===== */}
                <DrawerContentScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.menuScrollContent}
                >
                    {/* ===== Menu List ===== */}
                    {menuData?.map((item, index) => {
                        const isSwitchRole = item.title === 'Switch Role';
                        return (
                            <View key={item.id}>
                                <TouchableOpacity style={styles.menuItem} onPress={() => {
                                    if (!isSwitchRole && item.route) {
                                        navigation.closeDrawer();
                                        navigation.navigate(item.route);
                                    }
                                }}>
                                    {/* Left icon + text */}
                                    <View style={styles.iconTextContainer}>
                                        <View style={styles.iconBox}>
                                            <Image source={item.icon} style={styles.iconSty} resizeMode='contain'/>
                                        </View>
                                        <Text style={styles.menuText}>{item.title}</Text>
                                    </View>

                                    {/* Right side */}
                                    {isSwitchRole ? (
                                        <View style={styles.container1}>
                                            <TouchableOpacity
                                                style={[styles.button, role === 'Teacher' && styles.active]}
                                                onPress={() => setRole('Teacher')}>
                                                <Text
                                                    style={[styles.text, role === 'Teacher' && styles.activeText]}>
                                                    Teacher
                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[styles.button, role === 'Student' && styles.active]}
                                                onPress={() => setRole('Student')}>
                                                <Text
                                                    style={[styles.text, role === 'Student' && styles.activeText]}>
                                                    Student
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                    ) : (
                                        <Image source={Icons.next} style={styles.nextSty} />
                                    )}
                                </TouchableOpacity >

                                <View
                                    style={{
                                        height: moderateScale(1),
                                        backgroundColor: 'rgba(12, 64, 111, 0.14)',
                                        marginHorizontal: moderateScale(20),
                                        marginVertical: moderateScale(4)
                                    }}
                                />
                            </View>
                        )
                    })}
                </DrawerContentScrollView>
                <TouchableOpacity style={styles.logOutMainBox} onPress={handleLoggeOut}>
                    <Image source={Icons.logout} style={styles.logoutSty} resizeMode='contain' />
                    <Text style={styles.logoutText}>Logout My Account</Text>
                </TouchableOpacity>

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
        </SafeAreaView>
    );
};

export default CustomDrawer;
