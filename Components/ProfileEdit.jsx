import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Pressable, Image, Text, ImageBackground} from 'react-native';
import {useProfile} from './ProfileContext';
import {Ionicons} from "@expo/vector-icons";

export default function ProfileEdit({navigation}) {
    const {displayName, setDisplayName, profileImage, setProfileImage} = useProfile();
    const [name, setName] = useState(displayName);

    const profileImages = [
        require('../assets/fruitbackground.png'),
        require('../assets/gray.jpg'),
        require('../assets/man.jpg'),
        require('../assets/banana.jpg'),
        require('../assets/banana.jpg'),
        require('../assets/banana.jpg'),
        require('../assets/banana.jpg'),
        require('../assets/banana.jpg'),
    ];

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
                    <Image source={profileImage} style={styles.profileImage}/>
                </View>

                <Text style={styles.name}>{displayName}</Text>

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
                        <Pressable key={index} onPress={() => setProfileImage(img)}>
                            <Image
                                source={img}
                                style={[
                                    styles.profileOption,
                                    profileImage === img && styles.selectedProfile
                                ]}
                            />
                        </Pressable>
                    ))}
                </View>

                <Pressable style={styles.saveButton} onPress={() => {
                    setDisplayName(name);
                    navigation.goBack();
                }} >
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
});