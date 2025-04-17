import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Users, LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 border-b">
              <Users className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold">CRM</span>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/')}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span className="ml-3">Dashboard</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/candidates')}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <Users className="h-5 w-5" />
                    <span className="ml-3">Candidates</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/templates')}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <FileText className="h-5 w-5" />
                    <span className="ml-3">Templates</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/settings')}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="ml-3">Settings</span>
                  </button>
                </li>
              </ul>
            </nav>
            <div className="p-4 border-t">
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-3">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}