
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './stacks/RootStack';

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
    );
}

export default RootNavigator

