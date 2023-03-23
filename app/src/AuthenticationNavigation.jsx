import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/authentication/Login';
import SignUp from './screens/authentication/SignUp';
import Verification from './screens/authentication/Verification';

import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function AuthenticationNavigation({navigation}) {



    const user = auth().currentUser;

    useEffect( () => {
        if(user && user.emailVerified) {
            navigation.replace('Main');
        }
    }, [] );

    
    useEffect( () => {
        if(user && user.emailVerified) {
            
            navigation.replace('Main')
        }
    }, [user?.emailVerified] )

    return (
        
            <Stack.Navigator initialRouteName='Login' screenOptions={
                {
                    headerShown: true,
                }
            }>
                <Stack.Screen name="Login" component={Login} options={{
                    title: "Login"
                }}
                />
                <Stack.Screen name="Signup" component={SignUp} options={{
                    title: "Sign Up"
                }}
                />
                <Stack.Screen name="Verification" component={Verification} options={{
                    title: "Verification Code"
                }}
                />
            </Stack.Navigator>
        
    )

}