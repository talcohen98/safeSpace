import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axiosInstance from "../services/api.js";
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (user) => {
        setIsLoading(true)
        setError(null)

        try {
            console.log('user: ', user)
            const response = await axiosInstance.post('/signup', user)

            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(response.data))

            // update the auth context
            dispatch({type: 'LOGIN', payload: response.data})

            if (user.userType === 'expert') {
                // Removed the alert
                // alert("Your request has been received and forwarded to the admin.");
            }
            else {
                // Removed the alert
                // alert("You have successfully signed up. Please log in to continue.");
            }
            setIsLoading(false)
            navigate(-1);

        } catch (error) {
            setIsLoading(false)
            setError(error.response?.data?.error)
            // Removed the alert
            // alert("Error in signup: " + error.response?.data?.error);
        }
    }

    return { signup, isLoading, error }
}
