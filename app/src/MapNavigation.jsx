import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditEmergency from './screens/map/EditEmergency';
const Stack = createNativeStackNavigator();

import EditHelpCenter from "./screens/map/EditHelpCenter";

export default function MapNavigation() {

    return (
        <Stack.Navigator >
            <Stack.Screen name="EditHelpCenter" component={EditHelpCenter} />
            <Stack.Screen name="EditEmergency" component={EditEmergency} />
        </Stack.Navigator>
    )
}