
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CampaignFormActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      <Button type="submit">Save</Button>
      <Button type="button" variant="outline" onClick={() => navigate('/campaigns')}>
        Cancel
      </Button>
    </div>
  );
};
