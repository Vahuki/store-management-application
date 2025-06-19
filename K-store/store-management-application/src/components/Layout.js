import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  // Hàm logout đơn giản
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Store Manager</h2>
        <nav>
          <ul style={styles.navList}>
            <li><Link to="/dashboard" style={styles.navLink}>Dashboard</Link></li>
            <li><Link to="/products" style={styles.navLink}>Products</Link></li>
            <li><Link to="/products/add" style={styles.navLink}>Add Product</Link></li>

          </ul>
        </nav>
      </aside>

      <div style={styles.main}>
        <header style={styles.header}>
          {username ? (
            <>
              <h1>Xin chào, {username}!</h1>
              <button onClick={handleLogout} style={styles.logoutButton}>
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <h1>Welcome!</h1>
              <Link to="/login" style={styles.loginLink}>Đăng nhập</Link>
            </>
          )}
        </header>

        <main style={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  sidebar: {
    width: '220px',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '20px 10px',
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    fontSize: '22px',
    marginBottom: '30px',
    textAlign: 'center',
    color: '#fff',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navLink: {
    display: 'block',
    color: '#ecf0f1',
    padding: '10px 16px',
    textDecoration: 'none',
    borderRadius: '5px',
    marginBottom: '10px',
    backgroundColor: '#34495e',
    transition: 'background 0.3s',
  },
  navLinkHover: {
    backgroundColor: '#3d5a73',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#f8f9fa',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
  },
  content: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f4f6f8',
  },
  logoutButton: {
    padding: '8px 14px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#e74c3c',
    color: '#fff',
    transition: 'background 0.3s',
  },
  loginLink: {
    fontSize: '16px',
    color: '#007bff',
    textDecoration: 'none',
  },
};


export default Layout;
