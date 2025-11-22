"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface RegexFlags {
  g: boolean;
  i: boolean;
  m: boolean;
  s: boolean;
  u: boolean;
  y: boolean;
}

interface RegexInputProps {
  pattern: string;
  onChange: (pattern: string) => void;
  flags: RegexFlags;
  onFlagChange: (flag: keyof RegexFlags) => void;
}

const flagDescriptions: Record<keyof RegexFlags, string> = {
  g: "global",
  i: "case-insensitive",
  m: "multiline",
  s: "dotAll",
  u: "unicode",
  y: "sticky",
};

export default function RegexInput({
  pattern,
  onChange,
  flags,
  onFlagChange,
}: RegexInputProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="regex-pattern">Pattern</Label>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 dark:text-gray-400 font-mono text-lg">
            /
          </span>
          <Input
            id="regex-pattern"
            value={pattern}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter regex pattern..."
            className="font-mono flex-1"
          />
          <span className="text-gray-500 dark:text-gray-400 font-mono text-lg">
            /
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Flags</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {(Object.keys(flags) as Array<keyof RegexFlags>).map((flag) => (
            <div
              key={flag}
              className="flex items-center justify-between space-x-2 rounded-lg border p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-2">
                <Badge
                  variant={flags[flag] ? "default" : "outline"}
                  className="font-mono w-6 h-6 flex items-center justify-center p-0">
                  {flag}
                </Badge>

                <Label
                  htmlFor={`flag-${flag}`}
                  className="text-sm cursor-pointer">
                  {flagDescriptions[flag]}
                </Label>
              </div>

              <Switch
                id={`flag-${flag}`}
                checked={flags[flag]}
                onCheckedChange={() => onFlagChange(flag)}
              />
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Flags:</span> g (global), i
          (case-insensitive), m (multiline), s (dotAll), u (unicode), y (sticky)
        </p>
      </div>
    </div>
  );
}
