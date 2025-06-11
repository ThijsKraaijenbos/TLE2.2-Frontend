import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
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
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{title: "Login", headerTitleAlign: "center"}}/>
                <Stack.Screen name="Profile" component={Profile} options={{title: "Profile", headerTitleAlign: "center"}}/>
                <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{title: "ProfileEdit", headerTitleAlign: "center"}}/>
                <Stack.Screen name="ProgressList" component={ProgressList} options={{title: "ProgressList", headerTitleAlign: "center"}}/>
                <Stack.Screen name="Register" component={Register} options={{title: "Register", headerTitleAlign: "center"}}/>
                <Stack.Screen name="SocialTab" component={SocialTab} options={{title: "SocialTab", headerTitleAlign: "center"}}/>
                <Stack.Screen name="TrophiesList" component={TrophiesList} options={{title: "TrophiesList", headerTitleAlign: "center"}}/>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Settings" component={Settings} options={{title: "Settings", headerTitleAlign: "center"}}/>
                <Stack.Screen name="FruitList" component={FruitList} options={{title: "FruitList", headerTitleAlign: "center"}}/>
                <Stack.Screen name="FruitDetails" component={FruitDetails} options={{title: "FruitDetails", headerTitleAlign: "center"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

