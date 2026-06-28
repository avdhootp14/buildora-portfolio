"use client";
import { API_URL } from '@/utils/api';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle2, Eye, EyeOff, Reply, Trash2, X } from 'lucide-react';

type Contact = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Reply Modal State
  const [replyingTo, setReplyingTo] = useState<Contact | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  // Message View State
  const [expandedMessages, setExpandedMessages] = useState<string[]>([]);

  const toggleMessageExpand = (id: string) => {
    setExpandedMessages(prev => prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]);
  };

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const res = await fetch(API_URL + '/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      } else if (res.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.ok) {
        setContacts(contacts.map(c => c._id === id ? { ...c, isRead: true } : c));
      }
    } catch (error) {
      console.error('Error marking contact as read:', error);
    }
  };

  const executeDeleteContact = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.ok) {
        setContacts(contacts.filter(c => c._id !== id));
        toast.success('Message deleted successfully');
      } else {
        toast.error('Failed to delete message.');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Error deleting message.');
    }
  };

  const handleDeleteContact = (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3 min-w-[250px]">
        <p className="font-semibold text-white">Are you sure you want to delete this message?</p>
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={() => toast.dismiss(t.id)} className="px-4 py-1.5 bg-gray-700 text-sm font-medium rounded-lg text-white hover:bg-gray-600 transition-colors">Cancel</button>
          <button onClick={() => {
            toast.dismiss(t.id);
            executeDeleteContact(id);
          }} className="px-4 py-1.5 bg-red-600 text-sm font-medium rounded-lg text-white hover:bg-red-500 transition-colors">Delete</button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const openReplyModal = (contact: Contact) => {
    setReplyingTo(contact);
    setReplyMessage(`Hi ${contact.name.split(' ')[0]},\n\nThank you for reaching out to us regarding your project! We have reviewed your message.\n\n[Write your reply here...]\n\nBest regards,\nThe Weblinq Team`);
  };

  const closeReplyModal = () => {
    setReplyingTo(null);
    setReplyMessage("");
  };

  const handleSendReply = async () => {
    if (!replyingTo || !replyMessage.trim()) return;
    
    setIsReplying(true);
    try {
      const res = await fetch(`${API_URL}/contacts/${replyingTo._id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ replyMessage })
      });

      if (res.ok) {
        // Mark as read locally since backend does it automatically
        setContacts(contacts.map(c => c._id === replyingTo._id ? { ...c, isRead: true } : c));
        closeReplyModal();
        toast.success('Reply sent successfully!');
      } else {
        toast.error('Failed to send reply. Please try again.');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Error sending reply. Check your connection.');
    } finally {
      setIsReplying(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight">
          Contact Messages
        </h1>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed text-left border-separate border-spacing-0">
              <thead className="bg-white/5 text-gray-400 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-5 font-semibold border-b border-white/10 w-24 lg:w-32 hidden md:table-cell">Date</th>
                <th className="px-4 py-5 font-semibold border-b border-white/10 w-1/3 lg:w-1/4">Client Info</th>
                <th className="px-4 py-5 font-semibold border-b border-white/10">Message</th>
                <th className="px-4 py-5 font-semibold border-b border-white/10 text-right w-[200px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">No messages found.</td>
                </tr>
              ) : contacts.map((c) => (
                <React.Fragment key={c._id}>
                  <tr className={`group transition-all ${c.isRead ? 'hover:bg-white/5 text-gray-400' : 'bg-white/5 hover:bg-white/10 text-white shadow-[inset_4px_0_0_0_#3b82f6]'}`}>
                  <td className="px-4 py-5 whitespace-nowrap opacity-80 hidden md:table-cell">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-5 overflow-hidden">
                    <div className="font-medium text-white truncate">{c.name}</div>
                    <div className="text-sm text-blue-400 hover:text-blue-300 mt-1 transition-colors truncate">
                      <a href={`mailto:${c.email}`}>{c.email}</a>
                    </div>
                    {c.phone && (
                      <div className="text-sm text-gray-400 mt-0.5 truncate">{c.phone}</div>
                    )}
                  </td>
                  <td className={`px-4 py-5 opacity-90 transition-all duration-300 ${expandedMessages.includes(c._id) ? 'whitespace-pre-wrap' : 'truncate'}`}>
                    {c.message}
                  </td>
                  <td className="px-4 py-5 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2 items-center">
                      {!c.isRead && (
                        <button 
                          onClick={() => markAsRead(c._id)}
                          className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/20 transition-all"
                          title="Mark Read"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => toggleMessageExpand(c._id)}
                        className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all border border-white/10"
                        title={expandedMessages.includes(c._id) ? "Collapse Message" : "View Full Message"}
                      >
                        {expandedMessages.includes(c._id) ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button 
                        onClick={() => replyingTo?._id === c._id ? closeReplyModal() : openReplyModal(c)}
                        className={`p-2 rounded-lg transition-all border ${replyingTo?._id === c._id ? 'bg-gray-500/20 text-gray-400 border-gray-500/20' : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-500/20'}`}
                        title={replyingTo?._id === c._id ? "Close Reply" : "Reply to Message"}
                      >
                        {replyingTo?._id === c._id ? <X size={18} /> : <Reply size={18} />}
                      </button>
                      <button 
                        onClick={() => handleDeleteContact(c._id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all border border-red-500/20"
                        title="Delete Message"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                  </tr>
                  
                  {/* Inline Reply Box */}
                  {replyingTo?._id === c._id && (
                    <tr className="bg-[#0a0a0a]">
                      <td colSpan={4} className="p-0 border-b border-white/10">
                        <div className="p-6 md:p-8 shadow-[inset_0_4px_10px_-4px_rgba(0,0,0,0.5)]">
                          <div className="flex flex-col gap-4 max-w-4xl">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-white flex items-center gap-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path></svg>
                                  Replying to {c.name}
                                </h3>
                                <p className="text-xs text-gray-400 mt-1">An email will be sent directly to {c.email}</p>
                              </div>
                            </div>
                            
                            <textarea 
                              className="w-full flex-grow min-h-[180px] bg-gray-900 border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent resize-none font-sans"
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              placeholder="Type your reply here..."
                            />
                            
                            <div className="flex justify-end mt-2">
                              <button 
                                onClick={handleSendReply}
                                disabled={isReplying}
                                className="bg-accent hover:bg-accent-hover text-white px-8 py-2.5 rounded-lg transition-colors flex items-center justify-center min-w-[120px] disabled:opacity-70 font-medium"
                              >
                                {isReplying ? (
                                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  'Send Email'
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

