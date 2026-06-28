"use client";
import { API_URL } from '@/utils/api';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Trash2, CheckCircle2, XCircle, Star } from 'lucide-react';

type Review = {
  _id: string;
  clientName: string;
  clientRole: string;
  quote: string;
  rating: number;
  isApproved: boolean;
  createdAt: string;
};

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const res = await fetch(API_URL + '/reviews/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      } else if (res.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const toggleApproval = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/reviews/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.ok) {
        setReviews(reviews.map(r => r._id === id ? { ...r, isApproved: !r.isApproved } : r));
        toast.success('Review approval status updated');
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error toggling approval:', error);
      toast.error('Error updating status');
    }
  };

  const deleteReview = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    
    try {
      const res = await fetch(`${API_URL}/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (res.ok) {
        setReviews(reviews.filter(r => r._id !== id));
        toast.success('Review deleted successfully');
      } else {
        toast.error('Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Error deleting review');
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={14} fill={star <= rating ? "#facc15" : "none"} className={star <= rating ? "text-yellow-400" : "text-gray-600"} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight">
          Client Reviews
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
                <th className="px-4 py-5 font-semibold border-b border-white/10 w-1/4">Client</th>
                <th className="px-4 py-5 font-semibold border-b border-white/10">Review</th>
                <th className="px-4 py-5 font-semibold border-b border-white/10 w-24">Status</th>
                <th className="px-4 py-5 font-semibold border-b border-white/10 text-right w-[140px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No reviews found.</td>
                </tr>
              ) : reviews.map((r) => (
                <tr key={r._id} className="group transition-all bg-white/5 hover:bg-white/10 text-white">
                  <td className="px-4 py-5 whitespace-nowrap opacity-80 hidden md:table-cell text-sm">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-5 overflow-hidden">
                    <div className="font-medium text-white truncate">{r.clientName}</div>
                    <div className="text-sm text-gray-400 mt-1 truncate">{r.clientRole}</div>
                  </td>
                  <td className="px-4 py-5 opacity-90">
                    <div className="mb-2">{renderStars(r.rating)}</div>
                    <p className="text-sm italic text-gray-300 line-clamp-3">&quot;{r.quote}&quot;</p>
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    {r.isApproved ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                        <CheckCircle2 size={12} /> Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                        <XCircle size={12} /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-5 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2 items-center">
                      <button 
                        onClick={() => toggleApproval(r._id)}
                        className={`p-2 rounded-lg transition-all border ${r.isApproved ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border-yellow-500/20' : 'bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/20'}`}
                        title={r.isApproved ? "Unapprove Review" : "Approve Review"}
                      >
                        {r.isApproved ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
                      </button>
                      
                      <button 
                        onClick={() => deleteReview(r._id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all border border-red-500/20"
                        title="Delete Review"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
