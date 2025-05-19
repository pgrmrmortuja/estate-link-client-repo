import React, { useState, useEffect } from 'react';
import AdminNavbar from './Admin/AdminNavbar';
import AgentNavbar from './Agent/AgentNavbar';
import UserNavbar from './User/UserNavbar';
import { Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const token = localStorage.getItem("jwt");
    let role = null;

    if (token) {
        const decoded = jwtDecode(token);
        role = decoded.role;
    }

    return (
        <div className="w-10/12 mx-auto flex transition-all duration-300">
            {/* Navbar */}
            <div>
                {role === 'Admin' && <AdminNavbar isOpen={isOpen} setIsOpen={setIsOpen} />}
                {role === 'Agent' && <AgentNavbar isOpen={isOpen} setIsOpen={setIsOpen} />}
                {role === 'User' && <UserNavbar isOpen={isOpen} setIsOpen={setIsOpen} />}
            </div>

            {/* Main Content */}
            <div className={`w-11/12 mx-auto transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
