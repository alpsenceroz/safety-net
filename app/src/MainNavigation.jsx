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
        
        <Tab.Navigator
            secondaryContainer = 'transparent'
            initialRouteName="Home"
            activeColor="black"
            
            inactiveColor='grey'
            theme={{colors: {secondaryContainer: 'yellow'}}}
            barStyle={{ backgroundColor: '#FFFF' }}
            
            tabBarOptions={{
            }}
        >

            
            <Tab.Screen name=" Home " component={HomeNavigation}
                options={{
                    tabBarIcon: ({ color }) => (<FaIcon name="home" color={color} size={25} style={{...globalStyles.navigationButtonIcon.style}} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen name=" Map " component={MapNavigation}                
                options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color }) => (<FaIcon name="map" color={color} size={25} style={{...globalStyles.navigationButtonIcon.style}} />
          ),
          headerShown: false,
        }}
      />
            <Tab.Screen name="Help Centers" component={HelpCenterNavigation}
                options={{
                    tabBarIcon: ({ color }) => (<Fa5Icon name="hands-helping" size={25} color={color}  style={{...globalStyles.navigationButtonIcon.style}} />
                    ),
                    headerShown: false,
                }}
            />
            
            <Tab.Screen name="Needs" component={OtherNeedsNavigation}
                options={{
                    tabBarIcon:({ color }) =>  <Fa5Icon name="box" size={25}  color={color} style={{...globalStyles.navigationButtonIcon.style}}  />,
                    headerShown: false,
                }}
            />
            <Tab.Screen name="Emergency List" component={EmergencyListNavigation}
                options={{
                    tabBarIcon: ({ color })  => <FaIcon name="exclamation-circle" size={25}   color={color} style={{...globalStyles.navigationButtonIcon.style}}  />,
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    )

}

