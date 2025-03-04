
import React, { useCallback, useRef, useState } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { X, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selectedItems: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  className,
  disabled = false,
}: MultiSelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleUnselect = useCallback((item: string) => {
    onChange(selected.filter((i) => i !== item));
  }, [onChange, selected]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          onChange(selected.slice(0, -1));
        }
      }
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, [onChange, selected]);

  const selectables = options.filter((option) => !selected.includes(option.value));

  return (
    <div className="relative">
      <div
        className={cn(
          "flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        onClick={() => {
          if (!disabled) {
            setOpen(true);
            inputRef.current?.focus();
          }
        }}
      >
        <div className="flex flex-wrap gap-1">
          {selected.length > 0 && (
            selected.map((item) => {
              const option = options.find((o) => o.value === item);
              return (
                <Badge key={item} variant="secondary" className="rounded hover:bg-muted">
                  {option?.label}
                  <button
                    type="button"
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnselect(item);
                    }}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {option?.label}</span>
                  </button>
                </Badge>
              );
            })
          )}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={selected.length === 0 ? placeholder : ""}
            disabled={disabled}
            className="ml-1 flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
            onKeyDown={handleKeyDown}
          />
        </div>
        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
      </div>
      <Command className={cn("absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md", !open && "hidden")}>
        <CommandGroup className="h-full overflow-auto">
          {selectables.length > 0 ? (
            selectables.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onChange([...selected, option.value]);
                  setInputValue("");
                }}
                className="flex items-center gap-2"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(option.value) ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))
          ) : (
            <CommandItem disabled>No items available</CommandItem>
          )}
        </CommandGroup>
      </Command>
    </div>
  );
}

