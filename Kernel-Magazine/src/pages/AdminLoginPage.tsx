import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import styles from './AdminLoginPage.module.css';


const AdminLoginPage: React.FC = () => {
   const navigate = useNavigate();
   
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=> {
	event.preventDefault();
	const { email, password } = event.currentTarget.elements as any;

	try {
	    await signInWithEmailAndPassword(auth, email.value, password.value);
	    navigate('/admin-dashboard');
	} catch (error) {
		console.error("Error signing in: ", error);
		alert("Failed to sign in.");
	}	
   };


   return (
     <div className={styles.pageContainer}>
       <div className={styles.loginBox}>
         <div className={styles.brandingColumn}>
	   <h1>Kernel</h1>
	   <p> The core of Computing Excellence.<br/> <br/> Welcome Back, Admin.</p>
	 </div>

	 <div className={styles.formColumn}>
	  <h2>Admin Login </h2>
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
	 </div>
       </div>
     </div>
   );
};

export default AdminLoginPage;
