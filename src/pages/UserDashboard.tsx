import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Coffee, 
  Clock, 
  MapPin, 
  Heart,
  MessageSquare,
  ChevronRight,
  Star,
  CheckCircle,
  Users,
  Phone,
  Utensils,
  Gift,
  History
} from "lucide-react";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

// Mock user data
const mockUser = {
  name: "Sarah",
  totalVisits: 12,
  memberSince: "March 2024",
  loyaltyPoints: 240,
  nextReward: 300,
};

const mockUpcomingBookings = [
  { id: 1, type: "Birthday", date: "2024-01-20", time: "18:00", guests: 8, status: "confirmed" },
  { id: 2, type: "Business Lounge", date: "2024-01-25", time: "10:00", guests: 4, status: "pending" },
];

const mockPastVisits = [
  { id: 1, date: "2024-01-08", type: "Table Booking", guests: 2, spent: "₹1,850" },
  { id: 2, date: "2024-01-02", type: "Birthday Party", guests: 12, spent: "₹8,500" },
  { id: 3, date: "2023-12-24", type: "Table Booking", guests: 4, spent: "₹3,200" },
];

const mockFavorites = [
  { id: 1, name: "Cappuccino", category: "Coffee", price: 180 },
  { id: 2, name: "Croissant", category: "Pastries", price: 150 },
  { id: 3, name: "Caesar Salad", category: "Food", price: 320 },
];

const mockMessages = [
  { id: 1, subject: "Booking Confirmed", date: "2024-01-15", read: true },
  { id: 2, subject: "Special Offer for You!", date: "2024-01-12", read: false },
];

// Helper components
const StatusBadge = ({ status }: { status: string }) => {
  const config = {
    confirmed: { label: "Confirmed", className: "bg-green-100 text-green-700 border-green-200" },
    pending: { label: "Pending", className: "bg-amber-100 text-amber-700 border-amber-200" },
  }[status] || { label: status, className: "" };
  
  return (
    <Badge variant="outline" className={`text-xs ${config.className}`}>
      {config.label}
    </Badge>
  );
};

