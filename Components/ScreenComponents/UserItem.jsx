import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserItem = ({ user }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.info}>Streak: {user.streak}</Text>
            <Text style={styles.info}>Email: {user.email}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f2f2f2',
        padding: 16,
        marginBottom: 12,
        borderRadius: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 14,
        marginTop: 4,
    },
});

export default UserItem;
