// src/layouts/AdminLayout.jsx
import AdminSidebar from '../components/AdminSidebar/AdminSidebar';
import './AdminLayout.css';

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;