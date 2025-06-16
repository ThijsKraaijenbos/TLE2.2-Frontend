import {Pressable, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";

export default function ProfileIcon({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPress={() => navigation.navigate('Profile')}>
                <Ionicons name="person-circle" size={42} style={styles.icon} />
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10,
        zIndex: 10,
    },
    icon: {
        color: '#000929',
    },
});
