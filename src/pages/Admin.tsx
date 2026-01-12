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
import { Progress } from "@/components/ui/progress";
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
  TrendingUp,
  TrendingDown,
  Coffee,
  AlertTriangle,
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
  Filter,
  Search,
  RefreshCw,
  Activity,
  Zap,
  Bell,
  BarChart3,
  CalendarDays,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRateLimit } from "@/hooks/useRateLimit";

// Login schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required").max(50),
  password: z.string().min(1, "Password is required").max(100),
});

// Demo credentials - In production, this would be server-side
const DEMO_CREDENTIALS = {
  username: "admin",
  password: "rdcafe2024",
};

// Types
interface Booking {
  id: number;
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
  id: number;
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
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  available: boolean;
}

// Initial mock data with more entries for trends
const initialBookings: Booking[] = [
  { id: 1, type: "Birthday", name: "John Doe", email: "john@email.com", phone: "+91 98765 43210", date: "2024-01-15", time: "18:00", status: "pending", guests: 25, notes: "Vegan options needed", createdAt: "2024-01-10" },
  { id: 2, type: "Board Room", name: "Tech Corp", email: "hr@techcorp.com", phone: "+91 98765 43211", date: "2024-01-16", time: "10:00", status: "confirmed", guests: 8, notes: "Projector required", createdAt: "2024-01-09" },
  { id: 3, type: "Business Lounge", name: "Sarah Smith", email: "sarah@email.com", phone: "+91 98765 43212", date: "2024-01-17", time: "14:00", status: "pending", guests: 3, notes: "", createdAt: "2024-01-11" },
  { id: 4, type: "Birthday", name: "Emily Johnson", email: "emily@email.com", phone: "+91 98765 43213", date: "2024-01-18", time: "19:00", status: "confirmed", guests: 15, notes: "Surprise party - keep quiet!", createdAt: "2024-01-08" },
  { id: 5, type: "Board Room", name: "Startup Inc", email: "team@startup.io", phone: "+91 98765 43214", date: "2024-01-19", time: "09:00", status: "confirmed", guests: 6, notes: "Morning meeting", createdAt: "2024-01-12" },
  { id: 6, type: "Business Lounge", name: "Michael Chen", email: "m.chen@email.com", phone: "+91 98765 43215", date: "2024-01-20", time: "16:00", status: "pending", guests: 4, notes: "Client meeting", createdAt: "2024-01-13" },
];

const initialMessages: Message[] = [
  { id: 1, name: "Alice Brown", email: "alice@email.com", phone: "+91 98765 43220", subject: "Catering inquiry", message: "Hi, I'm interested in your catering services for a corporate event of 50 people. Can you share the menu options and pricing?", date: "2024-01-14", read: false, replied: false },
  { id: 2, name: "Bob Wilson", email: "bob@email.com", phone: "+91 98765 43221", subject: "Feedback", message: "Had a wonderful experience at your café last weekend. The coffee was excellent and the ambiance was perfect for our family gathering.", date: "2024-01-13", read: true, replied: true },
  { id: 3, name: "Carol Davis", email: "carol@email.com", phone: "+91 98765 43222", subject: "Event booking question", message: "Do you have availability for a birthday party on Feb 20th? We're looking to book for approximately 30 guests.", date: "2024-01-12", read: false, replied: false },
  { id: 4, name: "David Lee", email: "david@email.com", phone: "+91 98765 43223", subject: "Menu inquiry", message: "Do you offer gluten-free options? My daughter has celiac disease.", date: "2024-01-11", read: true, replied: false },
];

