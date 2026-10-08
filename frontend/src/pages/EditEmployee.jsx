import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import EmployeeForm from "../components/EmployeeForm";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/employees/${id}`);
        setEmployee({
          name: data.name,
          email: data.email,
          phone: data.phone,
          department: data.department,
          designation: data.designation,
        });
      } catch (err) {
        setError("Employee not found");
      }
    };
    load();
  }, [id]);

  const handleUpdate = async (form) => {
    try {
      await api.put(`/employees/${id}`, form);
      navigate("/employees");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      {employee ? (
        <EmployeeForm initialData={employee} onSubmit={handleUpdate} buttonText="Update Employee" error={error} />
      ) : (
        <p className={error ? "error" : ""}>{error || "Loading..."}</p>
      )}
    </div>
  );
};

export default EditEmployee;