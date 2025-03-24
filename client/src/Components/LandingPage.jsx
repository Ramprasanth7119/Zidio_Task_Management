import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (role) => {
    navigate(`/${role}`);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f4'
    }}>
      <h2 style={{ marginBottom: '20px' }}>Choose Your Role</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button 
          onClick={() => handleNavigation('admin')} 
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Admin
        </button>
        <button 
          onClick={() => handleNavigation('user')} 
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          User
        </button>
      </div>
    </div>
  );
};

export default LandingPage;