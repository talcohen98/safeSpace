import axiosInstance from "../services/api.js";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {useAuthContext} from "../hooks/useAuthContext.jsx";

const AnswerFormComponent = () => {
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { user } = useAuthContext();
    const { id } = useParams(); // get the question id from the URL

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccessMessage("");

        if (text.length < 10) {
            setError("Your answer must be at least 10 characters long.");
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const formData = {
            questionId: id,
            email: user.email,
            text,
        };

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token; // user need a valid token to submit a comment
            let response;

            if (user.userType === 'regular') {
                response = await axiosInstance.post(`answers/regularUser/${id}`, formData,
                    {
                        headers: {
                            authorization: `Bearer ${token}` // Include token in Authorization header
                        }
                    }
                );
            } else {
                response = await axiosInstance.post(`answers/expert/${id}`, formData,
                    {
                        headers: {
                            authorization: `Bearer ${token}` // Include token in Authorization header
                        }
                    });
            }

            console.log("AnswerModel submitted successfully:", response.data);

            setSuccessMessage("AnswerModel submitted successfully!");
            setText("");

            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            console.error("Error submitting answer:", error.response ? error.response.data : error.message);

            // Check if the error is related to authorization or other errors
            if (user.userType === 'regular' && error.response && error.response.status === 403) {
                setError("Regular users are not allowed to comment on this question, except the question asker.");
            // Check if the error is related to expert approval
            } else if (user.userType === 'expert' && error.response && error.response.status === 401) {
                setError("You have not been approved by an admin yet. Please wait for approval to start answering.");
            }
            else if (user.userType === 'expert' && error.response && error.response.status === 403) {
                setError("You are not authorized to answer questions.");
            }
            else {
                setError("There was an error submitting your answer. Please try again.");
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="page">
            <div className="answer-form">
                {error && <div className="error">{ error }</div>}

                {successMessage && <div className="success">{successMessage}</div>}

                <form onSubmit={handleSubmit}>
                    <h1 className="headline">Submit Your Answer</h1>

                    <label>Answer:</label>
                    <textarea
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows="5"
                        placeholder="Write your answer here..."
                    />

                    <button type="submit">Submit Answer</button>
                </form>
            </div>
        </div>
    );
};

export default AnswerFormComponent;
