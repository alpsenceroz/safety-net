import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditHelpCenter from './screens/HelpCenters/EditHelpCenter';
import EditEmergency from './screens/map/EditEmergency';
import Map from './screens/map/MapScreen';
const Stack = createNativeStackNavigator();

//import EditHelpCenter from "./screens/map/EditHelpCenter";


export default function MapNavigation() {

    return (
        <Stack.Navigator initialRouteName="Map">
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="EditHelpCenter" component={EditHelpCenter} />
            <Stack.Screen name="EditEmergency" component={EditEmergency} />
        </Stack.Navigator>
    )
}