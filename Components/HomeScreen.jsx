import {ImageBackground, Pressable, StyleSheet, Text, View} from "react-native";
import BottomNavigation from "./ScreenComponents/BottomNavigation";
import ProfileIcon from "./ScreenComponents/ProfileIcon";
import SettingsIcon from "./ScreenComponents/SettingsIcon";
import {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from "@expo/vector-icons";

const fruitCombinaties = [
    "1 banaan 120g +\n 10 aardbeien 80g = 200g",
    "1 appel 150g + 1\n kiwi 50g = 200g",
    "15 druiven 105g +\n 1 sinaasappel 95g = 200g",
    "1 mango 130g +\n 1 passievrucht 70g = 200g",
    "1 peer 160g +\n 1 pruim 40g = 200g",
    "1 plak watermeloen 170g +\n 1 passievrucht 30g = 200g",
    "1 nectarine 140g +\n 1 handje blauwe bessen 60g = 200g",
    "10 kersen 100g +\n 10 aardbeien 100g = 200g",
    "1 appel 150g +\n 1 handje blauwe bessen 50g = 200g",
    "1 granaatappel 200g = 200g"
];
const DAILY_RESET_HOURS = 24;
const DATA_KEY = 'daily_data';
const TIMESTAMP_KEY = 'last_updated_time';

export default function HomeScreen({navigation}) {
    const [streak, setStreak] = useState(0)
    const [daylyTask, setDaylyTask] = useState(false)
    const [userInfo, setUserInfo] = useState([])
    const [suggestion, setSuggestion] = useState('')

    useEffect(() => {
        const loadStreakData = async () => {
            try {
                const lastUpdate = await AsyncStorage.getItem('lastStreakUpdateTime');
                const savedStreak = await AsyncStorage.getItem('streak');
                const now = new Date().getTime();

                if (savedStreak) {
                    setStreak(parseInt(savedStreak));
                }

                if (lastUpdate) {
                    const elapsed = now - parseInt(lastUpdate, 10);
                    const hoursPassed = elapsed / (1000 * 60 * 60);

                    if (hoursPassed >= 24) {
                        setDaylyTask(false);
                    } else {
                        setDaylyTask(true);
                    }
                } else {
                    setDaylyTask(false);
                }
            } catch (error) {
                console.error('Fout bij laden streak data:', error);
            }
        };

        loadStreakData();
    }, []);

    const getRandomItem = () => {
        const index = Math.floor(Math.random() * fruitCombinaties.length);
        return fruitCombinaties[index];
    };

    useEffect(() => {
        const checkAndUpdateInfo = async () => {
            try {
                const savedTime = await AsyncStorage.getItem(TIMESTAMP_KEY);
                const savedSuggestion = await AsyncStorage.getItem(DATA_KEY);
                const now = new Date().getTime();

                if (savedTime) {
                    const elapsed = now - parseInt(savedTime, 10);
                    const hoursPassed = elapsed / (1000 * 60 * 60);

                    if (hoursPassed >= DAILY_RESET_HOURS) {
                        const newSuggestion = getRandomItem();
                        await AsyncStorage.setItem(DATA_KEY, newSuggestion);
                        await AsyncStorage.setItem(TIMESTAMP_KEY, now.toString());
                        setSuggestion(newSuggestion);
                    } else {
                        setSuggestion(savedSuggestion || 'Geen informatie gevonden');
                    }
                } else {
                    const newInfo = getRandomItem();
                    await AsyncStorage.setItem(DATA_KEY, newInfo);
                    await AsyncStorage.setItem(TIMESTAMP_KEY, now.toString());
                    setSuggestion(newInfo);
                }
            } catch (error) {
                console.error('Fout bij ophalen data:', error);
            }
        };
        checkAndUpdateInfo();
    }, []);

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
                const response = await fetch(`${userInfo.id}`, {
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

    const handleYesPressed = async () => {
        if (daylyTask === false) {
            const newStreak = streak + 1;
            setStreak(newStreak);
            setDaylyTask(true);

            const now = new Date().getTime();
            await AsyncStorage.setItem('streak', newStreak.toString());
            await AsyncStorage.setItem('lastStreakUpdateTime', now.toString());
        } else {
            alert("Ho even, Probeer jij vals te spelen?\nJe mag maar 1 keer per dag op Ja drukken.");
        }
    };


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
                        <Pressable onPress={() => handleYesPressed()}>
                            <Text>JA!</Text>
                        </Pressable>
                        <Pressable>
                            <Text>Nee?</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Text>Suggestie van vandaag:</Text>
                        <Text>{suggestion}</Text>
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

    body: {
        marginTop: '10%',
    },

    icon: {
        marginHorizontal: 10,
        color: '#000929'
    },
});