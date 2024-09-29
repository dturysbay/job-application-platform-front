import React from 'react';
import './App.css';
// import {Link} from "@mui/material";
import {Route, Routes, Link} from "react-router-dom";
import JobPostingForm from "./components/JobPostingForm";
import JobList from "./components/JobList";

function App() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <nav className="mb-6">
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="text-blue-500">Job Listing</Link>
                    </li>
                    <li>
                        <Link to="/create-job" className="text-blue-500">Create Job</Link>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<JobList/>}/>
                <Route path="/create-job" element={<JobPostingForm/>}/>
            </Routes>
        </div>

    );
}

export default App;
