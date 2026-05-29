import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar, TopBar, PageHeader } from '../AdminPanel/components';
import {
  DashboardView,
  StudentsView,
  ResultsView,
  BatchesView,
  SubjectsView,
  UsersView,
  ReportsView,
} from '../AdminPanel/views';

type Page = 'dashboard' | 'students' | 'results' | 'batches' | 'subjects' | 'users' | 'reports';

const API_URL = 'http://localhost:3000/api';

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState('Admin');
  const [adminEmail, setAdminEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      navigate('/login');
      return;
    }

    // Verify admin token by calling an admin endpoint (NOT student endpoint)
    const verifyAdmin = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          // Token invalid or not admin
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
          return;
        }

        const userData = JSON.parse(user);
        setAdminName(userData.username || 'Admin');
        setAdminEmail(userData.email || 'admin@tub.edu.pk');
      } catch (error) {
        console.error('Admin verification failed:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getPageTitle = (page: Page): string => {
    const titles: Record<Page, string> = {
      dashboard: 'Dashboard',
      students: 'Students',
      results: 'Results',
      batches: 'Batches',
      subjects: 'Subjects',
      users: 'Users',
      reports: 'Reports',
    };
    return titles[page];
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardView />;
      case 'students':
        return <StudentsView />;
      case 'results':
        return <ResultsView />;
      case 'batches':
        return <BatchesView />;
      case 'subjects':
        return <SubjectsView />;
      case 'users':
        return <UsersView />;
      case 'reports':
        return <ReportsView />;
      default:
        return <DashboardView />;
    }
  };

 if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex overflow-hidden font-sans" style={{ background: '#FDFBF7' }}>
      <Sidebar
        sidebarOpen={sidebarOpen}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
        adminName={adminName}
        adminEmail={adminEmail}
      />

      <main className={`flex-1 h-screen overflow-y-auto no-scrollbar transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <TopBar
          pageTitle={getPageTitle(currentPage)}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          adminName={adminName}
          adminEmail={adminEmail}
        />

        <PageHeader title={currentPage} />

        <div className="p-6 md:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;