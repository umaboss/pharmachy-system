import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Plus, 
  Filter, 
  Package, 
  AlertTriangle,
  Calendar,
  Barcode,
  Edit,
  Trash2,
  Download,
  Upload,
  Pill,
  Droplets,
  Syringe,
  X,
  Save
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  batch: string;
  expiry: string;
  supplier: string;
  barcode: string;
  unitType: string;
  unitsPerPack: number;
  requiresPrescription: boolean;
  description?: string;
}

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Paracetamol 500mg",
      category: "Analgesics",
      price: 85,
      stock: 150,
      minStock: 50,
      batch: "BT001",
      expiry: "2025-03-15",
      supplier: "ABC Pharma",
      barcode: "1234567890123",
      unitType: "tablets",
      unitsPerPack: 20,
      requiresPrescription: false,
      description: "Pain reliever and fever reducer"
    },
    {
      id: "2",
      name: "Amoxicillin 250mg",
      category: "Antibiotics",
      price: 120,
      stock: 25,
      minStock: 30,
      batch: "BT002",
      expiry: "2025-04-20",
      supplier: "XYZ Medical",
      barcode: "2345678901234",
      unitType: "capsules",
      unitsPerPack: 10,
      requiresPrescription: true,
      description: "Broad-spectrum antibiotic"
    },
    {
      id: "3",
      name: "Vitamin D3 1000IU",
      category: "Vitamins",
      price: 150,
      stock: 45,
      minStock: 25,
      batch: "BT003",
      expiry: "2025-06-10",
      supplier: "Health Plus",
      barcode: "3456789012345",
      unitType: "tablets",
      unitsPerPack: 30,
      requiresPrescription: false,
      description: "Vitamin D supplement for bone health"
    },
    {
      id: "4",
      name: "Ibuprofen 400mg",
      category: "Analgesics",
      price: 95,
      stock: 5,
      minStock: 40,
      batch: "BT004",
      expiry: "2025-02-28",
      supplier: "ABC Pharma",
      barcode: "4567890123456",
      unitType: "tablets",
      unitsPerPack: 15,
      requiresPrescription: false,
      description: "Anti-inflammatory pain reliever"
    },
    {
      id: "5",
      name: "Omeprazole 20mg",
      category: "Gastric",
      price: 180,
      stock: 60,
      minStock: 30,
      batch: "BT005",
      expiry: "2025-08-15",
      supplier: "Med Solutions",
      barcode: "5678901234567",
      unitType: "capsules",
      unitsPerPack: 14,
      requiresPrescription: true,
      description: "Proton pump inhibitor for acid reflux"
    },
    {
      id: "6",
      name: "Cough Syrup 100ml",
      category: "Cough & Cold",
      price: 120,
      stock: 30,
      minStock: 20,
      batch: "BT006",
      expiry: "2025-05-10",
      supplier: "ABC Pharma",
      barcode: "6789012345678",
      unitType: "bottles",
      unitsPerPack: 1,
      requiresPrescription: false,
      description: "Relieves cough and throat irritation"
    },
    {
      id: "7",
      name: "Eye Drops 10ml",
      category: "Ophthalmic",
      price: 85,
      stock: 40,
      minStock: 25,
      batch: "BT007",
      expiry: "2025-07-20",
      supplier: "Eye Care Plus",
      barcode: "7890123456789",
      unitType: "bottles",
      unitsPerPack: 1,
      requiresPrescription: false,
      description: "Lubricating eye drops for dry eyes"
    },
    {
      id: "8",
      name: "Insulin Injection",
      category: "Diabetes",
      price: 450,
      stock: 15,
      minStock: 20,
      batch: "BT008",
      expiry: "2025-01-15",
      supplier: "Diabetes Care",
      barcode: "8901234567890",
      unitType: "vials",
      unitsPerPack: 1,
      requiresPrescription: true,
      description: "Insulin for diabetes management"
    }
  ]);

  // Form state for adding new medicine
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    minStock: "",
    batch: "",
    expiry: "",
    supplier: "",
    barcode: "",
    unitType: "",
    unitsPerPack: "",
    requiresPrescription: false,
    description: ""
  });

  const categories = ["Analgesics", "Antibiotics", "Vitamins", "Gastric", "Cough & Cold", "Ophthalmic", "Diabetes"];
  const unitTypes = ["tablets", "capsules", "bottles", "vials", "syrups", "injections"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.barcode.includes(searchQuery) ||
                         product.batch.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return { status: "out", color: "destructive" };
    if (stock <= minStock) return { status: "low", color: "warning" };
    return { status: "good", color: "success" };
  };

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

  const generateBatchNumber = () => {
    const randomNum = Math.floor(Math.random() * 1000);
    return `BT${randomNum.toString().padStart(3, '0')}`;
  };

  const generateBarcode = () => {
    const randomNum = Math.floor(Math.random() * 10000000000000);
    return randomNum.toString().padStart(13, '0');
  };

  const handleAddMedicine = () => {
    if (!newMedicine.name || !newMedicine.category || !newMedicine.price || !newMedicine.stock) {
      alert("Please fill all required fields!");
      return;
    }

    const medicine: Product = {
      id: String(Date.now()),
      name: newMedicine.name,
      category: newMedicine.category,
      price: parseFloat(newMedicine.price),
      stock: parseInt(newMedicine.stock),
      minStock: parseInt(newMedicine.minStock) || 10,
      batch: newMedicine.batch || generateBatchNumber(),
      expiry: newMedicine.expiry || "2025-12-31",
      supplier: newMedicine.supplier || "Default Supplier",
      barcode: newMedicine.barcode || generateBarcode(),
      unitType: newMedicine.unitType || "tablets",
      unitsPerPack: parseInt(newMedicine.unitsPerPack) || 10,
      requiresPrescription: newMedicine.requiresPrescription,
      description: newMedicine.description
    };

    setProducts([...products, medicine]);
    
    // Reset form
    setNewMedicine({
      name: "",
      category: "",
      price: "",
      stock: "",
      minStock: "",
      batch: "",
      expiry: "",
      supplier: "",
      barcode: "",
      unitType: "",
      unitsPerPack: "",
      requiresPrescription: false,
      description: ""
    });
    
    setIsAddDialogOpen(false);
  };

  const handleDeleteMedicine = (id: string) => {
    if (confirm("Are you sure you want to delete this medicine?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pharmacy Inventory</h1>
          <p className="text-muted-foreground">Track and manage your medicine stock</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          
          {/* Add Medicine Dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="text-white bg-[linear-gradient(135deg,#1C623C_0%,#247449_50%,#6EB469_100%)] hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Add Medicine
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5 text-primary" />
                  <span>Add New Medicine</span>
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b pb-2">Basic Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Medicine Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Paracetamol 500mg"
                      value={newMedicine.name}
                      onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={newMedicine.category} onValueChange={(value) => setNewMedicine({...newMedicine, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the medicine..."
                      value={newMedicine.description}
                      onChange={(e) => setNewMedicine({...newMedicine, description: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unitType">Unit Type</Label>
                    <Select value={newMedicine.unitType} onValueChange={(value) => setNewMedicine({...newMedicine, unitType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit type" />
                      </SelectTrigger>
                      <SelectContent>
                        {unitTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unitsPerPack">Units per Pack</Label>
                    <Input
                      id="unitsPerPack"
                      type="number"
                      placeholder="e.g., 20"
                      value={newMedicine.unitsPerPack}
                      onChange={(e) => setNewMedicine({...newMedicine, unitsPerPack: e.target.value})}
                    />
                  </div>
                </div>

                {/* Pricing & Stock */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b pb-2">Pricing & Stock</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (PKR) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="e.g., 85"
                      value={newMedicine.price}
                      onChange={(e) => setNewMedicine({...newMedicine, price: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Current Stock *</Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="e.g., 150"
                      value={newMedicine.stock}
                      onChange={(e) => setNewMedicine({...newMedicine, stock: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minStock">Minimum Stock Level</Label>
                    <Input
                      id="minStock"
                      type="number"
                      placeholder="e.g., 50"
                      value={newMedicine.minStock}
                      onChange={(e) => setNewMedicine({...newMedicine, minStock: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplier">Supplier</Label>
                    <Input
                      id="supplier"
                      placeholder="e.g., ABC Pharma"
                      value={newMedicine.supplier}
                      onChange={(e) => setNewMedicine({...newMedicine, supplier: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="batch">Batch Number</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="batch"
                        placeholder="e.g., BT001"
                        value={newMedicine.batch}
                        onChange={(e) => setNewMedicine({...newMedicine, batch: e.target.value})}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setNewMedicine({...newMedicine, batch: generateBatchNumber()})}
                      >
                        Generate
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      type="date"
                      value={newMedicine.expiry}
                      onChange={(e) => setNewMedicine({...newMedicine, expiry: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="barcode">Barcode</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="barcode"
                        placeholder="e.g., 1234567890123"
                        value={newMedicine.barcode}
                        onChange={(e) => setNewMedicine({...newMedicine, barcode: e.target.value})}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setNewMedicine({...newMedicine, barcode: generateBarcode()})}
                      >
                        Generate
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      id="requiresPrescription"
                      type="checkbox"
                      checked={newMedicine.requiresPrescription}
                      onChange={(e) => setNewMedicine({...newMedicine, requiresPrescription: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="requiresPrescription">Requires Prescription</Label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddMedicine}
                  className="text-white bg-[linear-gradient(135deg,#1C623C_0%,#247449_50%,#6EB469_100%)] hover:opacity-90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Add Medicine
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Medicines</p>
                <p className="text-2xl font-bold text-foreground">{totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                <p className="text-2xl font-bold text-warning">{lowStockCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-foreground">PKR {totalValue.toLocaleString()}</p>
              </div>
              <Calendar className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold text-foreground">{categories.length}</p>
              </div>
              <Filter className="w-8 h-8 text-accent" />
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
                placeholder="Search by name, barcode, batch, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`capitalize ${
                    selectedCategory === category
                      ? "text-white bg-[linear-gradient(135deg,#1C623C_0%,#247449_50%,#6EB469_100%)]"
                      : ""
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="shadow-soft border-0">
        <CardHeader>
          <CardTitle>Medicines ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Medicine</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Unit Info</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Batch/Expiry</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Supplier</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock, product.minStock);
                  return (
                    <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-foreground">{product.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Barcode className="w-3 h-3 mr-1" />
                            {product.barcode}
                          </p>
                          {product.description && (
                            <p className="text-xs text-muted-foreground mt-1">{product.description}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{product.category}</Badge>
                      </td>
                      <td className="py-4 px-4 font-medium text-foreground">
                        PKR {product.price}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{product.stock}</span>
                          <Badge variant="outline" className={`
                            ${stockStatus.color === 'destructive' ? 'bg-destructive/10 text-destructive border-destructive/20' : ''}
                            ${stockStatus.color === 'warning' ? 'bg-warning/10 text-warning border-warning/20' : ''}
                            ${stockStatus.color === 'success' ? 'bg-success/10 text-success border-success/20' : ''}
                          `}>
                            {stockStatus.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {getUnitIcon(product.unitType)}
                          <div className="text-sm">
                            <p className="font-medium capitalize">{product.unitType}</p>
                            <p className="text-muted-foreground">{product.unitsPerPack} per pack</p>
                          </div>
                        </div>
                        {product.requiresPrescription && (
                          <Badge variant="destructive" className="text-xs mt-1">Rx Required</Badge>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <p className="font-medium">{product.batch}</p>
                          <p className="text-muted-foreground">{new Date(product.expiry).toLocaleDateString()}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {product.supplier}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteMedicine(product.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;