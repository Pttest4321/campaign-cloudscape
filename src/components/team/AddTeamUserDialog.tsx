import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface AddTeamUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTeamUserDialog({ open, onOpenChange }: AddTeamUserDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    login: "",
    telegram: "",
    campaign_limit: "0",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("No user logged in");

      const { error } = await supabase.from("team_users").insert({
        ...formData,
        campaign_limit: parseInt(formData.campaign_limit),
        user_id: user.id,
      });

      if (error) throw error;

      toast({
        title: "Team member added",
        description: "The team member has been added successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ["team-users"] });
      onOpenChange(false);
      setFormData({
        name: "",
        login: "",
        telegram: "",
        campaign_limit: "0",
      });
    } catch (error) {
      console.error("Error adding team member:", error);
      toast({
        title: "Error adding team member",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="login">Login</Label>
            <Input
              id="login"
              value={formData.login}
              onChange={(e) =>
                setFormData({ ...formData, login: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telegram">Telegram</Label>
            <Input
              id="telegram"
              value={formData.telegram}
              onChange={(e) =>
                setFormData({ ...formData, telegram: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="campaign_limit">Campaign Limit</Label>
            <Input
              id="campaign_limit"
              type="number"
              min="0"
              value={formData.campaign_limit}
              onChange={(e) =>
                setFormData({ ...formData, campaign_limit: e.target.value })
              }
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Member"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}