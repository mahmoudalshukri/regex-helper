"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface RegexExplanationProps {
  pattern: string;
}

interface Token {
  token: string;
  description: string;
}

const tokenExplanations: Record<string, string> = {
  "\\d": "Digit (0–9)",
  "\\D": "Non-digit",
  "\\w": "Word character (letters, digits, underscore)",
  "\\W": "Non-word character",
  "\\s": "Whitespace (space, tab, newline)",
  "\\S": "Non-whitespace",
  ".": "Any character (except newline)",
  "^": "Start of string/line",
  $: "End of string/line",
  "*": "Zero or more times",
  "+": "One or more times",
  "?": "Zero or one time (optional)",
  "|": "Alternation (OR)",
  "\\b": "Word boundary",
  "\\B": "Non-word boundary",
  "\\n": "Newline",
  "\\r": "Carriage return",
  "\\t": "Tab",
  "\\": "Escape character",
};

function parsePattern(pattern: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < pattern.length) {
    // Escaped tokens
    if (pattern[i] === "\\" && i + 1 < pattern.length) {
      const escaped = pattern.substring(i, i + 2);
      if (tokenExplanations[escaped]) {
        tokens.push({
          token: escaped,
          description: tokenExplanations[escaped],
        });
        i += 2;
        continue;
      }
    }

    // Character classes [...]
    if (pattern[i] === "[") {
      let j = i + 1;
      while (j < pattern.length && pattern[j] !== "]") j++;
      if (j < pattern.length) {
        tokens.push({
          token: pattern.substring(i, j + 1),
          description: "Character class (matches any character inside)",
        });
        i = j + 1;
        continue;
      }
    }

    // Groups (...)
    if (pattern[i] === "(") {
      let j = i + 1;
      let depth = 1;
      while (j < pattern.length && depth > 0) {
        if (pattern[j] === "(") depth++;
        if (pattern[j] === ")") depth--;
        j++;
      }
      const group = pattern.substring(i, j);
      tokens.push({
        token: group,
        description: group.startsWith("(?:")
          ? "Non-capturing group"
          : "Capturing group",
      });
      i = j;
      continue;
    }

    // Quantifiers {m,n}
    if (pattern[i] === "{") {
      let j = i + 1;
      while (j < pattern.length && pattern[j] !== "}") j++;
      if (j < pattern.length) {
        tokens.push({
          token: pattern.substring(i, j + 1),
          description: "Quantifier (specific number of repetitions)",
        });
        i = j + 1;
        continue;
      }
    }

    // Single character tokens
    if (tokenExplanations[pattern[i]]) {
      tokens.push({
        token: pattern[i],
        description: tokenExplanations[pattern[i]],
      });
      i++;
      continue;
    }

    // Literal characters
    if (/[a-zA-Z0-9]/.test(pattern[i])) {
      let j = i;
      while (j < pattern.length && /[a-zA-Z0-9]/.test(pattern[j])) j++;
      tokens.push({
        token: pattern.substring(i, j),
        description: "Literal character(s)",
      });
      i = j;
    } else {
      tokens.push({
        token: pattern[i],
        description: "Special character or literal",
      });
      i++;
    }
  }

  return tokens;
}

export default function RegexExplanation({ pattern }: RegexExplanationProps) {
  if (!pattern) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Enter a regex pattern to see its explanation
      </div>
    );
  }

  const tokens = parsePattern(pattern);

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-3 pr-4">
        {tokens.map((token, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 rounded-lg border bg-white dark:bg-gray-800 hover:shadow-sm transition-shadow">
            <Badge variant="secondary" className="font-mono shrink-0 mt-0.5">
              {token.token}
            </Badge>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {token.description}
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
