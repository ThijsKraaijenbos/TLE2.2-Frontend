import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsIcon from './ScreenComponents/SettingsIcon';
import ProfileIcon from './ScreenComponents/ProfileIcon';
import BottomNavigation from "./ScreenComponents/BottomNavigation";

const fruitData = [
    { name: 'Appel', image: require('../assets/fruitImages/S6pr7qTm-appelpitten-shutterstock-900-500.jpg'), checked: true, color: '#FD9A90' },
    { name: 'Banaan', image: require('../assets/fruitImages/WKOF_artikel_Zijn_bananen_gezond_700x400-1.webp'), checked: true, color: '#A8D363' },
    { name: 'Kiwi', image: require('../assets/fruitImages/duerfen-hunde-kiwi-essen-1200x675.jpg'), checked: true, color: '#A8D363' },
    { name: 'Mango', image: require('../assets/fruitImages/0097_Welke-vitamine-zit-er-in-een-mango_.jpg'), checked: true, color: '#FD9A90' },
    { name: 'Papaya', image: require('../assets/fruitImages/papaya-fruit.webp'), checked: false, color: '#FD9A90' },
    { name: 'Pitaja', image: require('../assets/fruitImages/istock_44367732_large.jpg'), checked: true, color: '#A8D363' },
    { name: 'Ananas', image: require('../assets/fruitImages/Ananas_370x425.webp'), checked: false, color: '#FD9A90' },
    { name: 'Peer', image: require('../assets/fruitImages/peer.jpg'), checked: true, color: '#A8D363' },
];


function borderColor(Hex){
    let returnCollor = ""
    if(Hex == '#A8D363'){
        returnCollor = '#45A85B'
    }
    else if(Hex == '#FD9A90'){
        returnCollor = '#D83F2E'
    }
    return returnCollor
}

// Utility to darken a hex color slightly
function darkenHexColor(hex, amount = 20) {
    let num = parseInt(hex.replace('#', ''), 16);
    let r = Math.max(0, (num >> 16) - amount);
    let g = Math.max(0, ((num >> 8) & 0x00FF) - amount);
    let b = Math.max(0, (num & 0x0000FF) - amount);
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}


export default function FruitList({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            {/* Top icons */}
            <SettingsIcon navigation={navigation} style={styles.settingsIcon} />
            <ProfileIcon navigation={navigation} style={styles.profileIcon} />

            {/* Info header */}
            <View style={styles.headerContainer}>
                <Text style={styles.infoIcon}>i</Text>
                <Text style={styles.infoText}>Info</Text>
            </View>

            {/* Search bar */}
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Zoek fruit..." />
                <Text style={styles.searchIcon}>🔍</Text>
            </View>

            {/* Fruit list */}
            <FlatList
                data={fruitData}
                keyExtractor={(item) => item.name}
                numColumns={2}
                contentContainerStyle={styles.grid}
                renderItem={({ item }) => (
                    <View style={[
                        styles.fruitItem,
                        {
                            backgroundColor: item.color,
                            borderColor: borderColor(item.color),
                            borderWidth: 3
                        }
                    ]}>
                        <Image source={item.image} style={styles.fruitImage} />
                        {item.checked && <Text style={styles.checkmark}>✔️</Text>}
                        <Text style={styles.fruitName}>{item.name}</Text>
                    </View>
                )}

            />
            <BottomNavigation navigation={navigation}/>
        </SafeAreaView>
    );
}

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
