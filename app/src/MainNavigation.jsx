import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import FaIcon from 'react-native-vector-icons/FontAwesome';
import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import MciIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import MapScreen from './screens/MapScreen';
import HelpCenterNavigation from './HelpCenterNavigation';
import EmergencyList from './screens/EmergencyList';
import OtherNeedsNavigation from './OtherNeedsNavigation';
import HomeNavigation from './HomeNavigation';



const Tab = createMaterialBottomTabNavigator();

export default function MainNavigation() {

    return (

        <Tab.Navigator screenOptions={
            {
                headerShown: true
            }
        }>
            <Tab.Screen name="HomeNavigation" component={HomeNavigation}
            
                options={{
                    tabBarIcon: () => <FaIcon name="home" size={30} color="#900" />
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
            <Tab.Screen name="Other Needs" component={OtherNeedsNavigation}
                options={{
                    tabBarIcon: () => <Fa5Icon name="hands-helping" size={30} color="#900" />
                }}
            />
            <Tab.Screen name="EmergencyList" component={EmergencyList}
                options={{
                    tabBarIcon: () => <FaIcon name="hourglass" size={30} color="#900" />
                }}
            />
        </Tab.Navigator>
    )

}