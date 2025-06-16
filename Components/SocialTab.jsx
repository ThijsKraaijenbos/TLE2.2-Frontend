import {ImageBackground, Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator} from "react-native";
import BottomNavigation from "./ScreenComponents/BottomNavigation";
import ProfileIcon from "./ScreenComponents/ProfileIcon";
import SettingsIcon from "./ScreenComponents/SettingsIcon";
import {Ionicons} from "@expo/vector-icons";
import UserList from '../Components/ScreenComponents/UserList.jsx';
import React, { useEffect, useState } from 'react';

export default function SocialTab ({navigation}) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [friendsCode, setFriendsCode] = useState()


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
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    return (
        <View style={{flex: 1}}>
            <SettingsIcon navigation={navigation}/>
            <ProfileIcon navigation={navigation}/>
            <View>
                <Ionicons name="people" size={32} style={styles.icon}/>
                <View>
                    <Text></Text>
                </View>
                <View>
                    <View>
                        <View>
                            <Text>Jouw Vriendcode</Text>
                            <Text>1768654351854</Text>
                            <View>
                                <Text>Vriend uitnodigen</Text>
                                <View>
                                    <TextInput
                                        value={friendsCode}
                                        onChangeText={setFriendsCode}
                                        placeholder="#"
                                        style={styles.input}
                                    />
                                    <Pressable onPress={() => handleInvite()}>
                                        <Text>Zoeken</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text>Jouw Vrienden</Text>
                        <UserList users={users} />
                    </View>
                </View>
            </View>

            <BottomNavigation navigation={navigation}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    icon: {
        color: '#000929',
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
});


