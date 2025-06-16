import { createContext, useState, useContext } from 'react'

const ProfileContext = createContext()

export function ProfileProvider({ children }) {
    const [profileImage, setProfileImage] = useState(require('../../assets/fruitbackground.png'))
    const [displayName, setDisplayName] = useState("Mand A. Rijn")

    return (
        <ProfileContext.Provider value={{ profileImage, setProfileImage, displayName, setDisplayName }}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => useContext(ProfileContext)