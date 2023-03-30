import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/HomeScreen/Home';
import SelfProfile from './screens/Profiles/SelfProfile';
import EmergencyNavigation from './EmergencyNavigation';


const Stack = createNativeStackNavigator();

export default function HomeNavigation({navigation}) {



    return (
        
            <Stack.Navigator initialRouteName='HomeScreen' screenOptions={
                {
                    headerShown: true,
                }
            }>
                <Stack.Screen name="HomeScreen" component={Home} options={{
                    title: "Home",
                    headerShown: false,
                }}
                />
                <Stack.Screen name="UserProfile" component={SelfProfile} options={{
                    title: "Profile"
                }}
                />
                <Stack.Screen name='Emergency' component={EmergencyNavigation} options={{
                    headerShown: false,
                }}/>
            </Stack.Navigator>
        
    )

}