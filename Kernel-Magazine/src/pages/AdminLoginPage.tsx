import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import styles from './AdminLoginPage.module.css';


const AdminLoginPage: React.FC = () => {
   const navigate = useNavigate();
   const [errorMsg, setErrorMsg] = useState("");
   
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=> {
	event.preventDefault();
	const { email, password } = event.currentTarget.elements as any;
    setErrorMsg("");

	try {
	    await signInWithEmailAndPassword(auth, email.value, password.value);
	    navigate('/admin-dashboard');
	} catch (error: any) {
		console.error("Error signing in: ", error);
        setErrorMsg(error.message || "Failed to sign in.");
	}	
   };


   return (
     <div className={styles.pageContainer}>
       <div className={styles.loginBox}>
         <div className={styles.brandingColumn}>
	   <h1>Kernel</h1>
	   <p> The core of Computing Excellence.<br/> <br/> Welcome Back.</p>
	 </div>

	 <div className={styles.formColumn}>
	  <h2>Login</h2>
      {errorMsg && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMsg}</div>}
	  <form onSubmit={handleSubmit}>
	    <div className={styles.formGroup}>
	      <label htmlFor="email">Email</label>
	      <input type="email" id="email" name="email" required />
	    </div>
	    <div className={styles.formGroup}>
	      <label htmlFor="password">Password</label>
	      <input type="password" id="password" name="password" required />
	    </div>
	    <button type="submit" className={styles.submitButton}>Login</button>
	  </form>
      <Link to="/register" style={{ display: 'block', textAlign: 'center', marginTop: '15px', color: '#007BFF', textDecoration: 'none', fontSize: '0.9rem' }}>Don't have an account? Register here.</Link>
	 </div>
       </div>
     </div>
   );
};

export default AdminLoginPage;
