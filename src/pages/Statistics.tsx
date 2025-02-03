import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const lineData = [
  { date: "27/01", clicks: 15, users: 2 },
  { date: "28/01", clicks: 18, users: 3 },
  { date: "29/01", clicks: 12, users: 2 },
  { date: "30/01", clicks: 21, users: 4 },
  { date: "31/01", clicks: 15, users: 3 },
  { date: "01/02", clicks: 8, users: 1 },
  { date: "02/02", clicks: 5, users: 1 },
];

const pieData = [
  { name: "Desktop", value: 45, color: "#2563eb" },
  { name: "Mobile", value: 31, color: "#4ade80" },
];

const tableData = [
  {
    time: "2025-01-31 20:40:35",
    answer: "0",
    splitGroup: "-",
    conversion: "-",
    ipAddress: "186.110.203.108",
    country: "CN",
    language: "zh",
    browser: "Safari",
    version: "13.0.3",
    platform: "iOS",
    usageType: "DCH",
    domain: "ny4free.net",
  },
  // ... Add more table data as needed
];

export default function Statistics() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedCampaign, setSelectedCampaign] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Statistics</h1>
      </div>

      <div className="grid gap-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Campaign Name</label>
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger>
                <SelectValue placeholder="Select Campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="campaign1">Campaign 1</SelectItem>
                <SelectItem value="campaign2">Campaign 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Period</label>
            <div className="flex gap-2 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !startDate && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <span>—</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !endDate && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <Button className="self-end">Apply</Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-6 rounded-lg border bg-card">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Total</h3>
                <p className="text-2xl font-bold">76 clicks</p>
                <p className="text-sm text-muted-foreground">75 users</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-lg border bg-card">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Target</h3>
                <p className="text-2xl font-bold">1 clicks</p>
                <p className="text-sm text-muted-foreground">1 users</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-lg border bg-card">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Block</h3>
                <p className="text-2xl font-bold">75 clicks</p>
                <p className="text-sm text-muted-foreground">74 users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 h-[300px] p-6 rounded-lg border bg-card">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#4ade80"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="h-[300px] p-6 rounded-lg border bg-card">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan x="50%" dy="-0.5em" className="text-lg font-bold">
                    Total
                  </tspan>
                  <tspan x="50%" dy="1.5em" className="text-2xl font-bold">
                    76
                  </tspan>
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium">Filter traffic by the necessary parameters</h3>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Answer</TableHead>
                  <TableHead>Split Group</TableHead>
                  <TableHead>Conversion</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Browser</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Usage Type</TableHead>
                  <TableHead>Domain</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.answer}</TableCell>
                    <TableCell>{row.splitGroup}</TableCell>
                    <TableCell>{row.conversion}</TableCell>
                    <TableCell>{row.ipAddress}</TableCell>
                    <TableCell>{row.country}</TableCell>
                    <TableCell>{row.language}</TableCell>
                    <TableCell>{row.browser}</TableCell>
                    <TableCell>{row.version}</TableCell>
                    <TableCell>{row.platform}</TableCell>
                    <TableCell>{row.usageType}</TableCell>
                    <TableCell>{row.domain}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
```