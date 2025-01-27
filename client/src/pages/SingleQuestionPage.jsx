import { Link, useParams } from 'react-router';
import useFetch from '../hooks/useFetch.jsx';
import '../style/SingleQuestionPage.css';
import { Navigate } from 'react-router-dom';
import useValidCategory from '../hooks/useValidCategory.jsx';
import { useAuthContext } from '../hooks/useAuthContext.jsx';
import { useState, useEffect } from 'react';

const SingleQuestionPage = () => {
    const { category, id } = useParams()

    const formatDate = (db_date) => {
        const date = new Date(db_date);
        return new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium', // e.g., Jan 1, 2025
            timeStyle: 'short',  // e.g., 12:00 PM
        }).format(date);
    }

    // useFetch to get the data of the question
    const { data: question,  isLoading : isLoadingQuestion, error : errorQuestion } = useFetch(`http://localhost:5000/staysafe/questions/getCategoryQuestions/${category}/${id}`)
    // useFetch to get the data of the answers
    let { data: answers,  isLoading : isLoadingAnswers, error : errorAnswers } = useFetch(`http://localhost:5000/staysafe/answers/${id}`)
    
    if (errorAnswers === 'No data found') {
        errorAnswers = null;
    }

    // check if the user is logged in - only logged-in users can comment
    const { user } = useAuthContext();
    const [isUserAllowedToComment, setIsUserAllowedToComment] = useState(false);
    useEffect(() => {
        if (user && question && question.email_asked_by) {
            setIsUserAllowedToComment(user.userType === 'expert' || (user.userType === 'regular' && question.email_asked_by === user.email));
        }
    }, [user, question]);
    
    const [errorMessage, setErrorMessage] = useState("");

    // Check if the category is valid else redirect to 404 page
    const isValid = useValidCategory(category);
    if (!isValid) {
      return <Navigate to="/404" />;
    }

    const handleCommentClick = () => {
        if (!user) {
            setErrorMessage("You must be logged in to add a comment!");
            setTimeout(() => setErrorMessage(""), 2000);
        } else if (!isUserAllowedToComment) {
            setErrorMessage("You are not authorized to comment on this question!");
            setTimeout(() => setErrorMessage(""), 2000);
        } else {
            setErrorMessage("");  // Clear any previous error messages
        }
    }
    
    return (
        <div className="page">
            <div className="navigation-button">
                <Link
                    to={`/All-Questions`}
                    className="go-back-link"
                >
                    <button className="go-back-button">Back</button>
                </Link>
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div className='single-question-page'>

                {isLoadingQuestion && <div className='loading'>Loading...</div>}
                {errorQuestion && <div className='error'>Error: {errorQuestion}</div>}
                {!question && !isLoadingQuestion && <Navigate to="/404"/>}

                {
                    question &&
                        (<>
                            <div className="single-question-content">
                                <div className='question-header'>
                                    <h1>{question.question_header}</h1>
                                </div>

                                <div className='question-info'>
                                    <p>written by {' '}
                                        <span>{question.name_asked_by}</span> on {' '}
                                        <span>{formatDate(question.createdAt)}</span>
                                    </p>
                                </div>

                                <div className='question-body'>
                                    <p>{question.question_body}</p>
                                </div>
                            </div>

                            <div className='question-add-answer'>
                                {user ? (
                                    <div className="add-comment">
                                        {isUserAllowedToComment === true && 
                                            <Link
                                                to={`/${category}/${id}/add-answer`}
                                                className="add-answer-link"
                                            >
                                                <button className="add-answer-button">Comment</button>
                                            </Link>
                                        }
                                        {isUserAllowedToComment === false &&
                                            <button
                                                className="add-answer-button"
                                                onClick={() => handleCommentClick()}
                                            >
                                                Comment
                                            </button>
                                        }
                                        
                                    </div>
                                ) : (
                                    <button
                                        className="add-answer-button"
                                        onClick={() => handleCommentClick()}
                                    >
                                        Comment
                                    </button>
                                )}
                                
                                <p>Only experts and the question asker are allowed to respond</p>
                            </div>

                            <hr className="elegant-line"/>

                            <div className='question-comments'>
                                {isLoadingAnswers && <div className='loading'>Loading...</div>}

                                {errorAnswers && <div className='error'>Error: {errorAnswers}</div>}

                                {!answers && !isLoadingAnswers && <div>No answers yet</div>}

                                {answers && answers.map(answer => (
                                    <div key={answer._id} className='question-comment'>
                                        <div className='question-comment-header'>
                                            <p>answered by {' '}
                                                <span>{answer.expertName || answer.name}</span> on {' '}
                                                <span>{formatDate(answer.createdAt)}</span>
                                            </p>
                                        </div>

                                        <div className='question-comment-body'>
                                            <p>{answer.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </>)
                }
            </div>
        </div>
    )
}

export default SingleQuestionPage;