import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, Globe, Target } from "lucide-react";

const stats = [
  {
    title: "Total Campaigns",
    value: "12",
    icon: Target,
    description: "Active campaigns",
  },
  {
    title: "Total Clicks",
    value: "1,234",
    icon: BarChart,
    description: "Last 30 days",
  },
  {
    title: "Total Users",
    value: "789",
    icon: Users,
    description: "Unique visitors",
  },
  {
    title: "Countries",
    value: "25",
    icon: Globe,
    description: "Targeted regions",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-background/50 backdrop-blur-xl border border-border/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}