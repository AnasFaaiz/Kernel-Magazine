import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link and useLocation
import styles from './Navbar.module.css';
import logo from '../assets/logo-placeholder.png';
import { auth } from '../firebase';
import {type User, signOut } from 'firebase/auth';

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({user}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
	try{
	   await signOut(auth);
	   navigate('/');
	} catch(error) {
	   console.error("Error signing out: ", error);
	}
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/"> {/* Make the logo a link to the homepage */}
          <img src={logo} alt="Kernel Logo" />
        </Link>
      </div>


      <div className={styles.menu}>
        {location.pathname === '/book-view' ? (
          <Link to="/" className={styles.viewButton}>Web View</Link>
        ) : (
          <Link to="/book-view" className={styles.viewButton}>Book View</Link>
        )}

	<Link to="/topics">Topics</Link>
        <Link to="Subscribe" className={styles.subscribeButton}>Subscribe</Link>
	{user ? (
	  <button onClick={handleLogout} className={styles.loginButton}>Logout</button>
	  ):(
	  <Link to="/login" className={styles.loginButton}>Login</Link>
	)}
      </div>
    </nav>
  );
};

export default Navbar;
