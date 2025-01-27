import { useNavigate, useParams, Navigate } from "react-router-dom";
import useValidCategory from "../hooks/useValidCategory.jsx";
import AnswerFormComponent from "../components/AnswerFormComponent.jsx";
import {useAuthContext} from "../hooks/useAuthContext.jsx";

const AnswerForm = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const { user } = useAuthContext();

    const handleBack = () => {
        navigate(-1); // go back to the question page
    };

    // Check if the category is valid else redirect to 404 page
    const isValid = useValidCategory(category);
    if (!isValid) {
        return <Navigate to="/404" />;
    }

      return (
          <div className="page">
            <button className="go-back-button" onClick={handleBack}>Back</button>

            <div>
                { user ?
                    ( <AnswerFormComponent/>)
                    : ( <div className="error">You must be logged in to comment</div> )
                }
            </div>
          </div>
      );
};

export default AnswerForm;
