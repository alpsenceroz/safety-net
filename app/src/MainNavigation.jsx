import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SignUp from './screens/SignUp';

import FaIcon from 'react-native-vector-icons/FontAwesome';
import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import MciIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import TestScreen from './screens/TestScreen';
import MapScreen from './screens/MapScreen';
import Home from './screens/Home';
import HelpCenterNavigation from './HelpCenterNavigation';



const Tab = createMaterialBottomTabNavigator();

export default function MainNavigation() {

    return (

        <Tab.Navigator screenOptions={
            {
                headerShown: true
            }
        }>
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: () => <FaIcon name="home" size={30} color="#900" />
                }}
            />
            <Tab.Screen name="SignUp" component={SignUp}
                options={{
                    tabBarIcon: () => <MiIcon name="fiber-new" size={30} color="#900" />
                }}
            />
            <Tab.Screen name="TestScreen" component={TestScreen}
                options={{
                    tabBarIcon: () => <MciIcon name="test-tube" size={30} color="#900" />
                }}
            />
            <Tab.Screen name="Map" component={MapScreen}
                options={{
                    tabBarIcon: () => <FaIcon name="map" size={30} color="#900" />
                }}
            />
            <Tab.Screen name="Help Centers" component={HelpCenterNavigation}
                options={{
                    tabBarIcon: () => <Fa5Icon name="hands-helping" size={30} color="#900" />
                }}
            />
        </Tab.Navigator>

    )

}