import Sidebar from "./Sidebar";
import Admin from "./Admin";

const MainContent = () => {
    return (
        <div className="main-content">
            <Sidebar/>
            <Admin />
        </div>
    )
}

export default MainContent