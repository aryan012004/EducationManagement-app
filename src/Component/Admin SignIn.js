import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function AdminSignIn() {
    let [admin, setAdmin] = useState({});
    let navigate = useNavigate();

    const getValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setAdmin({ ...admin, [name]: value });
    };

    const data = (e) => {
        e.preventDefault();
        Axios.get(`http://localhost:3000/admin/?email=${admin.email}&password=${admin.password}`)
            .then((res) => {
                if (res.data.length === 1) {
                    const loggedInAdmin = res.data[0];
                    localStorage.setItem('admin', JSON.stringify(loggedInAdmin));
                    navigate(`/admin/dashboard`); 
                } else {
                    alert('Invalid Email or Password');
                }
            })
            .catch((err) => {
                alert('Error: Unable to login');
            });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <div style={{ width: '360px', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
                <h1 style={{ textAlign: 'center', color: '#333' }}>Admin Login</h1>
                <form method="post" onSubmit={data}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="email" style={{ display: 'block', color: '#333', marginBottom: '5px' }}>Email:</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            onChange={getValue}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="password" style={{ display: 'block', color: '#333', marginBottom: '5px' }}>Password:</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            onChange={getValue}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: '#5a1cd9',
                            color: '#ffffff',
                            fontSize: '16px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#4a0db7'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#5a1cd9'}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminSignIn;
