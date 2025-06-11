import { createContext, useState, useContext } from 'react'

const ProfileContext = createContext()

export function ProfileProvider({ children }) {
    const [profileImage, setProfileImage] = useState(require('../assets/fruitbackground.png'))

    return (
        <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfile = () => useContext(ProfileContext)