const initialMenuItems: MenuItem[] = [
  { id: 1, name: "Espresso", category: "Coffee", price: 120, description: "Rich, bold single shot of espresso", available: true },
  { id: 2, name: "Cappuccino", category: "Coffee", price: 180, description: "Espresso with steamed milk foam", available: true },
  { id: 3, name: "Croissant", category: "Pastries", price: 150, description: "Buttery, flaky French pastry", available: true },
  { id: 4, name: "Chocolate Cake", category: "Desserts", price: 250, description: "Rich chocolate layer cake", available: false },
  { id: 5, name: "Caesar Salad", category: "Food", price: 320, description: "Romaine lettuce with caesar dressing", available: true },
  { id: 6, name: "Latte", category: "Coffee", price: 200, description: "Smooth espresso with steamed milk", available: true },
  { id: 7, name: "Blueberry Muffin", category: "Pastries", price: 130, description: "Fresh blueberry muffin", available: true },
  { id: 8, name: "Green Tea", category: "Beverages", price: 100, description: "Premium Japanese green tea", available: true },
];

// Helper components
const TrendIndicator = ({ value, label, positive = true }: { value: string; label: string; positive?: boolean }) => (
  <div className="flex items-center gap-1 text-xs">
    {positive ? (
      <ArrowUpRight size={12} className="text-green-600" />
    ) : (
      <ArrowDownRight size={12} className="text-amber-600" />
    )}
    <span className={positive ? "text-green-600" : "text-amber-600"}>{value}</span>
    <span className="text-muted-foreground">{label}</span>
  </div>
);

