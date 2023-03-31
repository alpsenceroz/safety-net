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
            <Stack.Screen name="EditEmergency" component={EditEmergency} options={{
                    title: "Edit Emergency"
                }}/>
            <Stack.Screen name="ChooseVictim" component={ChooseVictim} options={{
                    title: "Choose Victim"
                }}/>
            <Stack.Screen name="ChooseLocation" component={ChooseLocation} options={{
                    title: "Choose Location"
                }}/>
            <Stack.Screen name="DisplayEmergency" component={DisplayEmergency} options={{
                    title: "Display Emergency"
                }}/>
            <Stack.Screen name="OtherPersonInfo" component={OtherPersonInfo} options={{
                    title: "Other Person Info"
                }}/>
            <Stack.Screen name="ChooseCondition" component={ChooseCondition} options={{
                    title: "Choose Condition"
                }}/>
            <Stack.Screen name="EmergencyReported" component={EmergencyReported} options={{
                    title: "Emergency Reported"
                }}/>
        </Stack.Navigator>
    )
}
