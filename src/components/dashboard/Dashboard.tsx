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
  Download,
  Eye
} from "lucide-react";

const Dashboard = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [userRole, setUserRole] = useState<'admin' | 'manager' | 'cashier'>('cashier');
  const [activeStat, setActiveStat] = useState<string | null>(null);

  const handleStatClick = (statId: string) => {
    setActiveStat(activeStat === statId ? null : statId);
  };

  const stats = [
    {
      id: "sales",
      title: "Today's Sales",
      value: "PKR 45,230",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up"
    },
    {
      id: "items",
      title: "Items Sold",
      value: "127",
      change: "+8.2%",
      icon: ShoppingCart,
      trend: "up"
    },
    {
      id: "stock",
      title: "Low Stock Items",
      value: "23",
      change: "+3",
      icon: AlertTriangle,
      trend: "warning"
    },
    {
      id: "products",
      title: "Total Products",
      value: "1,245",
      change: "+15",
      icon: Package,
      trend: "neutral"
    }
  ];

  const recentSales = [
    { id: "INV-2024-001", customer: "Ahmad Khan", amount: "PKR 850", time: "2 min ago", items: 3 },
    { id: "INV-2024-002", customer: "Fatima Ali", amount: "PKR 1,250", time: "5 min ago", items: 5 },
    { id: "INV-2024-003", customer: "Hassan Sheikh", amount: "PKR 420", time: "12 min ago", items: 2 },
    { id: "INV-2024-004", customer: "Ayesha Ahmed", amount: "PKR 2,100", time: "18 min ago", items: 7 }
  ];

  const lowStockItems = [
    { name: "Paracetamol 500mg", current: 15, minimum: 50, expiry: "Mar 2025" },
    { name: "Amoxicillin 250mg", current: 8, minimum: 30, expiry: "Apr 2025" },
    { name: "Vitamin D3", current: 12, minimum: 25, expiry: "Jun 2025" },
    { name: "Ibuprofen 400mg", current: 5, minimum: 40, expiry: "Feb 2025" }
  ];

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {userRole === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
          </h1>
          <p className="text-muted-foreground">
            {userRole === 'admin' 
              ? 'Complete overview of all pharmacy operations' 
              : 'Welcome back, good morning!'
            }
          </p>
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          const isActive = activeStat === stat.id;
          return (
            <Card 
              key={index} 
              className={`shadow-soft border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                isActive 
                  ? 'border-green-600 shadow-lg' 
                  : 'border-gray-100 hover:border-gray-200'
              }`}
              onClick={() => handleStatClick(stat.id)}
            >
              <CardContent className={`p-6 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'text-white' 
                  : ''
              }`}
              style={isActive ? {
                background: 'linear-gradient(135deg, #1C623C 0%, #247449 50%, #6EB469 100%)'
              } : {}}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${isActive ? 'text-white' : 'text-muted-foreground'}`}>
                      {stat.title}
                    </p>
                    <p className={`text-2xl font-bold mt-2 ${isActive ? 'text-white' : 'text-foreground'}`}>
                      {stat.value}
                    </p>
                    <Badge 
                      variant="outline" 
                      className={`mt-2 ${
                        isActive 
                          ? 'bg-white/20 text-white border-white/30' 
                          : stat.trend === 'up' ? 'bg-green-100 text-green-700 border-green-300' :
                            stat.trend === 'warning' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                            'bg-gray-100 text-gray-700 border-gray-300'
                      }`}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <div className={`p-3 rounded-lg ${isActive ? 'bg-white/20' : 'bg-gray-50'}`}>
                    <IconComponent className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                </div>
                {isActive && (
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <div className="flex items-center justify-between text-xs text-white/80">
                      <span>Click to view details</span>
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sales */}
        <Card className="lg:col-span-2 shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Recent Sales</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{sale.customer}</p>
                      <p className="text-sm text-muted-foreground">{sale.id} • {sale.items} items</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{sale.amount}</p>
                    <p className="text-xs text-muted-foreground">{sale.time}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Sales
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <span>Low Stock Alert</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.map((item, index) => (
                <div key={index} className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground text-sm">{item.name}</p>
                    <Pill className="w-4 h-4 text-warning" />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Stock: {item.current}/{item.minimum}</span>
                    <span className="text-muted-foreground">{item.expiry}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-warning h-1.5 rounded-full" 
                      style={{ width: `${(item.current / item.minimum) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                Manage Inventory
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

   
    </div>
  );
};

export default Dashboard;