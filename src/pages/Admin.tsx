import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Lock, 
  LogOut, 
  Calendar, 
  Users, 
  MessageSquare, 
  TrendingUp,
  Coffee,
  AlertTriangle,
  CheckCircle,
  Clock
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

// Mock data for dashboard
const mockBookings = [
  { id: 1, type: "Birthday", name: "John Doe", date: "2024-01-15", status: "pending", guests: 25 },
  { id: 2, type: "Board Room", name: "Tech Corp", date: "2024-01-16", status: "confirmed", guests: 8 },
  { id: 3, type: "Business Lounge", name: "Sarah Smith", date: "2024-01-17", status: "pending", guests: 3 },
  { id: 4, type: "Birthday", name: "Emily Johnson", date: "2024-01-18", status: "confirmed", guests: 15 },
];

const mockMessages = [
  { id: 1, name: "Alice Brown", email: "alice@email.com", subject: "Catering inquiry", date: "2024-01-14", read: false },
  { id: 2, name: "Bob Wilson", email: "bob@email.com", subject: "Feedback", date: "2024-01-13", read: true },
  { id: 3, name: "Carol Davis", email: "carol@email.com", subject: "Event booking question", date: "2024-01-12", read: false },
];

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { isRateLimited, recordAttempt, getRemainingCooldown, getRemainingAttempts } = useRateLimit({
    maxAttempts: 5,
    windowMs: 300000, // 5 minutes
    cooldownMs: 60000, // 1 minute cooldown
  });

  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  // Update cooldown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getRemainingCooldown();
      setCooldownSeconds(remaining);
    }, 1000);
    return () => clearInterval(interval);
  }, [getRemainingCooldown]);

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

    // Simulate network delay
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
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your café operations</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut size={16} />
              Logout
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Pending Bookings", value: "3", icon: Calendar, color: "text-amber-500" },
              { label: "This Week's Guests", value: "51", icon: Users, color: "text-primary" },
              { label: "Unread Messages", value: "2", icon: MessageSquare, color: "text-blue-500" },
              { label: "Monthly Revenue", value: "₹45,000", icon: TrendingUp, color: "text-green-500" },
            ].map((stat) => (
              <Card key={stat.label} className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-secondary ${stat.color}`}>
                      <stat.icon size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="bookings" className="gap-2">
                <Calendar size={16} />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="messages" className="gap-2">
                <MessageSquare size={16} />
                Messages
              </TabsTrigger>
              <TabsTrigger value="menu" className="gap-2">
                <Coffee size={16} />
                Menu
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Manage and review booking requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-secondary/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Calendar className="text-primary" size={20} />
                          </div>
                          <div>
                            <p className="font-medium">{booking.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {booking.type} • {booking.guests} guests • {booking.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={booking.status === "confirmed" ? "default" : "secondary"}
                            className="gap-1"
                          >
                            {booking.status === "confirmed" ? (
                              <CheckCircle size={12} />
                            ) : (
                              <Clock size={12} />
                            )}
                            {booking.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Contact Messages</CardTitle>
                  <CardDescription>Customer inquiries and feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-center justify-between p-4 rounded-xl border border-border hover:bg-secondary/30 transition-colors ${!message.read ? "bg-primary/5" : ""}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${!message.read ? "bg-primary/20" : "bg-secondary"}`}>
                            <MessageSquare className={!message.read ? "text-primary" : "text-muted-foreground"} size={20} />
                          </div>
                          <div>
                            <p className="font-medium">{message.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {message.subject} • {message.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {!message.read && (
                            <Badge variant="default" className="bg-primary">New</Badge>
                          )}
                          <Button size="sm" variant="outline">
                            Read
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="menu">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Menu Management</CardTitle>
                  <CardDescription>Add, edit, or remove menu items</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Coffee size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Menu management coming soon</p>
                    <p className="text-sm mt-1">Connect to Lovable Cloud to enable full CRUD operations</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
