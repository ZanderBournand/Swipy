import React, {createContext, useState} from 'react'

export const CurrentUserProfileItemInViewContext = createContext(null)

export function UserContext ({children}) {
    
    const [currentUserProfileItemInView, setCurrentUserProfileItemInView] = useState(null)

    return (
        <CurrentUserProfileItemInViewContext.Provider value={{contextUser: currentUserProfileItemInView, setCurrentUserProfileItemInView}}>
            {children}
        </CurrentUserProfileItemInViewContext.Provider>
    )
}

