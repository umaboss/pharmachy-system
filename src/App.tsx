import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./contexts/AdminContext";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import POS from "./pages/POS";
import Login from "./pages/Login";
import InventoryPage from "./pages/Inventory";
import CustomersPage from "./pages/Customers";
import ReportsPage from "./pages/Reports";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import UserManagement from "./components/admin/UserManagement";
import AdminReports from "./components/admin/AdminReports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <MainLayout>
                <Index />
              </MainLayout>
            } />
            <Route path="/pos" element={
              <MainLayout>
                <POS />
              </MainLayout>
            } />
            <Route path="/inventory" element={
              <MainLayout>
                <InventoryPage />
              </MainLayout>
            } />
            <Route path="/customers" element={
              <MainLayout>
                <CustomersPage />
              </MainLayout>
            } />
            <Route path="/reports" element={
              <MainLayout>
                <ReportsPage />
              </MainLayout>
            } />
            <Route path="/settings" element={
              <MainLayout>
                <SettingsPage />
              </MainLayout>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <MainLayout>
                <AdminDashboard />
              </MainLayout>
            } />
            <Route path="/admin/users" element={
              <MainLayout>
                <UserManagement />
              </MainLayout>
            } />
            <Route path="/admin/reports" element={
              <MainLayout>
                <AdminReports />
              </MainLayout>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AdminProvider>
  </QueryClientProvider>
);

export default App;
