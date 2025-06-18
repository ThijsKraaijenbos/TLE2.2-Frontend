import {Pressable, Image, Text, TextInput, View, StyleSheet, Alert} from "react-native";
import {useState} from "react";
import Constants from 'expo-constants';

const { AUTH_TOKEN } = Constants.expoConfig.extra;
export default function Register({navigation}){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const HandleRegistration = async () => {

        if (!name || !email || !password || !password2) {
            Alert.alert('Vul alles in', 'Alle velden zijn verplicht.');
            return;
        }

        if (password !== password2) {
            Alert.alert('Wachtwoorden komen niet overeen', 'Typ het wachtwoord opnieuw.');
            return;
        }
        const role = "child"



        try {
            const response = await fetch('http://145.24.223.94/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer g360GNGOWNvaZ3rNM4YayTHnsV5ntsxVAPn8otxmdb1d2ed8'
                },
                body: JSON.stringify({ name: name, email: email, password: password, role: role }),
            });

            const data = await response.json();
            console.log("RESPONSE TEXT:", data);
            if (response.ok) {
                Alert.alert('Gelukt', 'Registratie voltooid!');
                navigation.navigate('Login');
            } else {
                Alert.alert('Fout', data.message || 'Registratie mislukt.');
            }
        } catch (err) {
            Alert.alert('Fout', `Er is een netwerkfout opgetreden., ${err}`);
        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.background}>
                <View>
                    <Text style={styles.title}>Fruitapp</Text>
                </View>
                <View>
                    <Text style={styles.labels}>Naam</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="..."
                        style={styles.input}
                    />
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
                <View>
                    <Text style={styles.labels}>Herhaal Wachtwoord</Text>
                    <TextInput
                        value={password2}
                        onChangeText={setPassword2}
                        placeholder="..."
                        secureTextEntry={true}
                        style={styles.input}
                    />
                </View>
                <View style={styles.zin}>
                    <Text style={styles.question}>Heb je al een account? </Text>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.linkText}>Login</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable style={styles.registerButton} onPress={HandleRegistration}>
                        <Text style={styles.buttonText}>Registreren</Text>
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
    registerButton: {
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
        flexDirection: "row",
        justifyContent: "center"
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