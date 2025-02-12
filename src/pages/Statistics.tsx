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
import { CalendarIcon, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
];

export default function Statistics() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    country: "",
    language: "",
    answer: "",
    splitGroup: "",
    browser: "",
    platform: "",
    usageType: "",
    ipAddress: "",
    version: "",
    domain: "",
    gcid: false
  });
  const { toast } = useToast();

  const handleApply = () => {
    if (!selectedCampaign) {
      toast({
        title: "Campaign Required",
        description: "Please select a campaign before applying filters",
        variant: "destructive",
      });
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: "Date Range Required",
        description: "Please select both start and end dates",
        variant: "destructive",
      });
      return;
    }

    if (startDate > endDate) {
      toast({
        title: "Invalid Date Range",
        description: "Start date must be before end date",
        variant: "destructive",
      });
      return;
    }

    console.log("Applying filters:", {
      campaign: selectedCampaign,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      ...filters
    });

    toast({
      title: "Filters Applied",
      description: "The statistics have been updated",
    });
  };

  const handleReset = () => {
    setFilters({
      country: "",
      language: "",
      answer: "",
      splitGroup: "",
      browser: "",
      platform: "",
      usageType: "",
      ipAddress: "",
      version: "",
      domain: "",
      gcid: false
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Statistics</h1>
      </div>

      <div className="grid gap-6">
        {/* Filters */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
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
                <span className="hidden sm:block">—</span>
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
            
            <Button className="w-full md:w-auto self-end" onClick={handleApply}>Apply</Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-[300px] p-4 sm:p-6 rounded-lg border bg-card">
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
          
          <div className="h-[300px] p-4 sm:p-6 rounded-lg border bg-card">
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

        {/* Advanced Filters */}
        <Collapsible
          open={isFiltersOpen}
          onOpenChange={setIsFiltersOpen}
          className="w-full space-y-4"
        >
          <div className="p-4 sm:p-6 rounded-lg border bg-card">
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  <h3 className="text-base sm:text-lg font-medium">Filter</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Filter traffic by the necessary parameters
                </p>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  {isFiltersOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Select
                  value={filters.country}
                  onValueChange={(value) => setFilters({ ...filters, country: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="cn">China</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.language}
                  onValueChange={(value) => setFilters({ ...filters, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.answer}
                  onValueChange={(value) => setFilters({ ...filters, answer: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Answer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.splitGroup}
                  onValueChange={(value) => setFilters({ ...filters, splitGroup: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Split Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Group A</SelectItem>
                    <SelectItem value="b">Group B</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.browser}
                  onValueChange={(value) => setFilters({ ...filters, browser: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Browser" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chrome">Chrome</SelectItem>
                    <SelectItem value="firefox">Firefox</SelectItem>
                    <SelectItem value="safari">Safari</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.platform}
                  onValueChange={(value) => setFilters({ ...filters, platform: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="windows">Windows</SelectItem>
                    <SelectItem value="mac">macOS</SelectItem>
                    <SelectItem value="ios">iOS</SelectItem>
                    <SelectItem value="android">Android</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.usageType}
                  onValueChange={(value) => setFilters({ ...filters, usageType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Usage Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dch">DCH</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="IP Address"
                  value={filters.ipAddress}
                  onChange={(e) => setFilters({ ...filters, ipAddress: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Input
                  placeholder="Version"
                  value={filters.version}
                  onChange={(e) => setFilters({ ...filters, version: e.target.value })}
                />

                <Input
                  placeholder="Domain"
                  value={filters.domain}
                  onChange={(e) => setFilters({ ...filters, domain: e.target.value })}
                />

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={filters.gcid}
                    onCheckedChange={(checked) => setFilters({ ...filters, gcid: checked })}
                  />
                  <span>GCID</span>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleReset} className="flex-1 sm:flex-none">Reset</Button>
                  <Button onClick={handleApply} className="flex-1 sm:flex-none">Apply</Button>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Data Table */}
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="text-base sm:text-lg font-medium">Traffic Data</h3>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Time</TableHead>
                  <TableHead className="min-w-[100px]">Answer</TableHead>
                  <TableHead className="min-w-[100px]">Split Group</TableHead>
                  <TableHead className="min-w-[100px]">Conversion</TableHead>
                  <TableHead className="min-w-[120px]">IP Address</TableHead>
                  <TableHead className="min-w-[100px]">Country</TableHead>
                  <TableHead className="min-w-[100px]">Language</TableHead>
                  <TableHead className="min-w-[100px]">Browser</TableHead>
                  <TableHead className="min-w-[100px]">Version</TableHead>
                  <TableHead className="min-w-[100px]">Platform</TableHead>
                  <TableHead className="min-w-[100px]">Usage Type</TableHead>
                  <TableHead className="min-w-[150px]">Domain</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="whitespace-nowrap">{row.time}</TableCell>
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
