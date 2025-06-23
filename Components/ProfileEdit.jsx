import React, {useEffect, useState} from 'react'
import {View, TextInput, Button, StyleSheet, Pressable, Image, Text, ImageBackground, Alert} from 'react-native'
import {useProfile} from './ScreenComponents/ProfileContext'
import {Ionicons} from "@expo/vector-icons"
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'


export default function ProfileEdit({navigation}) {
    const { profileImage, setProfileImage, displayName, setDisplayName } = useProfile()
    const [name, setName] = useState(displayName)
    const [selectedImageId, setSelectedImageId] = useState(null)
    const [tempImage, setTempImage] = useState(profileImage)


    const profileImages = [
        {id: 1, src: require('../assets/gray.jpg')},
        {id: 2, src: require('../assets/fruitbackground.png')},
        {id: 3, src: require('../assets/man.jpg')},
        {id: 4, src: require('../assets/banana.jpg')},
    ]

    useEffect(() => {
        setTempImage(profileImage)
        setName(displayName)
        setSelectedImageId(null)
    }, [profileImage, displayName])

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
                <View style={styles.profileContainer}>
                    <Image source={tempImage} style={styles.profileImage}/>
                </View>

                <Text style={styles.name}>{name}</Text>

                <Text style={styles.label}>Pas je naam aan</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="..."
                    style={styles.input}
                />

                <Text style={styles.label}>Kies een profielfoto</Text>
                <View style={styles.imageSelector}>
                    {profileImages.map((img, index) => (
                        <Pressable key={img.id} onPress={() => {
                            setTempImage(img.src)
                            setSelectedImageId(img.id)
                        }}>
                            <Image
                                source={img.src}
                                style={[
                                    styles.profileOption,
                                    selectedImageId === img.id && styles.selectedProfile
                                ]}
                            />
                        </Pressable>
                    ))}
                </View>

                <Pressable style={styles.saveButton} onPress={async () => {
                    try {
                        const token = await AsyncStorage.getItem('user_login_token')
                        await axios.put('http://145.24.223.94/api/user', {
                            name: name,
                            profile_image_id: selectedImageId,
                        }, {
                            headers: {
                                'X-user-login-token': token,
                                'Authorization': 'Bearer g360GNGOWNvaZ3rNM4YayTHnsV5ntsxVAPn8otxmdb1d2ed8',
                                'Content-Type': 'application/json',
                            }
                        })

                        navigation.goBack()
                    } catch (error) {
                        console.error('Fout bij opslaan profiel:', error)
                        Alert.alert('Fout', 'Profiel kon niet worden opgeslagen.')
                    }
                }}>
                    <Text style={styles.saveButtonText}>Opslaan</Text>
                </Pressable>

            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
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
    top: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#182700',
        textAlign: 'center',
    },

    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        marginLeft: 20
    },
    input: {
        borderWidth: 3,
        borderColor: '#A8D363',
        backgroundColor: '#EAFCD2',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginHorizontal: 20
    },
    imageSelector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        flexWrap: 'wrap',
        gap: 10,
    },
    profileOption: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 4,
        borderColor: 'transparent'
    },
    selectedProfile: {
        borderColor: '#A8D363',
    },
    saveButton: {
        backgroundColor: '#A8D363',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 60,
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#182700'
    },

    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#182700',
        textAlign: 'center',
    },
    icon: {
        marginHorizontal: 10,
        color: '#000929'
    },
})