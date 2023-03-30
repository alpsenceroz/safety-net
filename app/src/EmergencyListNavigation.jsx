import { createNativeStackNavigator } from "@react-navigation/native-stack";




import EmergenctList from "./screens/emergencyList/EmergencyList";
import EditEmergency from "./screens/emergencyList/EditEmergency";
import ChooseVictim from "./screens/emergency/ChooseVictim";
import ChooseLocation from "./screens/emergency/ChooseLocation";
import OtherPersonInfo from './screens/emergency/OtherPersonInfo';
import DisplayEmergency from "./screens/emergencyList/DisplayEmergency";
import ChooseCondition from './screens/emergency/ChooseCondition';
import EmergencyReported from './screens/emergency/EmergencyReported';



const Stack = createNativeStackNavigator();


export default function EmergencyListNavigation() {

    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={EmergenctList} options={{
                headerShown: false,
            }}/>
            <Stack.Screen name="EditEmergency" component={EditEmergency} />
            <Stack.Screen name="ChooseVictim" component={ChooseVictim} />
            <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
            <Stack.Screen name="DisplayEmergency" component={DisplayEmergency} />
            <Stack.Screen name="OtherPersonInfo" component={OtherPersonInfo}/>
            <Stack.Screen name="ChooseCondition" component={ChooseCondition}/>
            <Stack.Screen name="EmergencyReported" component={EmergencyReported}/>
        </Stack.Navigator>
    )
}
