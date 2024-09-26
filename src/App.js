import SignUp from './Component/SignUp';
import logo from './logo.svg';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './Component/SignIn';

import Header from './Component/Header';
import AdminSignUp from './Component/AdminSignUp';
import AdminSignIn from './Component/Admin SignIn';
import AdminDashboard from './Component/AdminDashboard';
import TeacherSignUp from './Component/TeacherSignUp';
import TeacherSignIn from './Component/TeacherSignIn';
import TeacherDashboard from './Component/TeacherDashboard';
import StudentDashboard from './Component/StudentDashboard';





function App() {
  return (
    <div className="App">
           <BrowserRouter>
         <Header/>
          <Routes>
                  <Route path="/" element={<SignUp />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/student/dashboard" element={<StudentDashboard />} />
                  <Route path="/admin/signup" element={<AdminSignUp />} />
                <Route path="/admin/signin" element={<AdminSignIn />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/teacher/signup" element={<TeacherSignUp />} />
                <Route path="/teacher/signin" element={<TeacherSignIn />} />
                <Route path="/teacher/dashboard" element={<TeacherDashboard/>} />
                     
          </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
