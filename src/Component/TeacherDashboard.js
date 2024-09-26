import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TeacherDashboard() {
    const [studentName, setStudentName] = useState('');
    const [grades, setGrades] = useState('');
    const [performance, setPerformance] = useState('Good');
    const [students, setStudents] = useState([]);
    const [editStudentIndex, setEditStudentIndex] = useState(null);

    const [courseName, setCourseName] = useState('');
    const [assignmentName, setAssignmentName] = useState('');
    const [assignmentDescription, setAssignmentDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [assignments, setAssignments] = useState([]);
    const [editAssignmentIndex, setEditAssignmentIndex] = useState(null);

    const handleStudentSubmit = (e) => {
        e.preventDefault();
        if (editStudentIndex !== null) {
            const updatedStudents = [...students];
            updatedStudents[editStudentIndex] = { studentName, grades, performance };
            setStudents(updatedStudents);
            localStorage.setItem('students', JSON.stringify(updatedStudents));
            toast.success('Student updated successfully!');
        } else {
            const newStudent = { studentName, grades, performance };
            const updatedStudents = [...students, newStudent];
            setStudents(updatedStudents);
            localStorage.setItem('students', JSON.stringify(updatedStudents));
            toast.success('Student added successfully!');
        }

        setStudentName('');
        setGrades('');
        setPerformance('Good');
        setEditStudentIndex(null);
    };

    const handleCourseSubmit = (e) => {
        e.preventDefault();
        if (editAssignmentIndex !== null) {
            const updatedAssignments = [...assignments];
            updatedAssignments[editAssignmentIndex] = { courseName, assignmentName, assignmentDescription, dueDate };
            setAssignments(updatedAssignments);
            localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
            toast.success('Assignment updated successfully!');
        } else {
            const newAssignment = { courseName, assignmentName, assignmentDescription, dueDate };
            const updatedAssignments = [...assignments, newAssignment];
            setAssignments(updatedAssignments);
            localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
            toast.success('Assignment added successfully!');
        }

        setCourseName('');
        setAssignmentName('');
        setAssignmentDescription('');
        setDueDate('');
        setEditAssignmentIndex(null);
    };

    const handleEditStudent = (index) => {
        const student = students[index];
        setStudentName(student.studentName);
        setGrades(student.grades);
        setPerformance(student.performance);
        setEditStudentIndex(index);
    };

    const handleEditAssignment = (index) => {
        const assignment = assignments[index];
        setCourseName(assignment.courseName);
        setAssignmentName(assignment.assignmentName);
        setAssignmentDescription(assignment.assignmentDescription);
        setDueDate(assignment.dueDate);
        setEditAssignmentIndex(index);
    };

    const handleDeleteStudent = (index) => {
        const updatedStudents = students.filter((_, i) => i !== index);
        setStudents(updatedStudents);
        localStorage.setItem('students', JSON.stringify(updatedStudents));
        toast.error('Student deleted!');
    };

    const handleDeleteAssignment = (index) => {
        const updatedAssignments = assignments.filter((_, i) => i !== index);
        setAssignments(updatedAssignments);
        localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
        toast.error('Assignment deleted!');
    };

    React.useEffect(() => {
        const storedStudents = localStorage.getItem('students');
        if (storedStudents) {
            setStudents(JSON.parse(storedStudents));
        }
        const storedAssignments = localStorage.getItem('assignments');
        if (storedAssignments) {
            setAssignments(JSON.parse(storedAssignments));
        }
    }, []);

    return (
        <div style={styles.container}>
            <ToastContainer position="top-right" autoClose={3000} />
            <h1 style={styles.header}>Teacher Dashboard</h1>

            <div style={styles.dashboardContainer}>
                {/* Student Form */}
                <div style={styles.card}>
                    <h2 style={styles.cardHeader}>Add or Edit Student</h2>
                    <form onSubmit={handleStudentSubmit} style={styles.form}>
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
                            <label>Grades:</label>
                            <input
                                type="text"
                                value={grades}
                                onChange={(e) => setGrades(e.target.value)}
                                required
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label>Performance:</label>
                            <select
                                value={performance}
                                onChange={(e) => setPerformance(e.target.value)}
                                style={styles.input}
                            >
                                <option value="Good">Good</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <button type="submit" style={styles.button}>
                            {editStudentIndex !== null ? 'Update Student' : 'Add Student'}
                        </button>
                    </form>

                   
                </div>

                {/* Assignment Form */}
                <div style={styles.card}>
                    <h2 style={styles.cardHeader}>Add or Edit Assignment</h2>
                    <form onSubmit={handleCourseSubmit} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label>Course Name:</label>
                            <input
                                type="text"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                required
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label>Assignment Name:</label>
                            <input
                                type="text"
                                value={assignmentName}
                                onChange={(e) => setAssignmentName(e.target.value)}
                                required
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label>Assignment Description:</label>
                            <textarea
                                value={assignmentDescription}
                                onChange={(e) => setAssignmentDescription(e.target.value)}
                                required
                                style={styles.textarea}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label>Due Date:</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                                style={styles.input}
                            />
                        </div>
                        <button type="submit" style={styles.button}>
                            {editAssignmentIndex !== null ? 'Update Assignment' : 'Add Assignment'}
                        </button>
                    </form>

                   
                </div>
            </div><br/>
            <h3 style={styles.cardHeader}>Student List</h3>
            <table className="table table-bordered">
            <thead>
                    <tr>
                       
                        <th>Name</th>
                        <th>Grades</th>
                        <th>Performance</th>
                        
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                        {students.map((student, index) => (
                         <tr>
                            
                                <td>{student.studentName} - </td>
                                <td>{student.grades}</td>
                                <td> {student.performance}</td>
                                <td>
                                <div style={styles.actionButtons}>
                                    <button onClick={() => handleEditStudent(index)} style={styles.editButton}>Edit</button>
                                    <button onClick={() => handleDeleteStudent(index)} style={styles.deleteButton}>Delete</button>
                                </div>
                                </td>
                          
                            </tr>
                        ))}
                        
                  
                    </tbody>
                    </table>  
            <h3 style={styles.cardHeader}>Assignment List</h3>
                   
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Grades</th>
                                <th>Performance</th>
                                 <th>Actions</th>
                             </tr>
                        </thead>
                            <tbody>
                            {assignments.map((assignment, index) => (
                            <tr >
                                
                                <td>{assignment.courseName}</td>
                                <td>{assignment.assignmentName}</td>
                                <td>{assignment.dueDate}</td>
                                <td>{assignment.assignmentDescription}</td>
                                <td>
                                <div style={styles.actionButtons}>
                                    <button onClick={() => handleEditAssignment(index)} style={styles.editButton}>Edit</button>
                                    <button onClick={() => handleDeleteAssignment(index)} style={styles.deleteButton}>Delete</button>
                                </div>
                                </td>
                            </tr>
                        ))}
                    
                            </tbody>
                        </table>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        fontSize: '32px',
        marginBottom: '20px',
    },
    dashboardContainer: {
        display: 'flex',
        gap: '20px',
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        flex:1,
    },
    cardHeader: {
        fontSize: '24px',
        marginBottom: '15px',
        color: '#555',
    },
    form: {
        marginBottom: '20px',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    textarea: {
        width: '100%',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        minHeight: '80px',
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 15px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    list: {
        listStyleType: 'none',
        paddingLeft: '0',
    },
    listItem: {
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionButtons: {
        display: 'flex',
        gap: '10px',
    },
    editButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    deleteButton: {
        backgroundColor: '#f44336',
        color: 'white',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default TeacherDashboard;