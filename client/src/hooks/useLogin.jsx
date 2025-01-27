import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axiosInstance from "../services/api.js";
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axiosInstance.post('/login', { email, password })

            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(response.data))

            // update the auth context
            dispatch({type: 'LOGIN', payload: response.data})

            setIsLoading(false)
            navigate(-1);

        } catch (error) {
            setIsLoading(false)
            setError(error.response?.data?.error)
        }
    }

    return { login, isLoading, error }
}