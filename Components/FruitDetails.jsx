import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ImageBackground,
    Switch,
    TouchableOpacity
} from 'react-native';
import SettingsIcon from './ScreenComponents/SettingsIcon';
import ProfileIcon from './ScreenComponents/ProfileIcon';
import BottomNavigation from "./ScreenComponents/BottomNavigation";



export default function FruitDetails({ navigation }) {
    const [isLekker, setIsLekker] = useState(false);
    const [Fruitdata, setFruitdata] = useState([])

    const LoadFruits = async () => {
        try {
            const response = await fetch(`http://145.24.223.94/api/fruits/3`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer g360GNGOWNvaZ3rNM4YayTHnsV5ntsxVAPn8otxmdb1d2ed8',
                },
            });

            const data = await response.json();
            if (response.ok) {
                setFruitdata(data.data);
                console.log('Fruit correct opgehaald', data.data);
            } else {
                Alert.alert('Fout', data.message || 'Fruit ophalen mislukt.');
            }
        } catch (err) {
            Alert.alert('Fout', `Er is een netwerkfout opgetreden: ${err}`);
        }
    };

    useEffect(() => {
        LoadFruits()
    }, []);



    return (
        <ImageBackground
            source={require('../assets/fruitbackground.png')}
            style={styles.background}
            imageStyle={styles.imageStyle}
        >
            <View style={styles.container}>
                {/* Top Icons */}
                <SettingsIcon navigation={navigation} style={styles.settingsIcon} />
                <ProfileIcon navigation={navigation} style={styles.profileIcon} />

                {/* Lekker / Niet Lekker Switch */}

                <TouchableOpacity
                    onPress={() => setIsLekker(!isLekker)}
                    style={[
                        styles.switchRow,
                        { backgroundColor: isLekker ? '#A8D363' : '#f7b2a4' }
                    ]}
                    activeOpacity={0.8}
                >
                    <Text style={styles.switchLabel}>{isLekker ? 'lekker' : 'niet lekker'}</Text>
                </TouchableOpacity>

                {/* Fruit Image */}
                {/*<Image*/}
                {/*    source={require(`${Fruitdata.big_img_file_path}`)}*/}
                {/*    style={styles.mainImage}*/}
                {/*/>*/}

                {/* Fruit Name */}
                <Text style={styles.fruitName}>
                    {Fruitdata.has_eaten_before ? '✔️ ' : ''}
                    {Fruitdata.name}
                </Text>

                {/* Description */}
                <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionText}>
                        {Fruitdata.description}
                    </Text>
                </View>

                {/* Details Section */}
                <View style={styles.detailRow}>
                    <View style={styles.detailBox}>
                        <Text style={styles.detailText}>dit product weegt gemiddeld €{Fruitdata.weight} gram!</Text>
                        <Text style={styles.detailText}>dit product is ongeveer €{Fruitdata.size} cm groot</Text>
                        <Text style={styles.detailText}> dit product kost ongeveer €{Fruitdata.price}</Text>
                    </View>
                    {/*<Image*/}
                    {/*    source={require(`${Fruitdata.small_img_file_path}`)}*/}
                    {/*    style={styles.detailImage}*/}
                    {/*/>*/}
                </View>

                {/* Fun Fact */}
                <View style={styles.funFactBox}>
                    <Text style={styles.funFactText}>{Fruitdata.fun_facts}</Text>
                </View>
            </View>
            <BottomNavigation navigation={navigation}/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    imageStyle: {
        opacity: 0.08, // adjust for faintness
        resizeMode: 'cover',
    },
    container: {
        padding: 16,
        flex: 1,
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
    switchRow: {
        justifyContent: 'center',     // center horizontally
        alignItems: 'center',         // center vertically
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginTop: 50,
        minHeight: 48,
        minWidth: 100,
        backgroundColor: '#f7b2a4',   // fallback default
    },

    switchLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
    },
    badge: {
        backgroundColor: '#f7b2a4',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginTop: 50,
    },
    badgeText: {
        color: '#222',
        fontWeight: 'bold',
        fontSize: 16,
    },
    mainImage: {
        width: 220,
        height: 140,
        borderRadius: 12,
        marginVertical: 14,
    },
    fruitName: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    descriptionBox: {
        backgroundColor: '#e7f8dd',
        borderRadius: 8,
        padding: 12,
        marginVertical: 10,
        width: '100%',
        borderWidth: 3,
        borderColor: '#A8D363',
    },
    descriptionText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'left',
    },
    detailRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    detailBox: {
        backgroundColor: '#e7f8dd',
        borderRadius: 8,
        padding: 10,
        flex: 1,
        marginRight: 8,
        borderWidth: 3,
        borderColor: '#A8D363',
    },
    detailText: {
        fontSize: 14,
        marginBottom: 4,
        color: '#333',
    },
    detailImage: {
        width: 130,
        height: 100,
        borderRadius: 10,
    },
    funFactBox: {
        backgroundColor: '#e7f8dd',
        padding: 8,
        borderRadius: 8,
        marginTop: 14,
        borderWidth: 3,
        borderColor: '#A8D363',
    },
    funFactText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#333',
    },
});
