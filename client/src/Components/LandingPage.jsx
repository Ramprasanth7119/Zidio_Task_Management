import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (role) => {
    navigate(`/${role}`);
  };

  return (
    <div
      className="landing-page d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("https://www.dreamstime.com/business-task-management-vector-illustration-set-isolated-white-background-effective-corporate-time-tasks-planning-scheduling-image157821557")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      <div className="text-center p-4 shadow rounded bg-white opacity-90">
        <h1 className="display-4 text-primary mb-4">Welcome to Task Management</h1>
        <h2 className="h4 text-secondary mb-3">Choose Your Role</h2>
        <p className="mb-4">
          Select whether you want to access the application as an Admin or as a User.
          Choose the appropriate role and get started!
        </p>

        <div className="d-flex justify-content-center gap-4 mb-4">
          {/* Admin Button */}
          <button
            onClick={() => handleNavigation('admin')}
            className="btn btn-primary btn-lg d-flex align-items-center"
            style={{ minWidth: '180px' }}
          >
            <img
              src="https://img.icons8.com/ios/50/ffffff/administrator-male.png"
              alt="Admin Icon"
              className="me-2"
              style={{ width: '30px', height: '30px' }}
            />
            Admin
          </button>

          {/* User Button */}
          <button
            onClick={() => handleNavigation('user')}
            className="btn btn-success btn-lg d-flex align-items-center"
            style={{ minWidth: '180px' }}
          >
            <img
              src="https://img.icons8.com/ios/50/ffffff/user-male-circle.png"
              alt="User Icon"
              className="me-2"
              style={{ width: '30px', height: '30px' }}
            />
            User
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
