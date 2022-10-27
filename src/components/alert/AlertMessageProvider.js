import { Alert, AlertTitle, Box } from "@mui/material"
import { createContext, useContext, useMemo, useRef, useState } from "react"

const AlertMessageContext = createContext()

export default function AlertMessageProvider({ children }) {

    const [dataAlert, setDataAlert] = useState({})
    const showAlert = (title, message, type, duration = 0) => {
        setDataAlert({
            title: title,
            message: message,
            type: type
        })

        setTimeout(() => {
            setDataAlert({})
        }, duration === 0 ? 4000 : duration)
    }
    const value = useMemo(
        () => ({ showAlert }),
        [showAlert]
    )

    return (
        <AlertMessageContext.Provider value={value}>
            {dataAlert.message && (
                <Alert sx={{
                    width: "45%",
                    position: "fixed",
                    top: "9%",
                    left: "50%",
                    transform: "translate(-50%,-9%)"
                }} variant="filled" severity={dataAlert.type}>
                    <AlertTitle>{dataAlert.title}</AlertTitle>
                    {dataAlert.message}
                </Alert>
            )}
            {children}
        </AlertMessageContext.Provider>
    )
}

export const useAlertMessage = () => useContext(AlertMessageContext)
