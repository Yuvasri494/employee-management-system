import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  useLocation(); // re-renders the navbar whenever the page changes
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h3>Employee Management</h3>
      <div>
        {token ? (
          <>
            <Link to="/employees">Employees</Link>
            <Link to="/employees/add">Add Employee</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
           
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;