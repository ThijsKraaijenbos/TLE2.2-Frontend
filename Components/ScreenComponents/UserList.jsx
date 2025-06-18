import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import UserItem from './UserItem';

const UserList = ({ users }) => {
    const sortedUsers = [...users].sort((a, b) => b.streak - a.streak);

    return (
        <FlatList
            data={sortedUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <UserItem user={item} />}
            style={styles.list}
            ListEmptyComponent={() => (
                <Text style={styles.emptyText}>Geen gebruikers beschikbaar.</Text>
            )}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        paddingVertical: 8,
        backgroundColor: '#EAFCD2',
        marginTop:5,
        borderRadius: 8,
        minHeight:244,
        maxHeight:244,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
});

export default UserList;
