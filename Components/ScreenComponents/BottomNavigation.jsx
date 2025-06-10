import {Pressable, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function BottomNavigation({navigation}){
    return (
        <View>
            <Pressable onPress={()=> navigation.navigate('FruitList')}>
                <Ionicons name="storefront" size={32} style={styles.icon}/>
            </Pressable>
            <Pressable onPress={()=> navigation.navigate('Home')}>
                <Ionicons name="home" size={32} style={styles.icon}/>
            </Pressable>
            <Pressable onPress={()=> navigation.navigate('SocialTab')}>
                <Ionicons name="people" size={32} style={styles.icon}/>
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