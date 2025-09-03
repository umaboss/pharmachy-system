import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  ShoppingCart,
  Search,
  Scan,
  Plus,
  Minus,
  Trash2,
  User,
  CreditCard,
  Banknote,
  Smartphone,
  Receipt,
  Pill,
  Package,
  Droplets,
  Syringe,
  X,
  Printer,
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import React from "react"; // Added missing import

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unitType: string;
  unitPrice: number;
  totalPrice: number;
  batch: string;
  expiry: string;
  instructions?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  unitType: string;
  unitsPerPack: number;
  category: string;
  requiresPrescription: boolean;
}

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

interface Receipt {
  id: string;
  customer: Customer | null;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  date: string;
  time: string;
  cashier: string;
  receiptNumber: string;
}

const POSInterface = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<'cash' | 'card' | 'mobile'>('cash');
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState<Receipt | null>(null);
  const [cashAmount, setCashAmount] = useState("");
  const [changeAmount, setChangeAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending');
  const [isNewCustomerDialogOpen, setIsNewCustomerDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  // Load selected customer from localStorage if coming from Customer Management
  React.useEffect(() => {
    const savedCustomer = localStorage.getItem('selectedCustomer');
    if (savedCustomer) {
      try {
        const customer = JSON.parse(savedCustomer);
        setSelectedCustomer(customer);
        localStorage.removeItem('selectedCustomer'); // Clear after loading
      } catch (error) {
        console.error('Error loading customer:', error);
      }
    }
  }, []);

  // Sample pharmacy products with unit types
  const products: Product[] = [
    {
      id: "1",
      name: "Paracetamol 500mg",
      price: 85,
      stock: 150,
      unitType: "tablets",
      unitsPerPack: 20,
      category: "Analgesics",
      requiresPrescription: false
    },
    {
      id: "2",
      name: "Amoxicillin 250mg",
      price: 120,
      stock: 25,
      unitType: "capsules",
      unitsPerPack: 10,
      category: "Antibiotics",
      requiresPrescription: true
    },
    {
      id: "3",
      name: "Vitamin D3 1000IU",
      price: 150,
      stock: 45,
      unitType: "tablets",
      unitsPerPack: 30,
      category: "Vitamins",
      requiresPrescription: false
    },
    {
      id: "4",
      name: "Ibuprofen 400mg",
      price: 95,
      stock: 80,
      unitType: "tablets",
      unitsPerPack: 15,
      category: "Analgesics",
      requiresPrescription: false
    },
    {
      id: "5",
      name: "Omeprazole 20mg",
      price: 180,
      stock: 60,
      unitType: "capsules",
      unitsPerPack: 14,
      category: "Gastric",
      requiresPrescription: true
    },
    {
      id: "6",
      name: "Cough Syrup 100ml",
      price: 120,
      stock: 30,
      unitType: "bottles",
      unitsPerPack: 1,
      category: "Cough & Cold",
      requiresPrescription: false
    },
    {
      id: "7",
      name: "Eye Drops 10ml",
      price: 85,
      stock: 40,
      unitType: "bottles",
      unitsPerPack: 1,
      category: "Ophthalmic",
      requiresPrescription: false
    },
    {
      id: "8",
      name: "Insulin Injection",
      price: 450,
      stock: 15,
      unitType: "vials",
      unitsPerPack: 1,
      category: "Diabetes",
      requiresPrescription: true
    }
  ];

  // Sample customers
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
    }
  ];

  const categories = ["all", "Analgesics", "Antibiotics", "Vitamins", "Gastric", "Cough & Cold", "Ophthalmic", "Diabetes"];

  const getUnitIcon = (unitType: string) => {
    switch (unitType) {
      case "tablets":
      case "capsules":
        return <Pill className="w-4 h-4" />;
      case "bottles":
        return <Droplets className="w-4 h-4" />;
      case "vials":
        return <Syringe className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const addToCart = (product: Product, quantity: number, unitType: string) => {
    const existingItem = cart.find(item =>
      item.name === product.name && item.unitType === unitType
    );

    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + quantity);
    } else {
      const unitPrice = unitType === "pack" ? product.price : product.price / product.unitsPerPack;
      const totalPrice = unitPrice * quantity;

      setCart([...cart, {
        id: String(Date.now()),
        name: product.name,
        price: product.price,
        quantity: quantity,
        unitType: unitType,
        unitPrice: unitPrice,
        totalPrice: totalPrice,
        batch: "BT" + String(Math.floor(Math.random() * 1000)).padStart(3, '0'),
        expiry: "Dec 2025",
        instructions: unitType === "pack" ? "Take as directed" : `Take ${quantity} ${unitType} as directed`
      }]);
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item =>
        item.id === id ? {
          ...item,
          quantity: newQuantity,
          totalPrice: item.unitPrice * newQuantity
        } : item
      ));
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * 0.17; // 17% GST
  const total = subtotal + tax;

  const paymentMethods = [
    { id: 'cash', label: 'Cash', icon: Banknote },
    { id: 'card', label: 'Card', icon: CreditCard },
    { id: 'mobile', label: 'Mobile', icon: Smartphone }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCashPayment = () => {
    const cash = parseFloat(cashAmount);
    if (cash >= total) {
      setChangeAmount(cash - total);
      setPaymentStatus('completed');
    } else {
      alert("Cash amount must be greater than or equal to total amount!");
    }
  };

  const handleCardPayment = () => {
    setPaymentStatus('processing');
    // Simulate card payment processing
    setTimeout(() => {
      setPaymentStatus('completed');
    }, 2000);
  };

  const handleMobilePayment = () => {
    setPaymentStatus('processing');
    // Simulate mobile payment processing
    setTimeout(() => {
      setPaymentStatus('completed');
    }, 2000);
  };

  const processPayment = () => {
    if (selectedPayment === 'cash') {
      handleCashPayment();
    } else if (selectedPayment === 'card') {
      handleCardPayment();
    } else if (selectedPayment === 'mobile') {
      handleMobilePayment();
    }
  };

  const generateReceipt = () => {
    const now = new Date();
    const receipt: Receipt = {
      id: String(Date.now()),
      customer: selectedCustomer,
      items: cart,
      subtotal,
      tax,
      total,
      paymentMethod: selectedPayment,
      paymentStatus: paymentStatus === 'completed' ? 'Paid' : 'Pending',
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      cashier: "Dr. Ahmed Khan",
      receiptNumber: `RCP-${String(now.getFullYear())}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
    };

    setCurrentReceipt(receipt);
    setIsReceiptDialogOpen(true);

    // Reset cart and form
    setCart([]);
    setSelectedCustomer(null);
    setCashAmount("");
    setChangeAmount(0);
    setPaymentStatus('pending');
  };

  const addNewCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone) {
      alert("Please enter customer name and phone number!");
      return;
    }

    const customer: Customer = {
      id: String(Date.now()),
      name: newCustomer.name,
      phone: newCustomer.phone,
      email: newCustomer.email || "",
      address: newCustomer.address || "",
      totalPurchases: 0,
      lastVisit: new Date().toISOString().split('T')[0],
      loyaltyPoints: 0,
      isVIP: false
    };

    // Add to customers list
    customers.push(customer);

    // Set as selected customer
    setSelectedCustomer(customer);

    // Reset form and close dialog
    setNewCustomer({
      name: "",
      phone: "",
      email: "",
      address: ""
    });
    setIsNewCustomerDialogOpen(false);
  };

  const printReceipt = () => {
    window.print();
  };

  const downloadReceipt = () => {
    // Implementation for downloading receipt as PDF
    alert("Receipt download functionality will be implemented here");
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Product Search & Selection */}
        <Card className="lg:col-span-2 shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-primary" />
              <span>Pharmacy Product Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by medicine name, barcode, or batch..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button size="lg" variant="outline" className="px-4">
                <Scan className="w-5 h-5" />
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`capitalize ${selectedCategory === category
                      ? "text-white bg-[linear-gradient(135deg,#1C623C_0%,#247449_50%,#6EB469_100%)]"
                      : ""
                    }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="cursor-pointer hover:shadow-medium transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-foreground">{product.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            {getUnitIcon(product.unitType)}
                            <span className="text-xs text-muted-foreground capitalize">
                              {product.unitType} • {product.unitsPerPack} per pack
                            </span>
                          </div>
                        </div>
                        {product.requiresPrescription && (
                          <Badge variant="secondary" className="text-xs">Rx Required</Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">PKR {product.price}</span>
                        <Badge variant="outline" className="text-xs">
                          {product.stock} left
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => addToCart(product, 1, "pack")}
                          >
                            <Package className="w-4 h-4 mr-1" />
                            Pack
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => addToCart(product, 1, product.unitType)}
                          >
                            {getUnitIcon(product.unitType)}
                            <span className="ml-1">1 {product.unitType.slice(0, -1)}</span>
                          </Button>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => addToCart(product, 5, product.unitType)}
                          >
                            {getUnitIcon(product.unitType)}
                            <span className="ml-1">5 {product.unitType}</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => addToCart(product, 10, product.unitType)}
                          >
                            {getUnitIcon(product.unitType)}
                            <span className="ml-1">10 {product.unitType}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cart & Checkout */}
        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <span>Cart ({cart.length})</span>
              </div>

              {/* Customer Selection */}
              <div className="flex items-center space-x-2">
                <Dialog open={isCustomerDialogOpen} onOpenChange={setIsCustomerDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <User className="w-4 h-4 mr-1" />
                      {selectedCustomer ? selectedCustomer.name.split(' ')[0] : 'Customer'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Select Customer</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {/* Add New Customer Button */}
                      <div className="p-3 border-2 border-dashed border-[#1C623C]/30 rounded-lg cursor-pointer hover:bg-[linear-gradient(135deg,#1C623C_0%,#247449_50%,#6EB469_100%)]/5 transition-colors"
                        onClick={() => {
                          setIsCustomerDialogOpen(false);
                          setIsNewCustomerDialogOpen(true);
                        }}>
                        <div className="text-center">
                          <Plus className="w-6 h-6 mx-auto text-[#1C623C] mb-2" />
                          <p className="font-medium text-[#1C623C]">Add New Customer</p>
                          <p className="text-xs text-muted-foreground">Create new customer profile</p>
                        </div>
                      </div>

                      {/* Existing Customers */}
                      {customers.map((customer) => (
                        <div
                          key={customer.id}
                          className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setIsCustomerDialogOpen(false);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{customer.name}</h4>
                              <p className="text-sm text-muted-foreground">{customer.phone}</p>
                            </div>
                            {customer.isVIP && (
                              <Badge variant="outline" className="bg-accent/10 text-accent">
                                VIP
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>

                {selectedCustomer && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCustomer(null)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Customer Information */}
            {selectedCustomer && (
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{selectedCustomer.name}</h4>
                      <p className="text-xs text-muted-foreground">{selectedCustomer.phone}</p>
                    </div>
                  </div>
                  {selectedCustomer.isVIP && (
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 text-xs">
                      VIP
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="p-3 bg-gradient-surface rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground">{item.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        {getUnitIcon(item.unitType)}
                        <span className="text-xs text-muted-foreground">
                          {item.quantity} {item.unitType} • PKR {item.unitPrice.toFixed(2)} each
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Batch: {item.batch} • Exp: {item.expiry}
                      </p>
                      {item.instructions && (
                        <p className="text-xs text-blue-600 mt-1 font-medium">
                          💊 {item.instructions}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateQuantity(item.id, 0)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">PKR {item.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}

              {cart.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Cart is empty</p>
                  <p className="text-xs">Search and add medicines to get started</p>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <>
                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">PKR {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST (17%)</span>
                    <span className="font-medium">PKR {tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">PKR {total.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                {/* Payment Methods */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">Payment Method</p>
                  <div className="grid grid-cols-3 gap-2">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id as any)}
                          className={`p-3 rounded-lg border text-center transition-all ${selectedPayment === method.id
                              ? 'text-white bg-[linear-gradient(135deg,#1C623C_0%,#247449_50%,#6EB469_100%)] border-transparent'
                              : 'bg-card hover:bg-muted/50 border-border'
                            }`}
                        >
                          <IconComponent className="w-4 h-4 mx-auto mb-1" />
                          <span className="text-xs font-medium">{method.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Cash Payment Input */}
                {selectedPayment === 'cash' && (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="cashAmount">Cash Amount</Label>
                      <Input
                        id="cashAmount"
                        type="number"
                        placeholder="Enter cash amount"
                        value={cashAmount}
                        onChange={(e) => setCashAmount(e.target.value)}
                      />
                    </div>
                    {changeAmount > 0 && (
                      <div className="text-sm text-success font-medium">
                        Change: PKR {changeAmount.toFixed(2)}
                      </div>
                    )}
                  </div>
                )}

                {/* Payment Status */}
                {paymentStatus === 'processing' && (
                  <div className="flex items-center space-x-2 text-warning">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Processing payment...</span>
                  </div>
                )}

                {paymentStatus === 'completed' && (
                  <div className="flex items-center space-x-2 text-success">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Payment completed!</span>
                  </div>
                )}

                {/* Checkout Button */}
                                <Button 
                  className="w-full h-12 text-white bg-[linear-gradient(135deg,#1C623C_0%,#247449_50%,#6EB469_100%)] hover:opacity-90 transition-opacity"
                  onClick={processPayment}
                  disabled={paymentStatus === 'processing'}
                >
                  <Receipt className="w-5 h-5 mr-2" />
                  {paymentStatus === 'completed' ? 'Generate Receipt' : 'Process Payment'}
                </Button>

                {/* Generate Receipt Button */}
                {paymentStatus === 'completed' && (
                                    <Button 
                    className="w-full h-12 text-white bg-[linear-gradient(135deg,#1C623C_0%,#247449_50%,#6EB469_100%)] hover:opacity-90 transition-opacity"
                    onClick={generateReceipt}
                  >
                    <Receipt className="w-5 h-5 mr-2" />
                    Generate Receipt
                  </Button>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Receipt Dialog */}
      <Dialog open={isReceiptDialogOpen} onOpenChange={setIsReceiptDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Pharmacy Receipt</span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={printReceipt}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" size="sm" onClick={downloadReceipt}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          {currentReceipt && (
            <div className="space-y-6 print:p-6">
              {/* Receipt Header */}
              <div className="text-center border-b pb-4">
                <h2 className="text-2xl font-bold text-primary">MediBill Pulse Pharmacy</h2>
                <p className="text-muted-foreground">Your Health, Our Priority</p>
                <div className="flex justify-between text-sm mt-4">
                  <div>
                    <p><strong>Receipt:</strong> {currentReceipt.receiptNumber}</p>
                    <p><strong>Date:</strong> {currentReceipt.date}</p>
                  </div>
                  <div>
                    <p><strong>Time:</strong> {currentReceipt.time}</p>
                    <p><strong>Cashier:</strong> {currentReceipt.cashier}</p>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              {currentReceipt.customer && (
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Name:</strong> {currentReceipt.customer.name}</p>
                      <p><strong>Phone:</strong> {currentReceipt.customer.phone}</p>
                    </div>
                    <div>
                      <p><strong>Email:</strong> {currentReceipt.customer.email}</p>
                      <p><strong>Address:</strong> {currentReceipt.customer.address}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Items */}
              <div className="space-y-3">
                <h3 className="font-semibold">Items Purchased</h3>
                {currentReceipt.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-dashed">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} {item.unitType} × PKR {item.unitPrice.toFixed(2)}
                      </p>
                      {item.instructions && (
                        <p className="text-xs text-blue-600 mt-1">{item.instructions}</p>
                      )}
                    </div>
                    <p className="font-semibold">PKR {item.totalPrice.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>PKR {currentReceipt.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (17%):</span>
                  <span>PKR {currentReceipt.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span className="text-primary">PKR {currentReceipt.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Info */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Payment Method:</strong> {currentReceipt.paymentMethod.toUpperCase()}</p>
                    <p><strong>Status:</strong> {currentReceipt.paymentStatus}</p>
                  </div>
                  {selectedPayment === 'cash' && changeAmount > 0 && (
                    <div>
                      <p><strong>Cash Received:</strong> PKR {parseFloat(cashAmount).toFixed(2)}</p>
                      <p><strong>Change:</strong> PKR {changeAmount.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-sm text-muted-foreground border-t pt-4">
                <p>Thank you for choosing MediBill Pulse Pharmacy!</p>
                <p>Please keep this receipt for your records</p>
                <p className="mt-2">
                  <strong>Important:</strong> Follow dosage instructions carefully.
                  Consult your doctor if you have any questions.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Customer Dialog */}
      <Dialog open={isNewCustomerDialogOpen} onOpenChange={setIsNewCustomerDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5 text-primary" />
              <span>Add New Customer</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input
                id="customerName"
                placeholder="Enter customer name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerPhone">Phone Number *</Label>
              <Input
                id="customerPhone"
                placeholder="Enter phone number"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerEmail">Email (Optional)</Label>
              <Input
                id="customerEmail"
                type="email"
                placeholder="Enter email address"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerAddress">Address (Optional)</Label>
              <Input
                id="customerAddress"
                placeholder="Enter address"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setIsNewCustomerDialogOpen(false)}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={addNewCustomer}
              className="text-white bg-[linear-gradient(135deg,#1C623C_0%,#247449_50%,#6EB469_100%)] hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default POSInterface;