import {Text, View} from "react-native";
import BottomNavigation from "./ScreenComponents/BottomNavigation";
import ProfileIcon from "./ScreenComponents/ProfileIcon";
import SettingsIcon from "./ScreenComponents/SettingsIcon";

export default function HomeScreen({navigation}){
    return (
        <View style={{ flex: 1 }}>
            <SettingsIcon navigation={navigation}/>
            <ProfileIcon navigation={navigation}/>
            <Text>Hello world</Text>
            <BottomNavigation navigation={navigation}/>
        </View>
    )
}