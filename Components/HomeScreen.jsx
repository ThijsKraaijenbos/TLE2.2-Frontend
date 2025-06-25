import {Alert, Animated, Easing, Image, ImageBackground, Pressable, Share, StyleSheet, Text, View} from "react-native";
import BottomNavigation from "./ScreenComponents/BottomNavigation";
import ProfileIcon from "./ScreenComponents/ProfileIcon";
import SettingsIcon from "./ScreenComponents/SettingsIcon";
import {useCallback, useEffect, useRef, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import {useFocusEffect, useRoute} from "@react-navigation/native";

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
const DATA_KEY = 'daily_data';
const TIMESTAMP_KEY = 'last_updated_time';
const User_Token = 'user_login_token'
const Daily_Task = 'daily_task_completed'

export default function HomeScreen({navigation}) {
    const [streak, setStreak] = useState(0)
    const [dailyTask, setDailyTask] = useState(false)
    const [suggestion, setSuggestion] = useState('')
    const [bgColor, setBgColor] = useState('rgba(168, 211, 99, 0.8)');
    const [streakDate, setStreakDate] = useState('')
    const [userAuth, setUserAuth] = useState('')

    const getUserToken = async () => {
        try {
            const userAuthToken = await AsyncStorage.getItem(User_Token)
            if (userAuthToken) {
                setUserAuth(userAuthToken)
                fetchUserInfo(userAuthToken)
            } else {
                console.log("Er is geen userdata")
            }
        } catch (e) {
            console.log("Er gaat iets fout met het ophalen van de gebruikersinformatie", e)
        }
    }
    const fetchUserInfo = async (token) => {
        try {
            const response = await fetch('http://145.24.223.94/api/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer g360GNGOWNvaZ3rNM4YayTHnsV5ntsxVAPn8otxmdb1d2ed8',
                    'X-user-login-token': token,
                    'X-with': 'streak, profileImage'
                }
            })

            const data = await response.json()
            if (response.ok) {
                const userData = data.userData || {}
                const streaks = userData.streak || {}
                const currentStreak = streaks.current_streak
                const lastCompleted = streaks?.last_completed_date

                if (currentStreak != null && lastCompleted) {
                    setStreak(currentStreak)
                    setStreakDate(lastCompleted)

                    const now = new Date();
                    const formattedDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
                    if (lastCompleted === formattedDate) {
                        setDailyTask(true);
                    } else {
                        setDailyTask(false);
                    }
                } else {
                    setStreak(0)
                    setDailyTask(false)
                }

            } else {
                Alert.alert('Fout bij ophalen', data.message || 'Gebruikersinformatie kon niet worden geladen.')
            }
        } catch (error) {
            console.error('Fout bij ophalen van gebruikersdata:', error)
            Alert.alert('Verbindingsfout', 'Er is een probleem opgetreden tijdens het ophalen van gegevens.')
        }
    }

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

    useEffect(() => {
        getUserToken()
        checkAndUpdateInfo();
    }, [])
    useFocusEffect(
        useCallback(() => {
            getUserToken();
            checkAndUpdateInfo();
        }, [])
    );

    const getRandomItem = () => {
        const index = Math.floor(Math.random() * fruitCombinaties.length);
        return fruitCombinaties[index];
    };

    const updateStreak = async () => {
         try {
             const today = new Date();
             const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

             const response = await fetch('http://145.24.223.94/api/updateStreak', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer g360GNGOWNvaZ3rNM4YayTHnsV5ntsxVAPn8otxmdb1d2ed8',
                    'X-user-login-token': userAuth,
                },
                body: JSON.stringify({
                    date: formattedDate
                })
            })
            const data = await response.json();
            if (response.ok) {
                await AsyncStorage.setItem(Daily_Task, JSON.stringify(true))
                setDailyTask(true);
                if (!dailyTask) {
                    await triggerAnimation()
                    await fetchUserInfo(userAuth)
                    await new Promise(resolve => setTimeout(resolve, 500));
                    navigation.navigate('FruitList');
                }
            } else {
                alert("Opslaan van de streak is mislukt: " + data);
            }
        } catch (e) {
            console.log("Er gaat iets fout met het updaten van de streak", e);
        }
    }

    const scaleAnim = useRef(new Animated.Value(0)).current;

    const triggerAnimation = () => {
        return new Promise((resolve) => {
            scaleAnim.setValue(0);
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
            }).start(() => {
                resolve();
            });
        });
    };

    const handleYesPressed = () => {
        if (dailyTask === false) {
            setDailyTask(true);
            updateStreak()
        } else {
            alert("Ho even, Probeer jij vals te spelen?\nJe mag maar 1 keer per dag op Ja drukken.");
        }
    };

    const handleNeePressed = () => {
        if (dailyTask === true) {
            alert("jij hebt vandaag al goed je fruit op heb je ingevuld!");
        } else {
            setBgColor('#fd9a90');
        }
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Ik kreeg deze suggestie:\n\n"${suggestion}"\n\nWat vind jij ervan?`,
            });
        } catch (error) {
            console.error('Fout bij delen:', error.message);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/fruitbackground.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}/>
            <ProfileIcon navigation={navigation} style={styles.profileIcon}/>
            <View style={styles.headerContainer}>
                <ImageBackground source={require('../assets/dragon-fruit (2).png')} style={styles.streakBackground}>
                    <Text style={styles.streakText}>{streak}</Text>
                </ImageBackground>
            </View>
            <Animated.View
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '40%',
                    transform: [
                        {
                            scale: scaleAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 1.5],
                            })
                        }
                    ],
                    opacity: scaleAnim.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0, 1, 0],
                    }),
                    zIndex: 10,
                }}
            >
                <Image source={require('../assets/checkmark.png')} style={{width: 100, height: 100}}/>
            </Animated.View>

            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>Heb jij vandaag al</Text>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>200g</Text>
                </View>
                <Text style={styles.questionText}>fruit gegeten?</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable
                    style={[styles.buttonYes, dailyTask && {opacity: 0.5}]}
                    onPress={handleYesPressed}
                    disabled={dailyTask}
                >
                    <Text style={styles.buttonText}>JA!</Text>
                </Pressable>
                <Pressable style={styles.buttonNo} onPress={handleNeePressed}>
                    <Text style={styles.buttonText}>Nee?</Text>
                </Pressable>
            </View>
            <View style={[styles.suggestionContainer, {backgroundColor: bgColor}]}>
                <Text style={styles.suggestionTitle}>Suggestie van vandaag:</Text>
                <Text style={styles.suggestionText}>{suggestion}</Text>

                <View style={styles.shareContainer}>
                    <Text style={styles.shareText}>Deze suggestie delen?</Text>
                    <Pressable onPress={() => handleShare()}>
                        <Ionicons name="arrow-forward" size={32} style={styles.icon}/>
                    </Pressable>
                </View>
            </View>
            <BottomNavigation navigation={navigation}/>
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
        width: 140,
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{rotate: "-45deg"}]
    },
    streakText: {
        marginTop: 35,
        marginRight: 35,
        fontSize: 50,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 100,
        backgroundColor: 'rgba(63,80,35,0.39)',
        fontWeight: 'bold',
        color: 'rgb(234,252,210)',
        transform: [{rotate: "45deg"}]

    },
    questionContainer: {
        marginTop: 30,
        alignItems: 'center',
        backgroundColor: 'rgba(168, 211, 99, 0.9)', // aangepaste opacity
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
        backgroundColor: '#a8d363',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonNo: {
        backgroundColor: '#fd9a90',
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


