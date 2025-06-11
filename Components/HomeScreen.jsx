import {ImageBackground, Pressable, StyleSheet, Text, View} from "react-native";
import BottomNavigation from "./ScreenComponents/BottomNavigation";
import ProfileIcon from "./ScreenComponents/ProfileIcon";
import SettingsIcon from "./ScreenComponents/SettingsIcon";
import {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from "@expo/vector-icons";
const fruitCombinaties = [
    "1 banaan 120g + 10 aardbeien 80g = 200g",
    "1 appel 150g + 1 kiwi 50g = 200g",
    "15 druiven 105g + 1 sinaasappel 95g = 200g",
    "1 mango 130g + 1 passievrucht 70g = 200g",
    "1 peer 160g + 1 pruim 40g = 200g",
    "1 plak watermeloen 170g + 1 passievrucht 30g = 200g",
    "1 nectarine 140g + 1 handje blauwe bessen 60g = 200g",
    "10 kersen 100g + 10 aardbeien 100g = 200g",
    "1 appel 150g + 1 handje blauwe bessen 50g = 200g",
    "1 granaatappel 200g = 200g (eenmalige uitzondering, maar goed te combineren)"
];


export default function HomeScreen({navigation}) {
    const [streak, setStreak] = useState(0)
    const [daylyTask, setDaylyTask] = useState(false)
    const [userInfo, setUserInfo] = useState([])

    useEffect(() => {
        const loadUser = async () => {
            const savedUser = await AsyncStorage.getItem('user');
            if (savedUser) setUserInfo(JSON.parse(savedUser));
        };
        loadUser();
    }, []);

    useEffect(() => {
        async function streakInformation() {
            try {
                const response = await fetch(`${userInfo}`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                const data = await response.json()
                setStreak(data)
            } catch (e) {
                console.log('Er gaat iets fout' + e)
            }
        }
        streakInformation()
    }, []);

    const handleYesPressed = ()=>{
        if (daylyTask===false) {
            setStreak((oldStreak) => oldStreak + 1)
            setDaylyTask(true)
        } else {
            alert("Ho even, Probeer jij vals te spelen?" +
                "Je mag maar 1 keer per dag op Ja drukken.")
        }
    }
    
    return (
        <View style={styles.body}>
            <View>
                <SettingsIcon navigation={navigation}/>
                <ImageBackground>
                    <Text>{streak}</Text>
                </ImageBackground>
                <ProfileIcon navigation={navigation}/>
            </View>
            <View>
                <View>
                    <Text>Heb jij vandaag al</Text>
                    <View>
                        <Text>200g</Text>
                    </View>
                    <Text>fruit gegeten?</Text>
                </View>
                <View>
                    <View>
                        <Pressable onPress={()=> handleYesPressed()}>
                            <Text>JA!</Text>
                        </Pressable>
                       <Pressable>
                           <Text>Nee?</Text>
                       </Pressable>

                    </View>
                    <View>
                        <Text>Suggestie van vandaag:</Text>
                        <Text>20 druiven - 140g</Text>
                        <Text>1 appel - 110g</Text>
                        <View>
                            <Text>Deze suggestie delen?</Text>
                            <Pressable>
                                <Ionicons name="arrow-forward" size={32} style={styles.icon}/>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
            <BottomNavigation navigation={navigation}/>
        </View>
    )
}
const styles = StyleSheet.create({

    body:{
        marginTop: '10%',
    },

    icon: {
        marginHorizontal: 10,
        color: '#000929'
    },
});