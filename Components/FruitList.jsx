import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import SettingsIcon from './ScreenComponents/SettingsIcon';
import ProfileIcon from './ScreenComponents/ProfileIcon';
import BottomNavigation from './ScreenComponents/BottomNavigation';

const initialFruitData = [
    { name: 'Appel', checked: false, image: require('../assets/fruitImages/S6pr7qTm-appelpitten-shutterstock-900-500.jpg'), color: '#FD9A90' },
    { name: 'Banaan', checked: false, image: require('../assets/fruitImages/WKOF_artikel_Zijn_bananen_gezond_700x400-1.webp'), color: '#A8D363' },
    { name: 'Kiwi', checked: false, image: require('../assets/fruitImages/duerfen-hunde-kiwi-essen-1200x675.jpg'), color: '#A8D363' },
    { name: 'Mango', checked: false, image: require('../assets/fruitImages/0097_Welke-vitamine-zit-er-in-een-mango_.jpg'), color: '#FD9A90' },
    { name: 'Papaya', checked: false, image: require('../assets/fruitImages/papaya-fruit.webp'), color: '#FD9A90' },
    { name: 'Pitaja', checked: false, image: require('../assets/fruitImages/istock_44367732_large.jpg'), color: '#A8D363' },
    { name: 'Peer', checked: false, image: require('../assets/fruitImages/peer.jpg'), color: '#A8D363' },
];

function borderColor(hex) {
    if (hex === '#A8D363') return '#45A85B';
    if (hex === '#FD9A90') return '#D83F2E';
    return '#000';
}

export default function FruitList({ navigation }) {
    const [fruitData, setFruitData] = useState(initialFruitData);
    const [open, setOpen] = useState(false);
    const [selectedFruit, setSelectedFruit] = useState(null);
    const [searchText, setSearchText] = useState('');


    const dropdownItems = fruitData
        .filter(fruit => !fruit.checked) // alleen niet-gegeten fruit
        .map(fruit => ({
            label: fruit.name,
            value: fruit.name,
        }));
    const filteredFruitData = fruitData.filter(fruit =>
        fruit.name.toLowerCase().includes(searchText.toLowerCase())
    );


    const toggleFruitStatus = (fruitName) => {
        const updated = fruitData.map(item =>
            item.name === fruitName ? { ...item, checked: !item.checked } : item
        );
        setFruitData(updated);
    };

    return (
        <SafeAreaView style={styles.container}>
            <SettingsIcon navigation={navigation} style={styles.settingsIcon} />
            <ProfileIcon navigation={navigation} style={styles.profileIcon} />

            <View style={styles.headerContainer}>
                {/*<Text style={styles.infoIcon}></Text>*/}
                <Text style={styles.infoText}>De groote fruitmarkt</Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Zoek fruit..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <Text style={styles.searchIcon}>🔍</Text>
            </View>


            {/* Zoekbare dropdown */}
            <View style={{ marginHorizontal: 16, zIndex: 1000, }}>
                <DropDownPicker
                    open={open}
                    value={selectedFruit}
                    items={dropdownItems}
                    setOpen={setOpen}
                    setValue={(callback) => {
                        const selected = callback(selectedFruit);
                        toggleFruitStatus(selected);
                        setSelectedFruit(null); // reset selectie na togglen
                    }}
                    setItems={() => {}}
                    placeholder="Heb je een nieuw iets op? vink hem aan!"
                    searchable={true}
                    searchPlaceholder="Zoek fruit..."
                    listMode="MODAL"
                />
            </View>

            <FlatList
                data={filteredFruitData}
                keyExtractor={(item) => item.name}
                numColumns={2}
                contentContainerStyle={styles.grid}
                style={styles.flatList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('FruitDetails', { fruitName: item.name })}
                        style={[
                            styles.fruitItem,
                            {
                                backgroundColor: item.color,
                                borderColor: borderColor(item.color),
                                borderWidth: 3,
                            }
                        ]}
                    >
                        <Image source={item.image} style={styles.fruitImage} />
                        {item.checked && <Text style={styles.checkmark}>✔️</Text>}
                        <Text style={styles.fruitName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />

            <BottomNavigation navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flatList: {
        marginTop: 16,
    },
    grid: {
        paddingHorizontal: 10,
        paddingBottom: 100,
    },
    fruitItem: {
        flex: 1,
        margin: 8,
        borderRadius: 16,
        alignItems: 'center',
        padding: 10,
        position: 'relative',
    },
    fruitImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    fruitName: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkmark: {
        position: 'absolute',
        top: 5,
        right: 8,
        fontSize: 18,
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 10,
    },

    infoIcon: {
        fontSize: 18,
        marginRight: 4,
    },
    infoText: {
        fontSize: 16,
    },
    settingsIcon: {
        position: 'absolute',
        top: 10,
        right: 50,
        zIndex: 10,
    },
    profileIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eef3e8',
        borderRadius: 10,
        marginHorizontal: 16,
        marginBottom: 10,
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

});
