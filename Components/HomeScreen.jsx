import {Pressable, Text, View} from "react-native";
import BottomNavigation from "./ScreenComponents/BottomNavigation";
import ProfileIcon from "./ScreenComponents/ProfileIcon";
import SettingsIcon from "./ScreenComponents/SettingsIcon";
import FruitDetails from "./FruitDetails";
import {Ionicons} from "@expo/vector-icons";

export default function HomeScreen({navigation}){
    return (
        <View style={{ flex: 1 }}>
            <SettingsIcon navigation={navigation}/>
            <ProfileIcon navigation={navigation}/>
            <Pressable
                onPress={() => navigation.navigate('FruitDetails')}
            >
                <Text >Bekijk appel</Text>
            </Pressable>
            <Text>Hello world</Text>
            <BottomNavigation navigation={navigation}/>
        </View>
    )
}