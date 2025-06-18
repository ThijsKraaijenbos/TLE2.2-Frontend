import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'


const ProfileContext = createContext()


const profileImages = [
    {id: 1, src: require('../../assets/gray.jpg')},
    {id: 2, src: require('../../assets/fruitbackground.png')},
    {id: 3, src: require('../../assets/man.jpg')},
    {id: 4, src: require('../../assets/banana.jpg')},
]

export function ProfileProvider({ children }) {
    const [profileImage, setProfileImage] = useState(require('../../assets/gray.jpg'))
    const [displayName, setDisplayName] = useState('')

    useEffect(() => {
        async function fetchUserData() {
            try {
                const token = await AsyncStorage.getItem('user_login_token')
                if (!token) {
                    console.warn('Geen token gevonden')
                    return
                }

                const response = await axios.get('http://145.24.223.94/api/user', {
                    headers: {
                        'X-user-login-token': token,
                        'Authorization': 'Bearer g360GNGOWNvaZ3rNM4YayTHnsV5ntsxVAPn8otxmdb1d2ed8',
                        'X-with': 'profileImage',
                    },
                })

                const user = response.data.userData

                if (user.name) {
                    setDisplayName(user.name)
                }

                if (user.profile_image_id?.id) {
                    const foundImage = profileImages.find(
                        (img) => img.id === user.profile_image_id.id
                    )
                    if (foundImage) {
                        setProfileImage(foundImage.src)
                    }
                }
            } catch (e) {
                console.warn('Fout bij ophalen profielgegevens:', e)
            }
        }

        fetchUserData()
    }, [])

    return (
        <ProfileContext.Provider value={{ profileImage, setProfileImage, displayName, setDisplayName }}>
            {children}
        </ProfileContext.Provider>
    )
}

export function useProfile() {
    return useContext(ProfileContext)
}