import {ImageBackground, Pressable, StyleSheet, Text, View} from "react-native";
import BottomNavigation from "./ScreenComponents/BottomNavigation";
import ProfileIcon from "./ScreenComponents/ProfileIcon";
import SettingsIcon from "./ScreenComponents/SettingsIcon";
import {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";

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
    const [streakDate, setStreakDate] = useState('')

    useEffect(() => {
        const loadStreakData = async () => {
            try {
                const lastUpdate = await AsyncStorage.getItem('lastStreakUpdateTime'); // ← hier kun je ook je API response gebruiken
                const savedStreak = await AsyncStorage.getItem('streak');

                if (savedStreak) {
                    setStreak(parseInt(savedStreak));
                }

                const now = new Date();
                if (lastUpdate) {
                    const lastDate = new Date(lastUpdate);

                    const isDifferentDay =
                        lastDate.getFullYear() !== now.getFullYear() ||
                        lastDate.getMonth() !== now.getMonth() ||
                        lastDate.getDate() !== now.getDate();

                    if (isDifferentDay) {
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
                const now = new Date();

                if (savedTime) {
                    const savedDate = new Date(parseInt(savedTime, 10));

                    const isDifferentDay =
                        savedDate.getFullYear() !== now.getFullYear() ||
                        savedDate.getMonth() !== now.getMonth() ||
                        savedDate.getDate() !== now.getDate();

                    if (isDifferentDay) {
                        const newSuggestion = getRandomItem();
                        await AsyncStorage.setItem(DATA_KEY, newSuggestion);
                        await AsyncStorage.setItem(TIMESTAMP_KEY, now.getTime().toString());
                        setSuggestion(newSuggestion);
                    } else {
                        setSuggestion(savedSuggestion || 'Geen informatie gevonden');
                    }
                } else {
                    const newInfo = getRandomItem();
                    await AsyncStorage.setItem(DATA_KEY, newInfo);
                    await AsyncStorage.setItem(TIMESTAMP_KEY, now.getTime().toString());
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
        <ImageBackground
            source={require('../assets/fruitbackground.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay} />

            <SettingsIcon navigation={navigation} style={styles.settingsIcon} />
            <ProfileIcon navigation={navigation} style={styles.profileIcon} />

            <View style={styles.headerContainer}>
                <ImageBackground style={styles.streakBackground}>
                    <Text style={styles.streakText}>{streak}</Text>
                </ImageBackground>
            </View>

            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>Heb jij vandaag al</Text>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>200g</Text>
                </View>
                <Text style={styles.questionText}>fruit gegeten?</Text>
            </View>

            <View style={styles.buttonsContainer}>
                <Pressable style={styles.buttonYes} onPress={handleYesPressed}>
                    <Text style={styles.buttonText}>JA!</Text>
                </Pressable>
                <Pressable style={styles.buttonNo}>
                    <Text style={styles.buttonText}>Nee?</Text>
                </Pressable>
            </View>

            <View style={styles.suggestionContainer}>
                <Text style={styles.suggestionTitle}>Suggestie van vandaag:</Text>
                <Text style={styles.suggestionText}>{suggestion}</Text>

                <View style={styles.shareContainer}>
                    <Text style={styles.shareText}>Deze suggestie delen?</Text>
                    <Pressable>
                        <Ionicons name="arrow-forward" size={32} style={styles.icon} />
                    </Pressable>
                </View>
            </View>

            <BottomNavigation navigation={navigation} />
        </ImageBackground>
    );

}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        position: 'relative',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 0,
    },
    settingsIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    profileIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    headerContainer: {
        marginTop: 80,
        alignItems: 'center',
        zIndex: 1,
    },
    streakBackground: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(200, 255, 200, 0.6)',
        borderRadius: 50,
    },
    streakText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#3f5023',
    },
    questionContainer: {
        marginTop: 30,
        alignItems: 'center',
        backgroundColor: 'rgba(168, 211, 99, 0.53)', // aangepaste opacity
        padding: 10,
        borderRadius: 12,
        marginHorizontal: 20,
    },
    questionText: {
        fontSize: 18,
        color: '#222',
        marginVertical: 4,
    },
    amountContainer: {
        backgroundColor: '#3f5023',
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 8,
        marginVertical: 6,
    },
    amountText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
        gap: 20,
        zIndex: 1,
    },
    buttonYes: {
        backgroundColor: '#a8d5a2',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonNo: {
        backgroundColor: '#f9c5c5',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    suggestionContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(168, 211, 99, 0.53)', // aangepaste opacity
        padding: 16,
        borderRadius: 12,
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
        zIndex: 1,
    },
    suggestionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    suggestionText: {
        fontSize: 16,
        color: '#3f5023',
    },
    suggestionDate: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    shareContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    shareText: {
        fontSize: 16,
        marginRight: 8,
    },
    icon: {
        marginHorizontal: 10,
        color: '#000929',
    },
});


