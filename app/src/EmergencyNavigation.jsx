import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import ChooseVictim from './screens/emergency/ChooseVictim';
import ChooseCondition from './screens/emergency/ChooseCondition';
import EmergencyReported from './screens/emergency/EmergencyReported';
import OtherPersonInfo from './screens/emergency/OtherPersonInfo';
import ChooseLocation from './screens/emergency/ChooseLocation';

const Stack = createNativeStackNavigator();

const EmergencyNavigation = () => {
    return(

            <Stack.Navigator initialRouteName="ChooseLocation">
                <Stack.Screen name="ChooseLocation" component={ChooseLocation} options={{
                    title: "Choose Location"
                }}/>
                <Stack.Screen name="ChooseVictim" component={ChooseVictim} options={{
                    title: "Choose Victim"
                }}/>
                <Stack.Screen name="ChooseCondition" component={ChooseCondition} options={{
                    title: "Choose Condition"
                }}/>
                <Stack.Screen name="EmergencyReported" component={EmergencyReported} options={{
                    title: "Emergency Reported"
                }}/>
                <Stack.Screen name="OtherPersonInfo" component={OtherPersonInfo} options={{
                    title: "Other Person Info"
                }}/>
            </Stack.Navigator>

    )
}

export default EmergencyNavigation