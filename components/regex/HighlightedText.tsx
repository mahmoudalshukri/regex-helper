"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

interface Match {
  index: number;
  value: string;
  start: number;
  end: number;
  groups: string[];
}

interface HighlightedTextProps {
  text: string;
  matches: Match[];
}

export default function HighlightedText({
  text,
  matches,
}: HighlightedTextProps) {
  if (matches.length === 0) {
    return (
      <ScrollArea className="h-[200px] rounded-md border bg-gray-50 dark:bg-gray-900 p-4">
        <pre className="text-sm font-mono whitespace-pre-wrap break-words">
          {text}
        </pre>
      </ScrollArea>
    );
  }

  const sortedMatches = [...matches].sort((a, b) => a.start - b.start);

  const parts: JSX.Element[] = [];
  let lastIndex = 0;

  sortedMatches.forEach((match, idx) => {
    if (match.start > lastIndex) {
      parts.push(
        <span key={`text-${idx}`}>
          {text.substring(lastIndex, match.start)}
        </span>,
      );
    }

    parts.push(
      <mark
        key={`match-${idx}`}
        className="bg-yellow-200 dark:bg-yellow-600 text-gray-900 dark:text-gray-100 font-semibold rounded px-0.5">
        {match.value}
      </mark>,
    );

    lastIndex = match.end;
  });

  if (lastIndex < text.length) {
    parts.push(<span key="text-end">{text.substring(lastIndex)}</span>);
  }

  return (
    <ScrollArea className="h-[200px] rounded-md border bg-gray-50 dark:bg-gray-900 p-4">
      <pre className="text-sm font-mono whitespace-pre-wrap break-words">
        {parts}
      </pre>
    </ScrollArea>
  );
}
