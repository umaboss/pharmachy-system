import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  Settings,
  Stethoscope,
  Wifi,
  WifiOff,
  Bell,
  Shield
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const [isOnline, setIsOnline] = useState(true);
  const { userRole } = useAdmin();

  // Cashier items - basic POS operations
  const cashierItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Point of Sale", url: "/pos", icon: ShoppingCart },
    { title: "Customers", url: "/customers", icon: Users },
  ];

  // Manager items - includes inventory and reports
  const managerItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Point of Sale", url: "/pos", icon: ShoppingCart },
    { title: "Inventory", url: "/inventory", icon: Package },
    { title: "Customers", url: "/customers", icon: Users },
    { title: "Reports", url: "/reports", icon: TrendingUp },
  ];

  // Admin items - full access
  const adminItems = [
    { title: "Admin Dashboard", url: "/admin", icon: Shield },
    { title: "User Management", url: "/admin/users", icon: Users },
    { title: "Admin Reports", url: "/admin/reports", icon: TrendingUp },
  ];

  // Get menu items based on role
  const getMainMenuItems = () => {
    if (userRole === "admin") {
      return managerItems;
    } else if (userRole === "manager") {
      return managerItems;
    } else {
      return cashierItems;
    }
  };

  const managementItems = [
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  // Check if a route is active
  const isRouteActive = (url: string) => {
    if (url === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(url);
  };

  // Navigation classes - active & hover styling
  const getNavCls = (url: string) => {
    const isActive = isRouteActive(url);
    return isActive
      ? "flex items-center gap-3 px-3 py-2 rounded-md font-medium text-green-700  border-l-4 border-green-600 shadow-sm transition-all duration-200"
      : "flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200";
  };

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} bg-white border-r border-gray-200 shadow-sm`} collapsible="icon">
      <SidebarContent className="flex flex-col h-full">
        {/* Header */}
        <div className={`p-4 border-b border-gray-200 ${collapsed ? "px-2" : ""}`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div className="flex-1">
                <h2 className="font-bold text-gray-900">MediBill Pulse</h2>
                <p className="text-xs text-gray-500">Pharmacy POS</p>
                <Badge 
                  variant="outline" 
                  className={`text-xs mt-1 ${
                    userRole === "admin"
                      ? "bg-purple-50 text-purple-700 border-purple-200"
                      : userRole === "manager"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-green-50 text-green-700 border-green-200"
                  }`}
                >
                  {userRole === "admin"
                    ? "System Admin"
                    : userRole === "manager"
                    ? "Branch Manager"
                    : "Cashier"}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Connection Status */}
        {!collapsed && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className={
                  isOnline
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
                }
              >
                {isOnline ? (
                  <Wifi className="w-3 h-3 mr-1" />
                ) : (
                  <WifiOff className="w-3 h-3 mr-1" />
                )}
                {isOnline ? "Online" : "Offline"}
              </Badge>
              <div className="flex items-center space-x-1">
                <Bell className="w-4 h-4 text-gray-400" />
                <Badge
                  variant="destructive"
                  className="w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  3
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Main Menu
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {getMainMenuItems().map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls(item.url)}>
                      <item.icon className={`w-5 h-5 ${
                        isRouteActive(item.url) ? "text-green-600" : "text-gray-500"
                      }`} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Management */}
        {userRole === "admin" && (
          <SidebarGroup>
            {!collapsed && (
              <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Admin Management
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls(item.url)}>
                        <item.icon className={`w-5 h-5 ${
                          isRouteActive(item.url) ? "text-green-600" : "text-gray-500"
                        }`} />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Management */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Management
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <item.icon className={`w-5 h-5 ${
                        isRouteActive(item.url) ? "text-green-600" : "text-gray-500"
                      }`} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Info */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                userRole === "admin"
                  ? "bg-purple-100"
                  : userRole === "manager"
                  ? "bg-blue-100"
                  : "bg-green-100"
              }`}>
                <span className={`text-sm font-medium ${
                  userRole === "admin"
                    ? "text-purple-700"
                    : userRole === "manager"
                    ? "text-blue-700"
                    : "text-green-700"
                }`}>
                  {userRole === "admin" ? "SA" : userRole === "manager" ? "BM" : "AK"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {userRole === "admin" 
                    ? "System Administrator" 
                    : userRole === "manager" 
                    ? "Branch Manager" 
                    : "Ahmad Khan"
                  }
                </p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              <p>Device: TABLET-001</p>
              <p>Last Sync: 2 min ago</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
