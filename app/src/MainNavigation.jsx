import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import FaIcon from 'react-native-vector-icons/FontAwesome';
import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import MciIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import HelpCenterNavigation from './HelpCenterNavigation';
import EmergencyList from './screens/emergencyList/EmergencyList';
import OtherNeedsNavigation from './OtherNeedsNavigation';
import EmergencyNavigation from './EmergencyNavigation';
import MapNavigation from './MapNavigation';
import EmergencyListNavigation from './EmergencyListNavigation';
import HomeNavigation from './HomeNavigation';
import globalStyles from "./utils/Styles";


const Tab = createMaterialBottomTabNavigator();

export default function MainNavigation() {

    return (

        <Tab.Navigator screenOptions={
            {
                headerShown: true,
            }
        }
        >
            <Tab.Screen name=" Home " component={HomeNavigation}
            
                options={{
                    tabBarIcon: () => <FaIcon name="home" size={25} style={{...globalStyles.navigationButtonIcon.style}} />
                }}
            />
            <Tab.Screen name=" Map " component={MapNavigation}                
                options={{
                    tabBarIcon: () => <FaIcon name="map" size={25} style={{...globalStyles.navigationButtonIcon.style}}  />
                }}
            />
            <Tab.Screen name="Help Centers" component={HelpCenterNavigation}
                options={{
                    tabBarIcon: () => <Fa5Icon name="hands-helping" size={25} style={{...globalStyles.navigationButtonIcon.style}}  />
                }}
            />
            
            <Tab.Screen name="Other Needs" component={OtherNeedsNavigation}
                options={{
                    tabBarIcon: () => <Fa5Icon name="bread-slice" size={25} style={{...globalStyles.navigationButtonIcon.style}}  />
                }}
            />
            <Tab.Screen name="Emergency List" component={EmergencyListNavigation}
                options={{
                    tabBarIcon: () => <FaIcon name="exclamation" size={25} style={{...globalStyles.navigationButtonIcon.style}}  />
                }}
            />
        </Tab.Navigator>
    )

}