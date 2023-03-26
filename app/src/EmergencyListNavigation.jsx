import { createNativeStackNavigator } from "@react-navigation/native-stack";




import EmergenctList from "./screens/emergencyList/EmergencyList";
import EditEmergency from "./screens/emergencyList/EditEmergency";

import ChooseLocation from "./screens/emergency/ChooseLocation";
import DisplayEmergency from "./screens/emergencyList/DisplayEmergency";


const Stack = createNativeStackNavigator();


export default function EmergencyListNavigation() {

    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={EmergenctList} />
            <Stack.Screen name="EditEmergency" component={EditEmergency} />
            <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
            <Stack.Screen name="DisplayEmergency" component={DisplayEmergency} />
        </Stack.Navigator>
    )
}
