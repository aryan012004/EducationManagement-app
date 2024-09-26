import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentDashboard() {
    const [students, setStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [submissionText, setSubmissionText] = useState('');
    const [submissionFile, setSubmissionFile] = useState(null);
    const [submittedAssignments, setSubmittedAssignments] = useState([]);

    // Load student and assignment data from localStorage
    useEffect(() => {
        const storedStudents = localStorage.getItem('students');
        if (storedStudents) {
            setStudents(JSON.parse(storedStudents));
        }

        const storedAssignments = localStorage.getItem('assignments');
        if (storedAssignments) {
            setAssignments(JSON.parse(storedAssignments));
        }

        const storedSubmittedAssignments = localStorage.getItem('submittedAssignments');
        if (storedSubmittedAssignments) {
            setSubmittedAssignments(JSON.parse(storedSubmittedAssignments));
        }
    }, []);

    // Handle assignment submission
    const handleAssignmentSubmit = (e, assignmentName) => {
        e.preventDefault();
        if (studentName && submissionText && submissionFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const fileContent = e.target.result;
                const newSubmission = {
                    studentName,
                    assignmentName,
                    submissionText,
                    fileName: submissionFile.name,
                    fileContent,
                    submittedAt: new Date().toLocaleString(),
                };
                const updatedSubmittedAssignments = [...submittedAssignments, newSubmission];
                setSubmittedAssignments(updatedSubmittedAssignments);
                localStorage.setItem('submittedAssignments', JSON.stringify(updatedSubmittedAssignments));

                // Show success toast
                toast.success("Assignment ${assignmentName} submitted successfully!");

                // Clear form
                setStudentName('');
                setSubmissionText('');
                setSubmissionFile(null);
            };
            reader.readAsDataURL(submissionFile); // Convert file to Base64 string for storage
        } else {
            toast.error('Please fill in all fields before submitting.');
        }
    };

    // Handle file selection
    const handleFileChange = (e) => {
        setSubmissionFile(e.target.files[0]);
    };

    return (
        <div style={styles.container}>
            <ToastContainer />

            <div style={styles.sidebar}>
                <h1 style={styles.header}>Student Dashboard</h1>

                {/* Display Student List */}
                <div style={styles.section}>
                    <h2 style={styles.subHeader}>Student Performance</h2>
                    <table className="table table-bordered">
                    <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Grades</th>
                                <th>Performance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.studentName}</td>
                                    <td>{student.grades}</td>
                                    <td>{student.performance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Display Assignments with Submission Form */}
                <div style={styles.section}>
                    <h2 style={styles.subHeader}>Assignments</h2>
                    {assignments.map((assignment, index) => (
                        <div key={index} style={styles.assignmentContainer}>
                            <strong style={styles.table}>Course Name: {assignment.courseName}</strong>
                            <strong style={styles.table}>Assignment Name: {assignment.assignmentName}</strong> <br />
                            <strong style={styles.table}>Assignment Description: {assignment.assignmentDescription}</strong><br />
                            <strong style={styles.table}>Due Date: {assignment.dueDate}</strong>

                            {/* Submission Form */}
                            <form
                                onSubmit={(e) => handleAssignmentSubmit(e, assignment.assignmentName)}
                                style={styles.form}
                            >
                                <div style={styles.inputGroup}>
                                    <label>Student Name:</label>
                                    <input
                                        type="text"
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        required
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label>Submission Text:</label>
                                    <textarea
                                        value={submissionText}
                                        onChange={(e) => setSubmissionText(e.target.value)}
                                        required
                                        style={styles.textarea}
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label>Upload Assignment File:</label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        required
                                        style={styles.input}
                                    />
                                </div>
                                <button type="submit" style={styles.button}>Submit Assignment</button>
                            </form>
                        </div>
                    ))}
                </div>

                {/* Display Submitted Assignments */}
                <div style={styles.section}>
                    <h2 style={styles.subHeader}>Submitted Assignments</h2>
                    <table className="table table-bordered" >
                        <thead>
                            <tr>
                                <th>Assignment Name</th>
                                <th>Submitted by</th>
                                <th>Submission Text</th>
                                <th>Submitted At</th>
                                <th>File</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submittedAssignments.map((submission, index) => (
                                <tr key={index}>
                                    <td>{submission.assignmentName}</td>
                                    <td>{submission.studentName}</td>
                                    <td>{submission.submissionText}</td>
                                    <td>{submission.submittedAt}</td>
                                    <td>
                                        <a href={submission.fileContent} download={submission.fileName}>
                                            Download {submission.fileName}
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
    },
    sidebar: {
        width: '75%',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '20px auto',
    },
    header: {
        textAlign: 'center',
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#333',
        borderBottom: '2px solid #ddd',
        paddingBottom: '10px',
    },
    section: {
        marginBottom: '40px',
    },
    subHeader: {
        fontSize: '1.75rem',
        color: '#4CAF50',
        marginBottom: '15px',
        paddingBottom: '10px',
        borderBottom: '2px solid #ddd',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#f2f2f2',
    },
    tableCell: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    assignmentContainer: {
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#eef6ff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    table: {
        display:'flex',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#eef6ff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    textarea: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        height: '100px',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#4CAF50',
        color: 'white',
        cursor: 'pointer',
        marginTop: '10px',
    },
};

export default StudentDashboard;