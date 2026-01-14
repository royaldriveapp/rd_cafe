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
  Users,
  Phone,
  Utensils,
  Gift,
  History,
  LogOut,
  CheckCircle,
  Inbox,
  Star
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { useAuth } from "@/contexts/AuthContext";

// Types for real data
interface Booking {
  id: string;
  type: string;
  date: string;
  time: string;
  guests: number;
  status: "pending" | "confirmed" | "cancelled";
}

interface PastVisit {
  id: string;
  date: string;
  type: string;
  guests: number;
  spent: string;
}

interface FavoriteItem {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface Message {
  id: string;
  subject: string;
  date: string;
  read: boolean;
}

interface UserStats {
  totalVisits: number;
  memberSince: string;
  loyaltyPoints: number;
  nextReward: number;
}

// Empty state component
const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  actionHref 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) => (
  <div className="text-center py-8 px-4">
    <div className="w-12 h-12 rounded-full bg-secondary mx-auto mb-3 flex items-center justify-center">
      <Icon size={24} className="text-muted-foreground" />
    </div>
    <p className="font-medium text-sm">{title}</p>
    <p className="text-xs text-muted-foreground mt-1">{description}</p>
    {actionLabel && actionHref && (
      <Link to={actionHref}>
        <Button variant="link" size="sm" className="mt-2">
          {actionLabel}
        </Button>
      </Link>
    )}
  </div>
);

// Helper components
const StatusBadge = ({ status }: { status: string }) => {
  const config = {
    confirmed: { label: "Confirmed", className: "bg-green-100 text-green-700 border-green-200" },
    pending: { label: "Pending", className: "bg-amber-100 text-amber-700 border-amber-200" },
    cancelled: { label: "Cancelled", className: "bg-red-100 text-red-700 border-red-200" },
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

interface WelcomeCardProps {
  userName: string;
  stats: UserStats;
  onLogout: () => void;
}

const WelcomeCard = ({ userName, stats, onLogout }: WelcomeCardProps) => {
  const hasLoyaltyProgress = stats.loyaltyPoints > 0;
  const progressPercent = hasLoyaltyProgress ? (stats.loyaltyPoints / stats.nextReward) * 100 : 0;
  
  return (
    <Card className="card-feature-gradient border-border/50">
      <CardContent className="pt-6 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif">Welcome, {userName}!</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {stats.memberSince ? `Member since ${stats.memberSince}` : "Welcome to RD Café"}
              {stats.totalVisits > 0 && ` • ${stats.totalVisits} visits`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-secondary/50 rounded-xl px-4 py-3">
              <Gift size={20} className="text-gold" />
              <div>
                <p className="text-xs text-muted-foreground">Loyalty Points</p>
                <p className="font-semibold">{stats.loyaltyPoints} / {stats.nextReward}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onLogout}
              className="hidden sm:flex items-center gap-2"
            >
              <LogOut size={16} />
              Sign Out
            </Button>
          </div>
        </div>
        
        {hasLoyaltyProgress && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>Progress to next reward</span>
              <span>{stats.nextReward - stats.loyaltyPoints} points to go</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gold to-caramel rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {!hasLoyaltyProgress && (
          <div className="mt-4 p-3 bg-secondary/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <Star size={14} className="inline mr-1.5 text-gold" />
              Book your first table to start earning loyalty points!
            </p>
          </div>
        )}

        {/* Mobile logout button */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onLogout}
          className="sm:hidden flex items-center gap-2 mt-4 w-full justify-center"
        >
          <LogOut size={16} />
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
};

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // In production, these would come from database queries
  // For now, start with empty arrays to show empty states
  const [upcomingBookings] = useState<Booking[]>([]);
  const [pastVisits] = useState<PastVisit[]>([]);
  const [favorites] = useState<FavoriteItem[]>([]);
  const [messages] = useState<Message[]>([]);
  
  // User stats - would come from database
  const [userStats] = useState<UserStats>({
    totalVisits: 0,
    memberSince: "",
    loyaltyPoints: 0,
    nextReward: 300,
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const stats = useMemo(() => ({
    upcomingBookings: upcomingBookings.length,
    confirmedBookings: upcomingBookings.filter(b => b.status === "confirmed").length,
    unreadMessages: messages.filter(m => !m.read).length,
    favorites: favorites.length,
  }), [upcomingBookings, messages, favorites]);

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
                <WelcomeCard 
                  userName={user?.name || "Guest"} 
                  stats={userStats} 
                  onLogout={handleLogout} 
                />
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
                          Book Now <ChevronRight size={14} className="ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {upcomingBookings.length > 0 ? (
                      <div className="space-y-3">
                        {upcomingBookings.map((booking) => (
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
                        ))}
                      </div>
                    ) : (
                      <EmptyState 
                        icon={Calendar}
                        title="No upcoming bookings"
                        description="You haven't made any reservations yet"
                        actionLabel="Book a table"
                        actionHref="/bookings"
                      />
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
                      {userStats.totalVisits > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          <History size={12} className="mr-1" />
                          {userStats.totalVisits} total
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {pastVisits.length > 0 ? (
                      <div className="space-y-2">
                        {pastVisits.map((visit) => (
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
                    ) : (
                      <EmptyState 
                        icon={History}
                        title="No visit history"
                        description="Your past visits will appear here"
                      />
                    )}
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
                    {favorites.length > 0 ? (
                      <div className="space-y-2">
                        {favorites.map((item) => (
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
                    ) : (
                      <EmptyState 
                        icon={Heart}
                        title="No favourites yet"
                        description="Browse our menu to add items"
                        actionLabel="View Menu"
                        actionHref="/menu"
                      />
                    )}
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
                    {messages.length > 0 ? (
                      <div className="space-y-2">
                        {messages.map((msg) => (
                          <div 
                            key={msg.id}
                            className={`p-3 rounded-lg border ${!msg.read ? 'bg-primary/5 border-primary/20' : 'bg-background/50 border-border/30'}`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-medium text-sm">{msg.subject}</p>
                              {!msg.read && (
                                <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{msg.date}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState 
                        icon={Inbox}
                        title="No messages"
                        description="Notifications will appear here"
                      />
                    )}
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
