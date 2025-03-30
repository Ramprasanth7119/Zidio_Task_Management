import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";// Custom CSS for animations and styling

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    usertype: "user",
    profile: "",
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profile: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.username.length < 5 || formData.password.length < 5) {
      setError("Username and Password must be at least 5 characters.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/v1/users/signup", formData);
      setSuccess("User registered successfully! Redirecting to login...");
      setTimeout(() => navigate("/login-user"), 1500); // Redirect to login
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  // Triggered on initial render to add animation classes
  useEffect(() => {
    const signUpForm = document.getElementById("signup-form");
    signUpForm.classList.add("animate__fadeIn", "animate__animated");
  }, []);

  return (
    <div className="container-fluid gradient-bg">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 col-lg-4">
          <div id="signup-form" className="card shadow-lg p-4 animate__animated">
            <h2 className="text-center mb-4">Sign Up</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter your username"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter your email"
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
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter your password"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="profile" className="form-label">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="profile"
                  onChange={handleFileChange}
                  className="form-control"
                />
                {preview && <img src={preview} alt="Profile Preview" className="img-fluid mt-2" />}
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-3">
                Register
              </button>
            </form>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/login-user" className="text-decoration-none">
                Click here to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
