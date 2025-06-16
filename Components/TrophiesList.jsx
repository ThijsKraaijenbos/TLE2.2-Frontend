import {StyleSheet, ImageBackground, Pressable, Text, View, ScrollView} from "react-native";

import {Ionicons} from "@expo/vector-icons"

import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function TrophiesList({navigation}) {

    const trophies = [
        // Soorten fruit gegeten
        { id: 1, title: "Frisse Fruiter", description: "1 soort fruit gegeten", icon: "food-apple", color: "#A8D363", achieved: true },
        { id: 2, title: "Groen Groentje", description: "5 soorten fruit gegeten", icon: "seed", color: "#804e01", achieved: true },
        { id: 3, title: "Verse Verzamelaar", description: "10 soorten fruit gegeten", icon: "fruit-cherries", color: "#199d09", achieved: true },
        { id: 4, title: "Ervaren Expert", description: "15 soorten fruit gegeten", icon: "fruit-grapes", color: "#1da7b7", achieved: true },
        { id: 5, title: "Fanatische Fruitvreter", description: "25 soorten fruit gegeten", icon: "fruit-pineapple", color: "#b40b57", achieved: true },
        { id: 6, title: "Fruit Freak", description: "40 soorten fruit gegeten", icon: "fruit-watermelon", color: "#39c20a", achieved: true },

        // Streaks
        { id: 7, title: "Fruitvriend", description: "2 dagen achter elkaar fruit gegeten", icon: "run", color: "#c4aaaa", achieved: true },
        { id: 8, title: "Doorzetter", description: "4 dagen achter elkaar fruit gegeten", icon: "run-fast", color: "#f8b8b8", achieved: true },
        { id: 9, title: "Weekwerker", description: "7 dagen achter elkaar fruit gegeten", icon: "star", color: "#cbc300", achieved: true },
        { id: 10, title: "Dubbele Weekwerker", description: "14 dagen achter elkaar fruit gegeten", icon: "star-circle", color: "#ffb900", achieved: true },
        { id: 11, title: "Drievoudig Weekwerker", description: "21 dagen achter elkaar fruit gegeten", icon: "star-face", color: "#ffc400", achieved: true },
        { id: 12, title: "Maandmaestro", description: "30 dagen achter elkaar fruit gegeten", icon: "creation", color: "#FFD700", achieved: true },
        { id: 13, title: "Bimester Bikkel", description: "60 dagen achter elkaar fruit gegeten", icon: "medal-outline", color: "#c08801", achieved: true },
        { id: 14, title: "Halfjaarlijkse Held", description: "180 dagen achter elkaar fruit gegeten", icon: "trophy-award", color: "#b7af91", achieved: true },
        { id: 15, title: "Driekwart Doorbijter", description: "270 dagen achter elkaar fruit gegeten", icon: "trophy", color: "#fff700", achieved: true },
        { id: 16, title: "Kersverse Kampioen", description: "Behaal een streak van een jaar", icon: "cake-variant", color: "#ff00f2", achieved: true },
        { id: 17, title: "De Legende", description: "Behaal een streak van twee jaar", icon: "emoticon-cool", color: "#000000", achieved: true },

        // Tropisch fruit
        { id: 18, title: "Tropisch Talent", description: "5 tropische fruitsoorten gegeten", icon: "fruit-pineapple", color: "#c09e2f", achieved: true },
        { id: 19, title: "TropenTijger", description: "10 tropische fruitsoorten gegeten", icon: "fruit-pineapple", color: "#ffb900", achieved: true },

        // Steenvruchten (groot pit)
        { id: 20, title: "Steenstart", description: "5 soorten steenvruchten gegeten", icon: "fruit-cherries", color: "#E91E63", achieved: true },
        { id: 21, title: "Steengoed", description: "10 soorten steenvruchten gegeten", icon: "fruit-cherries", color: "#BF360C", achieved: true },

        // Pitvruchten (meerdere pitten)
        { id: 29, title: "Pittenprikker", description: "5 soorten pitvruchten gegeten", icon: "food-apple-outline", color: "#5bda0d", achieved: true },
        { id: 30, title: "Pitprofessor", description: "10 soorten pitvruchten gegeten", icon: "food-apple", color: "#e10808", achieved: true },

        // Citrus
        { id: 22, title: "Citrusclown", description: "5 citrussoorten gegeten", icon: "fruit-citrus", color: "#68c711", achieved: true },
        { id: 23, title: "Citruskoning", description: "10 citrussoorten gegeten", icon: "fruit-citrus", color: "#efff00", achieved: true },

        // Bessen (anders icoon dan pitvruchten)
        { id: 24, title: "Bessenbende", description: "5 soorten bessen gegeten", icon: "fruit-grapes", color: "#abd936", achieved: true },
        { id: 25, title: "Bessenbaas", description: "10 soorten bessen gegeten", icon: "fruit-grapes", color: "#6A1B9A", achieved: true },

        // Vrienden
        { id: 26, title: "Nieuwe Vriend", description: "Eerste vriend gemaakt", icon: "account-plus", color: "#279df3", achieved: true },
        { id: 27, title: "Vriendenkring", description: "5 vrienden gevonden", icon: "account-multiple", color: "#007fc5", achieved: true },
        { id: 28, title: "Vriendenbaas", description: "10 vrienden verzameld", icon: "account-group", color: "#0c22b4", achieved: true },
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
                            <MaterialCommunityIcons
                                style={styles.trophyIcon}
                                name={trophy.icon}
                                size={80}
                                color={trophy.achieved ? trophy.color : "#A9A9A9"}
                            />
                            <View>
                                <Text style={styles.trophyTitle}>{trophy.title}</Text>
                                <Text style={styles.trophyDescription}>{trophy.description}</Text>
                            </View>
                            <Text style={styles.trophyPercent}>69%</Text>
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
        borderRadius: 5,
        marginBottom: 15,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        padding: 5,
        paddingBottom: 50
    },
    trophyBlock: {
        width: '95%',
        backgroundColor: '#CDE5A7',
        margin: 5,
        flexDirection: "row",
        position: 'relative',
        paddingRight: 150,
        borderWidth: 3,
        borderColor: '#A8D363'
    },
    trophyTitle: {
        marginVertical: 5,
        fontWeight: 'bold',
        color: '#182700'
    },
    trophyDescription: {
        color: '#182700'
    },
    trophyPercent: {
        position: 'absolute',
        right: 5,
        top: '30%',
        fontWeight: 'bold',
        color: '#182700',
        fontSize: 24
    },
    trophyIcon: {
        padding: 2
    }
})
