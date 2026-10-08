import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/employees" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/employees"
            element={<ProtectedRoute><EmployeeList /></ProtectedRoute>}
          />
          <Route
            path="/employees/add"
            element={<ProtectedRoute><AddEmployee /></ProtectedRoute>}
          />
          <Route
            path="/employees/edit/:id"
            element={<ProtectedRoute><EditEmployee /></ProtectedRoute>}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;