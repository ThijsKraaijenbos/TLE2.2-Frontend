import {Text, View} from "react-native";
import BottomNavigation from "./ScreenComponents/BottomNavigation";
import ProfileIcon from "./ScreenComponents/ProfileIcon";
import SettingsIcon from "./ScreenComponents/SettingsIcon";

export default function FruitDetails({navigation}){
    return(
        <View>
            <SettingsIcon navigation={navigation}/>
            <ProfileIcon navigation={navigation}/>
            <Text>FruitDetails</Text>
            <BottomNavigation navigation={navigation}/>
        </View>
    )
}