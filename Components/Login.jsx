import {Pressable, Text, View} from "react-native";

export default function Login({navigation}) {
    const HandleLogin = () => {
        // Hier moet de infromatie van de gebruiker opgehaald worden
        navigation.navigate('Home')
    }
    return (
        <View>
            <View>
                {/*Hier komen de invulvelden*/}
                <Pressable onPress={() => HandleLogin()}>
                    <Text>Log in</Text>
                </Pressable>
            </View>
            <View>
                <Text>Nog geen account?</Text>
                <Pressable onPress={()=> navigation.navigate('Register')}>
                    <Text>Registreer</Text>
                </Pressable>
            </View>


        </View>
    )
}