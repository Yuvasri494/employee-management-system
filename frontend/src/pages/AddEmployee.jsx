import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import EmployeeForm from "../components/EmployeeForm";

const AddEmployee = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdd = async (form) => {
    try {
      await api.post("/employees", form);
      navigate("/employees");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add employee");
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <EmployeeForm onSubmit={handleAdd} buttonText="Add Employee" error={error} />
    </div>
  );
};

export default AddEmployee;