import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../assets/logo-placeholder.png';
import { auth } from '../firebase';
import { type User, signOut } from 'firebase/auth';

interface NavbarProps {
  user: User | null;
  authInitialized: boolean;
}

const Navbar = ({ user, authInitialized }: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Kernel Logo" />
        </Link>
        {/* Navigation Links Group */}
        <div className={styles.navLinks}>
          <Link to="/book-view">Book View</Link>
          <Link to="/topics">Topics</Link>
        </div>
      </div>

      {/* Action Buttons Group */}
      <div className={styles.navActions}>
        <button className={styles.subscribeButton}>Subscribe</button>
        {authInitialized && (
          <>
            {user ? (
              <button onClick={handleLogout} className={styles.loginButton}>Logout</button>
            ) : (
              <Link to="/login" className={styles.loginButton}>Login</Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
