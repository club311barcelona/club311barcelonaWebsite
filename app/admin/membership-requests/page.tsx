'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Eye, EyeOff, Trash2, RefreshCw, Mail, User, MessageSquare, Calendar,
  AlertCircle, ChevronLeft, ChevronRight, Inbox, Search, X, Filter,
  Check, Clock, ArrowUpRight, Loader2, ChevronDown, MoreHorizontal,
  CheckCircle, AlertTriangle, Reply, CalendarClock, UserRound, Tag
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

export default function MembershipRequestsPage() {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [requests, setRequests] = useState<any[]>([]); // or use a more specific type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<string | number | null>(null);
  const [newNote, setNewNote] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<string>('created_at');
  const [sortDirection, setSortDirection] = useState<string>('desc');
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null); // or use a more specific type
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // Initialize Supabase client
  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const client = createClient(supabaseUrl, supabaseAnonKey);
    setSupabase(client);

    // Fetch data when supabase client is initialized
    if (client) {
      fetchRequests(client);
    }
  }, []);

  const fetchRequests = useCallback(async (client = supabase) => {
    if (!client) return;

    try {
      setLoading(true);
      setIsRefreshing(true);
      console.log('Fetching membership requests via RPC...');

      const { data, error } = await client.rpc('get_all_membership_requests');

      if (error) {
        console.error('RPC query error:', error);
        throw error;
      }

      console.log('Fetched data:', data);
      setRequests(data || []);
      setCurrentPage(1); // Reset to first page on refresh
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Failed to load membership requests: ' + err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setIsRefreshing(false), 500); // Add slight delay for animation
    }
  }, [supabase]);

  // Update note
  const updateNote = async (id, note) => {
    if (!supabase) return;

    try {
      const { error } = await supabase.rpc('update_membership_request_notes', {
        request_id: id,
        new_notes: note
      });

      if (error) {
        console.error('Error updating note:', error);
        throw error;
      }

      // Update local state
      setRequests(requests.map(req =>
        req.id === id ? { ...req, notes: note } : req
      ));

      // Update selected request if open
      if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest({ ...selectedRequest, notes: note });
      }

      setSuccess('Note updated successfully');
      setTimeout(() => setSuccess(null), 3000);

      // Exit edit mode
      setEditingNote(null);
      setNewNote('');
    } catch (err) {
      console.error('Error updating note:', err);
      setError('Error updating note: ' + err.message);
    }
  };

  // Mark as reviewed
  const markAsReviewed = async (id) => {
    if (!supabase) return;

    try {
      const timestamp = new Date().toLocaleString();
      const note = `Reviewed on ${timestamp}`;

      const { error } = await supabase.rpc('update_membership_request_notes', {
        request_id: id,
        new_notes: note
      });

      if (error) {
        console.error('Error updating review status:', error);
        throw error;
      }

      // Update local state
      setRequests(requests.map(req =>
        req.id === id ? { ...req, notes: note } : req
      ));

      // Update selected request if open
      if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest({ ...selectedRequest, notes: note });
      }

      setSuccess('Marked as reviewed');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error updating request:', err);
      setError('Error marking as reviewed: ' + err.message);
    }
  };

  // Update status
  const updateStatus = async (id, status) => {
    if (!supabase) return;

    try {
      const { error } = await supabase.rpc('update_membership_request_status', {
        request_id: id,
        new_status: status
      });

      if (error) throw error;

      // Update local state
      setRequests(requests.map(req =>
        req.id === id ? { ...req, status: status } : req
      ));

      // Update selected request if open
      if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest({ ...selectedRequest, status: status });
      }

      setSuccess(`Status updated to ${status}`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Error updating status: ' + err.message);
    }
  };

  // Handle sorting change
  const handleSortChange = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get status badge style
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'new':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  // Get stats for dashboard cards
  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter(r => r.status === 'pending').length;
    const newRequests = requests.filter(r => r.status === 'new').length;
    const approved = requests.filter(r => r.status === 'approved').length;
    const rejected = requests.filter(r => r.status === 'rejected').length;

    return {
      total,
      pending,
      new: newRequests,
      approved,
      rejected
    };
  }, [requests]);

  // Loading state
  if (loading && !isRefreshing) {
    return (
      <div className="flex flex-col justify-center items-center p-12 space-y-4">
        <div className="animate-spin h-12 w-12 border-4 border-gold border-t-transparent rounded-full"></div>
        <p className="text-gray-400 animate-pulse">Loading membership requests...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Inbox className="h-8 w-8 text-blue-400" />
            Membership Requests
          </h1>
          <p className="text-gray-400 mt-2">Manage and review membership applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Total Requests Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-4 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
              {isRefreshing ? (
                <RefreshCw className="h-4 w-4 animate-spin text-gray-400" />
              ) : null}
            </div>
            <h3 className="text-2xl font-bold text-white mt-2">{stats.total}</h3>
            <p className="text-gray-400 text-sm">Total Requests</p>
            <div className="mt-3 pt-3 border-t border-gray-700 flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Last refreshed {formatDistanceToNow(new Date(), { addSuffix: true })}
              </span>
              <button
                onClick={fetchRequests}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                <RefreshCw className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* New Requests Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-4 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-yellow-500/20 p-2 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
              </div>
              {stats.new > 0 && (
                <button
                  onClick={() => setFilterStatus('new')}
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  View all
                </button>
              )}
            </div>
            <h3 className="text-2xl font-bold text-white mt-2">{stats.new}</h3>
            <p className="text-gray-400 text-sm">New Requests</p>
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-yellow-400 h-1.5 rounded-full"
                  style={{ width: `${(stats.new / stats.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Approved Requests Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-4 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mt-2">{stats.approved}</h3>
            <p className="text-gray-400 text-sm">Approved Requests</p>
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-green-400 h-1.5 rounded-full"
                  style={{ width: `${(stats.approved / stats.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Rejected Requests Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-4 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-red-500/20 p-2 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mt-2">{stats.rejected}</h3>
            <p className="text-gray-400 text-sm">Rejected Requests</p>
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-red-400 h-1.5 rounded-full"
                  style={{ width: `${(stats.rejected / stats.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Pending Requests Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-4 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <CalendarClock className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mt-2">{stats.pending}</h3>
            <p className="text-gray-400 text-sm">Pending Requests</p>
            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                {stats.pending} requests awaiting review
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800/50 p-4 rounded-lg mb-6 border border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-medium">Filters & Search</h3>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="text-gray-400 hover:text-white md:hidden"
              aria-label={isFilterOpen ? "Hide filters" : "Show filters"}
            >
              {isFilterOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          </div>

          <div className={`${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-300 mb-1">
                  Filter by Status
                </label>
                <div className="relative">
                  <select
                    id="statusFilter"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md text-white appearance-none focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="new">New</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-1">
                  Search
                </label>
                <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="search"
                    type="text"
                    placeholder="Search by name, email, or city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-300 mb-1">
                  Sort by
                </label>
                <div className="flex">
                  <div className="relative flex-1">
                    <select
                      id="sort"
                      value={sortField}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-l-md text-white appearance-none focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      <option value="created_at">Date</option>
                      <option value="name">Name</option>
                      <option value="email">Email</option>
                      <option value="city">City</option>
                      <option value="status">Status</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <button
                    onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                    className="px-3 py-2 bg-gray-600 border border-gray-500 rounded-r-md text-white hover:bg-gray-500 transition-colors"
                    aria-label={sortDirection === 'asc' ? 'Sort descending' : 'Sort ascending'}
                  >
                    {sortDirection === 'asc' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Filter stats */}
            <div className="mt-3 text-sm text-gray-400 flex items-center justify-between">
              <div>
                {requests.length} {requests.length === 1 ? 'request' : 'requests'} found
              </div>
              {(filterStatus !== 'all' || searchTerm) && (
                <button
                  onClick={() => {
                    setFilterStatus('all');
                    setSearchTerm('');
                  }}
                  className="text-gold hover:underline flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Success/Error messages */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-md mb-6 flex items-center justify-between"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {success}
              </div>
              <button
                onClick={() => setSuccess(null)}
                className="text-green-400 hover:text-green-300"
                aria-label="Dismiss"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-md mb-6 flex items-center justify-between"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-300"
                aria-label="Dismiss"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Requests Table */}
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
          {requests.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-400 text-lg mb-2">No membership requests found</p>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterStatus !== 'all'
                  ? 'Try changing your search criteria or filters'
                  : 'There are no membership requests to display'}
              </p>
              <button
                onClick={() => fetchRequests()}
                className="px-4 py-2 bg-gold text-black rounded-md hover:bg-gold/90 transition-colors inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Data
              </button>
            </div>
          ) : (
            <>
              {/* Mobile view: Card layout */}
              <div className="md:hidden">
                {currentItems.map((request) => (
                  <div
                    key={request.id}
                    className="p-4 border-b border-gray-700 hover:bg-gray-750"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-white">{request.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                      <div>
                        <p className="text-gray-400">Email:</p>
                        <a href={`mailto:${request.email}`} className="text-gray-300 hover:text-gold">
                          {request.email}
                        </a>
                      </div>
                      <div>
                        <p className="text-gray-400">City:</p>
                        <p className="text-gray-300">{request.city}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Date:</p>
                        <p className="text-gray-300">{formatDate(request.created_at)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Notes:</p>
                        <p className="text-gray-300 truncate">{request.notes || 'No notes'}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="px-2 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 transition-colors flex items-center"
                      >
                        <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </button>
                      <button
                        onClick={() => updateStatus(request.id, 'approved')}
                        className={`px-2 py-1 text-xs rounded flex items-center ${
                          request.status === 'approved'
                            ? 'bg-green-800 text-green-200 cursor-default'
                            : 'bg-green-600 text-white hover:bg-green-700 transition-colors'
                        }`}
                        disabled={request.status === 'approved'}
                      >
                        <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(request.id, 'rejected')}
                        className={`px-2 py-1 text-xs rounded flex items-center ${
                          request.status === 'rejected'
                            ? 'bg-red-800 text-red-200 cursor-default'
                            : 'bg-red-600 text-white hover:bg-red-700 transition-colors'
                        }`}
                        disabled={request.status === 'rejected'}
                      >
                        <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reject
                      </button>
                      <button
                        onClick={() => markAsReviewed(request.id)}
                        className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Reviewed
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop view: Table layout */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full table-fixed divide-y divide-gray-700">
                  <thead>
                    <tr className="bg-gray-750">
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
                        <button
                          onClick={() => handleSortChange('name')}
                          className="flex items-center hover:text-white"
                        >
                          Name
                          {sortField === 'name' && (
                            <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </button>
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
                        <button
                          onClick={() => handleSortChange('email')}
                          className="flex items-center hover:text-white"
                        >
                          Email
                          {sortField === 'email' && (
                            <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </button>
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
                        <button
                          onClick={() => handleSortChange('city')}
                          className="flex items-center hover:text-white"
                        >
                          City
                          {sortField === 'city' && (
                            <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </button>
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
                        <button
                          onClick={() => handleSortChange('created_at')}
                          className="flex items-center hover:text-white"
                        >
                          Date
                          {sortField === 'created_at' && (
                            <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </button>
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/12">
                        <button
                          onClick={() => handleSortChange('status')}
                          className="flex items-center hover:text-white"
                        >
                          Status
                          {sortField === 'status' && (
                            <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </button>
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
                        Notes
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {currentItems.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-750 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">
                          {request.name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          <a
                            href={`mailto:${request.email}`}
                            className="hover:text-gold hover:underline transition-colors"
                          >
                            {request.email}
                          </a>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          {request.city}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          {formatDate(request.created_at)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(request.status)}`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300 max-w-xs">
                          {editingNote === request.id ? (
                            <div className="flex flex-col space-y-2">
                              <textarea
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                                rows={2}
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => updateNote(request.id, newNote)}
                                  className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between items-start group">
                              <p className="break-words truncate max-w-[150px]">
                                {request.notes || 'No notes'}
                              </p>
                              <button
                                onClick={() => handleEditNote(request.id, request.notes)}
                                className="ml-2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-white transition-all"
                                aria-label="Edit note"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-wrap gap-1">
                            <button
                              onClick={() => setSelectedRequest(request)}
                              className="px-2 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 transition-colors flex items-center"
                              title="View details"
                            >
                              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View
                            </button>
                            <button
                              onClick={() => updateStatus(request.id, 'approved')}
                              className={`px-2 py-1 text-xs rounded flex items-center ${
                                request.status === 'approved'
                                  ? 'bg-green-800 text-green-200 cursor-default'
                                  : 'bg-green-600 text-white hover:bg-green-700 transition-colors'
                              }`}
                              disabled={request.status === 'approved'}
                              title="Approve request"
                            >
                              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Approve
                            </button>
                            <button
                              onClick={() => updateStatus(request.id, 'rejected')}
                              className={`px-2 py-1 text-xs rounded flex items-center ${
                                request.status === 'rejected'
                                  ? 'bg-red-800 text-red-200 cursor-default'
                                  : 'bg-red-600 text-white hover:bg-red-700 transition-colors'
                              }`}
                              disabled={request.status === 'rejected'}
                              title="Reject request"
                            >
                              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Reject
                            </button>
                            <button
                              onClick={() => markAsReviewed(request.id)}
                              className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors flex items-center"
                              title="Mark as reviewed"
                            >
                              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                              Review
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 bg-gray-750 border-t border-gray-700 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center text-sm text-gray-400">
                <span>
                  Showing <span className="font-medium text-white">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium text-white">
                    {Math.min(indexOfLastItem, requests.length)}
                  </span>{' '}
                  of <span className="font-medium text-white">{requests.length}</span> results
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-1">
                <button
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                  className={`px-2 py-1 rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-700 text-white hover:bg-gray-600 transition-colors'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-2 py-1 rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-700 text-white hover:bg-gray-600 transition-colors'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(number => {
                    if (totalPages <= 5) return true;
                    if (number === 1 || number === totalPages) return true;
                    if (Math.abs(number - currentPage) <= 1) return true;
                    return false;
                  })
                  .map((number, index, array) => {
                    if (index > 0 && array[index - 1] !== number - 1) {
                      return [
                        <span key={`ellipsis-${number}`} className="px-2 py-1 text-gray-400">...</span>,
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`w-8 h-8 rounded-md ${
                            currentPage === number
                              ? 'bg-gold text-black font-medium'
                              : 'bg-gray-700 text-white hover:bg-gray-600 transition-colors'
                          }`}
                        >
                          {number}
                        </button>
                      ];
                    }
                    return (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-8 h-8 rounded-md ${
                          currentPage === number
                            ? 'bg-gold text-black font-medium'
                            : 'bg-gray-700 text-white hover:bg-gray-600 transition-colors'
                        }`}
                      >
                        {number}
                      </button>
                    );
                  })}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-2 py-1 rounded-md ${
                    currentPage === totalPages
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-700 text-white hover:bg-gray-600 transition-colors'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`px-2 py-1 rounded-md ${
                    currentPage === totalPages
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-700 text-white hover:bg-gray-600 transition-colors'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Items per page selector */}
              <div className="flex items-center text-sm">
                <span className="text-gray-400 mr-2">Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1); // Reset to first page when changing items per page
                  }}
                  className="bg-gray-700 border border-gray-600 text-white rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}