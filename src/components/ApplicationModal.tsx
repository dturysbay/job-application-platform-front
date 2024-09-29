import React, {useEffect, useState} from "react";
import {IJob} from "../interfaces/i-job";
import axios from "axios";
import {IApplication} from "../interfaces/i-application";

interface ApplicationModalProps {
    job: IJob,
    onClose: () => void;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({job,onClose}) => {

    const [applications, setApplications] = useState<IApplication[]>([]);

    useEffect(() => {
        if (job.id !== null) {
            axios.get(`/api/job-application/${job.id}`)
                .then(response => {
                    setApplications(response.data);
                })
                .catch(error => {
                    console.error("Error fetching job applications:", error);
                });
        }
    });


    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
                <h3>Job Applications for Job ID: {job.jobTitle}</h3>
                <ul>

                    {applications.map((application) => (
                        <li key={application.id}>
                            <p><strong>Name:</strong> {application.name}</p>
                            <p><strong>Email:</strong> {application.email}</p>
                            <p><strong>Cover Letter:</strong> {application.coverLetter}</p>
                        </li>
                    ))}
                </ul>


                <div className="flex justify-end">
                    <button
                        type="button"
                        className="mr-4 px-4 py-2 text-gray-500"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ApplicationModal