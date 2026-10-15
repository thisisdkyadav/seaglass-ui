import { Tabs, TabsList, Tab, TabsContent } from "seaglass";
import { LayoutDashboard, Zap, Settings } from "lucide-react";

export default function PebbleTabs() {
  return (
    <Tabs defaultValue="overview" style={{ width: "min(460px, 100%)" }}>
      <TabsList>
        <Tab value="overview" icon={<LayoutDashboard />}>Overview</Tab>
        <Tab value="activity" icon={<Zap />} count={8}>Activity</Tab>
        <Tab value="settings" icon={<Settings />}>Settings</Tab>
      </TabsList>
      <TabsContent value="overview">The active tab is a white chip resting inside the pebble.</TabsContent>
      <TabsContent value="activity">Eight new events since yesterday.</TabsContent>
      <TabsContent value="settings">Settings live here.</TabsContent>
    </Tabs>
  );
}
