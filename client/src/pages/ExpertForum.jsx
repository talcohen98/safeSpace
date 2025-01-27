// Import libraries and modules
import useFetch from "../hooks/useFetch.jsx";
import '../style/ExpertForum.css';
import { useState } from "react";
import QuestionItem from "../components/QuestionItem.jsx";
// import { set } from "mongoose";

// A page for displaying questions 
const ExpertForum = () => {
    
    const url = `http://localhost:5000/staysafe/questions/`;

    const { data: Questions, isLoading, error } = useFetch(url);
    
    const [search, setSearch] = useState("Filter By Key Words");
    const [filteredQuestions, setFilteredQuestions] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleFilterChange = (value) => {
        if (value === "") {
            setFilteredQuestions(false);
            setSearch("Filter By Key Words");
        }
        else
        {
            setSearch(value);
            setFilteredQuestions(true);
        }
    }

    return (
        <div className="page">
            {/* Page title displaying the category name */}
            <h1 className="category-title">Expert Forum</h1>
            {error && <div className="error-message">Error loading questions</div>}

            {isLoading && <div className="loading-message">Loading...</div>}

            {Questions &&
                <div className="question-filters">
                    <input type="text"
                           key="text"
                           placeholder={search}
                           className="text-filter"
                           onChange={(e) => {handleFilterChange(e.target.value)}}>
                    </input>

                    <select
                        id="category-select"
                        className="select-filter"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="" >All Questions</option>
                        <option value="Cyber-Bullying">Cyber Bullying</option>
                        <option value="Sexual-Harassment">Sexual Harassment</option>
                        <option value="Eating-Disorders">Eating Disorders</option>
                    </select>
                </div>
            }

            {/* List of questions */}
            <div className="questions-list">

                {/* Render the questions if data is available */}
                {/*no filter and no category select*/ }
                {!filteredQuestions && selectedCategory == '' && Questions && Questions.map((question) => (
                    <QuestionItem question={question} key={question._id} />
                ))}
                {/*filter and no category select*/ }
                {filteredQuestions && selectedCategory == '' && Questions && Questions.map((question) => {
                    if (question.question_body.toLowerCase().includes(search.toLowerCase())
                    || question.question_header.toLowerCase().includes(search.toLowerCase())) {
                        return (
                            <QuestionItem question={question} key={question._id} />
                        );
                    }
                })}
                {/*no filter and category select*/ }
                {!filteredQuestions && selectedCategory != '' && Questions && Questions.map((question) => {
                    if (question.category === selectedCategory) {
                        return (
                            <QuestionItem question={question} key={question._id} />
                        );
                    }
                })}
                {/*filter and category select*/ }
                {filteredQuestions && selectedCategory != '' && Questions && Questions.map((question) => {
                    if ((question.question_body.toLowerCase().includes(search.toLowerCase())
                    || question.question_header.toLowerCase().includes(search.toLowerCase()))
                    && question.category === selectedCategory) {
                        return (
                            <QuestionItem question={question} key={question._id} />
                        );
                    }
                })}
            </div>
        </div>
    );
};


// Export the component
export default ExpertForum;
