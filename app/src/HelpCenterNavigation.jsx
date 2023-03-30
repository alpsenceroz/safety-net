import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddHelpCenter from "./screens/HelpCenters/AddHelpCenter";
import EditHelpCenter from "./screens/HelpCenters/EditHelpCenter";
import HelpCenters from "./screens/HelpCenters/HelpCenters";
import DisplayHelpCenter from "./screens/HelpCenters/DisplayHelpCenter";


const Stack = createNativeStackNavigator();


export default function HelpCenterNavigation() {

    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={HelpCenters} options={{
                headerShown: false,
            }}/>
            <Stack.Screen name="AddHelpCenter" component={AddHelpCenter} />
            <Stack.Screen name="EditHelpCenter" component={EditHelpCenter} />
            <Stack.Screen name="DisplayHelpCenter" component={DisplayHelpCenter} />
        </Stack.Navigator>
    )
}