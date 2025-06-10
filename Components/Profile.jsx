import {Pressable, StyleSheet, Text, View} from "react-native";
import BottomNavigation from "./ScreenComponents/BottomNavigation";
import SettingsIcon from "./ScreenComponents/SettingsIcon";
import {Ionicons} from "@expo/vector-icons";

export default function Profile({navigation}) {
    return (
        <View>
            <SettingsIcon navigation={navigation}/>
            <Text>M. Andarijn</Text>
            <Pressable onPress={() => navigation.navigate('ProfileEdit')}>
                <Ionicons name="pencil" size={32} style={styles.icon}/>
            </Pressable>
            <View>
                <View>
                    <Ionicons name="bar-chart" size={32} style={styles.icon}/>
                    <Pressable onPress={() => navigation.navigate('TrophiesList')}>
                        <Ionicons name="arrow-forward" size={32} style={styles.icon}/>
                    </Pressable>
                </View>
                <View>
                    <Ionicons name="trophy" size={32} style={styles.icon}/>
                    <Pressable onPress={()=> navigation.navigate('ProgressList')}>
                        <Ionicons name="arrow-forward" size={32} style={styles.icon}/>
                    </Pressable>
                </View>


            </View>
            <BottomNavigation navigation={navigation}/>
        </View>
    )
}
const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 10,
        color: '#000929'
    },
});