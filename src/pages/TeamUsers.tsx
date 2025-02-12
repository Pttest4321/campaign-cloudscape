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
import { UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AddTeamUserDialog } from "@/components/team/AddTeamUserDialog";
import { format } from "date-fns";

export default function TeamUsers() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [teamUsers, setTeamUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = () => {
      try {
        const storedUsers = JSON.parse(localStorage.getItem("teamUsers") || "[]");
        if (storedUsers.length === 0) {
          const exampleUsers = [
            {
              id: "example-1",
              name: "John Smith",
              email: "john@example.com",
              login: "john.smith",
              telegram: "@johnsmith",
              campaign_limit: 5,
              available: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              user_id: "example-1",
            },
            {
              id: "example-2",
              name: "Sarah Johnson",
              email: "sarah@example.com",
              login: "sarah.j",
              telegram: "@sarahj",
              campaign_limit: 3,
              available: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              user_id: "example-2",
            },
          ];
          localStorage.setItem("teamUsers", JSON.stringify(exampleUsers));
          setTeamUsers(exampleUsers);
        } else {
          setTeamUsers(storedUsers);
        }
      } catch (error) {
        console.error("Error loading team users:", error);
        toast({
          title: "Error loading team users",
          description: "There was a problem loading the team users.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [toast]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Users</h1>
          <p className="text-muted-foreground">
            Manage your team members and their permissions.
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <UserPlus className="mr-2" />
          Add Team Member
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Login</TableHead>
              <TableHead>Telegram</TableHead>
              <TableHead className="text-center">Campaign Limit</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-center">Available</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <img 
                      src="/placeholder.svg" 
                      alt="No data" 
                      className="w-16 h-16 mb-4 opacity-50"
                    />
                    No data
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              teamUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.login}</TableCell>
                  <TableCell>{user.telegram || "-"}</TableCell>
                  <TableCell className="text-center">{user.campaign_limit}</TableCell>
                  <TableCell>
                    {format(new Date(user.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-center">
                    <span 
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.available 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.available ? "Yes" : "No"}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AddTeamUserDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
}