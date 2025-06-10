import {Pressable, Text, View} from "react-native";

export default function Register({navigation}){
    const HandleRegistration = ()=>{
        // Hier moeten de gegevens van de gebruiker opgeslagen worden
        navigation.navigate('Home')
    }
    return(
        <View>
            {/*Hier moet het form komen voor het inloggen*/}
            <Pressable onPress={()=> HandleRegistration()}>
                <Text>Registreer</Text>
            </Pressable>
        </View>
    )
}