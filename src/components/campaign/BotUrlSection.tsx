
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

export const BotUrlSection = () => {
  const form = useFormContext();

  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="bot_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              Link for bots
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="redirect.php" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
