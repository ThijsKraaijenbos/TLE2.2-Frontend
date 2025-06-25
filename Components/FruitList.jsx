import React, {useState, useEffect} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import SettingsIcon from './ScreenComponents/SettingsIcon';
import ProfileIcon from './ScreenComponents/ProfileIcon';
import BottomNavigation from "./ScreenComponents/BottomNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";

const User_Token = "user_login_token"

export default function FruitList({navigation}) {
    const [searchText, setSearchText] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedFruit, setSelectedFruit] = useState(null);
    const [dropdownItems, setDropdownItems] = useState([]);
    const [fruitdata, setFruitdata] = useState([]);
    const [userAuth, setUserAuth] = useState('')

    const getUserToken = async () => {
        try {
            const userAuthToken = await AsyncStorage.getItem(User_Token)
            if (userAuthToken) {
                setUserAuth(userAuthToken)
            } else {
                console.log("Er is geen userdata")
            }
        } catch (e) {
            console.log("Er gaat iets fout met het ophalen van de gebruikersinformatie", e)
        }
    }




    const LoadFruits = async () => {
        try {
            const response = await fetch('http://145.24.223.94/api/fruits', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer g360GNGOWNvaZ3rNM4YayTHnsV5ntsxVAPn8otxmdb1d2ed8',
                    'Cache-Control': 'no-cache',
                    'X-user-login-token' :  userAuth,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setFruitdata(data.data);
                setDropdownItems(
                    data.data
                        .filter(item => item.user_preference?.has_eaten_before == false)
                        .map(item => ({label: item.name, value: item.id}))
                );
            } else {
                Alert.alert('Fout', data.message || 'Fruit ophalen mislukt.');
            }
        } catch (err) {
            Alert.alert('Fout', `Er is een netwerkfout opgetreden: ${err}`);
        }
    };

    const toggleFruitStatus = async (fruitid) => {

        const fruit = fruitdata.find(f => f.id === fruitid);
        if (!fruit) return;

        const updatedEaten = !fruit.user_preference.has_eaten_before;

        try {
            const response = await fetch(`http://145.24.223.94/api/fruits/${fruitid}/togglePreference`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer g360GNGOWNvaZ3rNM4YayTHnsV5ntsxVAPn8otxmdb1d2ed8',
                    'accept': 'application/json',
                    'X-user-login-token' :  userAuth,
                },
                body: JSON.stringify({has_eaten_before: updatedEaten}),
            });

            if (!response.ok) {
                throw new Error('Update failed');
            }



            // Locally update the state after a successful update
            setFruitdata(prev =>
                prev.map(f =>
                    f.id === fruitid
                        ? {...f, has_eaten_before: updatedEaten}
                        : f
                )
            );
        } catch (error) {
            Alert.alert('Fout', `Kon status niet bijwerken: ${error.message}`);
        }
    };


    function borderColor(like) {
        if (like == true) {
            return '#45A85B'
        } else if (like == false) {
            return '#D83F2E'
        }
    }

    function Backgroundcolor(like) {
        // console.log(like);
        if (like == true) {
            return '#A8D363'
        } else if (like == false) {
            return '#FD9A90'
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getUserToken();
        }, [])
    )

    useFocusEffect(
        React.useCallback(() => {
            if(userAuth){
                LoadFruits();
            }
        }, [userAuth,])
    )

    return (
        <ImageBackground
            source={require('../assets/fruitbackground.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.imageOverlay}/>
            <SafeAreaView style={styles.container}>
                <ProfileIcon navigation={navigation} style={styles.profileIcon}/>

                <View style={styles.headerContainer}>
                    {/*<Text style={styles.infoIcon}></Text>*/}
                    <Text style={styles.infoText}>De grote fruitmarkt</Text>
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
                <View style={{marginHorizontal: 16, zIndex: 1000,}}>
                    <DropDownPicker
                        open={open}
                        value={selectedFruit}
                        items={dropdownItems}
                        setOpen={setOpen}
                        setValue={(selected) => {
                            toggleFruitStatus(selected);
                            setSelectedFruit(null); // optional
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
                    renderItem={({item}) => (
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => navigation.navigate('FruitDetails', {id: item.id})}
                            style={[
                                styles.fruitItem,
                                {

                                    backgroundColor: Backgroundcolor(item.user_preference?.like),
                                    borderColor: borderColor(item.user_preference?.like),
                                    borderWidth: 3,
                                }
                            ]}
                        >
                            <Image
                                source={
                                    typeof item.image === 'string'
                                        ? { uri: item.image }
                                        : item.image
                                }
                                style={styles.fruitImage}
                            />
                                <Text style={styles.fruitName}>
                                    {(item.user_preference?.has_eaten_before ? '✔️ ' : '') + item.name}
                                </Text>
                        </TouchableOpacity>
                    )}


                />

                <BottomNavigation navigation={navigation}/>
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
