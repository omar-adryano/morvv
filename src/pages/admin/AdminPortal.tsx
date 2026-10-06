import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingCart,
  Users,
  CreditCard,
  Truck,
  Tag,
  Layout,
  Image,
  FolderTree,
  Settings,
  Shield,
  Activity,
  Bell,
  Search,
  ExternalLink,
  Menu,
  X,
  LogOut,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  HardDrive,
  RotateCcw,
  Sliders,
  BarChart3,
  Mail,
  Star,
  Award,
  Sparkles
} from 'lucide-react';

// Subcomponents
import { DashboardOverview } from './DashboardOverview';
import { ProductsManager } from './ProductsManager';
import { InventoryManager } from './InventoryManager';
import { OrdersManager } from './OrdersManager';
import { CustomersManager } from './CustomersManager';
import { PaymentManager } from './PaymentManager';
import { ShippingManager } from './ShippingManager';
import { CouponsManager } from './CouponsManager';
import { HomepageCms } from './HomepageCms';
import { BannersManager } from './BannersManager';
import { CategoriesBrandsManager } from './CategoriesBrandsManager';
import { StoreSettingsPolicies } from './StoreSettingsPolicies';
import { MediaLibrary } from './MediaLibrary';
import { AdminUsersSystem } from './AdminUsersSystem';

// New Architecture Submodules
import { ProductReviewsManager } from './ProductReviewsManager';
import { ReturnsRefundsManager } from './ReturnsRefundsManager';
import { AbandonedCartsManager } from './AbandonedCartsManager';
import { CustomerGroupsManager } from './CustomerGroupsManager';
import { DiscountsPromotionsManager } from './DiscountsPromotionsManager';
import { NavigationFooterCms } from './NavigationFooterCms';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { CommunicationHub } from './CommunicationHub';
import { CheckoutSettingsManager } from './CheckoutSettingsManager';

export type AdminTab =
  | 'dashboard'
  | 'products'
  | 'inventory'
  | 'categories_brands'
  | 'reviews'
  | 'media'
  | 'orders'
  | 'returns_refunds'
  | 'abandoned_carts'
  | 'payments'
  | 'customers'
  | 'customer_groups'
  | 'coupons'
  | 'discounts'
  | 'homepage'
  | 'banners'
  | 'navigation_footer'
  | 'shipping'
  | 'checkout_settings'
  | 'settings_policies'
  | 'analytics'
  | 'communications'
  | 'admin_users'
  | 'activity_log'
  | 'system_health';

