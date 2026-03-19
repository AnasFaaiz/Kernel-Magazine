import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import styles from './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
   const navigate = useNavigate();
   const [errorMsg, setErrorMsg] = useState("");
   
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=> {
	event.preventDefault();
	const { email, password, role } = event.currentTarget.elements as any;
    setErrorMsg("");

	try {
	    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // Save the role to Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            role: role.value,
            createdAt: new Date().toISOString()
        });

	    if (role.value === 'admin') {
            navigate('/admin-dashboard');
        } else {
            navigate('/');
        }
	} catch (error: any) {
		console.error("Error signing up: ", error);
        setErrorMsg(error.message || "Failed to sign up.");
	}	
   };

   return (
     <div className={styles.pageContainer}>
       <div className={styles.loginBox}>
         <div className={styles.brandingColumn}>
	   <h1>Kernel</h1>
	   <p> The core of Computing Excellence.<br/> <br/> Create an Account.</p>
	 </div>

	 <div className={styles.formColumn}>
	  <h2>Register</h2>
      {errorMsg && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMsg}</div>}
	  <form onSubmit={handleSubmit}>
	    <div className={styles.formGroup}>
	      <label htmlFor="email">Email</label>
	      <input type="email" id="email" name="email" required />
	    </div>
	    <div className={styles.formGroup}>
	      <label htmlFor="password">Password</label>
	      <input type="password" id="password" name="password" required minLength={6} />
	    </div>
        <div className={styles.formGroup}>
          <label htmlFor="role">Account Type</label>
          <select id="role" name="role" required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
	    <button type="submit" className={styles.submitButton}>Register</button>
	  </form>
      <Link to="/login" className={styles.linkText}>Already have an account? Login here.</Link>
	 </div>
       </div>
     </div>
   );
};

export default RegisterPage;
