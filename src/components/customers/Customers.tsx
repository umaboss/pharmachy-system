import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Plus, 
  User, 
  Phone,
  Mail,
  MapPin,
  Edit,
  Trash2,
  ShoppingCart,
  Calendar,
  Star,
  Receipt,
  TrendingUp,
  Package,
  Clock,
  DollarSign
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  totalPurchases: number;
  lastVisit: string;
  loyaltyPoints: number;
  isVIP: boolean;
}

interface PurchaseHistory {
  id: string;
  date: string;
  items: string[];
  total: number;
  paymentMethod: string;
  receiptNumber: string;
}

const Customers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);

  const customers: Customer[] = [
    {
      id: "1",
      name: "Ahmad Khan",
      phone: "+92 300 1234567",
      email: "ahmad.khan@email.com",
      address: "Block A, Gulberg, Lahore",
      totalPurchases: 45230,
      lastVisit: "2024-01-15",
      loyaltyPoints: 1250,
      isVIP: true
    },
    {
      id: "2",
      name: "Fatima Ali",
      phone: "+92 301 2345678",
      email: "fatima.ali@email.com",
      address: "DHA Phase 5, Karachi",
      totalPurchases: 32100,
      lastVisit: "2024-01-14",
      loyaltyPoints: 890,
      isVIP: true
    },
    {
      id: "3",
      name: "Hassan Sheikh",
      phone: "+92 302 3456789",
      email: "hassan.sheikh@email.com",
      address: "F-8, Islamabad",
      totalPurchases: 18900,
      lastVisit: "2024-01-13",
      loyaltyPoints: 420,
      isVIP: false
    },
    {
      id: "4",
      name: "Ayesha Ahmed",
      phone: "+92 303 4567890",
      email: "ayesha.ahmed@email.com",
      address: "Saddar, Rawalpindi",
      totalPurchases: 12500,
      lastVisit: "2024-01-12",
      loyaltyPoints: 310,
      isVIP: false
    },
    {
      id: "5",
      name: "Muhammad Usman",
      phone: "+92 304 5678901",
      email: "m.usman@email.com",
      address: "Cantt, Lahore",
      totalPurchases: 8750,
      lastVisit: "2024-01-10",
      loyaltyPoints: 185,
      isVIP: false
    }
  ];

  // Sample purchase history for customers
  const purchaseHistory: { [customerId: string]: PurchaseHistory[] } = {
    "1": [
      {
        id: "1",
        date: "2024-01-15",
        items: ["Paracetamol 500mg", "Vitamin D3 1000IU", "Cough Syrup 100ml"],
        total: 355,
        paymentMethod: "Card",
        receiptNumber: "RCP-20240115-001"
      },
      {
        id: "2",
        date: "2024-01-10",
        items: ["Amoxicillin 250mg", "Omeprazole 20mg"],
        total: 300,
        paymentMethod: "Cash",
        receiptNumber: "RCP-20240110-005"
      },
      {
        id: "3",
        date: "2024-01-05",
        items: ["Ibuprofen 400mg", "Eye Drops 10ml"],
        total: 180,
        paymentMethod: "Mobile",
        receiptNumber: "RCP-20240105-012"
      }
    ],
    "2": [
      {
        id: "4",
        date: "2024-01-14",
        items: ["Vitamin D3 1000IU", "Cough Syrup 100ml"],
        total: 270,
        paymentMethod: "Card",
        receiptNumber: "RCP-20240114-003"
      },
      {
        id: "5",
        date: "2024-01-08",
        items: ["Paracetamol 500mg", "Ibuprofen 400mg"],
        total: 180,
        paymentMethod: "Cash",
        receiptNumber: "RCP-20240108-008"
      }
    ],
    "3": [
      {
        id: "6",
        date: "2024-01-13",
        items: ["Amoxicillin 250mg", "Omeprazole 20mg", "Eye Drops 10ml"],
        total: 385,
        paymentMethod: "Card",
        receiptNumber: "RCP-20240113-006"
      }
    ]
  };

  const filters = ["all", "vip", "regular", "recent"];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phone.includes(searchQuery) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (selectedFilter === "vip") matchesFilter = customer.isVIP;
    if (selectedFilter === "regular") matchesFilter = !customer.isVIP;
    if (selectedFilter === "recent") {
      const lastVisit = new Date(customer.lastVisit);
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      matchesFilter = lastVisit >= threeDaysAgo;
    }
    
    return matchesSearch && matchesFilter;
  });

  const totalCustomers = customers.length;
  const vipCustomers = customers.filter(c => c.isVIP).length;
  const totalLoyaltyPoints = customers.reduce((sum, c) => sum + c.loyaltyPoints, 0);
  const averagePurchase = customers.reduce((sum, c) => sum + c.totalPurchases, 0) / customers.length;

  const startNewSale = (customer: Customer) => {
    // Store customer info in localStorage for POS to access
    localStorage.setItem('selectedCustomer', JSON.stringify(customer));
    // Navigate to POS
    navigate('/pos');
  };

  const viewPurchaseHistory = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsHistoryDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customer Management</h1>
          <p className="text-muted-foreground">Manage customer relationships and loyalty</p>
        </div>
        <Button variant="medical">
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold text-foreground">{totalCustomers}</p>
              </div>
              <User className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">VIP Customers</p>
                <p className="text-2xl font-bold text-accent">{vipCustomers}</p>
              </div>
              <Star className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Loyalty Points</p>
                <p className="text-2xl font-bold text-warning">{totalLoyaltyPoints.toLocaleString()}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Purchase</p>
                <p className="text-2xl font-bold text-success">PKR {averagePurchase.toFixed(0)}</p>
              </div>
              <Calendar className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-soft border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className="capitalize"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="shadow-soft border-0 hover:shadow-medium transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{customer.name}</h3>
                    {customer.isVIP && (
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                        <Star className="w-3 h-3 mr-1" />
                        VIP
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{customer.address}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Total Purchases</p>
                  <p className="font-semibold text-foreground">PKR {customer.totalPurchases.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Loyalty Points</p>
                  <p className="font-semibold text-warning">{customer.loyaltyPoints}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Last Visit</p>
                  <p className="font-semibold text-foreground">{new Date(customer.lastVisit).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => startNewSale(customer)}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  New Sale
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => viewPurchaseHistory(customer)}
                >
                  <Receipt className="w-4 h-4 mr-1" />
                  History
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <Card className="shadow-soft border-0">
          <CardContent className="p-12 text-center">
            <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No customers found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
            <Button variant="medical">
              <Plus className="w-4 h-4 mr-2" />
              Add First Customer
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Purchase History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Receipt className="w-5 h-5 text-primary" />
              <span>Purchase History - {selectedCustomer?.name}</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedCustomer && (
            <div className="space-y-6">
              {/* Customer Summary */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Total Purchases</p>
                      <p className="text-xl font-bold text-primary">PKR {selectedCustomer.totalPurchases.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Loyalty Points</p>
                      <p className="text-xl font-bold text-warning">{selectedCustomer.loyaltyPoints}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Last Visit</p>
                      <p className="text-lg font-semibold">{new Date(selectedCustomer.lastVisit).toLocaleDateString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant={selectedCustomer.isVIP ? "default" : "outline"}>
                        {selectedCustomer.isVIP ? "VIP" : "Regular"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Purchase History */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Purchases</h3>
                {purchaseHistory[selectedCustomer.id] ? (
                  purchaseHistory[selectedCustomer.id].map((purchase) => (
                    <Card key={purchase.id} className="hover:shadow-medium transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Receipt className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold">Receipt #{purchase.receiptNumber}</p>
                              <p className="text-sm text-muted-foreground">{purchase.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">PKR {purchase.total}</p>
                            <Badge variant="outline" className="capitalize">{purchase.paymentMethod}</Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Items Purchased:</p>
                          <div className="flex flex-wrap gap-2">
                            {purchase.items.map((item, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                <Package className="w-3 h-3 mr-1" />
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Receipt className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No purchase history</h3>
                      <p className="text-muted-foreground">This customer hasn't made any purchases yet.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;