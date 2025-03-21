"use client"

import { useState, useEffect } from 'react'
import { Users, Mail, BarChart2, Settings } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  // Use client-side only rendering to avoid hydration errors
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Show nothing during server render to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">Loading...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400 mt-2">Welcome to the Club311Barcelona admin panel</p>
      </div>
      
      {/* Quick Links */}
      <div className="rounded-lg bg-gray-800 border border-gray-700 shadow-sm p-6">
        <h2 className="font-semibold text-gray-200 mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/admin/membership-requests"
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <div className="p-2 rounded-lg bg-blue-900/30">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <div className="font-medium text-gray-200">Manage Membership Requests</div>
              <div className="text-sm text-gray-400">Review and approve new members</div>
            </div>
          </Link>
          
          <Link 
            href="/admin/contact-us-form"
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <div className="p-2 rounded-lg bg-purple-900/30">
              <Mail className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <div className="font-medium text-gray-200">View Contact Messages</div>
              <div className="text-sm text-gray-400">Respond to inquiries and messages</div>
            </div>
          </Link>
          
          <Link 
            href="/admin/analytics"
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <div className="p-2 rounded-lg bg-green-900/30">
              <BarChart2 className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <div className="font-medium text-gray-200">View Analytics</div>
              <div className="text-sm text-gray-400">Check website performance</div>
            </div>
          </Link>
          
          <Link 
            href="/admin/settings"
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <div className="p-2 rounded-lg bg-yellow-900/30">
              <Settings className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <div className="font-medium text-gray-200">Settings</div>
              <div className="text-sm text-gray-400">Manage admin preferences</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}