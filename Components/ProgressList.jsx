import {Pressable, StyleSheet, Text, View, ImageBackground, Image} from "react-native"
import {Ionicons} from "@expo/vector-icons"
import {LinearGradient} from 'expo-linear-gradient'
import {useProfile} from './ScreenComponents/ProfileContext'
import {useEffect, useState} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import Toast from 'react-native-toast-message'


export default function ProgressList({navigation}) {

    const [streak, setStreak] = useState('')
    const [fruitProgress, setFruitProgress] = useState({eaten: 0, total: 0})

    useEffect(() => {
        async function loadProfile() {
            try {
                const token = await AsyncStorage.getItem('user_login_token')
                console.log('TOKEN:', token)
                const response = await axios.get('http://145.24.223.94/api/user', {
                    headers: {
                        'X-user-login-token': token,
                        'X-with': 'streak',
                        'Authorization': 'Bearer g360GNGOWNvaZ3rNM4YayTHnsV5ntsxVAPn8otxmdb1d2ed8',
                    },
                })

                const userData = response.data.userData
                setStreak(userData.streak.current_streak)

            } catch (error) {
                console.error('Fout bij ophalen profiel:', error)
            }
        }

        async function fetchFruitProgress() {
            try {
                const token = await AsyncStorage.getItem('user_login_token')
                const response = await axios.get('http://145.24.223.94/api/fruits', {
                    headers: {
                        'X-user-login-token': token,
                        'Authorization': 'Bearer g360GNGOWNvaZ3rNM4YayTHnsV5ntsxVAPn8otxmdb1d2ed8',
                        'Content-Type': 'application/json',
                    }
                })

                const fruit = response.data.data

                const total = fruit.length
                const eaten = fruit.filter(f => f.user_preference?.has_eaten_before === 1).length

                setFruitProgress({eaten, total})

            } catch (err) {
                console.error('Fout bij ophalen fruit voortgang:', err)
            }
        }

        loadProfile()
        fetchFruitProgress()
    }, [])


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


                <Ionicons name="bar-chart" size={100} style={styles.chartIcon}/>

                <View>
                    <Text style={styles.titleTop}>Voortgang</Text>
                </View>


                <View style={styles.boxBox}>
                    <Pressable onPress={() => navigation.navigate('FruitList')}>
                        <LinearGradient
                            colors={['#3F5023', '#A8D363']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={styles.box}
                        >
                            <View>
                                <Text style={styles.title}>Fruit</Text>
                                <Text style={styles.title2}>gegeten</Text>
                            </View>
                            <Text style={styles.title3}>{fruitProgress.eaten} / {fruitProgress.total}</Text>
                        </LinearGradient>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('TrophiesList')}>
                        <LinearGradient
                            colors={['#3F5023', '#A8D363']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={styles.box}
                        >
                            <View>
                                <Text style={styles.title}>Trofeeën</Text>
                                <Text style={styles.title2}>behaald</Text>
                            </View>
                            <Text style={styles.title3}>30 / 30</Text>
                        </LinearGradient>
                    </Pressable>
                    <Pressable onPress={() => Toast.show({
                        type: 'success',
                        text1: 'Goed Gedaan!',
                        text2: 'Probeer je streak te verhogen door dagelijks fruit te eten.',
                    })}>
                        <LinearGradient
                            colors={['#3F5023', '#A8D363']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={styles.box}
                        >
                            <View>
                                <Text style={styles.title}>Streak</Text>
                                <Text style={styles.title2}>record</Text>
                            </View>
                            <Text style={styles.title3}>{streak} Dagen</Text>
                        </LinearGradient>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 10,
        color: '#000929'
    },
    boxIcon: {
        color: '#000929',
        marginTop: 20,
        marginRight: 20
    },
    screen: {
        paddingTop: '10%',
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    background: {
        flex: 1,
    },
    profileContainer: {
        alignItems: 'center',
    },
    chartIcon: {
        alignSelf: "center",
        marginBottom: 10
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#182700',
        textAlign: 'center',
    },
    top: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    nameLine: {
        width: '100%',
        position: 'relative',
        alignItems: 'center',
        marginVertical: 10,
    },
    title: {
        fontSize: 40,
        color: '#EAFCD2',
        paddingLeft: 20,
        paddingTop: 15
    },
    title2: {
        fontSize: 20,
        color: '#EAFCD2',
        paddingLeft: 20,
        paddingBottom: 20
    },
    title3: {
        fontSize: 40,
        color: '#182700',
        paddingVertical: 30,
        paddingRight: 5
    },
    box: {
        borderColor: '#182700',
        borderWidth: 4,
        borderRadius: 1,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    boxBox: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        flex: 3
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
})