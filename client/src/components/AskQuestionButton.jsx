import { useNavigate } from 'react-router-dom';

const AskQuestionButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/question-form');
    };

    return (
        <button className="ask-question-button" onClick={handleClick}>
            <span className="material-symbols-outlined" >
                psychology_alt
            </span>
            Ask a Question
        </button>
    );
};

export default AskQuestionButton;
