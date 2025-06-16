import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
} from 'react-native';
import BottomNavigation from './ScreenComponents/BottomNavigation';

export default function Settings({ navigation }) {
    const [selectedTheme, setSelectedTheme] = useState('system');

    const themes = ['light', 'dark', 'appel', 'bes', 'banaan', 'tomaat']; // wat meer opties voor demo

    return (
        <ImageBackground
            source={require('../assets/il_fullxfull.png')} // Change path to your background
            style={styles.background}
            imageStyle={styles.imageStyle}
        >
            <View style={styles.overlay}>
        <View style={styles.container}>
            <Text style={styles.header}>Instellingen</Text>
            <Text style={styles.label}>Kies een thema:</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {themes.map((theme) => (
                    <TouchableOpacity
                        key={theme}
                        onPress={() => setSelectedTheme(theme)}
                        style={[
                            styles.themeCircle,
                            selectedTheme === theme && styles.selectedCircle,
                        ]}
                    >
                        <Text
                            style={[
                                styles.circleText,
                                selectedTheme === theme && styles.selectedCircleText,
                            ]}
                        >
                            {theme.charAt(0).toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <BottomNavigation navigation={navigation} />
        </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        backgroundColor: 'transparent',
        zIndex:2,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 15,
    },
    scrollContainer: {
        paddingHorizontal: 10,
    },
    themeCircle: {
        width: 60,
        height: 60,
        borderRadius: 30, // rond
        backgroundColor: '#f0f0f0',
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3, // schaduw voor android
        shadowColor: '#000', // schaduw ios
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
    selectedCircle: {
        backgroundColor: '#4CAF50',
    },
    circleText: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold',
    },
    selectedCircleText: {
        color: '#fff',
    },
    background: {
        flex: 1,              // zorg dat background het hele scherm vult
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // witte semi-transparante laag
    },
});
