import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import { ProfileProvider } from './Components/ProfileContext';
import HomeScreen from "./Components/HomeScreen";
import FruitDetails from "./Components/FruitDetails";
import FruitList from "./Components/FruitList";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import ProfileEdit from "./Components/ProfileEdit";
import ProgressList from "./Components/ProgressList";
import Register from "./Components/Register";
import SocialTab from "./Components/SocialTab";
import TrophiesList from "./Components/TrophiesList";
import Settings from "./Components/Settings";

const Stack = createNativeStackNavigator()
export default function App() {

    return (
        <ProfileProvider>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
                <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{headerShown: false}}/>
                <Stack.Screen name="ProgressList" component={ProgressList} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
                <Stack.Screen name="SocialTab" component={SocialTab} options={{headerShown: false}}/>
                <Stack.Screen name="TrophiesList" component={TrophiesList} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
                <Stack.Screen name="FruitList" component={FruitList} options={{headerShown: false}}/>
                <Stack.Screen name="FruitDetails" component={FruitDetails} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
        </ProfileProvider>
    );
}

