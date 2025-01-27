import { useState } from "react";
import axiosInstance from "../services/api.js";
import { useAuthContext } from '../hooks/useAuthContext.jsx'

const QuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [error, setError] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  // only logged in users can submit a question
  const { user } = useAuthContext();

  // Format category to match the URL format
  const formatCategory = (category) => {
    return category.replace(/ /g, '-'); // Replace all spaces with '-'
  }

  const handleCategoryChange = (e) => {
    setCategory(formatCategory(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous messages
    setError("");
    setSuccessMessage("");

    // Validate category selection
    if (!category) {
      setError("Please select a category.");
      window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to the top
      return;
    }

    // Validate title
    if (!title) {
      setError("Please enter a title for your question.");
      window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to the top
      return;
    }

    // Validate question length
    if (question.length < 20) {
      setError("Your question must be at least 20 characters long.");
      window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to the top
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token; // user need a valid token to submit a question

      const formData = {
        category,
        question_header: title,
        question_body: question,
        name_asked_by: isAnonymous ? "Anonymous" : user.name,
        email_asked_by: user.email,
      };

      const response = await axiosInstance.post("questions/addQuestion",
          formData,
          {
                    headers: {
                      authorization: `Bearer ${token}` // Include token in Authorization header
                    }
                  }
      );

      console.log("user info:", user)
      console.log("Question Form:", formData)
      console.log("QuestionModel submitted successfully:", response.data);
      
      // Show success message and clear the form
      setSuccessMessage("Question submitted successfully!");
      setQuestion("");
      setCategory("");
      setTitle("");
      setIsAnonymous(false);
      
      window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to the top
    } catch (error) {
        console.error("Error submitting question:", error.response ? error.response.data : error.message);
      
        // Check for unauthorized error (401)
        if (error.response && error.response.status === 401) {
          setError("You must be logged in to submit a question.");
        } else {
          setError("There was an error submitting your question. Please try again.");
        }

        window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to the top
    }
  };

  return (
    <div className="page">

      {!user ? (<div className="error">You must be logged in to submit a question.</div>) : (

        <div className="question-form">
          { error && <div className="error">{error}</div> }

          { successMessage && <div className="success">{successMessage}</div> }

          <form onSubmit={handleSubmit}>
            <h1 className="headline">Ask a Question</h1>

            <label>Ask Anonymously:</label>
            <fieldset>
              <label>
                <input
                    type="radio"
                    value={"yes"}
                    checked={isAnonymous}
                    onChange={() => setIsAnonymous(true)}
                />
                Yes
              </label>

              <label>
                <input
                    type="radio"
                    value={"no"}
                    checked={!isAnonymous}
                    onChange={() => setIsAnonymous(false)}
                />
                No
              </label>
            </fieldset>

            <label>Title:</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label>Question:</label>
            <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows="5"
                placeholder="Write your question here..."
            />

            <label>Category:</label>
            <select
                id="category"
                value={category}
                onChange={(e) => handleCategoryChange(e)}
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Cyber-Bullying">Cyber Bullying</option>
              <option value="Sexual-Harassment">Sexual Harassment</option>
              <option value="Eating-Disorders">Eating Disorders</option>
            </select>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default QuestionForm;