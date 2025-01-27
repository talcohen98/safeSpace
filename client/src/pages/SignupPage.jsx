import { useState, useRef } from "react";
import { useSignup } from "../hooks/useSignup.jsx";

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [userType, setUserType] = useState('regular');

    // Expert additional information
    const [expertID, setExpertID] = useState('');
    const [expertField, setExpertField] = useState('');
    const [about, setAbout] = useState('');

    const { signup, error } = useSignup(); // Use error from the custom hook

    const errorRef = useRef(null); // Reference to scroll to the error message

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            userType,
            ...(userType === 'expert' ? { expertName: name } : { name }),
            email,
            password,
            ...(userType === 'expert' && { expertID }),
            ...(userType === 'expert' && { expertField }),
            ...(userType === 'expert' && { about })
        };

        await signup(user);

        // Scroll to the top of the page if an error exists
        if (error) {
            window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to the top
        }
    };

    return (
        <div className="page">
            {error && <div ref={errorRef} className="error">{error}</div>}

            <form className="signup-form" onSubmit={handleSubmit}>
                <h1>Sign up</h1>

                <label>Name:</label>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

                <label>Email:</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <label>User Type:</label>
                <fieldset>
                    <label>
                        <input
                            type="radio"
                            value="regular"
                            checked={userType === 'regular'}
                            onChange={(e) => setUserType(e.target.value)}
                        />
                        Regular User
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="expert"
                            checked={userType === 'expert'}
                            onChange={(e) => setUserType(e.target.value)}
                        />
                        Expert
                    </label>
                </fieldset>

                {userType === 'expert' && (
                    <>
                        <label>Expert ID:</label>
                        <input
                            type="text"
                            onChange={(e) => setExpertID(e.target.value)}
                            value={expertID}
                            placeholder="Enter your Expert ID"
                        />

                        <label>Expert Field:</label>
                        <select
                            id="expert-field"
                            value={expertField}
                            onChange={(e) => setExpertField(e.target.value)}
                        >
                            <option value="" disabled>
                                Select a Field
                            </option>
                            <option value="Cyber-Bullying">Cyber Bullying</option>
                            <option value="Sexual-Harassment">Sexual Harassment</option>
                            <option value="Eating-Disorders">Eating Disorders</option>
                        </select>

                        <label>About:</label>
                        <textarea
                            onChange={(e) => setAbout(e.target.value)}
                            value={about}
                            placeholder="Tell us more about your expertise. Please note this will appear in your profile description."
                            rows="4"
                        />
                    </>
                )}

                <button type="submit">Sign up</button>
            </form>
        </div>
    );
};

export default SignupPage;
