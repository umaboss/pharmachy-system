import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Wifi,
  Clock,
  DollarSign,
  Pill,
  Calendar,
  Building2,
  UserPlus,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Eye
} from "lucide-react";

const AdminDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);

  const adminStats = [
    {
      title: "Total Revenue",
      value: "PKR 1,245,000",
      change: "+23.4%",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "Total Sales",
      value: "42,350",
      change: "+18.2%",
      icon: ShoppingCart,
      trend: "up"
    },
    {
      title: "Active Users",
      value: "156",
      change: "+12",
      icon: Users,
      trend: "up"
    },
    {
      title: "Total Branches",
      value: "8",
      change: "+2",
      icon: Building2,
      trend: "up"
    }
  ];

  const branchPerformance = [
    { name: "Main Branch", sales: 1250000, users: 45, growth: 25.4 },
    { name: "North Branch", sales: 890000, users: 32, growth: 18.7 },
    { name: "South Branch", sales: 720000, users: 28, growth: 15.2 },
    { name: "East Branch", sales: 680000, users: 25, growth: 12.8 },
    { name: "West Branch", sales: 590000, users: 22, growth: 10.5 }
  ];

  const recentUsers = [
    { name: "Fatima Ali", branch: "North Branch", role: "Cashier", status: "Active", lastLogin: "2 hours ago" },
    { name: "Hassan Sheikh", branch: "South Branch", role: "Manager", status: "Active", lastLogin: "4 hours ago" },
    { name: "Ayesha Ahmed", branch: "East Branch", role: "Cashier", status: "Active", lastLogin: "6 hours ago" },
    { name: "Muhammad Usman", branch: "West Branch", role: "Manager", status: "Active", lastLogin: "8 hours ago" }
  ];

  const topProducts = [
    { name: "Paracetamol 500mg", sales: 2450, revenue: 208250, growth: 15.2 },
    { name: "Amoxicillin 250mg", sales: 1890, revenue: 226800, growth: 8.7 },
    { name: "Vitamin D3 1000IU", sales: 1560, revenue: 234000, growth: 23.1 },
    { name: "Ibuprofen 400mg", sales: 1340, revenue: 127300, growth: -5.3 },
    { name: "Omeprazole 20mg", sales: 980, revenue: 176400, growth: 12.4 }
  ];

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Complete overview of all pharmacy operations</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className={isOnline ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>
            <Wifi className="w-3 h-3 mr-1" />
            {isOnline ? "Online" : "Offline"}
          </Badge>
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Jan 15, 2024</p>
            <p className="text-xs text-muted-foreground">Tuesday • 10:30 AM</p>
          </div>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="shadow-soft border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                    <Badge 
                      variant="outline" 
                      className={`mt-2 ${
                        stat.trend === 'up' ? 'bg-success/10 text-success border-success/20' :
                        stat.trend === 'warning' ? 'bg-warning/10 text-warning border-warning/20' :
                        'bg-muted/50 text-muted-foreground border-border'
                      }`}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    stat.trend === 'up' ? 'bg-success/10' :
                    stat.trend === 'warning' ? 'bg-warning/10' :
                    'bg-primary/10'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      stat.trend === 'up' ? 'text-success' :
                      stat.trend === 'warning' ? 'text-warning' :
                      'text-primary'
                    }`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branch Performance */}
        <Card className="lg:col-span-2 shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-primary" />
              <span>Branch Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {branchPerformance.map((branch, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-surface rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{branch.name}</p>
                      <p className="text-sm text-muted-foreground">{branch.users} users • PKR {branch.sales.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      +{branch.growth}%
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">Growth</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                View All Branches
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Recent Users</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.map((user, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground text-sm">{user.name}</p>
                    <Badge variant="outline" className="text-xs">{user.role}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p>{user.branch}</p>
                    <p>Last login: {user.lastLogin}</p>
                  </div>
                </div>
              ))}
                          <Button 
              variant="outline" 
              className="w-full" 
              size="sm"
              onClick={() => window.location.href = '/admin/users'}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add New User
            </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card className="shadow-soft border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <span>Top Selling Products (All Branches)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Rank</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Units Sold</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Growth</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-foreground">{product.name}</td>
                    <td className="py-4 px-4 text-muted-foreground">{product.sales.toLocaleString()}</td>
                    <td className="py-4 px-4 font-semibold text-foreground">PKR {product.revenue.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <Badge 
                        variant="outline" 
                        className={product.growth >= 0 ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"}
                      >
                        {product.growth >= 0 ? '+' : ''}{product.growth}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-soft border-0">
        <CardHeader>
          <CardTitle>Admin Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              className="h-20 flex-col space-y-2 bg-gradient-primary hover:opacity-90"
              onClick={() => window.location.href = '/admin/users'}
            >
              <UserPlus className="w-6 h-6" />
              <span>Create User</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Building2 className="w-6 h-6" />
              <span>Add Branch</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Download className="w-6 h-6" />
              <span>Export Data</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              onClick={() => window.location.href = '/admin/reports'}
            >
              <TrendingUp className="w-6 h-6" />
              <span>Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
