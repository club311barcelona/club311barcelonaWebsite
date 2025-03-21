'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Users, 
  Mail, 
  BarChart2, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Home 
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const [supabase, setSupabase] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);
  
  // Initialize Supabase client
  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    setSupabase(createClient(supabaseUrl, supabaseAnonKey));
    setIsLoaded(true);
  }, []);
  
  // Simple password protection
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'club311admin';
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true');
    } else {
      setError('Invalid password');
    }
  };
  
  // Check if already logged in
  useEffect(() => {
    if (!isLoaded) return;
    
    const checkLogin = () => {
      const isAdmin = typeof window !== 'undefined' && localStorage.getItem('adminLoggedIn') === 'true';
      setIsLoggedIn(isAdmin);
    };
    
    checkLogin();
  }, [isLoaded]);
  
  // Handle clicks outside mobile menu to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuRef]);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);
  
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsLoggedIn(false);
    setMobileMenuOpen(false);
  };
  
  // Wait for client-side initialization before rendering content
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="animate-spin h-10 w-10 border-4 border-gold border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // Login form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6">Club311Barcelona Admin</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-2 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-gold text-black font-medium py-2 px-4 rounded-md hover:bg-gold/90 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

// Navigation items configuration for reuse
const navigationItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: <Home className="w-5 h-5" />,
    active: pathname === '/admin'
  },
  {
    name: 'Membership Requests',
    href: '/admin/membership-requests',
    icon: <Users className="w-5 h-5" />,
    active: pathname === '/admin/membership-requests'
  },
  {
    name: 'Contact Requests',
    href: '/admin/contact-us-form',  // Updated to match your directory name
    icon: <Mail className="w-5 h-5" />,
    active: pathname === '/admin/contact-us-form' // Updated to match your directory name
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: <BarChart2 className="w-5 h-5" />,
    active: pathname === '/admin/analytics'
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: <Settings className="w-5 h-5" />,
    active: pathname === '/admin/settings'
  }
];

  // Admin dashboard layout with navigation
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-800 px-4 py-3 shadow-lg flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">
          Club311 <span className="text-gold">Admin</span>
        </h1>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </header>

      <div className="flex flex-1 h-[calc(100vh-3.5rem)] md:h-screen">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex md:w-64 flex-col bg-gray-800 text-white shadow-lg">
          <div className="p-5 border-b border-gray-700">
            <h1 className="text-xl font-bold text-white">
              Club311 <span className="text-gold">Admin</span>
            </h1>
          </div>
          
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  item.active ? 'bg-gray-700 text-gold' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-3 text-gray-400">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3 text-gray-400" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile Menu - Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" aria-hidden="true" />
        )}

        {/* Mobile Menu - Sidebar */}
        <aside
          ref={mobileMenuRef}
          className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
          
          <nav className="p-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  item.active ? 'bg-gray-700 text-gold' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-3 text-gray-400">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3 text-gray-400" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-900">
          <div className="container mx-auto px-4 pt-16 md:pt-6 pb-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}