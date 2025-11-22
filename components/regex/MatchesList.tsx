"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Match {
  index: number;
  value: string;
  start: number;
  end: number;
  groups: string[];
}

interface MatchesListProps {
  matches: Match[];
}

export default function MatchesList({ matches }: MatchesListProps) {
  if (matches.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No matches found
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] rounded-md border">
      <div className="p-4 space-y-3">
        {matches.map((match) => (
          <div
            key={`${match.index}-${match.start}`}
            className="rounded-lg border bg-white dark:bg-gray-800 p-4 space-y-2 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono">
                  #{match.index}
                </Badge>
                <code className="text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded font-mono break-all">
                  {match.value}
                </code>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {match.start}–{match.end}
              </div>
            </div>

            {match.groups.length > 0 && (
              <div className="space-y-1 pt-2 border-t">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Captured Groups:
                </p>
                <div className="flex flex-wrap gap-2">
                  {match.groups.map((group, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="font-mono text-xs">
                      ${idx + 1}: {group}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
