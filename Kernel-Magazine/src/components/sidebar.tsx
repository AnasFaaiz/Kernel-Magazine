import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './sidebar.module.css';

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <NavLink 
          to="/admin-dashboard/add-single" 
          className={({ isActive }) => isActive ? styles.activeLink : styles.link}
        >
          Add Single Article
        </NavLink>
        <NavLink 
          to="/admin-dashboard/bulk-add" 
          className={({ isActive }) => isActive ? styles.activeLink : styles.link}
        >
          Bulk Add Articles
        </NavLink>
	<NavLink
	  to="/admin-dashboard/manage"
	  className={({ isActive }) => isActive ? styles.activeLink : styles.link}
	>
	  Manage
	</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
