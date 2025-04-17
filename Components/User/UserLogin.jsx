import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate , Link} from "react-router-dom";
import "./UserLogin.css"; // Custom CSS file for animations

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage({ type: "error", text: "Email and Password are required!" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/v1/users/login", formData);

      // console.log("response", response.data.data.user.username)
      
      localStorage.setItem("userToken", response.data.data.token);
      localStorage.setItem("username", response.data.data.user.username);
      localStorage.setItem("userEmail", formData.email);

      setMessage({ type: "success", text: "Login Successful. Redirecting..." });

      setTimeout(() => {
        navigate("/user-dashboard"); // Redirect to user dashboard
      }, 1000);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Login failed",
      });
    }
  };

  // Triggered on initial render to add animation classes
  useEffect(() => {
    const loginForm = document.getElementById("login-form");
    loginForm.classList.add("animate__fadeIn", "animate__animated");
  }, []);

  return (
    <div className="container-fluid gradient-bg">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 col-lg-4">
          <div id="login-form" className="card shadow-lg p-4 animate__animated">
            <h2 className="text-center mb-4">User Login</h2>

            {message.text && (
              <div className={`alert ${message.type === "error" ? "alert-danger" : "alert-success"}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="User Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-3">
                Login
              </button>
            </form>

            <p className="text-center mt-3">
              Don't have an account?{" "}
              <Link to="/user" className="text-decoration-none">
                Click here to Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
