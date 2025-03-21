"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { createClient } from "@supabase/supabase-js"
import { 
  Eye, EyeOff, Trash2, RefreshCw, Mail, User, MessageSquare, Calendar, 
  AlertCircle, ChevronLeft, ChevronRight, Inbox, Search, X, Filter,
  Check, Clock, ArrowUpRight, Loader2, ChevronDown, MoreHorizontal,
  CheckCircle, AlertTriangle, Reply, CalendarClock, UserRound, Tag
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { format, formatDistanceToNow } from "date-fns"

// Define types
type ContactSubmission = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  is_read: boolean
  created_at: string
  updated_at?: string
}

// Create a singleton Supabase client
const getSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )
}

export default function ContactFormSubmissionsPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showMobileDetail, setShowMobileDetail] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date())
  const [isMobileView, setIsMobileView] = useState(false)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Initialize Supabase client
  const supabase = useMemo(() => {
    if (typeof window !== 'undefined') {
      return getSupabaseClient()
    }
    return null
  }, [])

  // Set isMounted on component mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle window resize for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setShowMobileDetail(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fetch submissions function
  const fetchSubmissions = useCallback(async () => {
    if (!isMounted || !supabase) return
    setIsLoading(true)
    setIsRefreshing(true)
    setError(null)
    try {
      let query = supabase
        .from('contact_form_submissions')
        .select('*')
        .order('created_at', { ascending: false })
      const { data, error } = await query
      if (error) throw error
      setSubmissions(data || [])
      setLastRefreshed(new Date())
      if (selectedSubmission) {
        const updatedSubmission = data?.find(sub => sub.id === selectedSubmission.id)
        if (updatedSubmission) {
          setSelectedSubmission(updatedSubmission)
        } else {
          setSelectedSubmission(null)
        }
      }
    } catch (err) {
      setError('Failed to load contact form submissions. Please try again.')
    } finally {
      setIsLoading(false)
      setTimeout(() => setIsRefreshing(false), 500)
    }
  }, [isMounted, supabase, selectedSubmission?.id])

  // Filter and search submissions
  useEffect(() => {
    let result = [...submissions]
    
    // Apply filtering
    if (filter === 'unread') {
      result = result.filter(sub => !sub.is_read)
    } else if (filter === 'read') {
      result = result.filter(sub => sub.is_read)
    }
    
    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(sub => 
        sub.name.toLowerCase().includes(query) ||
        sub.email.toLowerCase().includes(query) ||
        sub.subject.toLowerCase().includes(query) ||
        sub.message.toLowerCase().includes(query)
      )
    }
    
    // Apply sorting
    result = result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      } else {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      }
    })
    
    setFilteredSubmissions(result)
  }, [submissions, filter, searchQuery, sortBy])

  // Fetch data when component is mounted
  useEffect(() => {
    if (isMounted && supabase) {
      fetchSubmissions()
    }
  }, [isMounted, fetchSubmissions, supabase])

  // Toggle read status
  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    if (!supabase) return
    setIsUpdating(true)
    try {
      const { error } = await supabase
        .from('contact_form_submissions')
        .update({ is_read: !currentStatus, updated_at: new Date().toISOString() })
        .eq('id', id)
      if (error) throw error
      setSubmissions(submissions.map(sub => 
        sub.id === id ? { ...sub, is_read: !currentStatus, updated_at: new Date().toISOString() } : sub
      ))
      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ 
          ...selectedSubmission, 
          is_read: !currentStatus,
          updated_at: new Date().toISOString()
        })
      }
    } catch (err) {
      setError('Failed to update submission status. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  // Delete submission
  const deleteSubmission = async (id: string) => {
    if (!supabase) return
    if (!confirm('Are you sure you want to delete this submission? This action cannot be undone.')) return
    setIsDeleting(true)
    try {
      const { error } = await supabase
        .from('contact_form_submissions')
        .delete()
        .eq('id', id)
      if (error) throw error
      setSubmissions(submissions.filter(sub => sub.id !== id))
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null)
        setShowMobileDetail(false)
      }
    } catch (err) {
      setError('Failed to delete submission. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  // Handle submission selection
  const handleSelectSubmission = (submission: ContactSubmission) => {
    setSelectedSubmission(submission)
    if (isMobileView) {
      setShowMobileDetail(true)
    }
    if (!submission.is_read) {
      toggleReadStatus(submission.id, false)
    }
  }

  // Handle back to list
  const handleBackToList = () => {
    setSelectedSubmission(null)
    setShowMobileDetail(false)
  }

  // Calculate statistics
  const stats = useMemo(() => {
    const unreadCount = submissions.filter(sub => !sub.is_read).length
    const readCount = submissions.filter(sub => sub.is_read).length
    const totalCount = submissions.length
    const unreadPercentage = totalCount > 0 ? Math.round((unreadCount / totalCount) * 100) : 0
    const readPercentage = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0
    
    // Get time periods
    const now = new Date()
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const lastDayMessages = submissions.filter(sub => 
      new Date(sub.created_at) > oneDayAgo
    ).length
    
    const lastWeekMessages = submissions.filter(sub => 
      new Date(sub.created_at) > oneWeekAgo
    ).length
    
    return {
      unreadCount,
      readCount,
      totalCount,
      unreadPercentage,
      readPercentage,
      lastDayMessages,
      lastWeekMessages
    }
  }, [submissions])

  // Clear search
  const clearSearch = () => {
    setSearchQuery('')
  }

  // Mark all as read
  const markAllAsRead = async () => {
    if (!supabase || submissions.length === 0) return
    const unreadSubmissions = submissions.filter(sub => !sub.is_read)
    if (unreadSubmissions.length === 0) return
    setIsUpdating(true)
    try {
      const unreadIds = unreadSubmissions.map(sub => sub.id)
      const { error } = await supabase
        .from('contact_form_submissions')
        .update({ is_read: true, updated_at: new Date().toISOString() })
        .in('id', unreadIds)
      if (error) throw error
      setSubmissions(submissions.map(sub => 
        !sub.is_read ? { ...sub, is_read: true, updated_at: new Date().toISOString() } : sub
      ))
      if (selectedSubmission && !selectedSubmission.is_read) {
        setSelectedSubmission({
          ...selectedSubmission,
          is_read: true,
          updated_at: new Date().toISOString()
        })
      }
    } catch (err) {
      setError('Failed to mark all messages as read. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  // Return loading state during server-side rendering
  if (!isMounted) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Inbox className="h-8 w-8 text-blue-400" />
            Contact Messages
          </h1>
          <p className="text-gray-400 mt-1">Manage and respond to inquiries from your contact form</p>
        </div>
        
        {/* Error Alert */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-900/40 border border-red-500 p-4 text-red-200 flex items-center">
            <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 text-red-300" />
            <p>{error}</p>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-300 hover:text-red-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Messages Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-4 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
              {isRefreshing ? (
                <RefreshCw className="h-4 w-4 animate-spin text-gray-400" />
              ) : null}
            </div>
            <h3 className="text-2xl font-bold text-white mt-2">{stats.totalCount}</h3>
            <p className="text-gray-400 text-sm">Total Messages</p>
            <div className="mt-3 pt-3 border-t border-gray-700 flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Last refreshed {formatDistanceToNow(lastRefreshed, { addSuffix: true })}
              </span>
              <button 
                onClick={fetchSubmissions}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center justify-between">
                   <RefreshCw className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Unread Messages Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-4 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-yellow-500/20 p-2 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
              </div>
              {stats.unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center"
                  disabled={isUpdating}
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Mark all as read
                </button>
              )}
            </div>
            <h3 className="text-2xl font-bold text-white mt-2">{stats.unreadCount}</h3>
            <p className="text-gray-400 text-sm">Unread Messages</p>
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-yellow-400 h-1.5 rounded-full"
                  style={{ width: `${stats.unreadPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Read Messages Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-4 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mt-2">{stats.readCount}</h3>
            <p className="text-gray-400 text-sm">Read Messages</p>
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-green-400 h-1.5 rounded-full"
                  style={{ width: `${stats.readPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-4 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <CalendarClock className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mt-2">{stats.lastDayMessages}</h3>
            <p className="text-gray-400 text-sm">Last 24 Hours</p>
            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                {stats.lastWeekMessages} messages in the last 7 days
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Message List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-sm">
              {/* Filters and Search */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search messages..."
                      className="w-full pl-10 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={fetchSubmissions}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    disabled={isLoading}
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
                    <div className="px-3 py-2 bg-gray-600 text-gray-300">
                      <Filter className="h-4 w-4" />
                    </div>
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'read')}
                      className="bg-gray-700 text-gray-200 py-2 px-3 pr-8 appearance-none focus:outline-none"
                    >
                      <option value="all">All Messages</option>
                      <option value="unread">Unread Only</option>
                      <option value="read">Read Only</option>
                    </select>
                  </div>

                  <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
                    <div className="px-3 py-2 bg-gray-600 text-gray-300">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                      className="bg-gray-700 text-gray-200 py-2 px-3 pr-8 appearance-none focus:outline-none"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message List */}
              <div className="divide-y divide-gray-700 max-h-[60vh] overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                  </div>
                ) : filteredSubmissions.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 flex flex-col items-center">
                    <Inbox className="h-12 w-12 mb-3 text-gray-600" />
                    <p className="text-lg font-medium mb-1">No messages found</p>
                    <p className="text-sm">
                      {searchQuery 
                        ? 'Try a different search term' 
                        : filter === 'unread' 
                          ? 'There are no unread messages' 
                          : 'Your inbox is empty'}
                    </p>
                  </div>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      onClick={() => handleSelectSubmission(submission)}
                      className={`p-4 cursor-pointer transition-colors group ${
                        selectedSubmission?.id === submission.id 
                          ? 'bg-blue-900/20' 
                          : submission.is_read 
                            ? 'bg-gray-800 hover:bg-gray-700' 
                            : 'bg-yellow-900/10 hover:bg-yellow-900/20'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-200 truncate">
                            {submission.subject}
                          </h3>
                          <p className="text-sm text-gray-400 truncate">{submission.name}</p>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleReadStatus(submission.id, submission.is_read)
                            }}
                            className="p-1 rounded-full hover:bg-gray-700/50"
                            title={submission.is_read ? "Mark as unread" : "Mark as read"}
                          >
                            {submission.is_read ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-yellow-400" />
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteSubmission(submission.id)
                            }}
                            className="p-1 rounded-full hover:bg-red-900/30"
                            title="Delete message"
                          >
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        {format(new Date(submission.created_at), 'MMM d, yyyy • h:mm a')}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Message Detail */}
          <div className="lg:col-span-2">
            {selectedSubmission ? (
              <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-sm h-full">
                {/* Message Header */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-200">
                        {selectedSubmission.subject}
                      </h2>
                      <p className="text-sm text-gray-400 mt-1">
                        From {selectedSubmission.name} • {format(new Date(selectedSubmission.created_at), 'MMM d, yyyy • h:mm a')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleReadStatus(selectedSubmission.id, selectedSubmission.is_read)}
                        className="p-2 rounded-full hover:bg-gray-700/50"
                        title={selectedSubmission.is_read ? "Mark as unread" : "Mark as read"}
                      >
                        {selectedSubmission.is_read ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-blue-400" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteSubmission(selectedSubmission.id)}
                        className="p-2 rounded-full hover:bg-red-900/30"
                        title="Delete message"
                      >
                        <Trash2 className="h-5 w-5 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">From</p>
                      <div className="flex items-center gap-2">
                        <UserRound className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-200">{selectedSubmission.name}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Email</p>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <a
                          href={`mailto:${selectedSubmission.email}`}
                          className="text-blue-400 hover:underline"
                        >
                          {selectedSubmission.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-2">Message</p>
                    <div className="bg-gray-700/50 rounded-lg p-4 whitespace-pre-wrap text-gray-200">
                      {selectedSubmission.message}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <a
                      href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Reply className="h-4 w-4" />
                      Reply via Email
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
                <MessageSquare className="h-12 w-12 mb-4 text-gray-600" />
                <h3 className="text-lg font-medium text-gray-400">No message selected</h3>
                <p className="text-sm mt-1">Select a message from the list to view its details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}