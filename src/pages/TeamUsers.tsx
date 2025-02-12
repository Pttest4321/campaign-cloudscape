import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserPlus, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AddTeamUserDialog } from "@/components/team/AddTeamUserDialog";

export default function TeamUsers() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Add example team users if none exist
  const addExampleUsers = async () => {
    const exampleUsers = [
      {
        name: "John Smith",
        email: "john@example.com",
        telegram: "@johnsmith",
        campaign_limit: 5,
        editing_allowed: true,
        user_id: "example-1",
      },
      {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        telegram: "@sarahj",
        campaign_limit: 3,
        editing_allowed: false,
        user_id: "example-2",
      },
    ];

    try {
      const { data: existingUsers } = await supabase
        .from("team_users")
        .select("*");

      if (!existingUsers || existingUsers.length === 0) {
        const { error } = await supabase
          .from("team_users")
          .insert(exampleUsers);

        if (error) throw error;
      }
    } catch (error) {
      console.error("Error adding example users:", error);
    }
  };

  const { data: teamUsers, isLoading } = useQuery({
    queryKey: ["team-users"],
    queryFn: async () => {
      await addExampleUsers();

      const { data, error } = await supabase
        .from("team_users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          title: "Error fetching team users",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

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
              <TableHead>Email</TableHead>
              <TableHead>Telegram</TableHead>
              <TableHead className="text-center">Campaign Limit</TableHead>
              <TableHead className="text-center">Editing Allowed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamUsers?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.telegram || "-"}</TableCell>
                <TableCell className="text-center">{user.campaign_limit}</TableCell>
                <TableCell className="text-center">
                  {user.editing_allowed ? (
                    <Check className="h-4 w-4 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mx-auto" />
                  )}
                </TableCell>
              </TableRow>
            ))}
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