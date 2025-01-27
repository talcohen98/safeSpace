import { Link } from "react-router";
import { Clock, MessageSquare } from 'lucide-react';
import PropTypes from 'prop-types';


const QuestionItem = ({ question }) => {
      // Function to calculate how long ago a question was created
      const formatTimeAgo = (date) => {
        const now = new Date(); // Current date
        const past = new Date(date); // QuestionModel creation date
        const diffInHours = Math.floor((now - past) / (1000 * 60 * 60)); // Calculate the difference in hours

        if (diffInHours < 24) {
            return `${diffInHours} hours ago`; // If less than 24 hours
        } else {
            const diffInDays = Math.floor(diffInHours / 24); // Calculate the difference in days
            return `${diffInDays} days ago`; // If more than 24 hours
        }
    };
    return (
        <div className="question-container" key={question._id}>
        <Link
            to={`/${question.category}/${question._id}`} // Link to the specific question page
            className="question-item"
        >
            <div className="user-avatar">
                {question.name_asked_by.charAt(0).toUpperCase()} {/* First letter of the username */}
            </div>

            {/* QuestionModel content */}
            <div className="question-content">
                <h3 className="question-title">{ question.question_header }</h3>
                <div className="question-meta">
                    <span className="author-name">
                        { question.is_anonymous ? "Anonymous" : question.name_asked_by }
                    </span>
                    <span className="meta-separator">•</span>
                    <span className="timestamp">
                        <Clock size={14} />
                        {formatTimeAgo(question.createdAt)}
                    </span>
                    <span className="meta-separator">•</span>
                    <span className="replies">
                        <MessageSquare size={14} />
                        {question.num_replies || 0} replies
                    </span>
                </div>
            </div>

            {/* Category tag */}
            <div className="category-tag">
                {question.category.replace(/-/g, ' ')}
            </div>
        </Link>
    </div>
);
}

QuestionItem.propTypes = {
    question: PropTypes.shape({
        _id: PropTypes.object.isRequired,
        category: PropTypes.string.isRequired,
        name_asked_by: PropTypes.string.isRequired,
        question_header: PropTypes.string.isRequired,
        is_anonymous: PropTypes.bool.isRequired,
        createdAt: PropTypes.string.isRequired,
        num_replies: PropTypes.number.isRequired,
    }).isRequired,
};

export default QuestionItem;