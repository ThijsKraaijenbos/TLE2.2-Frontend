import {Text, View} from "react-native";
import BottomNavigation from "./ScreenComponents/BottomNavigation";

export default function Settings({navigation}){
    return(
        <View>
            <Text>Settings</Text>
            <BottomNavigation navigation={navigation}/>
        </View>
    )
}