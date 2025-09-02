import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [selectedReport, setSelectedReport] = useState("sales");

  const periods = [
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "year", label: "This Year" }
  ];

  const reportTypes = [
    { id: "sales", label: "Sales Report", icon: DollarSign },
    { id: "inventory", label: "Inventory Report", icon: Package },
    { id: "customers", label: "Customer Report", icon: Users },
    { id: "products", label: "Product Performance", icon: BarChart3 }
  ];

  // Mock data for different periods
  const salesData = {
    today: {
      revenue: 45230,
      transactions: 127,
      customers: 98,
      avgTransaction: 356,
      growth: 12.5
    },
    week: {
      revenue: 312450,
      transactions: 875,
      customers: 456,
      avgTransaction: 357,
      growth: 8.3
    },
    month: {
      revenue: 1250000,
      transactions: 3420,
      customers: 1234,
      avgTransaction: 365,
      growth: 15.7
    },
    year: {
      revenue: 14500000,
      transactions: 42350,
      customers: 5678,
      avgTransaction: 342,
      growth: 23.4
    }
  };

  const currentData = salesData[selectedPeriod as keyof typeof salesData];

  const topProducts = [
    { name: "Paracetamol 500mg", sales: 245, revenue: 20825, growth: 15.2 },
    { name: "Amoxicillin 250mg", sales: 189, revenue: 22680, growth: 8.7 },
    { name: "Vitamin D3 1000IU", sales: 156, revenue: 23400, growth: 23.1 },
    { name: "Ibuprofen 400mg", sales: 134, revenue: 12730, growth: -5.3 },
    { name: "Omeprazole 20mg", sales: 98, revenue: 17640, growth: 12.4 }
  ];

  const salesByCategory = [
    { category: "Analgesics", percentage: 35, amount: 437500 },
    { category: "Antibiotics", percentage: 28, amount: 350000 },
    { category: "Vitamins", percentage: 18, amount: 225000 },
    { category: "Gastric", percentage: 12, amount: 150000 },
    { category: "Others", percentage: 7, amount: 87500 }
  ];

  const recentTransactions = [
    { id: "INV-2024-245", customer: "Ahmad Khan", amount: 850, time: "10:30 AM", items: 3 },
    { id: "INV-2024-246", customer: "Fatima Ali", amount: 1250, time: "10:25 AM", items: 5 },
    { id: "INV-2024-247", customer: "Hassan Sheikh", amount: 420, time: "10:15 AM", items: 2 },
    { id: "INV-2024-248", customer: "Ayesha Ahmed", amount: 2100, time: "10:05 AM", items: 7 },
    { id: "INV-2024-249", customer: "Muhammad Usman", amount: 680, time: "09:45 AM", items: 4 }
  ];

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Insights into your pharmacy performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Custom Range
          </Button>
          <Button variant="medical">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Period and Report Type Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle>Time Period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {periods.map((period) => (
                <Button
                  key={period.id}
                  variant={selectedPeriod === period.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period.id)}
                  className="w-full"
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle>Report Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {reportTypes.map((report) => {
                const IconComponent = report.icon;
                return (
                  <Button
                    key={report.id}
                    variant={selectedReport === report.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedReport(report.id)}
                    className="w-full justify-start"
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {report.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-foreground">PKR {currentData.revenue.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-success mr-1" />
                  <span className="text-sm text-success font-medium">+{currentData.growth}%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                <p className="text-2xl font-bold text-foreground">{currentData.transactions.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-success mr-1" />
                  <span className="text-sm text-success font-medium">+8.2%</span>
                </div>
              </div>
              <ShoppingCart className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customers</p>
                <p className="text-2xl font-bold text-foreground">{currentData.customers.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-success mr-1" />
                  <span className="text-sm text-success font-medium">+6.5%</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Transaction</p>
                <p className="text-2xl font-bold text-foreground">PKR {currentData.avgTransaction}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-success mr-1" />
                  <span className="text-sm text-success font-medium">+3.1%</span>
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Top Selling Products</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gradient-surface rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">PKR {product.revenue.toLocaleString()}</p>
                    <div className="flex items-center">
                      {product.growth >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-success mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-destructive mr-1" />
                      )}
                      <span className={`text-xs font-medium ${product.growth >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {product.growth >= 0 ? '+' : ''}{product.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-primary" />
              <span>Sales by Category</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesByCategory.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{category.category}</span>
                    <div className="text-right">
                      <span className="font-semibold text-foreground">{category.percentage}%</span>
                      <p className="text-xs text-muted-foreground">PKR {category.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="shadow-soft border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <LineChart className="w-5 h-5 text-primary" />
              <span>Recent Transactions</span>
            </div>
            <Badge variant="outline">{recentTransactions.length} transactions</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Invoice ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Items</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium text-primary">{transaction.id}</td>
                    <td className="py-4 px-4 text-foreground">{transaction.customer}</td>
                    <td className="py-4 px-4 font-semibold text-foreground">PKR {transaction.amount.toLocaleString()}</td>
                    <td className="py-4 px-4 text-muted-foreground">{transaction.items} items</td>
                    <td className="py-4 px-4 text-muted-foreground">{transaction.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;