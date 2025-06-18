import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    Image,
    Alert,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsIcon from './ScreenComponents/SettingsIcon';
import ProfileIcon from './ScreenComponents/ProfileIcon';
import BottomNavigation from "./ScreenComponents/BottomNavigation";

export default function FruitList({navigation}) {
    const [searchText, setSearchText] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedFruit, setSelectedFruit] = useState(null);
    const [dropdownItems, setDropdownItems] = useState([]);
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
                setDropdownItems(data.map(item => ({ label: item.name, value: item.name })));
                console.log('Fruit correct opgehaald');
            } else {
                Alert.alert('Fout', data.message || 'Fruit ophalen mislukt.');
            }
        } catch (err) {
            Alert.alert('Fout', `Er is een netwerkfout opgetreden: ${err}`);
        }
    };

    const toggleFruitStatus = async (fruitName) => {
        const fruit = fruitdata.find(f => f.name === fruitName);
        if (!fruit) return;

        const updatedLike = !fruit.like;

        try {
            const response = await fetch(`http://145.24.223.94/api/fruits/${fruit.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer g360GNGOWNvaZ3rNM4YayTHnsV5ntsxVAPn8otxmdb1d2ed8',
                },
                body: JSON.stringify({ like: updatedLike }),
            });

            if (!response.ok) {
                throw new Error('Update failed');
            }

            // Locally update the state after a successful update
            setFruitdata(prev =>
                prev.map(f =>
                    f.name === fruitName
                        ? { ...f, like: updatedLike }
                        : f
                )
            );
        } catch (error) {
            Alert.alert('Fout', `Kon status niet bijwerken: ${error.message}`);
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
        <ImageBackground
            source={require('../assets/fruitbackground.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.imageOverlay} />
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
                data={fruitdata.filter(item =>
                    item.name.toLowerCase().includes(searchText.toLowerCase())
                )}
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
                                backgroundColor: Backgroundcolor(item.like),
                                borderColor: borderColor(item.like),
                                borderWidth: 3,
                            }
                        ]}
                    >
                        <Image source={item.image} style={styles.fruitImage} />
                        {item.has_eaten_before && <Text style={styles.checkmark}>✔️</Text>}
                        <Text style={styles.fruitName}>{item.name}</Text>
                    </TouchableOpacity>
                )}

            />

            <BottomNavigation navigation={navigation} />
        </SafeAreaView>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.7)',
        zIndex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        zIndex: 2,
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
