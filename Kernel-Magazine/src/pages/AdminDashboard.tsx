import React from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import styles from './module-css/AdminDashboard.module.css';

const AdminDashboard: React.FC = () => {
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
      <div className={styles.header}>
	<h1>Admin Dashboard</h1>
	<p> Welcome, Admin! You can manage articles and magazines from here.</p>
	{/*<button onClick={handleLogout} className={styles.logoutButton}>
		Logout
   	</button> */}
     </div>
     <nav className={styles.adminMenu}>
	<Link to="/admin-dashboard/add-single">Add Single Article</Link>
	<Link to="/admin-dashboard/bulk-add">Bulk Add Articles</Link>
     </nav>
	
     <div className={styles.contentArea}>
	<Outlet />
     </div>
   </div>
   );
};

export default AdminDashboard;
