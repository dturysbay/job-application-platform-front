import React, {useState} from "react";
import {IJob} from "../interfaces/i-job";
import axios from "axios";

interface ApplyModalProps {
    job: IJob;
    onClose: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({job, onClose}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [resume, setResume] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8080/api/job-application/${job.id}`, {
                name,
                email,
                coverLetter,
                jobPost: {
                    id: job.id
                }
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            alert("Application submitted successfully!");
            onClose();
        } catch (error) {
            console.error("Error submitting application:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4">Apply for {job.jobTitle}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border px-3 py-2 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border px-3 py-2 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Cover Letter</label>
                        <textarea
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            className="w-full border px-3 py-2 rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-4 px-4 py-2 text-gray-500"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyModal;
