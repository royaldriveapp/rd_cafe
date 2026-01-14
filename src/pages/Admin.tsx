import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Lock, 
  LogOut, 
  Calendar, 
  Users, 
  MessageSquare, 
  Coffee,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  Eye,
  X,
  Phone,
  Mail,
  MapPin,
  Plus,
  Save,
  Search,
  RefreshCw,
  Activity,
  Bell,
  CalendarDays,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Inbox,
  FileText,
  Utensils
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRateLimit } from "@/hooks/useRateLimit";

// Login schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required").max(50),
  password: z.string().min(1, "Password is required").max(100),
});

// Demo credentials - In production, this would be server-side with proper auth
const DEMO_CREDENTIALS = {
  username: "admin",
  password: "rdcafe2024",
};

// Types
interface Booking {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  guests: number;
  notes: string;
  createdAt: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  replied: boolean;
}

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  available: boolean;
}

// Empty state component
const EmptyState = ({ 
  icon: Icon, 
  title, 
  description,
  action,
  actionLabel
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  action?: () => void;
  actionLabel?: string;
}) => (
  <div className="text-center py-12 px-4">
    <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
      <Icon size={28} className="text-muted-foreground" />
    </div>
    <p className="font-medium text-lg">{title}</p>
    <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">{description}</p>
    {action && actionLabel && (
      <Button onClick={action} className="mt-4">
        {actionLabel}
      </Button>
    )}
  </div>
);

// Helper components
const QuickStatCard = ({ 
  label, 
  value, 
  subValue, 
  icon: Icon, 
  iconColor, 
  onClick
}: { 
  label: string; 
  value: string; 
  subValue?: string;
  icon: React.ElementType; 
  iconColor: string;
  onClick?: () => void;
}) => (
  <Card 
    className={`border-border/50 card-glow ${onClick ? 'cursor-pointer hover:border-primary/30' : ''}`}
    onClick={onClick}
  >
    <CardContent className="pt-5 pb-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">{value}</p>
            {subValue && <span className="text-sm text-muted-foreground">{subValue}</span>}
          </div>
        </div>
        <div className={`p-2.5 rounded-xl bg-secondary ${iconColor}`}>
          <Icon size={20} />
        </div>
      </div>
    </CardContent>
  </Card>
);

