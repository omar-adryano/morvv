import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { INITIAL_REVIEWS } from '../../data/initialAdminData';
import { ProductReview } from '../../types/admin';
import {
  Star,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Trash2,
  Award,
  MessageSquare,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const ProductReviewsManager: React.FC = () => {
  const { showToast, language, logActivity } = useStore();

  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    try {
      const saved = localStorage.getItem('morv_admin_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');

  const saveReviews = (updated: ProductReview[]) => {
    setReviews(updated);
    localStorage.setItem('morv_admin_reviews', JSON.stringify(updated));
  };

  const handleUpdateStatus = (id: string, status: ProductReview['status']) => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, status } : r));
    saveReviews(updated);
    showToast(language === 'ar' ? `تم تحديث حالة التقييم إلى ${status} ✓` : `Review status updated to ${status} ✓`);
    logActivity('Review Status Updated', 'product', id, `Status set to ${status}`);
  };

  const handleToggleFeatured = (id: string) => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, featured: !r.featured } : r));
    saveReviews(updated);
    showToast(language === 'ar' ? 'تم تحديث حالة إبراز التقييم ✓' : 'Review featured status toggled ✓');
  };

  const handleDeleteReview = (id: string) => {
    if (!window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا التقييم؟' : 'Delete this review?')) return;
    const updated = reviews.filter((r) => r.id !== id);
    saveReviews(updated);
    showToast(language === 'ar' ? 'تم حذف التقييم بنجاح' : 'Review deleted successfully');
    logActivity('Review Deleted', 'product', id);
  };

  const filteredReviews = reviews.filter((r) => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (ratingFilter !== 'all' && r.rating !== ratingFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.productName.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1);
  const pendingCount = reviews.filter((r) => r.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header & Stats Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] bg-black text-[#d7ef30] px-2 py-0.5 uppercase font-bold tracking-widest">
              CATALOG // FEEDBACK ARCHIVE
            </span>
            <span className="text-xs font-mono text-[#747878]">{reviews.length} Total Verified Reviews</span>
          </div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-black">
            Product Reviews & Collector Ratings
          </h1>
        </div>

        {/* Quick KPI pills */}
        <div className="flex items-center gap-3">
          <div className="bg-white border border-[#e5e2e1] px-3.5 py-1.5 flex items-center gap-2">
            <Star className="w-4 h-4 fill-[#d7ef30] text-black" />
            <span className="font-mono text-xs font-bold text-black">{avgRating} / 5.0</span>
            <span className="text-[10px] font-mono text-[#747878]">AVG</span>
          </div>
          <div className="bg-white border border-[#e5e2e1] px-3.5 py-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="font-mono text-xs font-bold text-black">{pendingCount}</span>
            <span className="text-[10px] font-mono text-[#747878]">PENDING AUDIT</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#e5e2e1] p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#747878]" />
          <input
            type="text"
            placeholder="Search reviews by sneaker specimen, collector name, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black bg-[#fdf8f8]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Status filter tabs */}
          <div className="flex border border-[#e5e2e1] bg-[#f1edec] p-0.5 font-mono text-[11px]">
            {(['all', 'approved', 'pending', 'rejected'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 font-bold uppercase transition-colors cursor-pointer ${
                  statusFilter === st ? 'bg-black text-white' : 'text-[#5e5f5c] hover:text-black'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Rating filter dropdown */}
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-3 py-1.5 border border-[#e5e2e1] font-mono text-xs bg-white focus:outline-none uppercase font-bold"
          >
            <option value="all">ALL RATINGS</option>
            <option value="5">5 STARS ONLY</option>
            <option value="4">4 STARS</option>
            <option value="3">3 STARS</option>
            <option value="2">2 STARS</option>
            <option value="1">1 STAR</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {filteredReviews.length === 0 ? (
          <div className="bg-white border border-[#e5e2e1] p-12 text-center space-y-2">
            <MessageSquare className="w-8 h-8 text-[#747878] mx-auto stroke-1" />
            <p className="font-mono text-xs uppercase font-bold text-[#747878]">
              No reviews match the current filter criteria
            </p>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className={`bg-white border p-4 sm:p-5 transition-all space-y-3 ${
                rev.status === 'pending'
                  ? 'border-amber-400 bg-amber-50/20'
                  : rev.status === 'rejected'
                  ? 'border-red-200 bg-red-50/10'
                  : 'border-[#e5e2e1] hover:border-black'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f1edec] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm uppercase text-black">
                      {rev.productName}
                    </span>
                    {rev.featured && (
                      <span className="font-mono text-[9px] bg-[#d7ef30] text-black px-1.5 py-0.5 font-bold uppercase">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-[#747878] mt-0.5">
                    Collector: <span className="text-black font-semibold">{rev.customerName}</span> ({rev.customerEmail}) · {rev.date}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Star Rating display */}
                  <div className="flex items-center gap-1 bg-[#f7f3f2] px-2.5 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= rev.rating ? 'fill-black text-black' : 'text-[#c4c7c7]'
                        }`}
                      />
                    ))}
                    <span className="font-mono text-xs font-bold ml-1 text-black">{rev.rating}.0</span>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 font-bold uppercase ${
                      rev.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rev.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {rev.status}
                  </span>
                </div>
              </div>

              {/* Review text */}
              <p className="text-xs sm:text-sm text-[#313030] leading-relaxed italic bg-[#fdf8f8] p-3 border-l-2 border-black">
                "{rev.comment}"
              </p>

              {/* Action Controls */}
              <div className="flex items-center justify-between pt-1 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleFeatured(rev.id)}
                    className={`px-2.5 py-1 border transition-colors flex items-center gap-1 uppercase font-bold text-[11px] ${
                      rev.featured ? 'bg-[#d7ef30] text-black border-black' : 'border-[#e5e2e1] hover:border-black text-[#5e5f5c]'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{rev.featured ? 'Unfeature' : 'Feature on Product'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {rev.status !== 'approved' && (
                    <button
                      onClick={() => handleUpdateStatus(rev.id, 'approved')}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}
                  {rev.status !== 'rejected' && (
                    <button
                      onClick={() => handleUpdateStatus(rev.id, 'rejected')}
                      className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold uppercase text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteReview(rev.id)}
                    className="p-1.5 border border-[#e5e2e1] hover:bg-red-500 hover:text-white hover:border-red-500 text-[#747878] transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
