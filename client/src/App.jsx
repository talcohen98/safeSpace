import { BrowserRouter, Routes, Route } from 'react-router';

// Pages
import Home from './pages/HomePage.jsx';
import ExpertForum from './pages/ExpertForum.jsx';
import SingleQuestionPage from './pages/SingleQuestionPage.jsx';
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from './pages/NotFoundPage.jsx';

// Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import QuestionForm from './components/QuestionForm.jsx';
import AnswerForm from './pages/AnswerForm.jsx';
import Header from "./components/Header.jsx";
import {useState} from "react";
import ReturnToTopButton from "./components/ReturnToTopButton.jsx";
import AboutUs from "./pages/AboutUs.jsx";

function App() {
    const [navBarOption, setNavBarOption] = useState("Home");

    return (
    <BrowserRouter>
        <div className="app">
            <Header setNavBarOption={setNavBarOption}/>
            <Navbar navBarOption={navBarOption} setNavBarOption={setNavBarOption}/>

            <ReturnToTopButton />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/About-Us" element={<AboutUs setNavBarOption={setNavBarOption}/>} />
                <Route path="/All-Questions" element={<ExpertForum />} />
                <Route path="/question-form" element={<QuestionForm />} />
                <Route path="/:category/:id" element={<SingleQuestionPage />} />
                <Route path="/:category/:id/add-answer" element={<AnswerForm />} />

                <Route path="/404" element={<NotFoundPage />} />
                {/* catch all other routes - 404 page */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <Footer/>
        </div>
    </BrowserRouter>
  );
}

export default App;

