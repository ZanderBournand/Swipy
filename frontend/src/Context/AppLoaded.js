import React, {createContext, useState} from 'react'

export const IsAppLoadedContext = createContext(null)

export default function AppLoaded({children}) {

  const [isAppLoaded, setIsAppLoaded] = useState(false)

  return (
    <IsAppLoadedContext.Provider value={{isAppLoaded, setIsAppLoaded}}>
        {children}
    </IsAppLoadedContext.Provider>
  )
}