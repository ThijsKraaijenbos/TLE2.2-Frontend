import {ImageBackground, Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator} from "react-native";
import BottomNavigation from "./ScreenComponents/BottomNavigation";
import ProfileIcon from "./ScreenComponents/ProfileIcon";
import SettingsIcon from "./ScreenComponents/SettingsIcon";
import {Ionicons} from "@expo/vector-icons";
import UserList from '../Components/ScreenComponents/UserList.jsx';
import React, {useEffect, useState} from 'react';

export default function SocialTab({navigation}) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [friendsCode, setFriendsCode] = useState()
    const handleInvite = () => {
    }

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                // Vervang dit met je echte API-call
                const response = await fetch('https://jouw-api-endpoint.com/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Fout bij ophalen gebruikers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader}/>;
    }

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
                        <Text style={styles.sectionTitle}>Jouw Vriendcode</Text>
                    </View>

                    <Text style={styles.friendCode}># 1768654351854</Text>
                    <View style={styles.sectionTitleContainer}>
                        <Text style={styles.sectionTitle}>Vriend uitnodigen</Text>
                    </View>
                    <View style={styles.inviteContainer}>
                        <TextInput
                            value={friendsCode}
                            onChangeText={setFriendsCode}
                            placeholder="#"
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
        alignSelf:"center",
    },
    friendCode: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#eafcd2',
        backgroundColor: 'rgba(24,39,0,0.53)',
        width: 175,
        marginLeft: 5,
        marginTop:4,
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
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
        maxHeight:320,
        marginTop:-10,
    },
    icon: {
        color: '#000929',
        alignSelf: 'center',
        marginBottom: 10,
    },
});

