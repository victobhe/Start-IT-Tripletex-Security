import { useState } from "react";
import { ECCSidebar } from "@/components/ECCSidebar";
import { Topbar } from "@/components/Topbar";
import { GovernanceTab } from "@/components/GovernanceTab";
import { IntegrationsTab } from "@/components/IntegrationsTab";
import { SecurityTab } from "@/components/SecurityTab";
import { AboutTab } from "@/components/AboutTab";

type Tab = "governance" | "integrations" | "security" | "about";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("governance");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <ECCSidebar activeTab={activeTab} onTabChange={(t) => setActiveTab(t as Tab)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar activeTab={activeTab} />
        <main className="flex flex-1 overflow-hidden">
          {activeTab === "governance" && <GovernanceTab />}
          {activeTab === "integrations" && <IntegrationsTab />}
          {activeTab === "security" && <SecurityTab />}
        </main>
      </div>
    </div>
  );
};

export default Index;
