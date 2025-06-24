import React from 'react';
import {Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function UitlegPagina() {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.screen}contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Welkom bij de Fruithelden-app! 🍎🍌🍇</Text>

            <Text style={styles.textBlock}>
                Wil jij elke dag gezond bezig zijn én plezier hebben met je vrienden? Dan zit je hier goed! In deze app help jij jezelf én je vrienden om elke dag genoeg fruit te eten. 💪🍓
            </Text>

            <Text style={styles.title}>🏠 Homepagina</Text>
            <Text style={styles.textBlock}>
                • Vul elke dag in of je <Text style={styles.highlight}>200 gram fruit</Text> hebt gegeten (dat is ongeveer 2 stukjes!).{"\n"}
                • Geen inspiratie? Je krijgt een lekkere <Text style={styles.highlight}>fruit-tip</Text> te zien!
            </Text>

            <Text style={styles.title}>👫 Socialhub</Text>
            <Text style={styles.textBlock}>
                • Zie hoe goed je vrienden het doen met fruit eten.{"\n"}
                • Voeg <Text style={styles.highlight}>vrienden toe</Text> met hun e-mailadres.{"\n"}
                • Daag elkaar uit en blijf lekker gezond bezig!
            </Text>

            <Text style={styles.title}>🍒 Fruitlijst</Text>
            <Text style={styles.textBlock}>
                • Bekijk een overzicht van <Text style={styles.highlight}>alle fruitsoorten</Text> in de app.{"\n"}
                • Geef via het <Text style={styles.highlight}>dropdownmenu</Text> aan wat je al hebt gegeten.{"\n"}
                • Achtergrondkleuren vertellen wat je vindt:{"\n"}
                <Text style={styles.highlight}>Groen</Text> = lekker, <Text style={styles.highlight}>Rood</Text> = niet jouw favoriet.{"\n"}
                • Klik op een fruitje voor meer informatie en geef aan wat je ervan vindt.
            </Text>

            <Text style={styles.title}>😎 Je Profiel</Text>
            <Text style={styles.textBlock}>
                • Kies een leuke <Text style={styles.highlight}>profielfoto</Text> zodat je herkenbaar bent in de Socialhub!
            </Text>

            <Text style={styles.title}>Waarom gebruiken?</Text>
            <Text style={styles.textBlock}>
                ✅ Je leert elke dag iets nieuws over fruit{"\n"}
                ✅ Je blijft gezond en groeit sterk{"\n"}
                ✅ Je hebt plezier met je vrienden{"\n"}
                ✅ Je ontdekt nieuwe smaken{"\n"}
                ✅ Je maakt van fruit eten een gewoonte!
            </Text>

            <Text style={styles.textBlock}>
                🌟 <Text style={styles.highlight}>Word elke dag een Fruitheld!</Text> Start nu, blijf volhouden en laat zien dat jij de gezondste én gezelligste bent van je vrienden! 🍏💥
            </Text>

            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Ga door naar Login</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        backgroundColor: 'rgba(168, 211, 99, 0.5)',
        paddingHorizontal: 50,
        paddingTop: '10%',
        paddingBottom: 50,
        borderBottomWidth: 3,
        borderBottomColor: '#182700',
        flexGrow: 1,
    },

    title: {
        color: '#EAFCD2',
        fontWeight: "bold",
        fontSize: 20,
        backgroundColor: '#182700',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#A8D363',
        marginHorizontal: 30,
        paddingVertical: 10,
        textAlign: "center",
        marginBottom: 10
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
    labels: {
        color: '#182700',
        fontWeight: "bold",
        fontSize: 20
    },
    registerButton: {
        backgroundColor: '#A8D363',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#EAFCD2',
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 50,
        width: '60%'
    },
    buttonText: {
        color: '#EAFCD2',
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center"
    },
    question: {
        color: '#182700',
    },
    zin: {
        flexDirection: "row",
        justifyContent: "center"
    },
    linkText: {
        color: '#D83F2E',
        textDecorationLine: "underline"
    },
    img: {
        width: '100%',
        flex: 2,
        backgroundColor: '#A8D363',
        opacity: 0.5,
    },
    screen: {
        flexDirection: "column",
        flex: 1,
    },
    textBlock: {
        color: '#182700',
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: 'rgba(234, 252, 210, 0.6)',
        padding: 12,
        borderRadius: 10,
        borderColor: '#A8D363',
        borderWidth: 2,
    },
    highlight: {
        fontWeight: 'bold',
        color: '#D83F2E',
    }
});
