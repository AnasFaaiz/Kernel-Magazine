import { useNavigate, Outlet } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import styles from './AdminDashboard.module.css';
import Sidebar from '../components/sidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch(error) {
      console.error("Error signing out: ", error);
    } 
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.dashboardHeader}>
          <h2>Dashboard</h2>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>
        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
