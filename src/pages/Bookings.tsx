import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Cake, 
  Presentation, 
  Briefcase, 
  Users, 
  Clock, 
  Calendar,
  Phone,
  Mail,
  User,
  CreditCard,
  Building,
  Banknote,
  X,
  ArrowRight,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRateLimit } from "@/hooks/useRateLimit";

// Base schema for common fields with strict validation
const baseBookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase(),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^[+]?[\d\s-]+$/, "Invalid phone number format"),
  guests: z
    .string()
    .min(1, "Number of guests is required")
    .regex(/^[\d\-+\s]+$|^[a-zA-Z0-9\-\s]+$/, "Invalid guest selection"),
  hours: z
    .string()
    .min(1, "Hours required is required")
    .regex(/^[\d\-+\s]+$|^full-day$/, "Invalid hours selection"),
  date: z
    .string()
    .min(1, "Date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  timeSlot: z
    .string()
    .min(1, "Time slot is required")
    .regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  paymentMethod: z
    .enum(["upi", "bank", "cash"], { required_error: "Payment method is required" }),
  specialRequests: z
    .string()
    .max(500, "Special requests must be less than 500 characters")
    .regex(/^[^<>{}]*$/, "Special characters not allowed")
    .optional(),
});

// Birthday specific fields
const birthdaySchema = baseBookingSchema.extend({
  birthdayPersonName: z
    .string()
    .trim()
    .min(1, "Birthday person's name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  birthdayPersonDOB: z
    .string()
    .min(1, "Date of birth is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  cakeChoice: z.enum(["chocolate", "vanilla", "butterscotch", "red_velvet", "black_forest", "custom"], { 
    required_error: "Please select a cake" 
  }),
  cakeMessage: z
    .string()
    .trim()
    .max(100, "Cake message must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s.,!?'"-]*$/, "Message contains invalid characters")
    .optional(),
  decorationType: z.enum(["basic", "standard", "premium", "custom"], { 
    required_error: "Please select decoration type" 
  }),
  cateringRequired: z.boolean().optional(),
});

