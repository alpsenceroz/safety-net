import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainNavigation from './MainNavigation';
import AuthenticationNavigation from './AuthenticationNavigation';
import EmergencyNavigation from './EmergencyNavigation';


const Stack = createNativeStackNavigator();


export default function ParentNavigation() {


    return (

        <NavigationContainer>
            <Stack.Navigator initialRouteName='Authentication' screenOptions={{
                headerShown: false,
            }}>

                <Stack.Screen name='Authentication' component={AuthenticationNavigation}/>
                <Stack.Screen name='Main' component={MainNavigation}/>
                <Stack.Screen name='Emergency' component={EmergencyNavigation}/>

            </Stack.Navigator>

        </NavigationContainer>
    );
}