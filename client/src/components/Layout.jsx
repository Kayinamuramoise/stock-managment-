import { Outlet, Link, useNavigate } from "react-router-dom";
import { BookOpen, Package, LogOut, User, Calendar } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <nav className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 border-b border-indigo-700 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">EduStock</span>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-1">
                <Link
                  to="/"
                  className="text-white hover:bg-white/20 inline-flex items-center px-3 pt-1 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  <Package className="mr-2 h-4 w-4" />
                  Inventory
                </Link>
                <Link
                  to="/reports"
                  className="text-white hover:bg-white/20 inline-flex items-center px-3 pt-1 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Reports
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-white/90 flex items-center text-sm">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center mr-2 text-white font-bold shadow-md">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-white hover:bg-rose-500 hover:bg-opacity-20 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                <LogOut className="mr-1 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-white/60 backdrop-blur-md border-t border-indigo-200 mt-auto shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 rounded-t-lg">
          <p className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            &copy; {new Date().getFullYear()} School Stock Management
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
