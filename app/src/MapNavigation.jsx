import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddHelpCenter from './screens/HelpCenters/AddHelpCenter';
import EditHelpCenter from './screens/HelpCenters/EditHelpCenter';
import EditEmergency from './screens/emergencyList/EditEmergency';
import Map from './screens/map/MapScreen';
import AddNeeds from './screens/Other Needs/AddNeeds';
import EditNeeds from './screens/Other Needs/EditNeeds';
import DisplayHelpCenter from './screens/HelpCenters/DisplayHelpCenter';
import DisplayNeeds from './screens/Other Needs/DisplayNeeds';
import DisplayEmergency from './screens/emergencyList/DisplayEmergency';
const Stack = createNativeStackNavigator();

//import EditHelpCenter from "./screens/map/EditHelpCenter";


export default function MapNavigation() {

    return (
        <Stack.Navigator initialRouteName="Map">
            <Stack.Screen name="Map" component={Map} options={{
                headerShown: false,
            }}/>
            <Stack.Screen name="EditHelpCenter" component={EditHelpCenter}  options={{
                title: "Edit Help Center",
            }}/>
            <Stack.Screen name="DisplayHelpCenter" component={DisplayHelpCenter}  options={{
                title: "Display Help Center",
            }}/>
            <Stack.Screen name="AddHelpCenter" component={AddHelpCenter}  options={{
                title: "Add Help Center",
            }}/>
            <Stack.Screen name="EditEmergency" component={EditEmergency}  options={{
                title: "Edit Emergency",
            }}/>
            <Stack.Screen name="DisplayEmergency" component={DisplayEmergency}  options={{
                title: "Display Emergency",
            }}/>
            <Stack.Screen name="EditNeeds" component={EditNeeds}  options={{
                title: "Edit Needs",
            }}/>
            <Stack.Screen name="DisplayNeeds" component={DisplayNeeds}  options={{
                title: "Display Needs",
            }}/>
            <Stack.Screen name="AddNeeds" component={AddNeeds}  options={{
                title: "Add Needs",
            }}/>


        </Stack.Navigator>
    )
}