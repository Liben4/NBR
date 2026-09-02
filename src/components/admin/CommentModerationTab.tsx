import React, { useState, useMemo } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Trash2, 
  UserX, 
  Check, 
  ThumbsUp, 
  ShieldAlert, 
  ExternalLink,
  Ban,
  Clock,
  Mail,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Comment, CommentStatus } from '../../types';

export const CommentModerationTab: React.FC = () => {
  const { 
    comments, 
    articles,
    approveComment, 
    rejectComment, 
    markCommentSpam, 
    deleteComment, 
    blockedUsers, 
    blockUser, 
    unblockUser,
    openArticle,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CommentStatus | 'blocked_users'>('all');
  const [selectedArticleFilter, setSelectedArticleFilter] = useState<string>('all');
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [targetComment, setTargetComment] = useState<Comment | null>(null);
  const [blockReason, setBlockReason] = useState('Repeated violation of business discourse guidelines & spam distribution');

  // Stats
  const stats = useMemo(() => {
    const total = comments.length;
    const approved = comments.filter(c => c.status === 'approved' || !c.status).length;
    const pending = comments.filter(c => c.status === 'pending').length;
    const rejected = comments.filter(c => c.status === 'rejected').length;
    const spam = comments.filter(c => c.status === 'spam').length;
    const blockedCount = blockedUsers.length;
    return { total, approved, pending, rejected, spam, blockedCount };
  }, [comments, blockedUsers]);

  // Filtered comments
  const filteredComments = useMemo(() => {
    return comments.filter(c => {
      // Status filter
      if (statusFilter !== 'all' && statusFilter !== 'blocked_users') {
        const commentStatus = c.status || 'approved';
        if (commentStatus !== statusFilter) return false;
      }
      // Article filter
      if (selectedArticleFilter !== 'all' && c.articleId !== selectedArticleFilter) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.authorName.toLowerCase().includes(q);
        const matchesContent = c.content.toLowerCase().includes(q);
        const matchesEmail = c.authorEmail?.toLowerCase().includes(q);
        const matchesRole = c.authorRole?.toLowerCase().includes(q);
        if (!matchesName && !matchesContent && !matchesEmail && !matchesRole) return false;
      }
      return true;
    });
  }, [comments, statusFilter, selectedArticleFilter, searchQuery]);

  const handleOpenBlockModal = (c: Comment) => {
    setTargetComment(c);
    setBlockReason('Repeated violation of business discourse guidelines & spam distribution');
    setBlockModalOpen(true);
  };

  const handleConfirmBlock = () => {
    if (!targetComment) return;
    blockUser(
      targetComment.authorName,
      targetComment.authorEmail,
      targetComment.ipAddress || '197.156.104.22',
      blockReason
    );
    setBlockModalOpen(false);
    setTargetComment(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Status Cards */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-editorial text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Executive Comment Moderation & Community Shield</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Audit discussions, approve verified perspectives, purge automated solicitations, and manage user blocks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatusFilter('blocked_users')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              statusFilter === 'blocked_users'
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-rose-500/50'
            }`}
          >
            <UserX className="w-3.5 h-3.5" />
            <span>Blocked Users ({blockedUsers.length})</span>
          </button>
        </div>
      </div>

      {/* Metric summary pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => setStatusFilter('all')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            statusFilter === 'all'
              ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 shadow-xs'
              : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">Total Comments</span>
          <span className="text-xl font-bold font-editorial text-slate-900 dark:text-slate-100">{stats.total}</span>
        </button>

        <button
          onClick={() => setStatusFilter('pending')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            statusFilter === 'pending'
              ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-500 shadow-xs'
              : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400 flex items-center justify-between">
            <span>Pending Review</span>
            <Clock className="w-3 h-3" />
          </span>
          <span className="text-xl font-bold font-editorial text-amber-700 dark:text-amber-300">{stats.pending}</span>
        </button>

        <button
          onClick={() => setStatusFilter('approved')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            statusFilter === 'approved'
              ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 shadow-xs'
              : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
            <span>Approved & Live</span>
            <CheckCircle2 className="w-3 h-3" />
          </span>
          <span className="text-xl font-bold font-editorial text-emerald-700 dark:text-emerald-300">{stats.approved}</span>
        </button>

        <button
          onClick={() => setStatusFilter('rejected')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            statusFilter === 'rejected'
              ? 'bg-slate-100 dark:bg-slate-800 border-slate-500 shadow-xs'
              : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 flex items-center justify-between">
            <span>Rejected (Hidden)</span>
            <XCircle className="w-3 h-3" />
          </span>
          <span className="text-xl font-bold font-editorial text-slate-800 dark:text-slate-200">{stats.rejected}</span>
        </button>

        <button
          onClick={() => setStatusFilter('spam')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            statusFilter === 'spam'
              ? 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-500 shadow-xs'
              : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <span className="text-[11px] font-medium text-rose-600 dark:text-rose-400 flex items-center justify-between">
            <span>Flagged Spam</span>
            <AlertTriangle className="w-3 h-3" />
          </span>
          <span className="text-xl font-bold font-editorial text-rose-700 dark:text-rose-300">{stats.spam}</span>
        </button>
      </div>

      {/* If Blocked Users Tab is Selected */}
      {statusFilter === 'blocked_users' ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Ban className="w-4 h-4 text-rose-600" />
                <span>Suspended / Blocked Commenters Registry</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                These users cannot submit new comments or perspectives on any published briefings.
              </p>
            </div>
            <button
              onClick={() => setStatusFilter('all')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Back to Comments
            </button>
          </div>

          {blockedUsers.length === 0 ? (
            <div className="p-12 text-center">
              <UserX className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-60" />
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No blocked users on record</h4>
              <p className="text-xs text-slate-500 mt-1">Community engagement has maintained clean compliance.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {blockedUsers.map(b => (
                <div key={b.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{b.authorName}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300">
                        Blocked
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      {b.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{b.email}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>IP: {b.ipAddress}</span>
                      </span>
                      <span>• Blocked on {b.blockedAt}</span>
                    </div>
                    <p className="text-xs text-rose-600 dark:text-rose-400 italic">
                      Reason: "{b.reason}" • Enforcement by {b.blockedBy}
                    </p>
                  </div>

                  <button
                    onClick={() => unblockUser(b.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-500 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 text-xs font-semibold transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Unblock User</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Controls: Search & Article Selector */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Search author, email, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="w-full sm:w-auto flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={selectedArticleFilter}
                onChange={(e) => setSelectedArticleFilter(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Articles & Briefings</option>
                {articles.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.title.length > 45 ? a.title.slice(0, 45) + '...' : a.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comments List */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            {filteredComments.length === 0 ? (
              <div className="p-12 text-center">
                <MessageSquare className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-50" />
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No matching comments found</h4>
                <p className="text-xs text-slate-500 mt-1">Try resetting the status filter or keyword search.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredComments.map(c => {
                  const article = articles.find(a => a.id === c.articleId);
                  const status = c.status || 'approved';

                  return (
                    <div 
                      key={c.id} 
                      className={`p-4 sm:p-5 transition-colors ${
                        status === 'spam'
                          ? 'bg-rose-50/40 dark:bg-rose-950/20'
                          : status === 'pending'
                          ? 'bg-amber-50/30 dark:bg-amber-950/15'
                          : status === 'rejected'
                          ? 'bg-slate-50/60 dark:bg-slate-950/40 opacity-75'
                          : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        {/* Left: Author & Content */}
                        <div className="flex items-start gap-3.5 flex-1">
                          <img 
                            src={c.avatar} 
                            alt={c.authorName}
                            className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 object-cover shrink-0 mt-0.5 border border-slate-200 dark:border-slate-700"
                          />
                          <div className="space-y-1.5 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                                {c.authorName}
                              </span>
                              {c.authorRole && (
                                <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                                  • {c.authorRole}
                                </span>
                              )}
                              {c.authorEmail && (
                                <span className="text-[10px] text-slate-400 font-mono">
                                  ({c.authorEmail})
                                </span>
                              )}

                              {/* Status Badge */}
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                status === 'approved'
                                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                                  : status === 'pending'
                                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                                  : status === 'rejected'
                                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                  : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                              }`}>
                                {status}
                              </span>
                            </div>

                            {/* Article context */}
                            {article && (
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                <span>Article:</span>
                                <button
                                  onClick={() => openArticle(article)}
                                  className="font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 underline decoration-slate-300 line-clamp-1 inline-flex items-center gap-1 text-left"
                                >
                                  <span>{article.title}</span>
                                  <ExternalLink className="w-3 h-3 shrink-0" />
                                </button>
                              </div>
                            )}

                            {/* Comment text body */}
                            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed pt-1">
                              "{c.content}"
                            </p>

                            {/* Flag reason note if spam */}
                            {c.flagReason && (
                              <p className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1 pt-0.5">
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                <span>{c.flagReason}</span>
                              </p>
                            )}

                            {/* Metadata footer */}
                            <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                              <span>Posted {c.createdAt}</span>
                              <span className="flex items-center gap-1">
                                <ThumbsUp className="w-3 h-3 text-slate-400" />
                                <span>{c.likes} Likes</span>
                              </span>
                              {c.ipAddress && (
                                <span className="font-mono text-[10px]">
                                  IP: {c.ipAddress}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right: Action Buttons (Approve, Reject, Spam, Block, Delete) */}
                        <div className="flex items-center flex-wrap sm:flex-nowrap gap-1.5 shrink-0 pt-2 sm:pt-0">
                          {status !== 'approved' && (
                            <button
                              onClick={() => approveComment(c.id)}
                              title="Approve Comment for Live Feed"
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-300 dark:border-emerald-800/80 inline-flex items-center gap-1 transition-colors"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span className="hidden md:inline">Approve</span>
                            </button>
                          )}

                          {status !== 'rejected' && (
                            <button
                              onClick={() => rejectComment(c.id)}
                              title="Reject & Hide Comment"
                              className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-300 dark:border-slate-700 inline-flex items-center gap-1 transition-colors"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span className="hidden md:inline">Reject</span>
                            </button>
                          )}

                          {status !== 'spam' && (
                            <button
                              onClick={() => markCommentSpam(c.id)}
                              title="Mark as Unsolicited Spam"
                              className="px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-700 dark:text-rose-300 text-xs font-semibold border border-rose-300 dark:border-rose-800/80 inline-flex items-center gap-1 transition-colors"
                            >
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span className="hidden md:inline">Mark Spam</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleOpenBlockModal(c)}
                            title="Block User from future comments"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                          >
                            <UserX className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Permanently delete comment by "${c.authorName}"?`)) {
                                deleteComment(c.id);
                              }
                            }}
                            title="Delete Comment Permanently"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* Block User Confirmation Modal */}
      {blockModalOpen && targetComment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  Block Commenter: {targetComment.authorName}
                </h3>
                <p className="text-xs text-slate-500">
                  This will suspend commenting privileges across Negarit.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Enforcement Reason
              </label>
              <textarea
                rows={3}
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <p>• Author Name: <strong>{targetComment.authorName}</strong></p>
              {targetComment.authorEmail && <p>• Email: <strong>{targetComment.authorEmail}</strong></p>}
              <p>• IP Address: <strong>{targetComment.ipAddress || '197.156.104.22'}</strong></p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setBlockModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBlock}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors inline-flex items-center gap-1.5"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Confirm Block & Purge</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
