import {Pressable, Image, Text, TextInput, View, StyleSheet} from "react-native";
import {useState} from "react";
import {c} from "react/compiler-runtime";

export default function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const HandleLogin = () => {
        // Hier moet de infromatie van de gebruiker opgehaald worden
        navigation.navigate('Home')
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
        height: '60%',
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
        height: 50
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
        height: '40%',
        backgroundColor: '#A8D363',
        opacity: 0.5,
    },
    screen: {
        flexDirection: "column",
    }
})