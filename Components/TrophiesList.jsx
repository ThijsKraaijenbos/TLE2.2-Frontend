import {StyleSheet, ImageBackground, Pressable, Text, View, ScrollView} from "react-native";
import BottomNavigation from "./ScreenComponents/BottomNavigation";
import ProfileIcon from "./ScreenComponents/ProfileIcon";
import SettingsIcon from "./ScreenComponents/SettingsIcon";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import {useProfile} from './ScreenComponents/ProfileContext'

export default function TrophiesList({navigation}) {

    const trophies = [
        { id: 1, title: "Eerste overwinning", icon: "trophy", color: "#FFD700", achieved: true },
        { id: 2, title: "De Startlijn", icon: "flash", color: "#FF6347", achieved: false },
        { id: 3, title: "Non-stopper", icon: "hourglass", color: "#20B2AA", achieved: true },
    ]

    return (
        <ImageBackground
            source={require('../assets/fruitbackground.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.screen}>
                <View style={styles.top}>
                    <View>
                        <Pressable onPress={() => navigation.navigate('Profile')}>
                            <Ionicons name="arrow-back" size={50} style={styles.icon}/>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable onPress={() => navigation.navigate('Home')}>
                            <Ionicons name="close" size={50} style={styles.icon}/>
                        </Pressable>
                    </View>
                </View>


                <Ionicons name="trophy" size={100} style={styles.topIcon}/>

                <View>
                    <Text style={styles.titleTop}>Trofeeën</Text>
                </View>

                <ScrollView
                    style={styles.list}
                    contentContainerStyle={styles.container}
                >
                    {trophies.map((trophy) => (
                        <View key={trophy.id} style={[styles.trophyBlock, !trophy.achieved && { opacity: 0.4 }]}>
                            <Ionicons
                                name={trophy.icon}
                                size={80}
                                color={trophy.achieved ? trophy.color : "#A9A9A9"}
                            />
                            <View>
                                <Text style={styles.trophyText}>{trophy.title}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 10,
        color: '#000929'
    },
    screen: {
        paddingTop: '10%',
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    background: {
        flex: 1,
    },
    topIcon: {
        alignSelf: "center",
        marginBottom: 10
    },
    top: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    titleTop: {
        color: '#EAFCD2',
        fontWeight: "bold",
        fontSize: 20,
        backgroundColor: '#182700',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#A8D363',
        marginHorizontal: 30,
        paddingVertical: 10,
        textAlign: "center"
    },
    list: {
        marginTop: '5%',
        marginHorizontal: '2.5%',
        height: '68%',
        width: '95%',
        backgroundColor: '#EAFCD2',
        borderWidth: 4,
        borderColor: '#A8D363',
        borderRadius: 5
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        padding: 5,
    },
    trophyBlock: {
        width: '95%',
        backgroundColor: '#CDE5A7',
        margin: 5,
        flexDirection: "row",
    },

    trophyText: {
        marginTop: 5,
        fontWeight: 'bold',
        color: '#182700'
    }
})
