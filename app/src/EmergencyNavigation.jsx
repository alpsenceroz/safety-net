import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import ChooseVictim from './screens/emergency/ChooseVictim';
import ChooseCondition from './screens/emergency/ChooseCondition';
import EmergencyReported from './screens/emergency/EmergencyReported';
import OtherPersonInfo from './screens/emergency/OtherPersonInfo';

const Stack = createNativeStackNavigator();

const EmergencyNavigation = () => {
    return(

            <Stack.Navigator>
                <Stack.Screen name="ChooseVictim" component={ChooseVictim}/>
                <Stack.Screen name="ChooseCondition" component={ChooseCondition}/>
                <Stack.Screen name="EmergencyReported" component={EmergencyReported}/>
                <Stack.Screen name="OtherPersonInfo" component={OtherPersonInfo}/>
            </Stack.Navigator>

    )
}

export default EmergencyNavigation