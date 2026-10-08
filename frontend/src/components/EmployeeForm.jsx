import { useState, useEffect } from "react";

const empty = { name: "", email: "", phone: "", department: "", designation: "" };

const EmployeeForm = ({ initialData, onSubmit, buttonText, error }) => {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
      <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
      <input name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} required />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default EmployeeForm;