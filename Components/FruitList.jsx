import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, FlatList, Image, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SettingsIcon from './ScreenComponents/SettingsIcon';
import ProfileIcon from './ScreenComponents/ProfileIcon';
import BottomNavigation from "./ScreenComponents/BottomNavigation";


export default function FruitList({navigation}) {

    const [fruitdata, setFruitdata] = useState([]);

    useEffect(() => {
        LoadFruits();
    }, []);

    const LoadFruits = async () => {
        try {
            const response = await fetch('http://145.24.223.94/api/fruits', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':
                        'Bearer g360GNGOWNvaZ3rNM4YayTHnsV5ntsxVAPn8otxmdb1d2ed8',
                },
            });

            const data = await response.json();
            if (response.ok) {
                setFruitdata(data);
                console.log('Fruit correct opgehaald');
            } else {
                Alert.alert('Fout', data.message || 'Fruit ophalen mislukt.');
            }
        } catch (err) {
            Alert.alert('Fout', `Er is een netwerkfout opgetreden: ${err}`);
        }
    };

    function borderColor(like) {
        if (like === true) {
            return '#45A85B'
        } else if (like === false) {
            return '#D83F2E'
        }
    }

    function Backgroundcolor(like) {
        if (like === true) {
            return '#A8D363'
        } else if (like === false) {
            return '#FD9A90'
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Top icons */}
            <SettingsIcon navigation={navigation} style={styles.settingsIcon}/>
            <ProfileIcon navigation={navigation} style={styles.profileIcon}/>

            {/* Info header */}
            <View style={styles.headerContainer}>
                <Text style={styles.infoIcon}>i</Text>
                <Text style={styles.infoText}>Info</Text>
            </View>

            {/* Search bar */}
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Zoek fruit..."/>
                <Text style={styles.searchIcon}>🔍</Text>
            </View>

            {/* Fruit list */}
            <FlatList
                data={fruitdata}
                keyExtractor={(item) => item.name}
                numColumns={2}
                contentContainerStyle={styles.grid}
                renderItem={({item}) => (
                    <View style={[
                        styles.fruitItem,
                        {
                            backgroundColor: Backgroundcolor(item.like),
                            borderColor: borderColor(item.like),
                            borderWidth: 3
                        }
                    ]}>
                        <Image source={item.image} style={styles.fruitImage}/>
                        {item.checked && <Text style={styles.checkmark}>✔️</Text>}
                        <Text style={styles.fruitName}>{item.name}</Text>
                    </View>
                )}
            />
            <BottomNavigation navigation={navigation}/>
        </SafeAreaView>
    );
}

useEffect(() => {
    LoadFruits();
}, []);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        alignItems: 'center',
    },
    settingsIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    profileIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 10,
    },
    infoIcon: {
        fontSize: 28,
        backgroundColor: '#000',
        color: 'white',
        padding: 10,
        borderRadius: 50,
        textAlign: 'center',
        width: 48,
        height: 48,
    },
    infoText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#223322',
        backgroundColor: '#cddfc0',
        paddingHorizontal: 30,
        paddingVertical: 6,
        borderRadius: 8,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eef3e8',
        borderRadius: 10,
        marginVertical: 10,
        width: '100%',
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
    searchIcon: {
        fontSize: 20,
        marginLeft: 8,
    },
    grid: {
        marginTop: 10,
        justifyContent: 'center',
    },
    fruitItem: {
        width: '45%',
        margin: '2.5%',
        borderRadius: 10,
        alignItems: 'center',
        borderStyle: 'solid',
        padding: 0,
    },
    fruitImage: {
        width: 150,
        height: 80,
        borderRadius: 8,
    },
    fruitName: {
        marginTop: 6,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    checkmark: {
        position: 'absolute',
        top: 6,
        right: 6,
        fontSize: 18,
    },
});
