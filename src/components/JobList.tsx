import React, {useState, useEffect} from "react";
import axios from "axios";
import ApplyModal from "./ApplyModal";
import {IJob} from "../interfaces/i-job";
import ApplicationModal from "./ApplicationModal"; // Modal for the application form

const JobList = () => {
    const [jobs, setJobs] = useState<IJob[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [applicationModal, setApplicationModal] = useState<boolean>(false)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/jobs");
                setJobs(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching jobs:", err);
                setError("Failed to load jobs. Please try again.");
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleApply = (job: IJob) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    const handleDoubleClick = (job: IJob) => {
        setApplicationModal(true)
        setSelectedJob(job);
    };

    if (loading) return <div>Loading jobs...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Job Listings</h2>
            {jobs.length === 0 ? (
                <div>No jobs available.</div>
            ) : (
                <ul className="space-y-4">
                    {jobs.map((job) => (
                        <li
                            key={job.id}
                            className="p-4 border rounded-md shadow-sm relative"
                            onDoubleClick={() => handleDoubleClick(job)}
                        >
                            <h3 className="text-xl font-bold">{job.jobTitle}</h3>
                            <p className="text-gray-700 mb-2">{job.description}</p>
                            <p className="text-sm text-gray-500">
                                Salary: {job.salaryRange} - Location: {job.location}
                            </p>
                            <button
                                className="apply-button mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={() => handleApply(job)}
                            >
                                Apply
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {showModal && selectedJob && (
                <ApplyModal job={selectedJob} onClose={() => setShowModal(false)}/>
            )}

            {applicationModal && selectedJob && (
                <ApplicationModal job={selectedJob} onClose={() => setApplicationModal(false)}/>
            )}
        </div>
    );
};

export default JobList;
