import { useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";

interface AddTeamUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTeamUserDialog({ open, onOpenChange }: AddTeamUserDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    telegram: "",
    campaign_limit: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const existingUsers = JSON.parse(localStorage.getItem("teamUsers") || "[]");
      const newUser = {
        id: crypto.randomUUID(),
        name: formData.name,
        email: formData.email,
        login: formData.email.split("@")[0],
        telegram: formData.telegram,
        campaign_limit: parseInt(formData.campaign_limit) || 0,
        available: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: crypto.randomUUID(),
      };
      
      localStorage.setItem("teamUsers", JSON.stringify([...existingUsers, newUser]));

      toast({
        title: "Team member added",
        description: "The team member has been added successfully.",
      });

      onOpenChange(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        telegram: "",
        campaign_limit: "",
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
            <Label htmlFor="name" className="text-sm">
              <span className="text-red-500">*</span> Name:
            </Label>
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
            <Label htmlFor="email" className="text-sm">
              <span className="text-red-500">*</span> E-Mail:
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm">
              <span className="text-red-500">*</span> Password:
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm">
              <span className="text-red-500">*</span> Confirm Password:
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="telegram" className="text-sm">
              <span className="text-red-500">*</span> Telegram:
            </Label>
            <Input
              id="telegram"
              value={formData.telegram}
              onChange={(e) =>
                setFormData({ ...formData, telegram: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="campaign_limit" className="text-sm">
              <span className="text-red-500">*</span> Campaign limit:
            </Label>
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
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-100 hover:bg-blue-200 text-black">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}