const StatusDot = ({ status }: { status: "healthy" | "warning" | "error" }) => {
  const colors = {
    healthy: "bg-green-500",
    warning: "bg-amber-500",
    error: "bg-red-500"
  };
  return (
    <span className="relative flex h-2 w-2">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors[status]} opacity-75`}></span>
      <span className={`relative inline-flex rounded-full h-2 w-2 ${colors[status]}`}></span>
    </span>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const config = {
    confirmed: { icon: CheckCircle2, label: "Confirmed", className: "bg-green-100 text-green-700 border-green-200" },
    pending: { icon: Clock, label: "Pending", className: "bg-amber-100 text-amber-700 border-amber-200" },
    cancelled: { icon: XCircle, label: "Cancelled", className: "bg-red-100 text-red-700 border-red-200" },
  }[status] || { icon: AlertCircle, label: status, className: "" };
  
  const IconComponent = config.icon;
  
  return (
    <Badge variant="outline" className={`text-xs gap-1 ${config.className}`}>
      <IconComponent size={12} />
      {config.label}
    </Badge>
  );
};

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Data states - start empty for production-ready state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  
  // Filter states
  const [bookingFilter, setBookingFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");
  const [bookingTypeFilter, setBookingTypeFilter] = useState<string>("all");
  const [bookingSearch, setBookingSearch] = useState("");
  const [messageFilter, setMessageFilter] = useState<"all" | "unread" | "unreplied">("all");
  const [menuCategoryFilter, setMenuCategoryFilter] = useState<string>("all");
  const [menuAvailabilityFilter, setMenuAvailabilityFilter] = useState<"all" | "available" | "unavailable">("all");
  
  // UI states
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  
  // Modal states
  const [viewBooking, setViewBooking] = useState<Booking | null>(null);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [viewMessage, setViewMessage] = useState<Message | null>(null);
  const [editMenuItem, setEditMenuItem] = useState<MenuItem | null>(null);
  const [showAddMenuItem, setShowAddMenuItem] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState<Partial<MenuItem>>({ 
    name: "", 
    category: "Coffee", 
    price: 0, 
    description: "", 
    available: true 
  });
  
  const { isRateLimited, recordAttempt, getRemainingCooldown, getRemainingAttempts } = useRateLimit({
    maxAttempts: 5,
    windowMs: 300000,
    cooldownMs: 60000,
  });

  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getRemainingCooldown();
      setCooldownSeconds(remaining);
    }, 1000);
    return () => clearInterval(interval);
  }, [getRemainingCooldown]);

  // Filtered data
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchesStatus = bookingFilter === "all" || b.status === bookingFilter;
      const matchesType = bookingTypeFilter === "all" || b.type === bookingTypeFilter;
      const matchesSearch = bookingSearch === "" || 
        b.name.toLowerCase().includes(bookingSearch.toLowerCase()) ||
        b.email.toLowerCase().includes(bookingSearch.toLowerCase());
      return matchesStatus && matchesType && matchesSearch;
    });
  }, [bookings, bookingFilter, bookingTypeFilter, bookingSearch]);

  const filteredMessages = useMemo(() => {
    return messages.filter(m => {
      if (messageFilter === "unread") return !m.read;
      if (messageFilter === "unreplied") return !m.replied;
      return true;
    });
  }, [messages, messageFilter]);

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = menuCategoryFilter === "all" || item.category === menuCategoryFilter;
      const matchesAvailability = menuAvailabilityFilter === "all" || 
        (menuAvailabilityFilter === "available" ? item.available : !item.available);
      return matchesCategory && matchesAvailability;
    });
  }, [menuItems, menuCategoryFilter, menuAvailabilityFilter]);

  // Computed stats
  const stats = useMemo(() => {
    const pendingBookings = bookings.filter(b => b.status === "pending").length;
    const confirmedBookings = bookings.filter(b => b.status === "confirmed").length;
    const cancelledBookings = bookings.filter(b => b.status === "cancelled").length;
    const totalGuests = bookings.filter(b => b.status !== "cancelled").reduce((sum, b) => sum + b.guests, 0);
    const unreadMessages = messages.filter(m => !m.read).length;
    const unrepliedMessages = messages.filter(m => !m.replied).length;
    const availableItems = menuItems.filter(m => m.available).length;
    const unavailableItems = menuItems.filter(m => !m.available).length;
    
    return {
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      totalGuests,
      unreadMessages,
      unrepliedMessages,
      availableItems,
      unavailableItems,
      totalItems: menuItems.length,
      totalBookings: bookings.length,
      totalMessages: messages.length,
    };
  }, [bookings, messages, menuItems]);

  // Unique booking types for filter
  const bookingTypes = useMemo(() => {
    return [...new Set(bookings.map(b => b.type))];
  }, [bookings]);

  // Menu categories
  const menuCategories = useMemo(() => {
    return [...new Set(menuItems.map(item => item.category))];
  }, [menuItems]);

  const handleRefresh = () => {
    setLastRefresh(new Date());
    toast({ title: "Data Refreshed", description: "Dashboard data has been updated" });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (isRateLimited()) {
      toast({
        title: "Too Many Attempts",
        description: `Please wait ${cooldownSeconds} seconds before trying again.`,
        variant: "destructive",
      });
      return;
    }

    const result = loginSchema.safeParse(loginData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    recordAttempt();

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (
      loginData.username === DEMO_CREDENTIALS.username &&
      loginData.password === DEMO_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
    } else {
      toast({
        title: "Invalid Credentials",
        description: `Incorrect username or password. ${getRemainingAttempts()} attempts remaining.`,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginData({ username: "", password: "" });
    toast({
      title: "Logged Out",
      description: "You've been successfully logged out.",
    });
  };

  // Booking actions
  const updateBookingStatus = (id: string, status: Booking["status"]) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    toast({ title: "Booking Updated", description: `Status changed to ${status}` });
  };

  const saveBookingEdit = () => {
    if (!editBooking) return;
    setBookings(prev => prev.map(b => b.id === editBooking.id ? editBooking : b));
    setEditBooking(null);
    toast({ title: "Booking Saved", description: "Changes have been saved" });
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    toast({ title: "Booking Deleted", description: "Booking has been removed" });
  };

  const confirmAllPending = () => {
    const pendingCount = stats.pendingBookings;
    if (pendingCount === 0) return;
    setBookings(prev => prev.map(b => b.status === "pending" ? { ...b, status: "confirmed" } : b));
    toast({ title: "All Pending Confirmed", description: `${pendingCount} bookings confirmed` });
  };

  // Message actions
  const markMessageRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const markMessageReplied = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, replied: true, read: true } : m));
    toast({ title: "Marked as Replied", description: "Message status updated" });
  };

  const markAllAsRead = () => {
    const unreadCount = stats.unreadMessages;
    if (unreadCount === 0) return;
    setMessages(prev => prev.map(m => ({ ...m, read: true })));
    toast({ title: "All Marked Read", description: `${unreadCount} messages marked as read` });
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    setViewMessage(null);
    toast({ title: "Message Deleted", description: "Message has been removed" });
  };

  // Menu actions
  const toggleMenuAvailability = (id: string) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
    toast({ title: "Availability Updated" });
  };

  const saveMenuEdit = () => {
    if (!editMenuItem) return;
    setMenuItems(prev => prev.map(item => item.id === editMenuItem.id ? editMenuItem : item));
    setEditMenuItem(null);
    toast({ title: "Menu Item Saved", description: "Changes have been saved" });
  };

  const addMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.category || !newMenuItem.price) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    const item: MenuItem = {
      id: crypto.randomUUID(),
      name: newMenuItem.name,
      category: newMenuItem.category,
      price: newMenuItem.price,
      description: newMenuItem.description || "",
      available: newMenuItem.available ?? true,
    };
    setMenuItems(prev => [...prev, item]);
    setNewMenuItem({ name: "", category: "Coffee", price: 0, description: "", available: true });
    setShowAddMenuItem(false);
    toast({ title: "Menu Item Added", description: `${item.name} has been added` });
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    toast({ title: "Menu Item Deleted" });
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary/30 to-background p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <Card className="card-feature-gradient border-border/50 shadow-xl">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-serif">Admin Access</CardTitle>
                <CardDescription>
                  Enter your credentials to access the dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={loginData.username}
                      onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="Enter username"
                      disabled={isLoading}
                      className={errors.username ? "border-destructive" : ""}
                    />
                    {errors.username && (
                      <p className="text-xs text-destructive">{errors.username}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter password"
                      disabled={isLoading}
                      className={errors.password ? "border-destructive" : ""}
                    />
                    {errors.password && (
                      <p className="text-xs text-destructive">{errors.password}</p>
                    )}
                  </div>
                  
                  {isRateLimited() && (
                    <div className="p-3 bg-destructive/10 rounded-lg text-sm text-destructive flex items-center gap-2">
                      <AlertCircle size={16} />
                      Too many attempts. Wait {cooldownSeconds}s
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading || isRateLimited()}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
                
                <div className="mt-6 p-3 bg-secondary/50 rounded-lg">
                  <p className="text-xs text-muted-foreground text-center">
                    Demo: admin / rdcafe2024
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Layout>
    );
  }

  // Main dashboard
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-secondary/30 border-b border-border/50">
          <div className="container-cafe py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-serif">Admin Dashboard</h1>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <StatusDot status="healthy" />
                    <span>System Healthy</span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    Last updated: {lastRefresh.toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleRefresh}>
                  <RefreshCw size={14} className="mr-1.5" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut size={14} className="mr-1.5" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              <QuickStatCard 
                label="Pending Bookings" 
                value={stats.pendingBookings.toString()} 
                icon={Clock} 
                iconColor="text-amber-600"
              />
              <QuickStatCard 
                label="Confirmed" 
                value={stats.confirmedBookings.toString()} 
                icon={CheckCircle} 
                iconColor="text-green-600"
              />
              <QuickStatCard 
                label="Unread Messages" 
                value={stats.unreadMessages.toString()} 
                icon={MessageSquare} 
                iconColor="text-blue-600"
              />
              <QuickStatCard 
                label="Menu Items" 
                value={stats.totalItems.toString()} 
                subValue={`${stats.availableItems} available`}
                icon={Coffee} 
                iconColor="text-primary"
              />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container-cafe py-6">
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="bookings" className="gap-1.5">
                <CalendarDays size={14} />
                Bookings
                {stats.pendingBookings > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                    {stats.pendingBookings}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="messages" className="gap-1.5">
                <Bell size={14} />
                Messages
                {stats.unreadMessages > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                    {stats.unreadMessages}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="menu" className="gap-1.5">
                <Utensils size={14} />
                Menu
              </TabsTrigger>
            </TabsList>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-4">
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg">Booking Management</CardTitle>
                      <CardDescription>View and manage all reservations</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {stats.pendingBookings > 0 && (
                        <Button size="sm" variant="outline" onClick={confirmAllPending}>
                          <CheckCircle size={14} className="mr-1.5" />
                          Confirm All Pending
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Filters */}
                  {bookings.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      <div className="relative flex-1 min-w-[200px]">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          placeholder="Search by name or email..." 
                          value={bookingSearch}
                          onChange={(e) => setBookingSearch(e.target.value)}
                          className="pl-9 h-9"
                        />
                      </div>
                      <Select value={bookingFilter} onValueChange={(v) => setBookingFilter(v as typeof bookingFilter)}>
                        <SelectTrigger className="w-[130px] h-9">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      {bookingTypes.length > 0 && (
                        <Select value={bookingTypeFilter} onValueChange={setBookingTypeFilter}>
                          <SelectTrigger className="w-[140px] h-9">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            {bookingTypes.map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {filteredBookings.length > 0 ? (
                    <div className="space-y-3">
                      {filteredBookings.map((booking) => (
                        <div 
                          key={booking.id}
                          className="p-4 bg-secondary/30 rounded-xl border border-border/30"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-background">
                                <Calendar size={18} className="text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{booking.name}</p>
                                  <StatusBadge status={booking.status} />
                                </div>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                  {booking.type} • {booking.date} at {booking.time} • {booking.guests} guests
                                </p>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                  <span className="flex items-center gap-1">
                                    <Mail size={12} />
                                    {booking.email}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Phone size={12} />
                                    {booking.phone}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setViewBooking(booking)}>
                                <Eye size={14} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditBooking(booking)}>
                                <Edit size={14} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteBooking(booking.id)}>
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </div>
                          
                          {booking.status === "pending" && (
                            <div className="flex gap-2 mt-3 pt-3 border-t border-border/30">
                              <Button size="sm" onClick={() => updateBookingStatus(booking.id, "confirmed")}>
                                <CheckCircle size={14} className="mr-1.5" />
                                Confirm
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => updateBookingStatus(booking.id, "cancelled")}>
                                <XCircle size={14} className="mr-1.5" />
                                Cancel
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : bookings.length > 0 ? (
                    <EmptyState 
                      icon={Search}
                      title="No matching bookings"
                      description="Try adjusting your filters to see more results"
                    />
                  ) : (
                    <EmptyState 
                      icon={Calendar}
                      title="No bookings yet"
                      description="When customers make reservations, they'll appear here for you to manage"
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-4">
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg">Messages</CardTitle>
                      <CardDescription>Customer inquiries and feedback</CardDescription>
                    </div>
                    {stats.unreadMessages > 0 && (
                      <Button size="sm" variant="outline" onClick={markAllAsRead}>
                        <CheckCircle size={14} className="mr-1.5" />
                        Mark All Read
                      </Button>
                    )}
                  </div>
                  
                  {/* Filters */}
                  {messages.length > 0 && (
                    <div className="flex gap-2 mt-4">
                      <Select value={messageFilter} onValueChange={(v) => setMessageFilter(v as typeof messageFilter)}>
                        <SelectTrigger className="w-[140px] h-9">
                          <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Messages</SelectItem>
                          <SelectItem value="unread">Unread</SelectItem>
                          <SelectItem value="unreplied">Unreplied</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {filteredMessages.length > 0 ? (
                    <div className="space-y-2">
                      {filteredMessages.map((msg) => (
                        <div 
                          key={msg.id}
                          className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                            !msg.read 
                              ? 'bg-primary/5 border-primary/20 hover:bg-primary/10' 
                              : 'bg-secondary/30 border-border/30 hover:bg-secondary/50'
                          }`}
                          onClick={() => {
                            markMessageRead(msg.id);
                            setViewMessage(msg);
                          }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium truncate">{msg.name}</p>
                                {!msg.read && (
                                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                )}
                                {msg.replied && (
                                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                    Replied
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm font-medium mt-0.5">{msg.subject}</p>
                              <p className="text-sm text-muted-foreground truncate mt-0.5">{msg.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{msg.date}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); setViewMessage(msg); }}>
                                <Eye size={14} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }}>
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : messages.length > 0 ? (
                    <EmptyState 
                      icon={Search}
                      title="No matching messages"
                      description="Try adjusting your filters to see more results"
                    />
                  ) : (
                    <EmptyState 
                      icon={Inbox}
                      title="No messages yet"
                      description="When customers send inquiries through your contact form, they'll appear here"
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Menu Tab */}
            <TabsContent value="menu" className="space-y-4">
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg">Menu Management</CardTitle>
                      <CardDescription>Add, edit, and manage menu items</CardDescription>
                    </div>
                    <Button size="sm" onClick={() => setShowAddMenuItem(true)}>
                      <Plus size={14} className="mr-1.5" />
                      Add Item
                    </Button>
                  </div>
                  
                  {/* Filters */}
                  {menuItems.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {menuCategories.length > 0 && (
                        <Select value={menuCategoryFilter} onValueChange={setMenuCategoryFilter}>
                          <SelectTrigger className="w-[140px] h-9">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {menuCategories.map(cat => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      <Select value={menuAvailabilityFilter} onValueChange={(v) => setMenuAvailabilityFilter(v as typeof menuAvailabilityFilter)}>
                        <SelectTrigger className="w-[140px] h-9">
                          <SelectValue placeholder="Availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Items</SelectItem>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="unavailable">Unavailable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {filteredMenuItems.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filteredMenuItems.map((item) => (
                        <div 
                          key={item.id}
                          className={`p-4 rounded-xl border transition-colors ${
                            item.available 
                              ? 'bg-background border-border/50' 
                              : 'bg-secondary/50 border-border/30 opacity-75'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.category}</p>
                              <p className="text-lg font-semibold text-primary mt-1">₹{item.price}</p>
                            </div>
                            <Switch
                              checked={item.available}
                              onCheckedChange={() => toggleMenuAvailability(item.id)}
                            />
                          </div>
                          {item.description && (
                            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                          )}
                          <div className="flex gap-1 mt-3">
                            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setEditMenuItem(item)}>
                              <Edit size={12} className="mr-1" />
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive" onClick={() => deleteMenuItem(item.id)}>
                              <Trash2 size={12} className="mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : menuItems.length > 0 ? (
                    <EmptyState 
                      icon={Search}
                      title="No matching items"
                      description="Try adjusting your filters to see more results"
                    />
                  ) : (
                    <EmptyState 
                      icon={Coffee}
                      title="No menu items yet"
                      description="Add your first menu item to get started"
                      action={() => setShowAddMenuItem(true)}
                      actionLabel="Add Menu Item"
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* View Booking Modal */}
        <Dialog open={!!viewBooking} onOpenChange={() => setViewBooking(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
            </DialogHeader>
            {viewBooking && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <StatusBadge status={viewBooking.status} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium">{viewBooking.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium">{viewBooking.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date & Time</p>
                    <p className="font-medium">{viewBooking.date} at {viewBooking.time}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Guests</p>
                    <p className="font-medium">{viewBooking.guests}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{viewBooking.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium">{viewBooking.phone}</p>
                  </div>
                </div>
                {viewBooking.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p className="text-sm mt-1 p-3 bg-secondary/50 rounded-lg">{viewBooking.notes}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Booking Modal */}
        <Dialog open={!!editBooking} onOpenChange={() => setEditBooking(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Booking</DialogTitle>
            </DialogHeader>
            {editBooking && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input 
                      type="date" 
                      value={editBooking.date}
                      onChange={(e) => setEditBooking({...editBooking, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input 
                      type="time" 
                      value={editBooking.time}
                      onChange={(e) => setEditBooking({...editBooking, time: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Guests</Label>
                  <Input 
                    type="number" 
                    value={editBooking.guests}
                    onChange={(e) => setEditBooking({...editBooking, guests: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select 
                    value={editBooking.status} 
                    onValueChange={(v) => setEditBooking({...editBooking, status: v as Booking["status"]})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea 
                    value={editBooking.notes}
                    onChange={(e) => setEditBooking({...editBooking, notes: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditBooking(null)}>Cancel</Button>
              <Button onClick={saveBookingEdit}>
                <Save size={14} className="mr-1.5" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Message Modal */}
        <Dialog open={!!viewMessage} onOpenChange={() => setViewMessage(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{viewMessage?.subject}</DialogTitle>
              <DialogDescription>
                From {viewMessage?.name} • {viewMessage?.date}
              </DialogDescription>
            </DialogHeader>
            {viewMessage && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} className="text-muted-foreground" />
                    {viewMessage.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone size={14} className="text-muted-foreground" />
                    {viewMessage.phone}
                  </span>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{viewMessage.message}</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => deleteMessage(viewMessage!.id)}>
                <Trash2 size={14} className="mr-1.5" />
                Delete
              </Button>
              {viewMessage && !viewMessage.replied && (
                <Button onClick={() => markMessageReplied(viewMessage.id)}>
                  <CheckCircle size={14} className="mr-1.5" />
                  Mark as Replied
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Menu Item Modal */}
        <Dialog open={!!editMenuItem} onOpenChange={() => setEditMenuItem(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Menu Item</DialogTitle>
            </DialogHeader>
            {editMenuItem && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input 
                    value={editMenuItem.name}
                    onChange={(e) => setEditMenuItem({...editMenuItem, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input 
                      value={editMenuItem.category}
                      onChange={(e) => setEditMenuItem({...editMenuItem, category: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Price (₹)</Label>
                    <Input 
                      type="number"
                      value={editMenuItem.price}
                      onChange={(e) => setEditMenuItem({...editMenuItem, price: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    value={editMenuItem.description}
                    onChange={(e) => setEditMenuItem({...editMenuItem, description: e.target.value})}
                    rows={2}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Available</Label>
                  <Switch
                    checked={editMenuItem.available}
                    onCheckedChange={(checked) => setEditMenuItem({...editMenuItem, available: checked})}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditMenuItem(null)}>Cancel</Button>
              <Button onClick={saveMenuEdit}>
                <Save size={14} className="mr-1.5" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Menu Item Modal */}
        <Dialog open={showAddMenuItem} onOpenChange={setShowAddMenuItem}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Menu Item</DialogTitle>
              <DialogDescription>Add a new item to your menu</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input 
                  value={newMenuItem.name}
                  onChange={(e) => setNewMenuItem({...newMenuItem, name: e.target.value})}
                  placeholder="e.g. Cappuccino"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Input 
                    value={newMenuItem.category}
                    onChange={(e) => setNewMenuItem({...newMenuItem, category: e.target.value})}
                    placeholder="e.g. Coffee"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price (₹) *</Label>
                  <Input 
                    type="number"
                    value={newMenuItem.price || ""}
                    onChange={(e) => setNewMenuItem({...newMenuItem, price: parseFloat(e.target.value) || 0})}
                    placeholder="180"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  value={newMenuItem.description}
                  onChange={(e) => setNewMenuItem({...newMenuItem, description: e.target.value})}
                  placeholder="Brief description of the item"
                  rows={2}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Available immediately</Label>
                <Switch
                  checked={newMenuItem.available}
                  onCheckedChange={(checked) => setNewMenuItem({...newMenuItem, available: checked})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddMenuItem(false)}>Cancel</Button>
              <Button onClick={addMenuItem}>
                <Plus size={14} className="mr-1.5" />
                Add Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Admin;
