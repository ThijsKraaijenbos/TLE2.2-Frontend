import React from 'react';
import { FlatList } from 'react-native';
import UserItem from './UserItem';

const UserList = ({ users }) => {
    // Sorteer gebruikers op streak (hoog naar laag)
    const sortedUsers = [...users].sort((a, b) => b.streak - a.streak);

    return (
        <FlatList
            data={sortedUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <UserItem user={item} />}
        />
    );
};

export default UserList;
