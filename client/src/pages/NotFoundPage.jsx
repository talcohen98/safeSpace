import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { AiOutlineFrown } from 'react-icons/ai';

const NotFoundPage = () => {
    return (
        <div className="not-found">
            <AiOutlineFrown className="not-found-icon" size={100} />
            <h1>Oops! Page Not Found</h1>
            <p>We are sorry, but the page you are looking for does not exist.</p>
            <Link to="/" className="not-found-link">
                <FaHome className="home-icon" size={20} />
                <span>Back to Homepage</span>
            </Link>
        </div>
    );
};

export default NotFoundPage;
