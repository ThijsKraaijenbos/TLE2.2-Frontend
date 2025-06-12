import {Text, View} from "react-native";
import BottomNavigation from "./ScreenComponents/BottomNavigation";

export default function Settings({navigation}){
    return(
        <View style={{ flex: 1 }}>
            <Text>Settings</Text>
            <BottomNavigation navigation={navigation}/>
        </View>
    )
}