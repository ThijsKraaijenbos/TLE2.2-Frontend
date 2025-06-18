import {Pressable, StyleSheet, Text, View, ImageBackground, Image} from "react-native"
import {Ionicons} from "@expo/vector-icons"
import {LinearGradient} from 'expo-linear-gradient'
import {useProfile} from './ScreenComponents/ProfileContext'


export default function Profile({navigation}) {

    const {profileImage, displayName} = useProfile();

    return (
        <ImageBackground
            source={require('../assets/fruitbackground.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.screen}>
                <View style={styles.top}>
                    <View>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={50} style={styles.icon}/>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable onPress={() => navigation.navigate('Home')}>
                            <Ionicons name="close" size={50} style={styles.icon}/>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.profileContainer}>
                    <Image source={profileImage} style={styles.profileImage}/>
                </View>

                <View style={styles.nameLine}>
                    <Text style={styles.name}>{displayName}</Text>
                    <Pressable onPress={() => navigation.navigate('ProfileEdit')}>
                        <Ionicons name="pencil" size={32} style={styles.icon}/>
                    </Pressable>
                </View>

                <View style={styles.boxBox}>
                    <Pressable onPress={() => navigation.navigate('ProgressList')}>
                        <LinearGradient
                            colors={['#3F5023', '#A8D363']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={styles.box}
                        >
                            <Text style={styles.title}>Voortgang</Text>
                            <Ionicons name="bar-chart" size={50} style={styles.boxIcon}/>
                        </LinearGradient>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('TrophiesList')}>
                        <LinearGradient
                            colors={['#3F5023', '#A8D363']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={styles.box}
                        >
                            <Text style={styles.title}>Trofeeën</Text>
                            <Ionicons name="trophy" size={50} style={styles.boxIcon}/>
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
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 80,
        borderWidth: 3,
        borderColor: '#182700',
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
        padding: 20
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
    }
});