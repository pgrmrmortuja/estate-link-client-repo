import React from 'react';
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const AgentNavbar = ({ isOpen, setIsOpen }) => {

    const linkClass = ({ isActive }) =>
        isActive
            ? " p-2 text-green-700 rounded-lg hover:bg-transparent font-bold text-lg text-blue-500"
            : " p-2 rounded-lg hover:bg-transparent hover:text-green-500 hover:bg-green-300 font-bold text-lg text-blue-500";

    return (
        <div>
            {/* Hamburger Icon */}
            <button
                className="p-3 fixed top-4 left-4 z-50 bg-gray-800 text-white rounded-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-64"
                    }`}
            >
                <h2 className="text-2xl font-bold mb-6 mt-14 ">Agent Dashboard</h2>
                <ul className=''>

                    <li>
                        <NavLink to="agent-profile" className={linkClass} >
                            Agent Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="addProperty" className={linkClass} >
                            Add Property
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="MyAddedProperties" className={linkClass} >
                            My Added Property
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="soldProperties" className={linkClass} >
                            My Sold Properties
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="requestedProperties" className={linkClass} >
                            Requested Properties
                        </NavLink>
                    </li>
                    <li><NavLink to="/" className="p-2 rounded-lg text-orange-500 hover:bg-transparent hover:text-green-500 hover:bg-green-300 font-bold text-lg text-left">Back to Home</NavLink></li>

                </ul>
            </div>
        </div>
    );
};

export default AgentNavbar;