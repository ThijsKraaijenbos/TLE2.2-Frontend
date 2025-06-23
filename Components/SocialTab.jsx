import {ImageBackground, Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator} from "react-native";
import BottomNavigation from "./ScreenComponents/BottomNavigation";
import ProfileIcon from "./ScreenComponents/ProfileIcon";
import SettingsIcon from "./ScreenComponents/SettingsIcon";
import {Ionicons} from "@expo/vector-icons";
import UserList from '../Components/ScreenComponents/UserList.jsx';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const User_Token = 'user_login_token'


export default function SocialTab({navigation}) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userAuth, setUserAuth] = useState('');
    const [friendsMail, setFriendsMail] = useState('')


    const getUserToken = async () => {
        try {
            const userAuthToken = await AsyncStorage.getItem(User_Token)
            if (userAuthToken) {
                setUserAuth(userAuthToken)
                fetchFriends(userAuthToken)
            } else {
                console.log("Er is geen userdata")
            }
        } catch (e) {
            console.log("Er gaat iets fout met het ophalen van de gebruikersinformatie", e)
        }

    }
    const fetchFriends = async (token) => {
        try {
            const response = await fetch('http://145.24.223.94/api/friends',
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer g360GNGOWNvaZ3rNM4YayTHnsV5ntsxVAPn8otxmdb1d2ed8',
                        'X-user-login-token': token
                    }
                }
            );
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                setUsers(data?.friends)
            } else {
                alert("er gaat iets niet goed met het verwerken van jouw vrienden")
            }
        } catch (error) {
            console.error('Fout bij ophalen gebruikers:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getUserToken()
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader}/>;
    }

    const handleInvite = async () => {
        const email = friendsMail.trim().toLowerCase(); // Normaliseer hoofdletters

        // Stap 1: check of deze email al in je vriendenlijst zit
        const alreadyFriend = users.some(user => user.email?.toLowerCase() === email);

        if (alreadyFriend) {
            alert("Jullie zijn al vrienden");
            return;
        }

        // Stap 2: als niet, probeer uitnodiging te versturen
        try {
            const response = await fetch('http://145.24.223.94/api/friends', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer g360GNGOWNvaZ3rNM4YayTHnsV5ntsxVAPn8otxmdb1d2ed8',
                    'X-user-login-token': userAuth,
                },
                body: JSON.stringify({ email: friendsMail.trim() })
            });

            const data = await response.json();

            if (response.ok) {
                await fetchFriends(userAuth); // Herlaad de vriendenlijst
                setFriendsMail(''); // Wis het veld
            } else {
                alert(data?.message || "Er ging iets mis");
            }
        } catch (e) {
            alert("Er komt niets terug: " + e.message);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/fruitbackground.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}/>

            <SettingsIcon navigation={navigation} style={styles.settingsIcon}/>
            <ProfileIcon navigation={navigation} style={styles.profileIcon}/>

            <View style={styles.container}>
                <Ionicons name="people" size={100} style={styles.icon}/>
                <View style={styles.friendCodeSection}>
                    <View style={styles.sectionTitleContainer}>
                        <Text style={styles.sectionTitle}>Vriend uitnodigen</Text>
                    </View>
                    <View style={styles.inviteContainer}>
                        <TextInput
                            value={friendsMail}
                            onChangeText={setFriendsMail}
                            placeholder="email"
                            style={styles.input}
                            placeholderTextColor="#182700"
                        />
                        <Pressable onPress={handleInvite} style={styles.searchButton}>
                            <Text style={styles.searchButtonText}>Zoeken</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.friendsListSection}>
                    <View style={styles.sectionTitleContainer2}>
                        <Text style={styles.sectionTitle}>Jouw Vrienden</Text>
                    </View>
                    <UserList users={users}/>
                </View>
            </View>
            <View style={styles.bottomNav}>
                <BottomNavigation navigation={navigation}/>
            </View>
        </ImageBackground>
    );

}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        position: 'relative',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 0,
    },
    settingsIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    profileIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    container: {
        flex: 1,
        marginTop: 40,
        padding: 20,
        justifyContent: 'flex-start',
        zIndex: 1,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 3,
    },
    friendCodeSection: {
        backgroundColor: 'rgba(24,39,0,0.25)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#eafcd2',
    },
    sectionTitleContainer: {
        backgroundColor: '#182700',
        alignItems: "center",
        borderColor: '#A8D363',
        borderWidth: 3,
        borderRadius: 10,
        height: 40,
        width: 170,
        justifyContent: "center",
    },
    sectionTitleContainer2: {
        backgroundColor: '#182700',
        alignItems: "center",
        borderColor: '#A8D363',
        borderWidth: 3,
        borderRadius: 10,
        height: 40,
        width: 170,
        justifyContent: "center",
        alignSelf: "center",
    },
    friendCode: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#eafcd2',
        backgroundColor: 'rgba(24,39,0,0.53)',
        width: 175,
        marginLeft: 5,
        marginTop: 4,
        marginBottom: 4,
        paddingLeft: 3,
        borderRadius: 5,
    },
    inviteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    input: {
        flex: 1,
        backgroundColor: '#EAFCD2',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#A8D363',
        color: '#182700',
        height: 50,
        fontSize: 20,
        paddingHorizontal: 10,
    },
    searchButton: {
        backgroundColor: '#a8d363',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
        borderWidth: 2,
        borderColor: '#182700',
    },
    searchButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#182700',
    },
    friendsListSection: {
        backgroundColor: 'rgb(24,39,0)',
        borderRadius: 12,
        padding: 16,
        flex: 1,
        minHeight: 390,
        maxHeight: 390,
        marginTop: -10,
    },
    icon: {
        color: '#000929',
        alignSelf: 'center',
        marginBottom: 10,
    },
});