export const AdminPortal: React.FC = () => {
  const {
    currentAdmin,
    adminLogout,
    navigateTo,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    storeSettings,
    language
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview onNavigateTab={(tab) => setActiveTab(tab as AdminTab)} />;
      case 'products':
        return <ProductsManager />;
      case 'inventory':
        return <InventoryManager />;
      case 'categories_brands':
        return <CategoriesBrandsManager />;
      case 'reviews':
        return <ProductReviewsManager />;
      case 'media':
        return <MediaLibrary />;
      case 'orders':
        return <OrdersManager />;
      case 'returns_refunds':
        return <ReturnsRefundsManager />;
      case 'abandoned_carts':
        return <AbandonedCartsManager />;
      case 'payments':
        return <PaymentManager />;
      case 'customers':
        return <CustomersManager />;
      case 'customer_groups':
        return <CustomerGroupsManager />;
      case 'coupons':
        return <CouponsManager />;
      case 'discounts':
        return <DiscountsPromotionsManager />;
      case 'homepage':
        return <HomepageCms />;
      case 'banners':
        return <BannersManager />;
      case 'navigation_footer':
        return <NavigationFooterCms />;
      case 'shipping':
        return <ShippingManager />;
      case 'checkout_settings':
        return <CheckoutSettingsManager />;
      case 'settings_policies':
        return <StoreSettingsPolicies />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'communications':
        return <CommunicationHub />;
      case 'admin_users':
        return <AdminUsersSystem initialTab="users" />;
      case 'activity_log':
        return <AdminUsersSystem initialTab="activity" />;
      case 'system_health':
        return <AdminUsersSystem initialTab="health" />;
      default:
        return <DashboardOverview onNavigateTab={(tab) => setActiveTab(tab as AdminTab)} />;
    }
  };

  const navItems = [
    {
      group: 'OVERVIEW',
      items: [{ id: 'dashboard', label: 'Dashboard Home', icon: LayoutDashboard }]
    },
    {
      group: 'CATALOG',
      items: [
        { id: 'products', label: 'Product Specimens', icon: Package },
        { id: 'inventory', label: 'Inventory Control', icon: Boxes },
        { id: 'categories_brands', label: 'Categories & Brands', icon: FolderTree },
        { id: 'reviews', label: 'Product Reviews', icon: Star },
        { id: 'media', label: 'Media Asset Vault', icon: Image }
      ]
    },
    {
      group: 'SALES',
      items: [
        { id: 'orders', label: 'Customer Orders', icon: ShoppingCart },
        { id: 'returns_refunds', label: 'Returns & Refunds', icon: RotateCcw },
        { id: 'abandoned_carts', label: 'Abandoned Carts', icon: Boxes },
        { id: 'payments', label: 'Payment Methods (3)', icon: CreditCard }
      ]
    },
    {
      group: 'CUSTOMERS',
      items: [
        { id: 'customers', label: 'Customer Directory', icon: Users },
        { id: 'customer_groups', label: 'VIP Groups & Tiers', icon: Award }
      ]
    },
    {
      group: 'MARKETING',
      items: [
        { id: 'coupons', label: 'Coupons & Vouchers', icon: Tag },
        { id: 'discounts', label: 'Discounts & Rules', icon: Sparkles }
      ]
    },
    {
      group: 'CONTENT',
      items: [
        { id: 'homepage', label: 'Homepage Sections', icon: Layout },
        { id: 'banners', label: 'Hero & Mobile Banners', icon: Image },
        { id: 'navigation_footer', label: 'Navigation & Footer', icon: Sliders }
      ]
    },
    {
      group: 'STORE',
      items: [
        { id: 'shipping', label: 'Shipping & Logistics', icon: Truck },
        { id: 'checkout_settings', label: 'Checkout & Taxes', icon: CreditCard },
        { id: 'settings_policies', label: 'Store Identity & Policies', icon: Settings }
      ]
    },
    {
      group: 'ANALYTICS',
      items: [{ id: 'analytics', label: 'Executive Analytics', icon: BarChart3 }]
    },
    {
      group: 'COMMUNICATION',
      items: [{ id: 'communications', label: 'Templates & Concierge', icon: Mail }]
    },
    {
      group: 'SYSTEM',
      items: [
        { id: 'admin_users', label: 'Admin Users & Roles', icon: Shield },
        { id: 'activity_log', label: 'Activity Audit Log', icon: Activity },
        { id: 'system_health', label: 'System Health Telemetry', icon: HardDrive }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f3f2] text-[#1c1b1b] flex flex-col font-sans">
      {/* Top Admin Command Header Bar */}
      <header className="h-16 bg-[#1c1b1b] text-white border-b border-[#313030] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-1.5 hover:bg-[#313030] text-white transition-colors cursor-pointer"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand Logo & Portal Tag */}
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <span className="font-['Syne'] text-xl font-extrabold tracking-widest text-white">
              MORV
            </span>
            <span className="text-[9px] font-mono bg-[#d7ef30] text-[#191e00] px-1.5 py-0.5 font-bold uppercase">
              ADMIN CONSOLE
            </span>
          </div>
        </div>

        {/* Right Top Actions */}
        <div className="flex items-center gap-2 sm:gap-4 font-mono text-xs">
          {/* View Live Storefront Button */}
          <button
            onClick={() => navigateTo('home')}
            className="px-3 py-1.5 bg-[#313030] hover:bg-black text-[#d7ef30] hover:text-white font-bold uppercase transition-colors flex items-center gap-1.5 border border-[#444] text-[11px] cursor-pointer"
          >
            <span>Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 hover:bg-[#313030] text-white relative transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#d7ef30]" />
              )}
            </button>

            {/* Notifications Popover */}
            {isNotificationsOpen && (
              <div className="absolute right-0 rtl:right-auto rtl:left-0 top-12 w-80 bg-white border border-[#e5e2e1] text-black shadow-2xl p-4 space-y-3 z-50 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-2">
                  <span className="font-bold text-xs uppercase font-display">
                    Admin Notifications ({unreadNotificationsCount})
                  </span>
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[10px] text-[#747878] hover:text-black underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto font-mono text-xs">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.linkTab) setActiveTab(n.linkTab as AdminTab);
                        setIsNotificationsOpen(false);
                      }}
                      className={`p-2.5 border cursor-pointer transition-colors ${
                        n.read ? 'bg-[#f7f3f2] border-[#e5e2e1]' : 'bg-white border-black font-semibold'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-[#747878]">
                        <span className="uppercase font-bold text-black">{n.type}</span>
                        <span>{n.timestamp}</span>
                      </div>
                      <div className="text-[11px] text-black mt-1">{n.title}</div>
                      <div className="text-[10px] text-[#5e5f5c] mt-0.5">{n.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Admin Profile & Role */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#313030]">
            <div className="w-7 h-7 rounded-full bg-[#d7ef30] text-[#191e00] font-bold flex items-center justify-center text-xs">
              {currentAdmin?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <div className="text-white font-bold leading-none text-xs">{currentAdmin?.name}</div>
              <div className="text-[9px] text-[#747878] uppercase">{currentAdmin?.roleTitle}</div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={adminLogout}
            title="Sign out of Admin Session"
            className="p-1.5 hover:bg-[#313030] text-[#747878] hover:text-white transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Body: Sidebar + Dynamic Workspace Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Desktop Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 rtl:left-auto rtl:right-0 z-50 w-64 bg-[#1c1b1b] text-white flex flex-col justify-between border-r rtl:border-r-0 rtl:border-l border-[#313030] transform md:translate-x-0 transition-transform duration-200 ease-in-out md:static md:z-auto ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full md:translate-x-0'
          }`}
        >
          {/* Mobile Close Button in Drawer */}
          <div className="p-4 border-b border-[#313030] md:hidden flex items-center justify-between">
            <span className="font-display font-bold text-sm uppercase text-white">
              Store Navigation
            </span>
            <button onClick={() => setIsSidebarOpen(false)} className="text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Navigation List */}
          <div className="p-3 space-y-5 overflow-y-auto flex-1 font-mono text-xs">
            {navItems.map((group) => (
              <div key={group.group} className="space-y-0.5">
                <span className="text-[9px] text-[#747878] uppercase font-bold tracking-widest px-2.5 block mb-1">
                  {group.group}
                </span>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as AdminTab);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-left rtl:text-right transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#d7ef30] text-[#191e00] font-bold shadow-xs'
                          : 'text-white/80 hover:bg-[#313030] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Sidebar Footer Info */}
          <div className="p-4 border-t border-[#313030] font-mono text-[10px] text-[#747878] space-y-1">
            <div className="text-white font-bold">MORV ENGINE v2.5</div>
            <div>Commercial Deadstock Protocol</div>
            <div className="text-[#d7ef30]">● Live Synchronization Active</div>
          </div>
        </aside>

        {/* Backdrop for mobile drawer */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
          />
        )}

        {/* Dynamic Workspace Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#fdf8f8]">
          <div className="max-w-7xl mx-auto">{renderActiveTabContent()}</div>
        </main>
      </div>
    </div>
  );
};
