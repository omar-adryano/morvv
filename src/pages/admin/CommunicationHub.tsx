import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { INITIAL_EMAIL_TEMPLATES, INITIAL_MESSAGES } from '../../data/initialAdminData';
import { EmailTemplate, CustomerMessage } from '../../types/admin';
import {
  Mail,
  MessageSquare,
  Edit2,
  CheckCircle2,
  Save,
  Send,
  Eye,
  Sliders,
  Check,
  User,
  Clock
} from 'lucide-react';

export const CommunicationHub: React.FC = () => {
  const { showToast, language, logActivity } = useStore();

  const [activeTab, setActiveTab] = useState<'templates' | 'messages'>('templates');

  // Templates State
  const [templates, setTemplates] = useState<EmailTemplate[]>(() => {
    try {
      const saved = localStorage.getItem('morv_admin_email_templates');
      return saved ? JSON.parse(saved) : INITIAL_EMAIL_TEMPLATES;
    } catch {
      return INITIAL_EMAIL_TEMPLATES;
    }
  });

  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);

  // Messages State
  const [messages, setMessages] = useState<CustomerMessage[]>(() => {
    try {
      const saved = localStorage.getItem('morv_admin_customer_messages');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [selectedMessage, setSelectedMessage] = useState<CustomerMessage | null>(null);
  const [replyText, setReplyText] = useState('');

  const saveTemplates = (updated: EmailTemplate[]) => {
    setTemplates(updated);
    localStorage.setItem('morv_admin_email_templates', JSON.stringify(updated));
  };

  const saveMessages = (updated: CustomerMessage[]) => {
    setMessages(updated);
    localStorage.setItem('morv_admin_customer_messages', JSON.stringify(updated));
  };

  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate) return;
    const updated = templates.map((t) => (t.id === editingTemplate.id ? editingTemplate : t));
    saveTemplates(updated);
    setEditingTemplate(null);
    showToast(language === 'ar' ? 'تم حفظ قالب البريد بنجاح ✓' : 'Email template updated ✓');
    logActivity('Email Template Updated', 'settings', editingTemplate.id);
  };

  const handleMarkMessageRead = (id: string) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, status: 'read' as const } : m));
    saveMessages(updated);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !replyText.trim()) return;
    const updated = messages.map((m) =>
      m.id === selectedMessage.id ? { ...m, status: 'replied' as const } : m
    );
    saveMessages(updated);
    setReplyText('');
    setSelectedMessage(null);
    showToast(
      language === 'ar' ? 'تم إرسال رد المستشار وتوثيق الرسالة ✓' : 'Concierge reply dispatched ✓'
    );
    logActivity('Customer Inquiry Replied', 'settings', selectedMessage.id);
  };

  const unreadMessagesCount = messages.filter((m) => m.status === 'unread').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] bg-black text-[#d7ef30] px-2 py-0.5 uppercase font-bold tracking-widest">
              COMMUNICATION HUB // MESSAGING & DISPATCH
            </span>
            <span className="text-xs font-mono text-[#747878]">
              {templates.length} Active Automated Templates · {unreadMessagesCount} Unread Inquiries
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-black">
            Automated Email Templates & Customer Concierge
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex border border-[#e5e2e1] bg-[#f1edec] p-0.5 font-mono text-xs">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-1.5 font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'templates' ? 'bg-black text-white' : 'text-[#5e5f5c] hover:text-black'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Templates ({templates.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-1.5 font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'messages' ? 'bg-black text-white' : 'text-[#5e5f5c] hover:text-black'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Customer Messages ({unreadMessagesCount > 0 ? `${unreadMessagesCount} New` : messages.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Email Templates */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-white border border-[#e5e2e1] p-5 flex flex-col justify-between space-y-4 hover:border-black transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-[#f1edec] pb-2">
                    <span className="font-mono text-[10px] bg-[#f1edec] px-2 py-0.5 uppercase font-bold text-black">
                      {tpl.category}
                    </span>
                    <span className="text-[11px] font-mono text-[#747878]">Updated: {tpl.lastUpdated}</span>
                  </div>

                  <h3 className="font-semibold text-base text-black uppercase">
                    {tpl.name}
                  </h3>

                  <div className="font-mono text-xs text-[#5e5f5c] space-y-1 bg-[#fdf8f8] p-3 border-l-2 border-black">
                    <div>
                      <strong className="text-black uppercase">Subject:</strong> {tpl.subject}
                    </div>
                    <div className="text-[11px] text-[#747878] italic line-clamp-2">
                      "{tpl.body}"
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#f1edec]">
                  <span className="font-mono text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Enabled</span>
                  </span>

                  <button
                    onClick={() => setEditingTemplate(tpl)}
                    className="px-3 py-1.5 border border-[#e5e2e1] hover:border-black hover:bg-black hover:text-white font-mono text-xs uppercase font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Template</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Template Modal */}
          {editingTemplate && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white border-2 border-black max-w-2xl w-full p-6 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-3">
                  <h3 className="font-display text-lg font-bold uppercase text-black">
                    Edit Template: {editingTemplate.name}
                  </h3>
                  <button
                    onClick={() => setEditingTemplate(null)}
                    className="font-mono text-xs text-[#747878] hover:text-black"
                  >
                    [✕ CLOSE]
                  </button>
                </div>

                <form onSubmit={handleSaveTemplate} className="space-y-4">
                  <div className="space-y-1">
                    <label className="font-mono text-xs uppercase font-bold text-black">
                      Subject Line (Supports {'#{orderId}'})
                    </label>
                    <input
                      type="text"
                      required
                      value={editingTemplate.subject}
                      onChange={(e) =>
                        setEditingTemplate({ ...editingTemplate, subject: e.target.value })
                      }
                      className="w-full p-2.5 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-xs uppercase font-bold text-black">
                      Headline / Title Banner
                    </label>
                    <input
                      type="text"
                      required
                      value={editingTemplate.title}
                      onChange={(e) =>
                        setEditingTemplate({ ...editingTemplate, title: e.target.value })
                      }
                      className="w-full p-2.5 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-xs uppercase font-bold text-black">
                      Body Content
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={editingTemplate.body}
                      onChange={(e) =>
                        setEditingTemplate({ ...editingTemplate, body: e.target.value })
                      }
                      className="w-full p-3 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-[#f1edec]">
                    <button
                      type="button"
                      onClick={() => setEditingTemplate(null)}
                      className="px-4 py-2 border border-[#e5e2e1] font-mono text-xs uppercase font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-black text-[#d7ef30] font-mono text-xs uppercase font-extrabold hover:bg-[#313030]"
                    >
                      Save Template
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Customer Messages */}
      {activeTab === 'messages' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Message List (5 cols) */}
          <div className="lg:col-span-5 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  handleMarkMessageRead(msg.id);
                }}
                className={`bg-white border p-4 cursor-pointer transition-all space-y-2 ${
                  selectedMessage?.id === msg.id
                    ? 'border-black ring-1 ring-black'
                    : msg.status === 'unread'
                    ? 'border-amber-400 bg-amber-50/20'
                    : 'border-[#e5e2e1] hover:border-black'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-black">{msg.customerName}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 font-bold uppercase ${
                      msg.status === 'unread'
                        ? 'bg-amber-100 text-amber-900 font-extrabold'
                        : msg.status === 'replied'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    {msg.status}
                  </span>
                </div>
                <div className="font-semibold text-xs text-black line-clamp-1">
                  {msg.subject}
                </div>
                <div className="text-[11px] text-[#5e5f5c] line-clamp-1 font-mono">
                  {msg.message}
                </div>
                <div className="text-[10px] font-mono text-[#747878] flex items-center justify-between pt-1 border-t border-[#f1edec]">
                  <span>{msg.date}</span>
                  {msg.orderId && <span>Ref: {msg.orderId}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Message & Reply Console (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#e5e2e1] p-6 flex flex-col justify-between min-h-[400px]">
            {selectedMessage ? (
              <div className="space-y-6">
                <div className="border-b border-[#f1edec] pb-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#747878]">
                      From: <strong className="text-black">{selectedMessage.customerName}</strong> (
                       {selectedMessage.customerEmail})
                    </span>
                    <span className="font-mono text-xs text-[#747878]">{selectedMessage.date}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-black">
                    {selectedMessage.subject}
                  </h3>
                  {selectedMessage.orderId && (
                    <div className="font-mono text-xs bg-[#f1edec] inline-block px-2 py-0.5 font-bold">
                      Associated Order: {selectedMessage.orderId}
                    </div>
                  )}
                </div>

                <div className="bg-[#fdf8f8] p-4 border-l-2 border-black font-mono text-xs text-[#1c1b1b] leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>

                <form onSubmit={handleSendReply} className="pt-4 border-t border-[#f1edec] space-y-3">
                  <label className="font-mono text-xs uppercase font-bold text-black block">
                    Concierge Dispatch Reply
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Type official reply to be dispatched to collector's email and WhatsApp..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full p-3 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-black hover:bg-[#313030] text-[#d7ef30] font-mono text-xs uppercase font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Dispatch Reply</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2 text-[#747878]">
                <MessageSquare className="w-8 h-8 stroke-1" />
                <p className="font-mono text-xs uppercase">Select a customer inquiry to view and reply</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
