import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import ChooseVictim from './screens/emergency/ChooseVictim';
import ChooseCondition from './screens/emergency/ChooseCondition';
import EmergencyReported from './screens/emergency/EmergencyReported';

const Stack = createNativeStackNavigator();

const EmergencyNavigation = () => {
    return(

            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="ChooseVictim" component={ChooseVictim}/>
                <Stack.Screen name="ChooseCondition" component={ChooseCondition}/>
                <Stack.Screen name="EmergencyReported" component={EmergencyReported}/>

            </Stack.Navigator>

    )
}

export default EmergencyNavigation