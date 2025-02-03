import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Temporary mock data - replace with actual data in future
const mockCampaigns = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Campaign ${i + 1}`,
  country: "United States",
  language: "English",
  status: i % 2 === 0 ? "Active" : "Inactive",
}));

export default function Campaigns() {
  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <Button asChild>
          <Link to="/campaigns/new" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Campaign
          </Link>
        </Button>
      </div>

      <div className="glass-card glass-card-dark p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {mockCampaigns.slice(0, 8).map((campaign) => (
            <div
              key={campaign.id}
              className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
            >
              <h3 className="font-semibold mb-2">{campaign.name}</h3>
              <div className="text-sm text-muted-foreground">
                <p>{campaign.country}</p>
                <p>{campaign.language}</p>
                <p className={campaign.status === "Active" ? "text-green-500" : "text-red-500"}>
                  {campaign.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}