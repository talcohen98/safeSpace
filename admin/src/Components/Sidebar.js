
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, UserPlus, UserX } from 'lucide-react'; 

const Sidebar = () => {
  return (
    <nav className="sidebar-nav">
      <NavLink
        to="/experts"
        className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
      >
        <Users size={20} />
        Experts
      </NavLink>
      
      <NavLink
        to="/pending-approval"
        className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
      >
        <UserPlus size={20} />
        Pending Approval
      </NavLink>

      <NavLink
        to="/unapproved-experts"
        className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
      >
        <UserX size={20} />
        Unapproved Experts
      </NavLink>
    </nav>
  );
};

export default Sidebar;