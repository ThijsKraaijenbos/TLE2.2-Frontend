import {Text, View} from "react-native";
import BottomNavigation from "./ScreenComponents/BottomNavigation";
import ProfileIcon from "./ScreenComponents/ProfileIcon";
import SettingsIcon from "./ScreenComponents/SettingsIcon";

export default function ProgressList({navigation}){
    return(
        <View>
            <SettingsIcon navigation={navigation}/>
            <ProfileIcon navigation={navigation}/>
            <Text>ProgressList</Text>
            <BottomNavigation navigation={navigation}/>
        </View>
    )
}