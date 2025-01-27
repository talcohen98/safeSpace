import { useState } from "react";
import "../style/App.css"
import { useLogin } from "../hooks/useLogin.jsx";

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className="page">
            { error && <div className="error">{error}</div> }
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Log in</h1>

                <label>Email:</label>
                <input
                    type="email"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    value={email}
                />

                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    value={password}
                />

                <button disabled={isLoading}>Log in</button>
            </form>
        </div>
    )
}

export default LoginPage