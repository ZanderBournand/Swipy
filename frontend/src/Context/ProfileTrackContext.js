import React, {createContext, useState, useRef} from 'react'

export const ProfileCurrentTrackInViewContext = createContext(null)

export function ProfileTrackContext ({children}) {

    const [profileCurrentTrackInViewContext, setProfileCurrentTrackInViewContext] = useState(null)

    const profileMediaRefs = useRef(null)

    return (
        <ProfileCurrentTrackInViewContext.Provider value={{contextTrack: profileCurrentTrackInViewContext, setProfileCurrentTrackInViewContext, media: profileMediaRefs}}>
            {children}
        </ProfileCurrentTrackInViewContext.Provider>
    )
}