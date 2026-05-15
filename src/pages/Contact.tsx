import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRateLimit } from "@/hooks/useRateLimit";
import { useContactPageContent, useSiteSettings } from "@/hooks/useContent";
import { RD_CAFE_MAPS_URL } from "@/data/siteContent";

// Zod validation schema
const contactSchema = z.object({
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
    .max(255, "Email must be less than 255 characters"),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const { data: contactPage } = useContactPageContent();
  const { data: siteSettings } = useSiteSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
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

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Check rate limiting
    if (isRateLimited()) {
      toast({
        title: "Too Many Messages",
        description: `Please wait ${cooldownSeconds} seconds before sending another message.`,
        variant: "destructive",
      });
      return;
    }
    
    // Validate with zod
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
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

    try {
      const response = await fetch("/api/form-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "contact",
          submittedAt: new Date().toISOString(),
          pageUrl: typeof window !== "undefined" ? window.location.href : "/contact",
          data: result.data,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message with status ${response.status}`);
      }

      toast({
        title: "Message Sent!",
        description: `Thank you for reaching out. We'll get back to you soon. ${getRemainingAttempts()} messages remaining.`,
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Unable to submit contact form.", error);
      toast({
        title: "Message Failed",
        description: "We couldn't send your message right now. Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
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
              {contactPage?.heroEyebrow}
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6">
              {contactPage?.heroTitle}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              {contactPage?.heroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container-cafe">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
              <h2 className="font-serif text-3xl md:text-4xl mb-8">
                {contactPage?.visitTitle} <span className="text-primary italic">{contactPage?.visitHighlight}</span>
              </h2>
              
              <div className="space-y-8 mb-12">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      {siteSettings?.addressLines.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Phone</h3>
                    <p className="text-muted-foreground">{siteSettings?.phone}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Email</h3>
                    <p className="text-muted-foreground">{siteSettings?.email}</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Opening Hours</h3>
                    <div className="text-muted-foreground space-y-1">
                      {siteSettings?.businessHours.map((entry) => (
                        <p key={entry.label}>{entry.label}: {entry.value}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden bg-secondary border border-border shadow-soft">
                <div className="aspect-video flex flex-col items-center justify-center gap-5 px-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="text-primary" size={28} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-foreground">Open our location in Google Maps</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Use the live map link for directions, traffic, and turn-by-turn navigation.
                    </p>
                  </div>
                  <Button asChild>
                    <a href={RD_CAFE_MAPS_URL} target="_blank" rel="noreferrer">
                      Open Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="p-8 lg:p-10 rounded-3xl bg-card border border-border/50 shadow-card">
                <h2 className="font-serif text-2xl md:text-3xl mb-2">Send a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Have a question or feedback? We'd love to hear from you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-label="Contact form">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={`bg-background ${errors.name ? 'border-destructive' : ''}`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-sm text-destructive">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`bg-background ${errors.email ? 'border-destructive' : ''}`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className={`bg-background ${errors.subject ? 'border-destructive' : ''}`}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="text-sm text-destructive">{errors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more..."
                      rows={5}
                      className={`bg-background resize-none ${errors.message ? 'border-destructive' : ''}`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-sm text-destructive">{errors.message}</p>
                    )}
                  </div>

                  {isRateLimited() && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-sm text-destructive">
                      <AlertTriangle size={16} />
                      <span>Too many messages. Wait {cooldownSeconds}s</span>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    variant="warm" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting || isRateLimited()}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send size={16} />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
