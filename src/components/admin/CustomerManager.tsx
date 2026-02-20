import { useState } from "react";
import { Customer } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Search, Plus, Edit, Trash2, Eye, Save, Users, Star, Mail, Phone, Tag, Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomerManagerProps {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

const TIERS = ["Bronze", "Silver", "Gold", "Platinum"] as const;
const DEFAULT_TAGS = ["VIP", "Regular", "Birthday Club", "Corporate", "New"];

const emptyCustomer: Omit<Customer, "id" | "createdAt"> = {
  name: "", email: "", phone: "", totalVisits: 0, lastVisit: "",
  loyaltyPoints: 0, membershipTier: "Bronze", tags: [], notes: "",
};

const CustomerManager = ({ customers, setCustomers }: CustomerManagerProps) => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [viewCustomer, setViewCustomer] = useState<Customer | null>(null);
  const [form, setForm] = useState(emptyCustomer);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filtered = customers.filter(c => {
    const matchesSearch = search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchesTier = tierFilter === "all" || c.membershipTier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleAdd = () => {
    if (!form.name || !form.email) {
      toast({ title: "Error", description: "Name and email are required", variant: "destructive" });
      return;
    }
    const customer: Customer = {
      ...form, id: crypto.randomUUID(), tags: selectedTags,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setCustomers(prev => [...prev, customer]);
    setForm(emptyCustomer);
    setSelectedTags([]);
    setShowAdd(false);
    toast({ title: "Customer Added", description: `${customer.name} has been added` });
  };

  const handleSaveEdit = () => {
    if (!editCustomer) return;
    setCustomers(prev => prev.map(c => c.id === editCustomer.id ? editCustomer : c));
    setEditCustomer(null);
    toast({ title: "Customer Updated" });
  };

  const handleDelete = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
    toast({ title: "Customer Deleted" });
  };

  const exportCustomers = () => {
    const csv = ["Name,Email,Phone,Tier,Visits,Points,Tags"]
      .concat(customers.map(c =>
        `"${c.name}","${c.email}","${c.phone}","${c.membershipTier}",${c.totalVisits},${c.loyaltyPoints},"${c.tags.join("; ")}"`
      )).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "customers.csv"; a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported", description: "Customer data exported as CSV" });
  };

  const tierColor = (tier: string) => {
    const colors: Record<string, string> = {
      Bronze: "bg-orange-100 text-orange-700 border-orange-200",
      Silver: "bg-gray-100 text-gray-700 border-gray-200",
      Gold: "bg-amber-100 text-amber-700 border-amber-200",
      Platinum: "bg-purple-100 text-purple-700 border-purple-200",
    };
    return colors[tier] || "";
  };

  return (
    <div className="space-y-4">
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-lg">Customer Directory</CardTitle>
              <CardDescription>{customers.length} total customers</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={exportCustomers} disabled={customers.length === 0}>
                <Download size={14} className="mr-1.5" />Export
              </Button>
              <Button size="sm" onClick={() => setShowAdd(true)}>
                <Plus size={14} className="mr-1.5" />Add Customer
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by name, email, or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
            </div>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-[130px] h-9"><SelectValue placeholder="Tier" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                {TIERS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map(c => (
                <div key={c.id} className="p-4 bg-secondary/30 rounded-xl border border-border/30">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-background">
                        <Users size={18} className="text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium">{c.name}</p>
                          <Badge variant="outline" className={`text-xs ${tierColor(c.membershipTier)}`}>{c.membershipTier}</Badge>
                          {c.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1"><Mail size={12} />{c.email}</span>
                          <span className="flex items-center gap-1"><Phone size={12} />{c.phone}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>{c.totalVisits} visits</span>
                          <span className="flex items-center gap-1"><Star size={12} />{c.loyaltyPoints} pts</span>
                          {c.lastVisit && <span>Last: {c.lastVisit}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setViewCustomer(c)}><Eye size={14} /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditCustomer(c)}><Edit size={14} /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(c.id)}><Trash2 size={14} /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                <Users size={28} className="text-muted-foreground" />
              </div>
              <p className="font-medium text-lg">{customers.length > 0 ? "No matching customers" : "No customers yet"}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {customers.length > 0 ? "Try adjusting your search" : "Add your first customer to get started"}
              </p>
              {customers.length === 0 && (
                <Button onClick={() => setShowAdd(true)} className="mt-4">Add Customer</Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Customer Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Customer</DialogTitle>
            <DialogDescription>Add a new customer to the directory</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Name *</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Full name" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Email *</Label><Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@example.com" /></div>
              <div className="space-y-2"><Label>Phone</Label><Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91..." /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Visits</Label><Input type="number" value={form.totalVisits || ""} onChange={e => setForm({...form, totalVisits: parseInt(e.target.value) || 0})} /></div>
              <div className="space-y-2"><Label>Loyalty Points</Label><Input type="number" value={form.loyaltyPoints || ""} onChange={e => setForm({...form, loyaltyPoints: parseInt(e.target.value) || 0})} /></div>
            </div>
            <div className="space-y-2">
              <Label>Membership Tier</Label>
              <Select value={form.membershipTier} onValueChange={v => setForm({...form, membershipTier: v as Customer["membershipTier"]})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{TIERS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-1.5">
                {DEFAULT_TAGS.map(tag => (
                  <Badge key={tag} variant={selectedTags.includes(tag) ? "default" : "outline"} className="cursor-pointer" onClick={() => toggleTag(tag)}>{tag}</Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2"><Label>Notes</Label><Textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={2} placeholder="Any notes..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={handleAdd}><Plus size={14} className="mr-1.5" />Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={!!editCustomer} onOpenChange={() => setEditCustomer(null)}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Customer</DialogTitle></DialogHeader>
          {editCustomer && (
            <div className="space-y-4">
              <div className="space-y-2"><Label>Name</Label><Input value={editCustomer.name} onChange={e => setEditCustomer({...editCustomer, name: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Email</Label><Input value={editCustomer.email} onChange={e => setEditCustomer({...editCustomer, email: e.target.value})} /></div>
                <div className="space-y-2"><Label>Phone</Label><Input value={editCustomer.phone} onChange={e => setEditCustomer({...editCustomer, phone: e.target.value})} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Visits</Label><Input type="number" value={editCustomer.totalVisits} onChange={e => setEditCustomer({...editCustomer, totalVisits: parseInt(e.target.value) || 0})} /></div>
                <div className="space-y-2"><Label>Loyalty Points</Label><Input type="number" value={editCustomer.loyaltyPoints} onChange={e => setEditCustomer({...editCustomer, loyaltyPoints: parseInt(e.target.value) || 0})} /></div>
              </div>
              <div className="space-y-2">
                <Label>Tier</Label>
                <Select value={editCustomer.membershipTier} onValueChange={v => setEditCustomer({...editCustomer, membershipTier: v as Customer["membershipTier"]})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{TIERS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-1.5">
                  {DEFAULT_TAGS.map(tag => (
                    <Badge key={tag} variant={editCustomer.tags.includes(tag) ? "default" : "outline"} className="cursor-pointer"
                      onClick={() => setEditCustomer({...editCustomer, tags: editCustomer.tags.includes(tag) ? editCustomer.tags.filter(t => t !== tag) : [...editCustomer.tags, tag]})}
                    >{tag}</Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2"><Label>Notes</Label><Textarea value={editCustomer.notes} onChange={e => setEditCustomer({...editCustomer, notes: e.target.value})} rows={2} /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditCustomer(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit}><Save size={14} className="mr-1.5" />Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Customer Dialog */}
      <Dialog open={!!viewCustomer} onOpenChange={() => setViewCustomer(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Customer Details</DialogTitle></DialogHeader>
          {viewCustomer && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-secondary"><Users size={24} className="text-primary" /></div>
                <div>
                  <p className="font-semibold text-lg">{viewCustomer.name}</p>
                  <Badge variant="outline" className={tierColor(viewCustomer.membershipTier)}>{viewCustomer.membershipTier}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-muted-foreground">Email</p><p className="font-medium">{viewCustomer.email}</p></div>
                <div><p className="text-muted-foreground">Phone</p><p className="font-medium">{viewCustomer.phone || "—"}</p></div>
                <div><p className="text-muted-foreground">Total Visits</p><p className="font-medium">{viewCustomer.totalVisits}</p></div>
                <div><p className="text-muted-foreground">Loyalty Points</p><p className="font-medium">{viewCustomer.loyaltyPoints}</p></div>
                <div><p className="text-muted-foreground">Last Visit</p><p className="font-medium">{viewCustomer.lastVisit || "—"}</p></div>
                <div><p className="text-muted-foreground">Member Since</p><p className="font-medium">{viewCustomer.createdAt}</p></div>
              </div>
              {viewCustomer.tags.length > 0 && (
                <div><p className="text-sm text-muted-foreground mb-1">Tags</p><div className="flex flex-wrap gap-1.5">{viewCustomer.tags.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}</div></div>
              )}
              {viewCustomer.notes && (
                <div><p className="text-sm text-muted-foreground">Notes</p><p className="text-sm mt-1 p-3 bg-secondary/50 rounded-lg">{viewCustomer.notes}</p></div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerManager;
