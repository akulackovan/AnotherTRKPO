import {useState, useEffect, useCallback} from "react"

export const useAuth = () => {
    const {token, setToken} = useState(null)
    const {setId, setUserId} = useState(null)
    const {isReady, setIsReady} = useState(false)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem('userData', JSON.stringify({
            userId: id,
            token: jwtToken
        }))
    }, [])

    const logout = () =>
    {
        setToken(null)
        setUserId(null)
        localStorage.removeItem('userData')
    }

    useEffect(()=>{
        const data = localStorage.getItem('userData')
        if (data && data.token){
            login(data.token, data.userId)
        }
        setIsReady(true)
    }, (login))

    return {login, logout, token, setId, isReady}
}