// Board room specific fields
const boardRoomSchema = baseBookingSchema.extend({
  companyName: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(150, "Company name must be less than 150 characters")
    .regex(/^[a-zA-Z0-9\s.,'&-]+$/, "Company name contains invalid characters"),
  meetingPurpose: z
    .string()
    .trim()
    .min(1, "Meeting purpose is required")
    .max(200, "Meeting purpose must be less than 200 characters")
    .regex(/^[a-zA-Z0-9\s.,'-]+$/, "Meeting purpose contains invalid characters"),
  projectorRequired: z.boolean().optional(),
  whiteboardRequired: z.boolean().optional(),
  videoConferencing: z.boolean().optional(),
  refreshments: z.enum(["none", "tea_coffee", "snacks", "full_catering"]).optional(),
});

// Business lounge specific fields
const businessLoungeSchema = baseBookingSchema.extend({
  workType: z.enum(["individual", "small_group", "meeting"], { required_error: "Work type is required" }),
  wifiRequired: z.boolean().optional(),
  powerOutlets: z.boolean().optional(),
  printingAccess: z.boolean().optional(),
  refreshments: z.enum(["none", "tea_coffee", "snacks"]).optional(),
});

type BookingType = "birthday" | "boardroom" | "lounge";

const bookingCards = [
  {
    id: "birthday" as BookingType,
    title: "Birthday Events",
    description: "Celebrate your special day with us. Perfect for kids' parties, milestone birthdays, and family celebrations.",
    icon: Cake,
    features: ["Customizable decorations", "Cake arrangements", "Catering options", "Photo booth area"],
    priceInfo: "Starting from ₹5,000",
  },
  {
    id: "boardroom" as BookingType,
    title: "Board Room",
    description: "Professional meeting space for corporate gatherings, presentations, and business discussions.",
    icon: Presentation,
    features: ["Projector & screen", "Video conferencing", "Whiteboard", "Refreshment service"],
    priceInfo: "Starting from ₹2,000/hr",
  },
  {
    id: "lounge" as BookingType,
    title: "Business Lounge",
    description: "A comfortable co-working space for individuals and small teams with premium amenities.",
    icon: Briefcase,
    features: ["High-speed WiFi", "Power outlets", "Quiet zones", "Coffee included"],
    priceInfo: "Starting from ₹500/hr",
  },
];

const Bookings = () => {
  const { toast } = useToast();
  const [selectedBooking, setSelectedBooking] = useState<BookingType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  
  const { isRateLimited, recordAttempt, getRemainingCooldown, getRemainingAttempts } = useRateLimit({
    maxAttempts: 3,
    windowMs: 300000, // 5 minutes
    cooldownMs: 60000, // 1 minute cooldown
  });

  // Update cooldown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getRemainingCooldown();
      setCooldownSeconds(remaining);
    }, 1000);
    return () => clearInterval(interval);
  }, [getRemainingCooldown]);

  const [formData, setFormData] = useState<Record<string, any>>({
    name: "",
    email: "",
    phone: "",
    guests: "",
    hours: "",
    date: "",
    timeSlot: "",
    paymentMethod: "",
    specialRequests: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      guests: "",
      hours: "",
      date: "",
      timeSlot: "",
      paymentMethod: "",
      specialRequests: "",
    });
    setErrors({});
  };

  const handleOpenBooking = (type: BookingType) => {
    resetForm();
    setSelectedBooking(type);
  };

  const handleCloseBooking = () => {
    setSelectedBooking(null);
    resetForm();
  };

  const getValidationSchema = () => {
    switch (selectedBooking) {
      case "birthday":
        return birthdaySchema;
      case "boardroom":
        return boardRoomSchema;
      case "lounge":
        return businessLoungeSchema;
      default:
        return baseBookingSchema;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Check rate limiting
    if (isRateLimited()) {
      toast({
        title: "Too Many Submissions",
        description: `Please wait ${cooldownSeconds} seconds before submitting again.`,
        variant: "destructive",
      });
      return;
    }

    const schema = getValidationSchema();
    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    recordAttempt(); // Record the submission attempt
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Booking Request Submitted!",
      description: `We'll contact you shortly to confirm your booking. ${getRemainingAttempts()} submissions remaining.`,
    });

    handleCloseBooking();
    setIsSubmitting(false);
  };

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const renderPaymentSection = () => (
    <div className="space-y-4 pt-4 border-t border-border">
      <Label className="text-base font-medium">Payment Method</Label>
      <RadioGroup
        value={formData.paymentMethod}
        onValueChange={(value) => handleChange("paymentMethod", value)}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        <label 
          htmlFor="upi"
          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === "upi" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
        >
          <RadioGroupItem value="upi" id="upi" />
          <span className="flex items-center gap-2">
            <CreditCard size={18} className="text-primary" />
            UPI
          </span>
        </label>
        <label 
          htmlFor="bank"
          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === "bank" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
        >
          <RadioGroupItem value="bank" id="bank" />
          <span className="flex items-center gap-2">
            <Building size={18} className="text-primary" />
            Bank Transfer
          </span>
        </label>
        <label 
          htmlFor="cash"
          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === "cash" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
        >
          <RadioGroupItem value="cash" id="cash" />
          <span className="flex items-center gap-2">
            <Banknote size={18} className="text-primary" />
            Cash (On Visit)
          </span>
        </label>
      </RadioGroup>
      {errors.paymentMethod && (
        <p className="text-sm text-destructive">{errors.paymentMethod}</p>
      )}
      
      {formData.paymentMethod === "upi" && (
        <div className="p-4 rounded-xl bg-secondary/50 text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">UPI Payment</p>
          <p>You'll receive UPI payment details via email after booking confirmation.</p>
        </div>
      )}
      {formData.paymentMethod === "bank" && (
        <div className="p-4 rounded-xl bg-secondary/50 text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Bank Transfer</p>
          <p>Bank account details will be shared via email. Payment must be completed 24 hours before the event.</p>
        </div>
      )}
      {formData.paymentMethod === "cash" && (
        <div className="p-4 rounded-xl bg-secondary/50 text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Cash Payment</p>
          <p>Pay at our café on the day of your booking. A 20% advance may be required for large bookings.</p>
        </div>
      )}
    </div>
  );

  const renderBirthdayFields = () => (
    <div className="space-y-6">
      {/* Birthday Person Details */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
        <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
          <Cake size={18} className="text-primary" />
          Birthday Person Details
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="birthdayPersonName">Name *</Label>
            <Input
              id="birthdayPersonName"
              value={formData.birthdayPersonName || ""}
              onChange={(e) => handleChange("birthdayPersonName", e.target.value)}
              placeholder="Birthday person's name"
              className={`bg-background ${errors.birthdayPersonName ? "border-destructive" : ""}`}
            />
            {errors.birthdayPersonName && <p className="text-sm text-destructive">{errors.birthdayPersonName}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthdayPersonDOB">Date of Birth *</Label>
            <Input
              id="birthdayPersonDOB"
              type="date"
              value={formData.birthdayPersonDOB || ""}
              onChange={(e) => handleChange("birthdayPersonDOB", e.target.value)}
              className={`bg-background ${errors.birthdayPersonDOB ? "border-destructive" : ""}`}
            />
            {errors.birthdayPersonDOB && <p className="text-sm text-destructive">{errors.birthdayPersonDOB}</p>}
          </div>
        </div>
      </div>

      {/* Cake Selection */}
      <div className="space-y-2">
        <Label htmlFor="cakeChoice">Choose the Cake *</Label>
        <Select value={formData.cakeChoice || ""} onValueChange={(value) => handleChange("cakeChoice", value)}>
          <SelectTrigger className={errors.cakeChoice ? "border-destructive" : ""}>
            <SelectValue placeholder="Select cake flavor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="chocolate">Chocolate Cake</SelectItem>
            <SelectItem value="vanilla">Vanilla Cake</SelectItem>
            <SelectItem value="butterscotch">Butterscotch Cake</SelectItem>
            <SelectItem value="red_velvet">Red Velvet Cake</SelectItem>
            <SelectItem value="black_forest">Black Forest Cake</SelectItem>
            <SelectItem value="custom">Custom (Specify in requests)</SelectItem>
          </SelectContent>
        </Select>
        {errors.cakeChoice && <p className="text-sm text-destructive">{errors.cakeChoice}</p>}
      </div>

      {/* Message on Cake */}
      <div className="space-y-2">
        <Label htmlFor="cakeMessage">Message on Cake (Optional)</Label>
        <Input
          id="cakeMessage"
          value={formData.cakeMessage || ""}
          onChange={(e) => handleChange("cakeMessage", e.target.value)}
          placeholder="e.g., Happy Birthday John!"
          className="bg-background"
          maxLength={100}
        />
        <p className="text-xs text-muted-foreground">Max 100 characters for cake message</p>
      </div>

      {/* Decoration Type */}
      <div className="space-y-2">
        <Label htmlFor="decorationType">Choose Decoration *</Label>
        <Select value={formData.decorationType || ""} onValueChange={(value) => handleChange("decorationType", value)}>
          <SelectTrigger className={errors.decorationType ? "border-destructive" : ""}>
            <SelectValue placeholder="Select decoration package" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">Basic (Balloons & Banner) - ₹500</SelectItem>
            <SelectItem value="standard">Standard (Balloons, Banner, Streamers) - ₹1,500</SelectItem>
            <SelectItem value="premium">Premium (Full Theme Decoration) - ₹3,500</SelectItem>
            <SelectItem value="custom">Custom (Discuss with us)</SelectItem>
          </SelectContent>
        </Select>
        {errors.decorationType && <p className="text-sm text-destructive">{errors.decorationType}</p>}
      </div>

      {/* Catering */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors">
        <Checkbox
          id="cateringRequired"
          checked={formData.cateringRequired || false}
          onCheckedChange={(checked) => handleChange("cateringRequired", checked)}
        />
        <div>
          <Label htmlFor="cateringRequired" className="cursor-pointer font-medium">Add Catering Service</Label>
          <p className="text-sm text-muted-foreground">Food & beverages for your guests</p>
        </div>
      </div>
    </div>
  );

  const renderBoardRoomFields = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name *</Label>
        <Input
          id="companyName"
          value={formData.companyName || ""}
          onChange={(e) => handleChange("companyName", e.target.value)}
          placeholder="Your company name"
          className={`bg-background ${errors.companyName ? "border-destructive" : ""}`}
        />
        {errors.companyName && <p className="text-sm text-destructive">{errors.companyName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="meetingPurpose">Meeting Purpose *</Label>
        <Input
          id="meetingPurpose"
          value={formData.meetingPurpose || ""}
          onChange={(e) => handleChange("meetingPurpose", e.target.value)}
          placeholder="e.g., Team meeting, Client presentation..."
          className={`bg-background ${errors.meetingPurpose ? "border-destructive" : ""}`}
        />
        {errors.meetingPurpose && <p className="text-sm text-destructive">{errors.meetingPurpose}</p>}
      </div>

      <div className="space-y-3">
        <Label>Equipment Required</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
            <Checkbox
              id="projectorRequired"
              checked={formData.projectorRequired || false}
              onCheckedChange={(checked) => handleChange("projectorRequired", checked)}
            />
            <Label htmlFor="projectorRequired" className="cursor-pointer">Projector & Screen</Label>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
            <Checkbox
              id="whiteboardRequired"
              checked={formData.whiteboardRequired || false}
              onCheckedChange={(checked) => handleChange("whiteboardRequired", checked)}
            />
            <Label htmlFor="whiteboardRequired" className="cursor-pointer">Whiteboard</Label>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
            <Checkbox
              id="videoConferencing"
              checked={formData.videoConferencing || false}
              onCheckedChange={(checked) => handleChange("videoConferencing", checked)}
            />
            <Label htmlFor="videoConferencing" className="cursor-pointer">Video Conferencing</Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="refreshments">Refreshments</Label>
        <Select value={formData.refreshments || "none"} onValueChange={(value) => handleChange("refreshments", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select refreshment option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No refreshments</SelectItem>
            <SelectItem value="tea_coffee">Tea & Coffee</SelectItem>
            <SelectItem value="snacks">Tea, Coffee & Snacks</SelectItem>
            <SelectItem value="full_catering">Full Catering</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderLoungeFields = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="workType">Type of Work *</Label>
        <Select value={formData.workType || ""} onValueChange={(value) => handleChange("workType", value)}>
          <SelectTrigger className={errors.workType ? "border-destructive" : ""}>
            <SelectValue placeholder="Select work type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="individual">Individual Work</SelectItem>
            <SelectItem value="small_group">Small Group (2-4 people)</SelectItem>
            <SelectItem value="meeting">Informal Meeting</SelectItem>
          </SelectContent>
        </Select>
        {errors.workType && <p className="text-sm text-destructive">{errors.workType}</p>}
      </div>

      <div className="space-y-3">
        <Label>Amenities Required</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
            <Checkbox
              id="wifiRequired"
              checked={formData.wifiRequired ?? true}
              onCheckedChange={(checked) => handleChange("wifiRequired", checked)}
            />
            <Label htmlFor="wifiRequired" className="cursor-pointer">High-Speed WiFi</Label>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
            <Checkbox
              id="powerOutlets"
              checked={formData.powerOutlets ?? true}
              onCheckedChange={(checked) => handleChange("powerOutlets", checked)}
            />
            <Label htmlFor="powerOutlets" className="cursor-pointer">Power Outlets</Label>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
            <Checkbox
              id="printingAccess"
              checked={formData.printingAccess || false}
              onCheckedChange={(checked) => handleChange("printingAccess", checked)}
            />
            <Label htmlFor="printingAccess" className="cursor-pointer">Printing Access</Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="refreshments">Refreshments</Label>
        <Select value={formData.refreshments || "tea_coffee"} onValueChange={(value) => handleChange("refreshments", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select refreshment option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No refreshments</SelectItem>
            <SelectItem value="tea_coffee">Unlimited Tea & Coffee (Included)</SelectItem>
            <SelectItem value="snacks">Tea, Coffee & Snacks (+₹200)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const getBookingTitle = () => {
    switch (selectedBooking) {
      case "birthday":
        return "Birthday Event Booking";
      case "boardroom":
        return "Board Room Booking";
      case "lounge":
        return "Business Lounge Booking";
      default:
        return "Booking";
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-secondary/30">
        <div className="container-cafe text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              Reserve Your Space
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6">
              Bookings
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              From birthday celebrations to business meetings, we have the perfect space for every occasion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Cards */}
      <section className="section-padding">
        <div className="container-cafe">
          <div className="grid md:grid-cols-3 gap-8">
            {bookingCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card variant="elevated" className="h-full flex flex-col hover:shadow-elevated transition-all duration-300">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <card.icon className="text-primary" size={28} />
                    </div>
                    <CardTitle className="text-2xl">{card.title}</CardTitle>
                    <CardDescription className="text-base">{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-2 mb-6 flex-1">
                      {card.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-border">
                      <p className="text-lg font-medium text-primary mb-4">{card.priceInfo}</p>
                      <Button 
                        variant="warm" 
                        className="w-full group"
                        onClick={() => handleOpenBooking(card.id)}
                      >
                        Book Now
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleCloseBooking}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-background rounded-3xl shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-background z-10 p-6 pb-4 border-b border-border flex items-center justify-between">
                <h2 className="font-serif text-2xl md:text-3xl">{getBookingTitle()}</h2>
                <button
                  onClick={handleCloseBooking}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6" noValidate aria-label={getBookingTitle()}>
                {/* Common Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User size={14} aria-hidden="true" /> Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Your full name"
                      className={`bg-background ${errors.name ? "border-destructive" : ""}`}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      autoComplete="name"
                    />
                    {errors.name && <p id="name-error" className="text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail size={14} aria-hidden="true" /> Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="your@email.com"
                      className={`bg-background ${errors.email ? "border-destructive" : ""}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      autoComplete="email"
                    />
                    {errors.email && <p id="email-error" className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone size={14} aria-hidden="true" /> Phone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`bg-background ${errors.phone ? "border-destructive" : ""}`}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    autoComplete="tel"
                  />
                  {errors.phone && <p id="phone-error" className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <Calendar size={14} /> Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className={`bg-background ${errors.date ? "border-destructive" : ""}`}
                    />
                    {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeSlot" className="flex items-center gap-2">
                      <Clock size={14} /> Time Slot *
                    </Label>
                    <Select value={formData.timeSlot} onValueChange={(value) => handleChange("timeSlot", value)}>
                      <SelectTrigger className={errors.timeSlot ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        <SelectItem value="19:00">7:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.timeSlot && <p className="text-sm text-destructive">{errors.timeSlot}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guests" className="flex items-center gap-2">
                      <Users size={14} /> Number of Guests *
                    </Label>
                    <Select value={formData.guests} onValueChange={(value) => handleChange("guests", value)}>
                      <SelectTrigger className={errors.guests ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedBooking === "lounge" ? (
                          <>
                            <SelectItem value="1">1 person</SelectItem>
                            <SelectItem value="2">2 people</SelectItem>
                            <SelectItem value="3">3 people</SelectItem>
                            <SelectItem value="4">4 people</SelectItem>
                            <SelectItem value="5-8">5-8 people</SelectItem>
                          </>
                        ) : selectedBooking === "boardroom" ? (
                          <>
                            <SelectItem value="2-5">2-5 people</SelectItem>
                            <SelectItem value="6-10">6-10 people</SelectItem>
                            <SelectItem value="11-15">11-15 people</SelectItem>
                            <SelectItem value="16-20">16-20 people</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="5-10">5-10 guests</SelectItem>
                            <SelectItem value="11-20">11-20 guests</SelectItem>
                            <SelectItem value="21-30">21-30 guests</SelectItem>
                            <SelectItem value="31-50">31-50 guests</SelectItem>
                            <SelectItem value="50+">50+ guests</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                    {errors.guests && <p className="text-sm text-destructive">{errors.guests}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hours" className="flex items-center gap-2">
                      <Clock size={14} /> Hours Required *
                    </Label>
                    <Select value={formData.hours} onValueChange={(value) => handleChange("hours", value)}>
                      <SelectTrigger className={errors.hours ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select hours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="5">5 hours</SelectItem>
                        <SelectItem value="6+">6+ hours</SelectItem>
                        {selectedBooking === "birthday" && (
                          <SelectItem value="full-day">Full Day</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {errors.hours && <p className="text-sm text-destructive">{errors.hours}</p>}
                  </div>
                </div>

                {/* Type-specific fields */}
                <div className="pt-4 border-t border-border">
                  {selectedBooking === "birthday" && renderBirthdayFields()}
                  {selectedBooking === "boardroom" && renderBoardRoomFields()}
                  {selectedBooking === "lounge" && renderLoungeFields()}
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                  <Textarea
                    id="specialRequests"
                    value={formData.specialRequests || ""}
                    onChange={(e) => handleChange("specialRequests", e.target.value)}
                    placeholder="Any additional requirements or notes..."
                    rows={3}
                    className="bg-background resize-none"
                  />
                </div>

                {/* Payment Section */}
                {renderPaymentSection()}

                {/* Submit */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="warm"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    By submitting, you agree to our booking terms. We'll contact you within 24 hours to confirm.
                  </p>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Bookings;
