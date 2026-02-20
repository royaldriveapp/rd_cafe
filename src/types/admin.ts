export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalVisits: number;
  lastVisit: string;
  loyaltyPoints: number;
  membershipTier: "Bronze" | "Silver" | "Gold" | "Platinum";
  tags: string[];
  notes: string;
  createdAt: string;
}

export interface PlatformConnection {
  id: string;
  platform: string;
  description: string;
  status: "connected" | "disconnected";
  apiKey: string;
  webhookUrl: string;
  lastSync: string | null;
  features: string[];
}

export type CreateCustomerInput = Omit<Customer, "id" | "createdAt">;
