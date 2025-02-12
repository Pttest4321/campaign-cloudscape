import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import { AddTeamUserDialog } from "@/components/team/AddTeamUserDialog";
import { format } from "date-fns";

interface TeamUser {
  id: string;
  name: string;
  email: string;
  login: string;
  telegram: string;
  campaign_limit: number;
  available: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export default function TeamUsers() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [teamUsers, setTeamUsers] = useState<TeamUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTeamUsers();
  }, []);

  const fetchTeamUsers = () => {
    try {
      const storedUsers = localStorage.getItem('teamUsers');
      if (storedUsers) {
        setTeamUsers(JSON.parse(storedUsers));
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching team users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch team users",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4 fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Team Users</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Login</TableHead>
            <TableHead>Telegram</TableHead>
            <TableHead>Campaign Limit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.login}</TableCell>
              <TableCell>{user.telegram}</TableCell>
              <TableCell>{user.campaign_limit}</TableCell>
              <TableCell>
                <Badge variant={user.available ? "default" : "secondary"}>
                  {user.available ? "Available" : "Unavailable"}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(user.created_at), "MMM d, yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddTeamUserDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
}