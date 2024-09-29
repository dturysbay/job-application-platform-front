import React, {useState} from "react";
import {Paper, Box, Card, TextField, Input, InputAdornment, OutlinedInput} from "@mui/material";
import {useDispatch} from "react-redux";
import axios from "axios";

const JobPostingForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        jobTitle: "",
        description: "",
        salaryRange: 0,
        location: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);
        try {
            const response = await axios.post("http://localhost:8080/api/jobs", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Job Posting Success:", response.data);
            setSuccess(true);
            setFormData({
                jobTitle: "",
                description: "",
                salaryRange: 0,
                location: "",
            });
        } catch (e) {
            console.error("Error posting job:", e);
            setError("Failed to post the job. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Create Job</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <TextField
                        id="jobTitle"
                        name="jobTitle"
                        label="Job Title"
                        placeholder="Title"
                        onChange={handleChange}
                        value={formData.jobTitle}
                    />
                </div>
                <div className="flex flex-col">
                    <TextField
                        id="description"
                        name="description"
                        label="Job Description"
                        placeholder="Description"
                        multiline
                        rows={5}
                        onChange={handleChange}
                        value={formData.description}
                    />
                </div>

                <div className="flex flex-col">
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        type="text"
                        name="salaryRange"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        placeholder="Salary"
                        value={formData.salaryRange}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <TextField
                        id="location"
                        name="location"
                        label="Job Location"
                        placeholder="Location"
                        onChange={handleChange}
                        value={formData.location}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Post Job
                </button>
            </form>
        </div>
    )
};

export default JobPostingForm;

