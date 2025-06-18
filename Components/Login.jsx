import {Pressable, Image, Text, TextInput, View, StyleSheet, Alert} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const User_Token = 'user_login_token'

export default function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    useEffect(() => {
        const testUserAuth = async () => {
            try {
                const userAuth = await AsyncStorage.getItem(User_Token)
                console.log(userAuth)
                if (userAuth && userAuth.trim() !== '') { //niet null en niet undifined
                    navigation.navigate('Home');
                }
            } catch (e) {
                console.error('Fout bij het ophalen van van userdata', e);
            }
        }
        testUserAuth()
    }, []);
    const HandleLogin = async () => {
        if (!email || !password) {
            Alert.alert(
                'Oeps, bijna goed!',
                'Vul een e-mail en een wachtwoord in.',
                [
                    {text: 'OK'},
                ]
            )
            return
        }

        try {
            const response = await fetch('http://145.24.223.94/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer g360GNGOWNvaZ3rNM4YayTHnsV5ntsxVAPn8otxmdb1d2ed8'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json()
            if (response.ok) {
                const token = data['user-login-token']
                await AsyncStorage.setItem(User_Token, token)
                navigation.navigate('Home')
            } else {
                Alert.alert('Login mislukt', data.message || 'Onjuiste inloggegevens.')
            }
        } catch (error) {
            console.error('Login fout:', error)
            Alert.alert('Fout', 'Er is iets misgegaan met de verbinding.')
        }
    }
    return (
        <View style={styles.screen}>
            <View style={styles.background}>
                <View>
                    <Text style={styles.title}>Fruitapp</Text>
                </View>
                <View>
                    <Text style={styles.labels}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="..."
                        keyboardType="email-address"
                        style={styles.input}
                    />
                </View>
                <View>
                    <Text style={styles.labels}>Wachtwoord</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="..."
                        secureTextEntry={true}
                        style={styles.input}
                    />
                </View>
                <View style={styles.zin}>
                    <Text style={styles.question}>Nog geen account?</Text>
                    <Pressable onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.linkText}> Registreren</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable style={styles.loginButton} onPress={HandleLogin}>
                        <Text style={styles.buttonText}>Log in</Text>
                    </Pressable>
                </View>

            </View>

            <Image style={styles.img} source={require('../assets/fruitbackground.png')}/>
        </View>
    )

}

const styles = StyleSheet.create({
    background: {
        flex: 3,
        backgroundColor: 'rgba(168, 211, 99, 0.5)',
        paddingHorizontal: 50,
        paddingTop: '10%',
        flexDirection: "column",
        justifyContent: "space-evenly",
        borderBottomWidth: 3,
        borderBottomColor: '#182700',

    },
    title: {
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
    input: {
        backgroundColor: '#EAFCD2',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#A8D363',
        color: '#182700',
        height: 50,
        fontSize: 20,
        paddingLeft: 10
    },
    labels: {
        color: '#182700',
        fontWeight: "bold",
        fontSize: 20
    },
    loginButton: {
        backgroundColor: '#A8D363',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#EAFCD2',
    },
    buttonText: {
        color: '#EAFCD2',
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center"
    },
    question: {
        color: '#182700',
    },
    zin: {
        flexDirection: "row"
    },
    linkText: {
        color: '#D83F2E',
        textDecorationLine: "underline"
    },
    img: {
        width: '100%',
        flex: 2,
        backgroundColor: '#A8D363',
        opacity: 0.5,
    },
    screen: {
        flexDirection: "column",
        flex: 1,
    }
})