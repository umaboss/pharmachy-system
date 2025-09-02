import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Users, 
  UserPlus, 
  Building2, 
  Shield, 
  Stethoscope, 
  Search,
  Edit,
  Trash2,
  Eye
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  branch: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

const UserManagement = () => {
  // Test header to see if component loads
  console.log("UserManagement component is loading!");

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Fatima Ali",
      email: "fatima.ali@medibill.com",
      branch: "North Branch",
      role: "Cashier",
      status: "active",
      lastLogin: "2 hours ago",
      createdAt: "2024-01-10"
    },
    {
      id: "2",
      name: "Hassan Sheikh",
      email: "hassan.sheikh@medibill.com",
      branch: "South Branch",
      role: "Manager",
      status: "active",
      lastLogin: "4 hours ago",
      createdAt: "2024-01-08"
    },
    {
      id: "3",
      name: "Ayesha Ahmed",
      email: "ayesha.ahmed@medibill.com",
      branch: "East Branch",
      role: "Cashier",
      status: "active",
      lastLogin: "6 hours ago",
      createdAt: "2024-01-05"
    },
    {
      id: "4",
      name: "Muhammad Usman",
      email: "muhammad.usman@medibill.com",
      branch: "West Branch",
      role: "Manager",
      status: "active",
      lastLogin: "8 hours ago",
      createdAt: "2024-01-03"
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");

  const branches = [
    "Main Branch",
    "North Branch", 
    "South Branch",
    "East Branch",
    "West Branch"
  ];

  const roles = [
    { id: "admin", label: "Admin", icon: Shield, description: "Full system access" },
    { id: "manager", label: "Manager", icon: Stethoscope, description: "Branch management" },
    { id: "cashier", label: "Cashier", icon: Users, description: "Sales and billing" }
  ];

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    branch: "",
    role: "",
    password: ""
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === "all" || user.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  const handleCreateUser = () => {
    if (newUser.name && newUser.email && newUser.branch && newUser.role && newUser.password) {
      const user: User = {
        id: Date.now().toString(),
        name: newUser.name,
        email: newUser.email,
        branch: newUser.branch,
        role: newUser.role,
        status: "active",
        lastLogin: "Never",
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setUsers([...users, user]);
      setNewUser({ name: "", email: "", branch: "", role: "", password: "" });
      setIsCreateDialogOpen(false);
    }
  };

  const getRoleIcon = (role: string) => {
    const roleData = roles.find(r => r.id === role);
    if (roleData) {
      const IconComponent = roleData.icon;
      return <IconComponent className="w-4 h-4" />;
    }
    return <Users className="w-4 h-4" />;
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin": return "destructive";
      case "manager": return "default";
      case "cashier": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Test Header */}
      <div style={{ backgroundColor: 'yellow', color: 'black', padding: '20px', marginBottom: '20px' }}>
        <h1>TEST: UserManagement Component is Loading!</h1>
        <p>If you can see this yellow box, the component is working</p>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage branch users and their permissions</p>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/admin'}
          >
            ← Back to Admin Dashboard
          </Button>
        
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:opacity-90">
                <UserPlus className="w-4 h-4 mr-2" />
                Create New User
              </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>
                  Add a new user to your pharmacy system. They will receive login credentials via email.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="col-span-3"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="col-span-3"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="branch" className="text-right">Branch</Label>
                  <Select value={newUser.branch} onValueChange={(value) => setNewUser({...newUser, branch: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">Role</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          <div className="flex items-center space-x-2">
                            {getRoleIcon(role.id)}
                            <span>{role.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="col-span-3"
                    placeholder="Enter temporary password"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateUser}>
                  Create User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="outline" 
            onClick={() => {
              setNewUser({ name: "", email: "", branch: "", role: "cashier", password: "" });
              setIsCreateDialogOpen(true);
            }}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Quick Create Cashier
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-soft border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="text-sm font-medium text-muted-foreground mb-2 block">
                Search Users
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Label htmlFor="branch-filter" className="text-sm font-medium text-muted-foreground mb-2 block">
                Filter by Branch
              </Label>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger>
                  <SelectValue placeholder="All branches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="shadow-soft border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Users ({filteredUsers.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Branch</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Login</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{user.branch}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={getRoleBadgeVariant(user.role)} className="flex items-center space-x-1 w-fit">
                        {getRoleIcon(user.role)}
                        <span className="capitalize">{user.role}</span>
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge 
                        variant={user.status === 'active' ? 'default' : 'secondary'}
                        className={user.status === 'active' ? 'bg-success/10 text-success border-success/20' : ''}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {user.lastLogin}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Role Information */}
      <Card className="shadow-soft border-0">
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roles.map((role) => {
              const IconComponent = role.icon;
              return (
                <div key={role.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{role.label}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {role.id === 'admin' && 'Full system access, user management, all reports'}
                    {role.id === 'manager' && 'Branch management, inventory, sales reports'}
                    {role.id === 'cashier' && 'Sales, billing, customer management'}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
