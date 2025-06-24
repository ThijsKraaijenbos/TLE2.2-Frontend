import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const UserItem = ({ user }) => {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: user?.profile_image?.file_path }}
                style={styles.profImage}
            />
            <View style={styles.userInfo}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.info}>Streak: {user.streak?.current_streak}</Text>
                <Text style={styles.info}>Email: {user.email}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#182700',
        borderColor: '#A8D363',
        borderWidth: 2,
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        marginRight:5,
        marginLeft: 5,
    },
    profImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#A8D363',
        marginRight: 16,
    },
    userInfo: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#EAFCD2',
        marginBottom: 4,
    },
    info: {
        fontSize: 14,
        color: '#EAFCD2',
        marginBottom: 2,
    },
});

export default UserItem;
