import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

import FaIcon from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

export default function MainNavigation() {

    return (
        <NavigationContainer >
            <Tab.Navigator screenOptions={
                {
                    headerShown: true
                }
            }>
                <Tab.Screen name="Login" component={Login}
                    options={{
                        tabBarIcon: () => <FaIcon name="home" size={30} color="#900" />
                    }}
                />
                <Tab.Screen name="SignUp" component={SignUp}
                    options={{
                        tabBarIcon: () => <FaIcon name="plus" size={30} color="#900" />
                    }} 
                    />
            </Tab.Navigator>
        </NavigationContainer>
    )

}