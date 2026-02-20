import { useState, useEffect } from "react";
import { PlatformConnection } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Plug, Unplug, Settings, ExternalLink, Webhook, Store, Heart, RefreshCw, CheckCircle2, XCircle, Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PLATFORMS: Omit<PlatformConnection, "status" | "apiKey" | "webhookUrl" | "lastSync">[] = [
  {
    id: "reelo",
    platform: "Reelo",
    description: "Customer loyalty, CRM, WhatsApp marketing, feedback & reviews management",
    features: ["Loyalty Programs", "CRM", "WhatsApp Marketing", "Reviews"],
  },
  {
    id: "petpooja",
    platform: "PetPooja",
    description: "POS, billing, inventory management, online ordering & delivery integration",
    features: ["POS & Billing", "Inventory", "Online Ordering", "Delivery"],
  },
  {
    id: "custom",
    platform: "Custom Webhook",
    description: "Connect any platform via webhook URL for real-time event notifications",
    features: ["Custom Events", "Zapier Compatible", "REST API", "Real-time"],
  },
];

const PlatformConnections = () => {
  const { toast } = useToast();
  const [connections, setConnections] = useState<Record<string, { apiKey: string; webhookUrl: string; connected: boolean; lastSync: string | null }>>({});
  const [configuring, setConfiguring] = useState<string | null>(null);
  const [tempApiKey, setTempApiKey] = useState("");
  const [tempWebhookUrl, setTempWebhookUrl] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rdcafe_platform_connections");
      if (saved) setConnections(JSON.parse(saved));
    } catch {}
  }, []);

  const saveConnections = (updated: typeof connections) => {
    setConnections(updated);
    localStorage.setItem("rdcafe_platform_connections", JSON.stringify(updated));
  };

  const openConfig = (platformId: string) => {
    const existing = connections[platformId];
    setTempApiKey(existing?.apiKey || "");
    setTempWebhookUrl(existing?.webhookUrl || "");
    setConfiguring(platformId);
  };

  const handleConnect = () => {
    if (!configuring) return;
    if (!tempApiKey && !tempWebhookUrl) {
      toast({ title: "Error", description: "Please provide an API key or webhook URL", variant: "destructive" });
      return;
    }
    const updated = {
      ...connections,
      [configuring]: {
        apiKey: tempApiKey,
        webhookUrl: tempWebhookUrl,
        connected: true,
        lastSync: new Date().toISOString(),
      },
    };
    saveConnections(updated);
    setConfiguring(null);
    toast({ title: "Connected!", description: `${PLATFORMS.find(p => p.id === configuring)?.platform} has been connected` });
  };

  const handleDisconnect = (platformId: string) => {
    const updated = { ...connections };
    delete updated[platformId];
    saveConnections(updated);
    toast({ title: "Disconnected", description: `${PLATFORMS.find(p => p.id === platformId)?.platform} has been disconnected` });
  };

  const handleTestWebhook = async (platformId: string) => {
    const conn = connections[platformId];
    if (!conn?.webhookUrl) return;
    try {
      await fetch(conn.webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "test", source: "rdcafe", timestamp: new Date().toISOString() }),
      });
      toast({ title: "Webhook Sent", description: "Test event sent successfully" });
    } catch {
      toast({ title: "Webhook Failed", description: "Could not reach the webhook URL", variant: "destructive" });
    }
  };

  const getPlatformIcon = (id: string) => {
    switch (id) {
      case "reelo": return Heart;
      case "petpooja": return Store;
      case "custom": return Webhook;
      default: return Plug;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Shield size={16} className="text-muted-foreground" />
        <p className="text-sm text-muted-foreground">API keys are stored locally for demo purposes. In production, use secure server-side storage.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLATFORMS.map(platform => {
          const conn = connections[platform.id];
          const isConnected = conn?.connected || false;
          const Icon = getPlatformIcon(platform.id);

          return (
            <Card key={platform.id} className={`border-border/50 transition-all ${isConnected ? "border-green-200 bg-green-50/30" : ""}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isConnected ? "bg-green-100" : "bg-secondary"}`}>
                      <Icon size={20} className={isConnected ? "text-green-700" : "text-muted-foreground"} />
                    </div>
                    <div>
                      <CardTitle className="text-base">{platform.platform}</CardTitle>
                      <Badge variant={isConnected ? "default" : "secondary"} className={`text-xs mt-1 ${isConnected ? "bg-green-600" : ""}`}>
                        {isConnected ? <><CheckCircle2 size={10} className="mr-1" />Connected</> : <><XCircle size={10} className="mr-1" />Not Connected</>}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-2">{platform.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {platform.features.map(f => (
                    <Badge key={f} variant="outline" className="text-xs">{f}</Badge>
                  ))}
                </div>
                {isConnected && conn?.lastSync && (
                  <p className="text-xs text-muted-foreground">Last sync: {new Date(conn.lastSync).toLocaleString()}</p>
                )}
                <div className="flex gap-2 pt-2">
                  {isConnected ? (
                    <>
                      <Button size="sm" variant="outline" onClick={() => openConfig(platform.id)}>
                        <Settings size={14} className="mr-1.5" />Settings
                      </Button>
                      {conn?.webhookUrl && (
                        <Button size="sm" variant="outline" onClick={() => handleTestWebhook(platform.id)}>
                          <RefreshCw size={14} className="mr-1.5" />Test
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDisconnect(platform.id)}>
                        <Unplug size={14} className="mr-1.5" />Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" onClick={() => openConfig(platform.id)}>
                      <Plug size={14} className="mr-1.5" />Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Config Dialog */}
      <Dialog open={!!configuring} onOpenChange={() => setConfiguring(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {configuring && `Configure ${PLATFORMS.find(p => p.id === configuring)?.platform}`}
            </DialogTitle>
            <DialogDescription>Enter your API credentials to connect</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>API Key</Label>
              <Input type="password" value={tempApiKey} onChange={e => setTempApiKey(e.target.value)} placeholder="Enter API key..." />
            </div>
            <div className="space-y-2">
              <Label>Webhook URL {configuring === "custom" && "*"}</Label>
              <Input value={tempWebhookUrl} onChange={e => setTempWebhookUrl(e.target.value)} placeholder="https://..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfiguring(null)}>Cancel</Button>
            <Button onClick={handleConnect}>
              <Plug size={14} className="mr-1.5" />Connect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlatformConnections;
