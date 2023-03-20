import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SignUp from './screens/SignUp';

import FaIcon from 'react-native-vector-icons/FontAwesome';
import MciIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import TestScreen from './screens/TestScreen';
import MapScreen from './screens/MapScreen';
import Home from './screens/Home';
import EmergencyList from './screens/EmergencyList';

const Stack = createNativeStackNavigator();

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
                <Tab.Screen name="EmergencyList" component={EmergencyList}
                    options={{
                        tabBarIcon: () => <FaIcon name="hourglass" size={30} color="#900" />
                    }}
                />
                
            </Tab.Navigator>
       
    )

}