import {Pressable, StyleSheet, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function SettingsIcon({navigation}) {
    return (
        <View>
            <Pressable onPress={()=> navigation.navigate('Settings')}>
                <Ionicons name="options" size={32} color="black" style={styles.icon} />
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 10,
        color: '#000929'
    },
});