const QuickActionCard = ({ 
  icon: Icon, 
  label, 
  href, 
  description 
}: { 
  icon: React.ElementType; 
  label: string; 
  href: string; 
  description: string;
}) => (
  <Link to={href}>
    <Card className="card-glow card-interactive group cursor-pointer h-full">
      <CardContent className="pt-5 pb-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Icon size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm">{label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground mt-1 group-hover:translate-x-1 transition-transform arrow-slide" />
        </div>
      </CardContent>
    </Card>
  </Link>
);

const WelcomeCard = ({ user }: { user: typeof mockUser }) => {
  const progressPercent = (user.loyaltyPoints / user.nextReward) * 100;
  
  return (
    <Card className="card-feature-gradient border-border/50">
      <CardContent className="pt-6 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif">Welcome back, {user.name}!</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Member since {user.memberSince} • {user.totalVisits} visits
            </p>
          </div>
          <div className="flex items-center gap-3 bg-secondary/50 rounded-xl px-4 py-3">
            <Gift size={20} className="text-gold" />
            <div>
              <p className="text-xs text-muted-foreground">Loyalty Points</p>
              <p className="font-semibold">{user.loyaltyPoints} / {user.nextReward}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>Progress to next reward</span>
            <span>{user.nextReward - user.loyaltyPoints} points to go</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-gold to-caramel rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const UserDashboard = () => {
  const [activeTab] = useState<"overview" | "bookings" | "history">("overview");

  const stats = useMemo(() => ({
    upcomingBookings: mockUpcomingBookings.length,
    confirmedBookings: mockUpcomingBookings.filter(b => b.status === "confirmed").length,
    unreadMessages: mockMessages.filter(m => !m.read).length,
    favorites: mockFavorites.length,
  }), []);

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-secondary/30 border-b border-border/50">
          <div className="container-cafe py-8 md:py-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer(0.1)}
              className="space-y-6"
            >
              <motion.div variants={fadeUp()}>
                <WelcomeCard user={mockUser} />
              </motion.div>

              {/* Quick Stats */}
              <motion.div variants={fadeUp()} className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="card-glow border-border/50">
                  <CardContent className="pt-4 pb-3 text-center">
                    <Calendar size={20} className="mx-auto text-primary mb-1" />
                    <p className="text-xl font-bold">{stats.upcomingBookings}</p>
                    <p className="text-xs text-muted-foreground">Upcoming</p>
                  </CardContent>
                </Card>
                <Card className="card-glow border-border/50">
                  <CardContent className="pt-4 pb-3 text-center">
                    <CheckCircle size={20} className="mx-auto text-green-600 mb-1" />
                    <p className="text-xl font-bold">{stats.confirmedBookings}</p>
                    <p className="text-xs text-muted-foreground">Confirmed</p>
                  </CardContent>
                </Card>
                <Card className="card-glow border-border/50">
                  <CardContent className="pt-4 pb-3 text-center">
                    <MessageSquare size={20} className="mx-auto text-amber-600 mb-1" />
                    <p className="text-xl font-bold">{stats.unreadMessages}</p>
                    <p className="text-xs text-muted-foreground">Messages</p>
                  </CardContent>
                </Card>
                <Card className="card-glow border-border/50">
                  <CardContent className="pt-4 pb-3 text-center">
                    <Heart size={20} className="mx-auto text-red-500 mb-1" />
                    <p className="text-xl font-bold">{stats.favorites}</p>
                    <p className="text-xs text-muted-foreground">Favourites</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container-cafe py-8 md:py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="grid lg:grid-cols-3 gap-6"
          >
            {/* Left Column - Bookings & History */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Bookings */}
              <motion.div variants={fadeUp()}>
                <Card className="card-menu-gradient border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-serif">Upcoming Bookings</CardTitle>
                        <CardDescription>Your scheduled visits</CardDescription>
                      </div>
                      <Link to="/bookings">
                        <Button variant="ghost" size="sm" className="text-xs">
                          View All <ChevronRight size={14} className="ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockUpcomingBookings.length > 0 ? (
                      mockUpcomingBookings.map((booking) => (
                        <div 
                          key={booking.id} 
                          className="flex items-center justify-between p-3 bg-background/50 rounded-xl border border-border/30"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-secondary">
                              <Calendar size={16} className="text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{booking.type}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                <Clock size={12} />
                                <span>{booking.date} at {booking.time}</span>
                                <span>•</span>
                                <Users size={12} />
                                <span>{booking.guests} guests</span>
                              </div>
                            </div>
                          </div>
                          <StatusBadge status={booking.status} />
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <Calendar size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No upcoming bookings</p>
                        <Link to="/bookings">
                          <Button variant="link" size="sm" className="mt-1">Book a table</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Past Visits */}
              <motion.div variants={fadeUp()}>
                <Card className="card-glow border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-serif">Recent Visits</CardTitle>
                        <CardDescription>Your visit history</CardDescription>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        <History size={12} className="mr-1" />
                        {mockUser.totalVisits} total
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {mockPastVisits.map((visit) => (
                        <div 
                          key={visit.id} 
                          className="flex items-center justify-between py-2.5 border-b border-border/30 last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                              <Coffee size={16} className="text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{visit.type}</p>
                              <p className="text-xs text-muted-foreground">{visit.date} • {visit.guests} guests</p>
                            </div>
                          </div>
                          <p className="font-medium text-sm text-primary">{visit.spent}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Actions & Favorites */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div variants={fadeUp()}>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Quick Actions</h3>
                <div className="space-y-3">
                  <QuickActionCard 
                    icon={Calendar} 
                    label="Book a Table" 
                    href="/bookings" 
                    description="Reserve your spot"
                  />
                  <QuickActionCard 
                    icon={Utensils} 
                    label="View Menu" 
                    href="/menu" 
                    description="Explore our offerings"
                  />
                  <QuickActionCard 
                    icon={Phone} 
                    label="Contact Café" 
                    href="/contact" 
                    description="Get in touch"
                  />
                  <QuickActionCard 
                    icon={MapPin} 
                    label="Facilities" 
                    href="/facilities" 
                    description="Event spaces & more"
                  />
                </div>
              </motion.div>

              {/* Favourite Items */}
              <motion.div variants={fadeUp()}>
                <Card className="card-accent-gradient border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-serif flex items-center gap-2">
                        <Heart size={16} className="text-red-500" />
                        Your Favourites
                      </CardTitle>
                      <Link to="/menu">
                        <Button variant="ghost" size="sm" className="text-xs h-7">
                          Menu <ChevronRight size={14} className="ml-0.5" />
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {mockFavorites.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex items-center justify-between py-2 px-3 bg-background/50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.category}</p>
                          </div>
                          <p className="text-sm font-medium">₹{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Messages */}
              <motion.div variants={fadeUp()}>
                <Card className="card-glow border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-serif flex items-center gap-2">
                        <MessageSquare size={16} className="text-primary" />
                        Messages
                      </CardTitle>
                      {stats.unreadMessages > 0 && (
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                          {stats.unreadMessages} new
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {mockMessages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`flex items-center justify-between py-2.5 px-3 rounded-lg border ${
                            msg.read 
                              ? 'border-border/30 bg-background/30' 
                              : 'border-amber-200 bg-amber-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {!msg.read && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                            <div>
                              <p className="font-medium text-sm">{msg.subject}</p>
                              <p className="text-xs text-muted-foreground">{msg.date}</p>
                            </div>
                          </div>
                          <ChevronRight size={14} className="text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default UserDashboard;
