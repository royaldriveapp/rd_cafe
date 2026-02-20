import { Customer } from "@/types/admin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Plug } from "lucide-react";
import CustomerManager from "./CustomerManager";
import PlatformConnections from "./PlatformConnections";

interface IntegrationsTabProps {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

const IntegrationsTab = ({ customers, setCustomers }: IntegrationsTabProps) => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 max-w-xs">
          <TabsTrigger value="customers" className="gap-1.5">
            <Database size={14} />
            Data Management
          </TabsTrigger>
          <TabsTrigger value="platforms" className="gap-1.5">
            <Plug size={14} />
            Platforms
          </TabsTrigger>
        </TabsList>

        <TabsContent value="customers">
          <CustomerManager customers={customers} setCustomers={setCustomers} />
        </TabsContent>

        <TabsContent value="platforms">
          <PlatformConnections />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationsTab;
