import React, {createContext, useState} from 'react'

export const CommentOffsetContext = createContext(null)

export function CommentContext ({children}) {
    
    const [commentOffset, setCommentOffset] = useState(0)

    return (
        <CommentOffsetContext.Provider value={{commentOffset, setCommentOffset}}>
            {children}
        </CommentOffsetContext.Provider>
    )
}