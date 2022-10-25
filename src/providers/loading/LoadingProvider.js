import { CircularProgress } from '@mui/material'
import React, { createContext, useContext, useMemo, useRef, useState } from 'react'

const LoadingContext= createContext();

export default function LoadingProvider({ children }) {

    const [loading, setLoading] = useState(false)
    const startLoader = () => setLoading(true)
    const stopLoader = () => setLoading(false)
    const value = useMemo(
        () => ({startLoader, stopLoader }),
        [startLoader, stopLoader]
    )

    return (
        <LoadingContext.Provider value={value}>
            {children}
            {loading ? 
                <CircularProgress sx={{ position: 'fixed', top: '40%', right: '50%', transform: 'translate(-50%,-50%)', zIndex: '999' }} />
                : null
            }
        </LoadingContext.Provider>
    )
}

export const useLoader = () => useContext(LoadingContext)
