import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import styles from './Navbar.module.css';
import logo from '../assets/logo-placeholder.png';

const Navbar: React.FC = () => {
  // Get the current URL location
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/"> {/* Make the logo a link to the homepage */}
          <img src={logo} alt="Kernel Logo" />
        </Link>
      </div>


      <div className={styles.menu}>
        {/* This button now changes based on the current page */}
        {location.pathname === '/book-view' ? (
          <Link to="/" className={styles.viewButton}>Web View</Link>
        ) : (
          <Link to="/book-view" className={styles.viewButton}>Book View</Link>
        )}

        <a href="#">Topics</a>
        <button className={styles.subscribeButton}>Subscribe</button>
        <button className={styles.signInButton}>Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
