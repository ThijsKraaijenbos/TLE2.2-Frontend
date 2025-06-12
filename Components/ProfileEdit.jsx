import {Pressable, Text, View} from "react-native";
import BottomNavigation from "./ScreenComponents/BottomNavigation";

export default function ProfileEdit({navigation}){
    const EditHandler = ()=>{
        // Pas hier de data in de database aan
        navigation.navigate('Profile')
    }
    return(
        <View style={{ flex: 1 }}>
            <View>
                {/*Hier moet je de image kunnen aanpassen*/}
            </View>
            {/*Hier komt de form voor het aanpassen van het profiel*/}
            <Pressable onPress={()=> EditHandler()}>
                <Text>Pas aan!</Text>
            </Pressable>
            <BottomNavigation navigation={navigation}/>

        </View>
    )
}