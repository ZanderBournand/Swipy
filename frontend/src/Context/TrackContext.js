import React, {createContext, useState} from 'react'

export const CurrentTrackInViewContext = createContext(null)

export function TrackContext ({children}) {
    const [currentTrackInViewContext, setCurrentTrackInViewContext] = useState(null)

    return (
        <CurrentTrackInViewContext.Provider value={{contextTrack: currentTrackInViewContext, setCurrentTrackInViewContext}}>
            {children}
        </CurrentTrackInViewContext.Provider>
    )
}