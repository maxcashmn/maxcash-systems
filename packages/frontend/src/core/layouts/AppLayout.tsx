import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUIStore } from '../state/uiStore';
import logo from '/maxcash.png';

export const AppLayout = () => {
  const { user } = useAuth();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img src={logo} alt="MaxCash" className="h-8 w-auto" />
            {sidebarOpen && <span className="text-xl font-bold text-primary-600">MaxCash</span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
            <span>📊</span>
            {sidebarOpen && <span>Dashboard</span>}
          </a>
          <a href="/my-loans" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
            <span>💰</span>
            {sidebarOpen && <span>My Loans</span>}
          </a>
          <a href="/transactions" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
            <span>💳</span>
            {sidebarOpen && <span>Transactions</span>}
          </a>
          <a href="/notifications" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
            <span>🔔</span>
            {sidebarOpen && <span>Notifications</span>}
          </a>
          <a href="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
            <span>��</span>
            {sidebarOpen && <span>Profile</span>}
          </a>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <span className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center">
              {user?.firstName?.[0] || 'U'}
            </span>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100">
            ☰
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
