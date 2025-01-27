import { Routes, Route } from 'react-router-dom';
import Experts from '../Pages/Experts.js';
import PendingApproval from '../Pages/PendingApproval.js';
import UnApprovedExperts from '../Pages/UnApprovedExperts.js';
import HomePage from '../Pages/HomePage.js';

const Admin = () => {
    return (
        <div className="admin">
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/experts" element={<Experts />} />
                <Route path="/pending-approval" element={<PendingApproval />} />
                <Route path="/unapproved-experts" element={<UnApprovedExperts />} />
            </Routes>
        </div>
    );
}

export default Admin;