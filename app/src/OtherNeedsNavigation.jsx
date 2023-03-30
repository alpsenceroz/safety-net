import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Needs from "./screens/Other Needs/Needs";
import AddNeeds from "./screens/Other Needs/AddNeeds";
import EditNeeds from "./screens/Other Needs/EditNeeds";
import DisplayNeeds from "./screens/Other Needs/DisplayNeeds";



const Stack = createNativeStackNavigator();


export default function OtherNeedsNavigation() {

    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={Needs} options={{
                headerShown: false,
            }}/>
            <Stack.Screen name="AddNeeds" component={AddNeeds}    />
            <Stack.Screen name="EditNeeds" component={EditNeeds} />
            <Stack.Screen name="DisplayNeeds" component={DisplayNeeds} />
        </Stack.Navigator>
    )
}