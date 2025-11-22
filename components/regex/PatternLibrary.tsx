"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Pattern {
  name: string;
  pattern: string;
  description: string;
  category: string;
}

interface PatternLibraryProps {
  onSelectPattern: (pattern: string) => void;
}

const patterns: Pattern[] = [
  {
    name: "Email",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    description: "Matches most common email addresses",
    category: "Common",
  },
  {
    name: "URL",
    pattern:
      "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
    description: "Matches HTTP and HTTPS URLs",
    category: "Common",
  },
  {
    name: "Phone (International)",
    pattern: "\\+?[1-9]\\d{1,14}",
    description: "Matches international phone numbers (E.164 format)",
    category: "Common",
  },
  {
    name: "Username",
    pattern: "^[a-zA-Z0-9_]{3,16}$",
    description: "Letters, digits, underscore, 3-16 characters",
    category: "Validation",
  },
  {
    name: "Strong Password",
    pattern:
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    description: "Min 8 chars, uppercase, lowercase, digit, special char",
    category: "Validation",
  },
  {
    name: "IPv4 Address",
    pattern:
      "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b",
    description: "Matches valid IPv4 addresses",
    category: "Network",
  },
  {
    name: "Hex Color",
    pattern: "#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})",
    description: "Matches hex color codes (#fff or #ffffff)",
    category: "Web",
  },
  {
    name: "Date (YYYY-MM-DD)",
    pattern: "\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])",
    description: "Matches dates in YYYY-MM-DD format",
    category: "Date/Time",
  },
  {
    name: "Credit Card",
    pattern: "\\b\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}\\b",
    description: "Matches credit card numbers (with optional separators)",
    category: "Financial",
  },
  {
    name: "HTML Tag",
    pattern: "<([a-z]+)([^<]+)*(?:>(.*)<\\/\\1>|\\s+\\/>)",
    description: "Matches HTML tags",
    category: "Web",
  },
];

export default function PatternLibrary({
  onSelectPattern,
}: PatternLibraryProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (pattern: string, index: number) => {
    try {
      await navigator.clipboard.writeText(pattern);
      setCopiedIndex(index);
      toast.success("Pattern copied to clipboard!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast.error("Failed to copy pattern");
    }
  };

  const categories = Array.from(new Set(patterns.map((p) => p.category)));

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4 pr-4">
        {categories.map((category) => (
          <div key={category} className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Badge variant="outline">{category}</Badge>
            </h4>

            <div className="space-y-2">
              {patterns
                .filter((p) => p.category === category)
                .map((pattern, idx) => {
                  const globalIndex = patterns.indexOf(pattern);

                  return (
                    <div
                      key={idx}
                      className="rounded-lg border bg-white dark:bg-gray-800 p-4 space-y-3 hover:shadow-md transition-shadow">
                      <div className="space-y-1">
                        <h5 className="font-semibold text-sm text-gray-900 dark:text-white">
                          {pattern.name}
                        </h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {pattern.description}
                        </p>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900 rounded p-2">
                        <code className="text-xs font-mono text-gray-800 dark:text-gray-200 break-all">
                          {pattern.pattern}
                        </code>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => onSelectPattern(pattern.pattern)}
                          className="flex-1">
                          Use Pattern
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleCopy(pattern.pattern, globalIndex)
                          }>
                          {copiedIndex === globalIndex ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
