import {Text, View} from "react-native";
import BottomNavigation from "./ScreenComponents/BottomNavigation";
import ProfileIcon from "./ScreenComponents/ProfileIcon";
import SettingsIcon from "./ScreenComponents/SettingsIcon";

export default function TrophiesList({navigation}){
    return(
        <View style={{ flex: 1 }}>
            <SettingsIcon navigation={navigation}/>
            <ProfileIcon navigation={navigation}/>
            <Text>TrophiesList</Text>
            <BottomNavigation navigation={navigation}/>
        </View>
    )
}