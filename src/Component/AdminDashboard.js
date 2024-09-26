import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminDashboard() {
    const [students, setStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [submittedAssignments, setSubmittedAssignments] = useState([]);
    const [studentForm, setStudentForm] = useState({
        studentName: '',
        grades: '',
        performance: ''
    });
    const [assignmentForm, setAssignmentForm] = useState({
        courseName: '',
        assignmentName: '',
        assignmentDescription: '',
        dueDate: ''
    });
    const [isEditingStudent, setIsEditingStudent] = useState(false);
    const [isEditingAssignment, setIsEditingAssignment] = useState(false);
    const [isEditingSubmission, setIsEditingSubmission] = useState(false);
    const [currentStudentId, setCurrentStudentId] = useState(null);
    const [currentAssignmentId, setCurrentAssignmentId] = useState(null);
    const [currentSubmissionId, setCurrentSubmissionId] = useState(null);

    // Load students, assignments, and submittedAssignments data from localStorage
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

    // Handle input changes for student form
    const handleStudentInputChange = (e) => {
        const { name, value } = e.target;
        setStudentForm({ ...studentForm, [name]: value });
    };

    // Handle input changes for assignment form
    const handleAssignmentInputChange = (e) => {
        const { name, value } = e.target;
        setAssignmentForm({ ...assignmentForm, [name]: value });
    };

    // Handle adding or editing a student
    const handleAddEditStudent = (e) => {
        e.preventDefault();
        if (!isEditingStudent) {
            const newStudent = { ...studentForm, id: Date.now() };
            const updatedStudents = [...students, newStudent];
            setStudents(updatedStudents);
            localStorage.setItem('students', JSON.stringify(updatedStudents));
        } else {
            const updatedStudents = students.map((student) =>
                student.id === currentStudentId ? { ...student, ...studentForm } : student
            );
            setStudents(updatedStudents);
            localStorage.setItem('students', JSON.stringify(updatedStudents));
            setIsEditingStudent(false);
            setCurrentStudentId(null);
        }

        // Reset student form
        setStudentForm({
            studentName: '',
            grades: '',
            performance: ''
        });
    };

    // Handle adding or editing an assignment
    const handleAddEditAssignment = (e) => {
        e.preventDefault();
        if (!isEditingAssignment) {
            const newAssignment = { ...assignmentForm, id: Date.now() };
            const updatedAssignments = [...assignments, newAssignment];
            setAssignments(updatedAssignments);
            localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
        } else {
            const updatedAssignments = assignments.map((assignment) =>
                assignment.id === currentAssignmentId ? { ...assignment, ...assignmentForm } : assignment
            );
            setAssignments(updatedAssignments);
            localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
            setIsEditingAssignment(false);
            setCurrentAssignmentId(null);
        }

        // Reset assignment form
        setAssignmentForm({
            courseName: '',
            assignmentName: '',
            assignmentDescription: '',
            dueDate: ''
        });
    };

    // Handle deleting a student
    const handleDeleteStudent = (index) => {
        const updatedStudents = students.filter((_, i) => i !== index);
        setStudents(updatedStudents);
        localStorage.setItem('students', JSON.stringify(updatedStudents));
        
    };

    // Handle deleting an assignment
    const handleDeleteAssignment = (index) => {
        const updatedAssignments = assignments.filter((_, i) => i !== index);
        setAssignments(updatedAssignments);
        localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
       
    };

    // Handle deleting a submitted assignment
    const handleDeleteSubmission = (index) => {
        const updatedSubmissions = submittedAssignments.filter((_, i) => i !== index);
        setSubmittedAssignments(updatedSubmissions);
        localStorage.setItem('submittedAssignments', JSON.stringify(updatedSubmissions));
    };

    // Handle editing a student
    const handleEditStudent = (studentId) => {
        const studentToEdit = students.find((student) => student.id === studentId);
        setStudentForm(studentToEdit);
        setIsEditingStudent(true);
        setCurrentStudentId(studentId);
    };

    // Handle editing an assignment
    const handleEditAssignment = (assignmentId) => {
        const assignmentToEdit = assignments.find((assignment) => assignment.id === assignmentId);
        setAssignmentForm(assignmentToEdit);
        setIsEditingAssignment(true);
        setCurrentAssignmentId(assignmentId);
    };

    // Handle editing a submitted assignment
    const handleEditSubmission = (submissionId) => {
        const submissionToEdit = submittedAssignments.find((submission) => submission.id === submissionId);
        // Set form state for editing here (if required)
        setIsEditingSubmission(true);
        setCurrentSubmissionId(submissionId);
    };

    return (
        <div className="container">
            <h1 className="my-4">Admin Dashboard</h1>

            {/* Student List */}
            <h2>Student List</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Student Name</th>
                        <th>Grades</th>
                        <th>Performance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.studentName}</td>
                            <td>{student.grades}</td>
                            <td>{student.performance}</td>
                            <td>
                                <button
                                    onClick={() => handleEditStudent(student.id)}
                                    className="btn btn-warning mx-2"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDeleteStudent(index)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditingStudent && (
                <div className="mb-4">
                    <h3>Edit Student</h3>
                    <form onSubmit={handleAddEditStudent}>
                        <div className="mb-3">
                            <label>Student Name:</label>
                            <input
                                type="text"
                                name="studentName"
                                value={studentForm.studentName}
                                onChange={handleStudentInputChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label>Grades:</label>
                            <input
                                type="text"
                                name="grades"
                                value={studentForm.grades}
                                onChange={handleStudentInputChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label>Performance:</label>
                            <input
                                type="text"
                                name="performance"
                                value={studentForm.performance}
                                onChange={handleStudentInputChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Update Student
                        </button>
                    </form>
                </div>
            )}

            {/* Assignment List */}
            <h2>Assignment List</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Course Name</th>
                        <th>Assignment Name</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((assignment, index) => (
                        <tr key={assignment.id}>
                            <td>{index + 1}</td>
                            <td>{assignment.courseName}</td>
                            <td>{assignment.assignmentName}</td>
                            <td>{assignment.assignmentDescription}</td>
                            <td>{assignment.dueDate}</td>
                            <td>
                                <button
                                    onClick={() => handleEditAssignment(assignment.id)}
                                    className="btn btn-warning mx-2"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDeleteAssignment(index)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditingAssignment && (
                <div className="mb-4">
                    <h3>Edit Assignment</h3>
                    <form onSubmit={handleAddEditAssignment}>
                        <div className="mb-3">
                            <label>Course Name:</label>
                            <input
                                type="text"
                                name="courseName"
                                value={assignmentForm.courseName}
                                onChange={handleAssignmentInputChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label>Assignment Name:</label>
                            <input
                                type="text"
                                name="assignmentName"
                                value={assignmentForm.assignmentName}
                                onChange={handleAssignmentInputChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label>Assignment Description:</label>
                            <input
                                type="text"
                                name="assignmentDescription"
                                value={assignmentForm.assignmentDescription}
                                onChange={handleAssignmentInputChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label>Due Date:</label>
                            <input
                                type="date"
                                name="dueDate"
                                value={assignmentForm.dueDate}
                                onChange={handleAssignmentInputChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Update Assignment
                        </button>
                    </form>
                </div>
            )}

            {/* Submitted Assignments */}
            <div>
                <h2>Submitted Assignments</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Assignment Name</th>
                            <th>Submitted by</th>
                            <th>Submission Text</th>
                            <th>Submitted At</th>
                            <th>File</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submittedAssignments.map((submission, index) => (
                            <tr key={submission.id}>
                                <td>{index + 1}</td>
                                <td>{submission.assignmentName}</td>
                                <td>{submission.studentName}</td>
                                <td>{submission.submissionText}</td>
                                <td>{submission.submittedAt}</td>
                                <td>
                                    <a href={submission.fileContent} download={submission.fileName}>
                                        Download {submission.fileName}
                                    </a>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleEditSubmission(index)}
                                        className="btn btn-warning mx-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteSubmission(index)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;