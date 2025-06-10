import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BottomNavigation({ navigation }) {
    const route = useRoute();

    const navItems = [
        { name: 'FruitList', icon: 'storefront' },
        { name: 'Home', icon: 'home' },
        { name: 'SocialTab', icon: 'people' },
    ];

    return (
        <SafeAreaView edges={['bottom']} style={styles.navBar}>
            {navItems.map((item) => {
                const isActive = route.name === item.name;
                return (
                    <Pressable
                        key={item.name}
                        onPress={() => navigation.navigate(item.name)}
                        style={[styles.circle, isActive && styles.activeCircle]}
                    >
                        <Ionicons
                            name={item.icon}
                            size={24}
                            color={isActive ? "#000" : "#333"}
                        />
                    </Pressable>
                );
            })}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    circle: {
        backgroundColor: '#e0e0e0',
        borderRadius: 50,
        padding: 14,
    },
    activeCircle: {
        backgroundColor: '#f5f5f5',
    },
});