const QuickStatCard = ({ 
  label, 
  value, 
  subValue, 
  icon: Icon, 
  iconColor, 
  trend,
  trendPositive = true,
  onClick
}: { 
  label: string; 
  value: string; 
  subValue?: string;
  icon: React.ElementType; 
  iconColor: string;
  trend?: string;
  trendPositive?: boolean;
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
          {trend && <TrendIndicator value={trend} label="vs last week" positive={trendPositive} />}
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

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Data states
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  
  // Filter states
  const [bookingFilter, setBookingFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");
  const [bookingTypeFilter, setBookingTypeFilter] = useState<string>("all");
  const [bookingSearch, setBookingSearch] = useState("");
  const [messageFilter, setMessageFilter] = useState<"all" | "unread" | "unreplied">("all");
  const [menuCategoryFilter, setMenuCategoryFilter] = useState<string>("all");
  const [menuAvailabilityFilter, setMenuAvailabilityFilter] = useState<"all" | "available" | "unavailable">("all");
  
  // UI states
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);
  const [expandedMessage, setExpandedMessage] = useState<number | null>(null);
  const [expandedMenuItem, setExpandedMenuItem] = useState<number | null>(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  
  // Modal states
  const [viewBooking, setViewBooking] = useState<Booking | null>(null);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [viewMessage, setViewMessage] = useState<Message | null>(null);
  const [editMenuItem, setEditMenuItem] = useState<MenuItem | null>(null);
  const [showAddMenuItem, setShowAddMenuItem] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState<Partial<MenuItem>>({ name: "", category: "Coffee", price: 0, description: "", available: true });
  
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

  // Enhanced computed stats
  const stats = useMemo(() => {
    const pendingBookings = bookings.filter(b => b.status === "pending").length;
    const confirmedBookings = bookings.filter(b => b.status === "confirmed").length;
    const cancelledBookings = bookings.filter(b => b.status === "cancelled").length;
    const totalGuests = bookings.filter(b => b.status !== "cancelled").reduce((sum, b) => sum + b.guests, 0);
    const unreadMessages = messages.filter(m => !m.read).length;
    const unrepliedMessages = messages.filter(m => !m.replied).length;
    const availableItems = menuItems.filter(m => m.available).length;
    const unavailableItems = menuItems.filter(m => !m.available).length;
    
    // Booking type breakdown
    const bookingsByType = bookings.reduce((acc, b) => {
      acc[b.type] = (acc[b.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Category breakdown
    const menuByCategory = menuItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Average guests per booking
    const avgGuests = bookings.length > 0 
      ? Math.round(totalGuests / bookings.filter(b => b.status !== "cancelled").length) 
      : 0;
    
    // Revenue estimate (mock)
    const estimatedRevenue = confirmedBookings * 5000 + pendingBookings * 3000;
    
    return {
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      totalGuests,
      avgGuests,
      unreadMessages,
      unrepliedMessages,
      availableItems,
      unavailableItems,
      totalItems: menuItems.length,
      bookingsByType,
      menuByCategory,
      estimatedRevenue,
      confirmationRate: bookings.length > 0 
        ? Math.round((confirmedBookings / bookings.length) * 100) 
        : 0,
      responseRate: messages.length > 0 
        ? Math.round((messages.filter(m => m.replied).length / messages.length) * 100) 
        : 0,
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
  const updateBookingStatus = (id: number, status: Booking["status"]) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    toast({ title: "Booking Updated", description: `Status changed to ${status}` });
  };

  const saveBookingEdit = () => {
    if (!editBooking) return;
    setBookings(prev => prev.map(b => b.id === editBooking.id ? editBooking : b));
    setEditBooking(null);
    toast({ title: "Booking Saved", description: "Changes have been saved" });
  };

  const deleteBooking = (id: number) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    toast({ title: "Booking Deleted", description: "Booking has been removed" });
  };

  const confirmAllPending = () => {
    setBookings(prev => prev.map(b => b.status === "pending" ? { ...b, status: "confirmed" } : b));
    toast({ title: "All Pending Confirmed", description: `${stats.pendingBookings} bookings confirmed` });
  };

  // Message actions
  const markMessageRead = (id: number) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const markMessageReplied = (id: number) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, replied: true, read: true } : m));
    toast({ title: "Marked as Replied", description: "Message status updated" });
  };

  const markAllAsRead = () => {
    setMessages(prev => prev.map(m => ({ ...m, read: true })));
    toast({ title: "All Marked Read", description: `${stats.unreadMessages} messages marked as read` });
  };

  const deleteMessage = (id: number) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    setViewMessage(null);
    toast({ title: "Message Deleted", description: "Message has been removed" });
  };

  // Menu actions
  const toggleMenuAvailability = (id: number) => {
    setMenuItems(prev => prev.map(m => m.id === id ? { ...m, available: !m.available } : m));
    toast({ title: "Availability Updated" });
  };

  const saveMenuEdit = () => {
    if (!editMenuItem) return;
    setMenuItems(prev => prev.map(m => m.id === editMenuItem.id ? editMenuItem : m));
    setEditMenuItem(null);
    toast({ title: "Menu Item Saved" });
  };

  const addMenuItem = () => {
    const newItem: MenuItem = {
      id: Math.max(...menuItems.map(m => m.id)) + 1,
      name: newMenuItem.name || "",
      category: newMenuItem.category || "Coffee",
      price: newMenuItem.price || 0,
      description: newMenuItem.description || "",
      available: newMenuItem.available ?? true,
    };
    setMenuItems(prev => [...prev, newItem]);
    setNewMenuItem({ name: "", category: "Coffee", price: 0, description: "", available: true });
    setShowAddMenuItem(false);
    toast({ title: "Item Added", description: "New menu item has been added" });
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems(prev => prev.filter(m => m.id !== id));
    toast({ title: "Item Deleted" });
  };

  const markAllAvailable = () => {
    setMenuItems(prev => prev.map(m => ({ ...m, available: true })));
    toast({ title: "All Items Available", description: "All menu items are now available" });
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md px-4"
          >
            <Card className="border-border/50 shadow-card">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto p-4 rounded-full bg-primary/10 w-fit">
                  <Lock className="text-primary" size={32} />
                </div>
                <div>
                  <CardTitle className="font-serif text-2xl">Admin Login</CardTitle>
                  <CardDescription className="mt-2">
                    Enter your credentials to access the dashboard
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={loginData.username}
                      onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                      placeholder="Enter username"
                      className={errors.username ? "border-destructive" : ""}
                      autoComplete="username"
                      disabled={isRateLimited()}
                    />
                    {errors.username && (
                      <p className="text-sm text-destructive">{errors.username}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      placeholder="Enter password"
                      className={errors.password ? "border-destructive" : ""}
                      autoComplete="current-password"
                      disabled={isRateLimited()}
                    />
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>

                  {isRateLimited() && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-sm text-destructive">
                      <AlertTriangle size={16} />
                      <span>Too many attempts. Wait {cooldownSeconds}s</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="warm"
                    className="w-full"
                    disabled={isLoading || isRateLimited()}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>

                <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    <strong>Demo credentials:</strong><br />
                    Username: admin | Password: rdcafe2024
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-24 pb-16">
        <div className="container-cafe">
          {/* Header with System Status */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-serif text-3xl md:text-4xl">Admin Dashboard</h1>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <StatusDot status="healthy" />
                  <span className="text-xs font-medium text-green-700">System Healthy</span>
                </div>
              </div>
              <p className="text-muted-foreground mt-1 flex items-center gap-2">
                <span>Manage your café operations</span>
                <span className="text-xs text-muted-foreground/60">• Last updated: {lastRefresh.toLocaleTimeString()}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
                <RefreshCw size={14} />
                Refresh
              </Button>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <QuickStatCard 
              label="Pending Bookings"
              value={stats.pendingBookings.toString()}
              subValue={`of ${bookings.length} total`}
              icon={Calendar}
              iconColor="text-amber-500"
              trend="+2"
              trendPositive={true}
              onClick={() => setBookingFilter("pending")}
            />
            <QuickStatCard 
              label="Expected Guests"
              value={stats.totalGuests.toString()}
              subValue={`~${stats.avgGuests} avg`}
              icon={Users}
              iconColor="text-primary"
              trend="+15%"
              trendPositive={true}
            />
            <QuickStatCard 
              label="Unread Messages"
              value={stats.unreadMessages.toString()}
              subValue={`${stats.unrepliedMessages} unreplied`}
              icon={MessageSquare}
              iconColor="text-blue-500"
              trend={stats.unreadMessages > 2 ? "+3" : "-1"}
              trendPositive={stats.unreadMessages <= 2}
              onClick={() => setMessageFilter("unread")}
            />
            <QuickStatCard 
              label="Menu Items"
              value={`${stats.availableItems}`}
              subValue={`of ${stats.totalItems} available`}
              icon={Coffee}
              iconColor="text-green-500"
            />
          </div>

          {/* Secondary Metrics Row */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <Card className="border-border/50">
              <CardContent className="pt-4 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">Booking Confirmation Rate</span>
                  <span className="text-sm font-bold">{stats.confirmationRate}%</span>
                </div>
                <Progress value={stats.confirmationRate} className="h-1.5" />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>{stats.confirmedBookings} confirmed</span>
                  <span>{stats.cancelledBookings} cancelled</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border/50">
              <CardContent className="pt-4 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">Message Response Rate</span>
                  <span className="text-sm font-bold">{stats.responseRate}%</span>
                </div>
                <Progress value={stats.responseRate} className="h-1.5" />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>{messages.filter(m => m.replied).length} replied</span>
                  <span>{stats.unrepliedMessages} pending</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border/50">
              <CardContent className="pt-4 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">Menu Availability</span>
                  <span className="text-sm font-bold">{Math.round((stats.availableItems / stats.totalItems) * 100)}%</span>
                </div>
                <Progress value={(stats.availableItems / stats.totalItems) * 100} className="h-1.5" />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>{stats.availableItems} available</span>
                  <span>{stats.unavailableItems} unavailable</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="bookings" className="gap-2">
                <Calendar size={16} />
                Bookings
                {stats.pendingBookings > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">{stats.pendingBookings}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="messages" className="gap-2">
                <MessageSquare size={16} />
                Messages
                {stats.unreadMessages > 0 && (
                  <Badge className="ml-1 h-5 px-1.5 text-xs bg-primary">{stats.unreadMessages}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="menu" className="gap-2">
                <Coffee size={16} />
                Menu
              </TabsTrigger>
            </TabsList>

            {/* BOOKINGS TAB */}
            <TabsContent value="bookings">
              <Card className="border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Bookings</CardTitle>
                      <CardDescription>
                        {filteredBookings.length} bookings {bookingFilter !== "all" && `(${bookingFilter})`}
                      </CardDescription>
                    </div>
                    
                    {/* Filters and Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          placeholder="Search name or email..." 
                          value={bookingSearch}
                          onChange={(e) => setBookingSearch(e.target.value)}
                          className="pl-9 h-9 w-48"
                        />
                      </div>
                      <Select value={bookingFilter} onValueChange={(v) => setBookingFilter(v as typeof bookingFilter)}>
                        <SelectTrigger className="h-9 w-32">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={bookingTypeFilter} onValueChange={setBookingTypeFilter}>
                        <SelectTrigger className="h-9 w-36">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          {bookingTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {stats.pendingBookings > 0 && (
                        <Button size="sm" variant="default" onClick={confirmAllPending} className="gap-1">
                          <CheckCircle2 size={14} />
                          Confirm All ({stats.pendingBookings})
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Quick Type Summary */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                    {Object.entries(stats.bookingsByType).map(([type, count]) => (
                      <Badge 
                        key={type} 
                        variant="secondary" 
                        className={`cursor-pointer ${bookingTypeFilter === type ? 'bg-primary text-primary-foreground' : ''}`}
                        onClick={() => setBookingTypeFilter(bookingTypeFilter === type ? "all" : type)}
                      >
                        {type}: {count}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredBookings.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Calendar size={40} className="mx-auto mb-2 opacity-30" />
                        <p>No bookings match your filters</p>
                      </div>
                    ) : (
                      filteredBookings.map((booking) => (
                        <div key={booking.id} className="border border-border rounded-xl overflow-hidden">
                          {/* Booking Row */}
                          <div
                            className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
                            onClick={() => setExpandedBooking(expandedBooking === booking.id ? null : booking.id)}
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <Calendar className="text-primary" size={20} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{booking.name}</p>
                                  {booking.notes && (
                                    <span className="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Has Notes</span>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {booking.type} • {booking.guests} guests • {booking.date} at {booking.time}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge
                                variant={booking.status === "confirmed" ? "default" : booking.status === "cancelled" ? "destructive" : "secondary"}
                                className="gap-1"
                              >
                                {booking.status === "confirmed" ? <CheckCircle size={12} /> : booking.status === "cancelled" ? <X size={12} /> : <Clock size={12} />}
                                {booking.status}
                              </Badge>
                              {expandedBooking === booking.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                          </div>
                          
                          {/* Expanded Details */}
                          <AnimatePresence>
                            {expandedBooking === booking.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-2 bg-secondary/20 border-t border-border">
                                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-2">
                                      <p className="text-sm"><span className="text-muted-foreground">Email:</span> {booking.email}</p>
                                      <p className="text-sm"><span className="text-muted-foreground">Phone:</span> {booking.phone}</p>
                                      <p className="text-sm"><span className="text-muted-foreground">Time:</span> {booking.time}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <p className="text-sm"><span className="text-muted-foreground">Created:</span> {booking.createdAt}</p>
                                      <p className="text-sm"><span className="text-muted-foreground">Notes:</span> {booking.notes || "None"}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    <Button size="sm" variant="outline" onClick={() => setViewBooking(booking)}>
                                      <Eye size={14} className="mr-1" /> View
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => setEditBooking({...booking})}>
                                      <Edit size={14} className="mr-1" /> Edit
                                    </Button>
                                    {booking.status === "pending" && (
                                      <Button size="sm" variant="default" onClick={() => updateBookingStatus(booking.id, "confirmed")}>
                                        <CheckCircle size={14} className="mr-1" /> Confirm
                                      </Button>
                                    )}
                                    {booking.status !== "cancelled" && (
                                      <Button size="sm" variant="secondary" onClick={() => updateBookingStatus(booking.id, "cancelled")}>
                                        <X size={14} className="mr-1" /> Cancel
                                      </Button>
                                    )}
                                    <Button size="sm" variant="destructive" onClick={() => deleteBooking(booking.id)}>
                                      <Trash2 size={14} className="mr-1" /> Delete
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* MESSAGES TAB */}
            <TabsContent value="messages">
              <Card className="border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Contact Messages</CardTitle>
                      <CardDescription>
                        {filteredMessages.length} messages {messageFilter !== "all" && `(${messageFilter})`}
                      </CardDescription>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <Select value={messageFilter} onValueChange={(v) => setMessageFilter(v as typeof messageFilter)}>
                        <SelectTrigger className="h-9 w-36">
                          <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Messages</SelectItem>
                          <SelectItem value="unread">Unread ({stats.unreadMessages})</SelectItem>
                          <SelectItem value="unreplied">Unreplied ({stats.unrepliedMessages})</SelectItem>
                        </SelectContent>
                      </Select>
                      {stats.unreadMessages > 0 && (
                        <Button size="sm" variant="outline" onClick={markAllAsRead} className="gap-1">
                          <CheckCircle2 size={14} />
                          Mark All Read
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="flex gap-4 mt-4 pt-4 border-t border-border/50 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">{stats.unreadMessages} unread</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      <span className="text-muted-foreground">{stats.unrepliedMessages} awaiting reply</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-muted-foreground">{messages.filter(m => m.replied).length} replied</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredMessages.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <MessageSquare size={40} className="mx-auto mb-2 opacity-30" />
                        <p>No messages match your filters</p>
                      </div>
                    ) : (
                      filteredMessages.map((message) => (
                        <div key={message.id} className="border border-border rounded-xl overflow-hidden">
                          <div
                            className={`flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors cursor-pointer ${!message.read ? "bg-primary/5" : ""}`}
                            onClick={() => {
                              setExpandedMessage(expandedMessage === message.id ? null : message.id);
                              if (!message.read) markMessageRead(message.id);
                            }}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-lg ${!message.read ? "bg-primary/20" : "bg-secondary"}`}>
                                <MessageSquare className={!message.read ? "text-primary" : "text-muted-foreground"} size={20} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{message.name}</p>
                                  {!message.replied && message.read && (
                                    <span className="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Needs Reply</span>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {message.subject} • {message.date}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {!message.read && <Badge variant="default" className="bg-primary">New</Badge>}
                              {message.replied && <Badge variant="secondary" className="bg-green-100 text-green-700">Replied</Badge>}
                              {expandedMessage === message.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                          </div>
                          
                          <AnimatePresence>
                            {expandedMessage === message.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-2 bg-secondary/20 border-t border-border">
                                  <div className="space-y-3 mb-4">
                                    <div className="flex flex-wrap gap-4 text-sm">
                                      <span className="flex items-center gap-1"><Mail size={14} /> {message.email}</span>
                                      <span className="flex items-center gap-1"><Phone size={14} /> {message.phone}</span>
                                    </div>
                                    <div className="p-3 bg-background rounded-lg border border-border">
                                      <p className="text-sm">{message.message}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    <Button size="sm" variant="outline" onClick={() => setViewMessage(message)}>
                                      <Eye size={14} className="mr-1" /> Full View
                                    </Button>
                                    {!message.replied && (
                                      <Button size="sm" variant="default" onClick={() => markMessageReplied(message.id)}>
                                        <CheckCircle size={14} className="mr-1" /> Mark Replied
                                      </Button>
                                    )}
                                    <Button size="sm" variant="destructive" onClick={() => deleteMessage(message.id)}>
                                      <Trash2 size={14} className="mr-1" /> Delete
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* MENU TAB */}
            <TabsContent value="menu">
              <Card className="border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Menu Management</CardTitle>
                      <CardDescription>
                        {filteredMenuItems.length} items {menuCategoryFilter !== "all" && `in ${menuCategoryFilter}`}
                      </CardDescription>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <Select value={menuCategoryFilter} onValueChange={setMenuCategoryFilter}>
                        <SelectTrigger className="h-9 w-36">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {menuCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={menuAvailabilityFilter} onValueChange={(v) => setMenuAvailabilityFilter(v as typeof menuAvailabilityFilter)}>
                        <SelectTrigger className="h-9 w-36">
                          <SelectValue placeholder="Availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Items</SelectItem>
                          <SelectItem value="available">Available ({stats.availableItems})</SelectItem>
                          <SelectItem value="unavailable">Unavailable ({stats.unavailableItems})</SelectItem>
                        </SelectContent>
                      </Select>
                      {stats.unavailableItems > 0 && (
                        <Button size="sm" variant="outline" onClick={markAllAvailable} className="gap-1">
                          <CheckCircle2 size={14} />
                          Enable All
                        </Button>
                      )}
                      <Button onClick={() => setShowAddMenuItem(true)} className="gap-2">
                        <Plus size={16} /> Add Item
                      </Button>
                    </div>
                  </div>
                  
                  {/* Category breakdown */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                    {Object.entries(stats.menuByCategory).map(([cat, count]) => (
                      <Badge 
                        key={cat} 
                        variant="secondary" 
                        className={`cursor-pointer ${menuCategoryFilter === cat ? 'bg-primary text-primary-foreground' : ''}`}
                        onClick={() => setMenuCategoryFilter(menuCategoryFilter === cat ? "all" : cat)}
                      >
                        {cat}: {count}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredMenuItems.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Coffee size={40} className="mx-auto mb-2 opacity-30" />
                        <p>No menu items match your filters</p>
                      </div>
                    ) : (
                      filteredMenuItems.map((item) => (
                        <div key={item.id} className="border border-border rounded-xl overflow-hidden">
                          <div
                            className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
                            onClick={() => setExpandedMenuItem(expandedMenuItem === item.id ? null : item.id)}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-lg ${item.available ? "bg-green-500/10" : "bg-red-500/10"}`}>
                                <Coffee className={item.available ? "text-green-500" : "text-red-500"} size={20} />
                              </div>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {item.category} • ₹{item.price}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {/* Inline availability toggle */}
                              <div 
                                className="flex items-center gap-2"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Switch 
                                  checked={item.available} 
                                  onCheckedChange={() => toggleMenuAvailability(item.id)}
                                  className="data-[state=checked]:bg-green-500"
                                />
                                <span className={`text-xs ${item.available ? 'text-green-600' : 'text-red-500'}`}>
                                  {item.available ? "Available" : "Unavailable"}
                                </span>
                              </div>
                              {expandedMenuItem === item.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                          </div>
                          
                          <AnimatePresence>
                            {expandedMenuItem === item.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-2 bg-secondary/20 border-t border-border">
                                  <p className="text-sm mb-4">{item.description}</p>
                                  <div className="flex flex-wrap gap-2">
                                    <Button size="sm" variant="outline" onClick={() => setEditMenuItem({...item})}>
                                      <Edit size={14} className="mr-1" /> Edit
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => deleteMenuItem(item.id)}>
                                      <Trash2 size={14} className="mr-1" /> Delete
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* VIEW BOOKING MODAL */}
      <Dialog open={!!viewBooking} onOpenChange={() => setViewBooking(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {viewBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-muted-foreground">Name</Label><p className="font-medium">{viewBooking.name}</p></div>
                <div><Label className="text-muted-foreground">Type</Label><p className="font-medium">{viewBooking.type}</p></div>
                <div><Label className="text-muted-foreground">Email</Label><p className="font-medium">{viewBooking.email}</p></div>
                <div><Label className="text-muted-foreground">Phone</Label><p className="font-medium">{viewBooking.phone}</p></div>
                <div><Label className="text-muted-foreground">Date</Label><p className="font-medium">{viewBooking.date}</p></div>
                <div><Label className="text-muted-foreground">Time</Label><p className="font-medium">{viewBooking.time}</p></div>
                <div><Label className="text-muted-foreground">Guests</Label><p className="font-medium">{viewBooking.guests}</p></div>
                <div><Label className="text-muted-foreground">Status</Label><Badge>{viewBooking.status}</Badge></div>
              </div>
              <div><Label className="text-muted-foreground">Notes</Label><p className="font-medium">{viewBooking.notes || "No notes"}</p></div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* EDIT BOOKING MODAL */}
      <Dialog open={!!editBooking} onOpenChange={() => setEditBooking(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
          </DialogHeader>
          {editBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={editBooking.name} onChange={(e) => setEditBooking({...editBooking, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={editBooking.type} onValueChange={(v) => setEditBooking({...editBooking, type: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Birthday">Birthday</SelectItem>
                      <SelectItem value="Board Room">Board Room</SelectItem>
                      <SelectItem value="Business Lounge">Business Lounge</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={editBooking.email} onChange={(e) => setEditBooking({...editBooking, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={editBooking.phone} onChange={(e) => setEditBooking({...editBooking, phone: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" value={editBooking.date} onChange={(e) => setEditBooking({...editBooking, date: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input type="time" value={editBooking.time} onChange={(e) => setEditBooking({...editBooking, time: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Guests</Label>
                  <Input type="number" value={editBooking.guests} onChange={(e) => setEditBooking({...editBooking, guests: parseInt(e.target.value) || 0})} />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={editBooking.status} onValueChange={(v) => setEditBooking({...editBooking, status: v as Booking["status"]})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea value={editBooking.notes} onChange={(e) => setEditBooking({...editBooking, notes: e.target.value})} />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditBooking(null)}>Cancel</Button>
                <Button onClick={saveBookingEdit}><Save size={14} className="mr-1" /> Save</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* VIEW MESSAGE MODAL */}
      <Dialog open={!!viewMessage} onOpenChange={() => setViewMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{viewMessage?.subject}</DialogTitle>
            <DialogDescription>From {viewMessage?.name}</DialogDescription>
          </DialogHeader>
          {viewMessage && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1"><Mail size={14} /> {viewMessage.email}</span>
                <span className="flex items-center gap-1"><Phone size={14} /> {viewMessage.phone}</span>
              </div>
              <div className="p-4 bg-secondary/30 rounded-lg">
                <p>{viewMessage.message}</p>
              </div>
              <DialogFooter>
                {!viewMessage.replied && (
                  <Button onClick={() => { markMessageReplied(viewMessage.id); setViewMessage(null); }}>
                    Mark as Replied
                  </Button>
                )}
                <Button variant="destructive" onClick={() => deleteMessage(viewMessage.id)}>Delete</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* EDIT MENU ITEM MODAL */}
      <Dialog open={!!editMenuItem} onOpenChange={() => setEditMenuItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
          </DialogHeader>
          {editMenuItem && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={editMenuItem.name} onChange={(e) => setEditMenuItem({...editMenuItem, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={editMenuItem.category} onValueChange={(v) => setEditMenuItem({...editMenuItem, category: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Coffee">Coffee</SelectItem>
                      <SelectItem value="Pastries">Pastries</SelectItem>
                      <SelectItem value="Desserts">Desserts</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Beverages">Beverages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input type="number" value={editMenuItem.price} onChange={(e) => setEditMenuItem({...editMenuItem, price: parseInt(e.target.value) || 0})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={editMenuItem.description} onChange={(e) => setEditMenuItem({...editMenuItem, description: e.target.value})} />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditMenuItem(null)}>Cancel</Button>
                <Button onClick={saveMenuEdit}><Save size={14} className="mr-1" /> Save</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ADD MENU ITEM MODAL */}
      <Dialog open={showAddMenuItem} onOpenChange={setShowAddMenuItem}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Menu Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={newMenuItem.name} onChange={(e) => setNewMenuItem({...newMenuItem, name: e.target.value})} placeholder="Item name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={newMenuItem.category} onValueChange={(v) => setNewMenuItem({...newMenuItem, category: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Coffee">Coffee</SelectItem>
                    <SelectItem value="Pastries">Pastries</SelectItem>
                    <SelectItem value="Desserts">Desserts</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Price (₹)</Label>
                <Input type="number" value={newMenuItem.price} onChange={(e) => setNewMenuItem({...newMenuItem, price: parseInt(e.target.value) || 0})} placeholder="0" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={newMenuItem.description} onChange={(e) => setNewMenuItem({...newMenuItem, description: e.target.value})} placeholder="Item description" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddMenuItem(false)}>Cancel</Button>
              <Button onClick={addMenuItem} disabled={!newMenuItem.name}><Plus size={14} className="mr-1" /> Add Item</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Admin;