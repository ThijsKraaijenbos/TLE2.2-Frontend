import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ImageBackground
} from 'react-native';
import SettingsIcon from './ScreenComponents/SettingsIcon';
import ProfileIcon from './ScreenComponents/ProfileIcon';

export default function FruitDetails({ navigation }) {
    return (
        <ImageBackground
            source={require('../assets/il_fullxfull.png')} // Change path to your background
            style={styles.background}
            imageStyle={styles.imageStyle}
        >
            <View style={styles.container}>
                {/* Top Icons */}
                <SettingsIcon navigation={navigation} style={styles.settingsIcon} />
                <ProfileIcon navigation={navigation} style={styles.profileIcon} />

                {/* "Niet Lekker" badge */}
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>niet lekker</Text>
                </View>

                {/* Fruit Image */}
                <Image
                    source={require('../assets/icon.png')}
                    style={styles.mainImage}
                />

                {/* Fruit Name */}
                <Text style={styles.fruitName}>✔️ appel</Text>

                {/* Description */}
                <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionText}>
                        De appel is een van de meest gegeten fruitsoorten ter wereld. Hij komt oorspronkelijk uit Centraal-Azië, waar de wilde appel (Malus sieversii) nog steeds in het wild groeit. Tegenwoordig zijn er duizenden appelrassen, variërend van zoet tot zuur, en van knapperig tot zacht.
                    </Text>
                </View>

                {/* Details Section */}
                <View style={styles.detailRow}>
                    <View style={styles.detailBox}>
                        <Text style={styles.detailText}>prijs</Text>
                        <Text style={styles.detailText}>locatie: overal</Text>
                        <Text style={styles.detailText}>rating: geweldig!</Text>
                    </View>
                    <Image
                        source={require('../assets/icon.png')}
                        style={styles.detailImage}
                    />
                </View>

                {/* Fun Fact */}
                <View style={styles.funFactBox}>
                    <Text style={styles.funFactText}>fun fact:{"\n"}een appel per dag is gezond</Text>
                </View>
            </View>
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
