import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddHelpCenter from './screens/HelpCenters/AddHelpCenter';
import EditHelpCenter from './screens/HelpCenters/EditHelpCenter';
import EditEmergency from './screens/map/EditEmergency';
import Map from './screens/map/MapScreen';
import AddNeeds from './screens/Other Needs/AddNeeds';
import EditNeeds from './screens/Other Needs/EditNeeds';
const Stack = createNativeStackNavigator();

//import EditHelpCenter from "./screens/map/EditHelpCenter";


export default function MapNavigation() {

    return (
        <Stack.Navigator initialRouteName="Map">
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="EditHelpCenter" component={EditHelpCenter} />
            <Stack.Screen name="EditEmergency" component={EditEmergency} />
            <Stack.Screen name="AddHelpCenter" component={AddHelpCenter} />
            <Stack.Screen name="EditNeeds" component={EditNeeds} />
            <Stack.Screen name="AddNeeds" component={AddNeeds} />


        </Stack.Navigator>
    )
}