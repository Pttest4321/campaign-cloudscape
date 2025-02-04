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
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  // Add new state for filters
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [answer, setAnswer] = useState("");
  const [splitGroup, setSplitGroup] = useState("");
  const [browser, setBrowser] = useState("");
  const [platform, setPlatform] = useState("");
  const [usageType, setUsageType] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [version, setVersion] = useState("");
  const [domain, setDomain] = useState("");
  const [gcid, setGcid] = useState(false);

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

    // Here you would typically make an API call with the filters
    console.log("Applying filters:", {
      campaign: selectedCampaign,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      country,
      language,
      answer,
      splitGroup,
      browser,
      platform,
      usageType,
      ipAddress,
      version,
      domain,
      gcid,
    });

    toast({
      title: "Filters Applied",
      description: "The statistics have been updated",
    });
  };

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
          
          <Button className="self-end" onClick={handleApply}>Apply</Button>
        </div>

        {/* Data Table with Filters */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium">Filter traffic by the necessary parameters</h3>
          </div>
          
          <div className="p-4 space-y-4">
            {/* First Row of Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Answer</label>
                <Select value={answer} onValueChange={setAnswer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select answer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Split Group</label>
                <Select value={splitGroup} onValueChange={setSplitGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select split group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Group A</SelectItem>
                    <SelectItem value="b">Group B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Second Row of Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Browser</label>
                <Select value={browser} onValueChange={setBrowser}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select browser" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chrome">Chrome</SelectItem>
                    <SelectItem value="firefox">Firefox</SelectItem>
                    <SelectItem value="safari">Safari</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Platform</label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="windows">Windows</SelectItem>
                    <SelectItem value="mac">MacOS</SelectItem>
                    <SelectItem value="linux">Linux</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Usage Type</label>
                <Select value={usageType} onValueChange={setUsageType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select usage type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">IP Address</label>
                <Input 
                  type="text" 
                  value={ipAddress} 
                  onChange={(e) => setIpAddress(e.target.value)}
                  placeholder="Enter IP address"
                />
              </div>
            </div>

            {/* Third Row of Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Version</label>
                <Input 
                  type="text" 
                  value={version} 
                  onChange={(e) => setVersion(e.target.value)}
                  placeholder="Enter version"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Domain</label>
                <Input 
                  type="text" 
                  value={domain} 
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Enter domain"
                />
              </div>

              <div className="space-y-2 flex items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Switch 
                    checked={gcid} 
                    onCheckedChange={setGcid} 
                  />
                  <span className="text-sm font-medium">GCID</span>
                </label>
              </div>

              <div className="space-y-2 flex items-center justify-end gap-2">
                <Button variant="outline" onClick={() => {
                  setCountry("");
                  setLanguage("");
                  setAnswer("");
                  setSplitGroup("");
                  setBrowser("");
                  setPlatform("");
                  setUsageType("");
                  setIpAddress("");
                  setVersion("");
                  setDomain("");
                  setGcid(false);
                }}>
                  Reset
                </Button>
                <Button onClick={handleApply}>
                  Apply
                </Button>
              </div>
            </div>
          </div>

          {/* Table content */}
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
