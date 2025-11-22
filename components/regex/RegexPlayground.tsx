"use client";

import { useState, useCallback, useEffect } from "react";
import RegexInput from "./RegexInput";
import TestTextInput from "./TestTextInput";
import MatchesList from "./MatchesList";
import HighlightedText from "./HighlightedText";
import RegexExplanation from "./RegexExplanation";
import PatternLibrary from "./PatternLibrary";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface Match {
  index: number;
  value: string;
  start: number;
  end: number;
  groups: string[];
}

interface RegexFlags {
  g: boolean;
  i: boolean;
  m: boolean;
  s: boolean;
  u: boolean;
  y: boolean;
}

export default function RegexPlayground() {
  const [pattern, setPattern] = useState("\\w+");
  const [flags, setFlags] = useState<RegexFlags>({
    g: true,
    i: false,
    m: false,
    s: false,
    u: false,
    y: false,
  });
  const [testText, setTestText] = useState(
    "Hello World! This is a test string with 123 numbers.",
  );
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [debouncedPattern, setDebouncedPattern] = useState(pattern);

  // Debounce pattern changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPattern(pattern);
    }, 200);

    return () => clearTimeout(timer);
  }, [pattern]);

  // Process regex and find matches
  useEffect(() => {
    if (!debouncedPattern || !testText) {
      setMatches([]);
      setError(null);
      return;
    }

    try {
      const flagString = Object.entries(flags)
        .filter(([_, enabled]) => enabled)
        .map(([flag]) => flag)
        .join("");

      const regex = new RegExp(debouncedPattern, flagString);
      const foundMatches: Match[] = [];
      let matchCount = 0;
      const maxMatches = 500;

      if (flags.g) {
        let match;
        while (
          (match = regex.exec(testText)) !== null &&
          matchCount < maxMatches
        ) {
          foundMatches.push({
            index: matchCount + 1,
            value: match[0],
            start: match.index,
            end: match.index + match[0].length,
            groups: match.slice(1).filter((g) => g !== undefined),
          });
          matchCount++;

          // Prevent infinite loop for zero-length matches
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(testText);
        if (match) {
          foundMatches.push({
            index: 1,
            value: match[0],
            start: match.index,
            end: match.index + match[0].length,
            groups: match.slice(1).filter((g) => g !== undefined),
          });
        }
      }

      setMatches(foundMatches);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid regular expression",
      );
      setMatches([]);
    }
  }, [debouncedPattern, flags, testText]);

  const handleFlagChange = useCallback((flag: keyof RegexFlags) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  }, []);

  const handleSelectPattern = useCallback((newPattern: string) => {
    setPattern(newPattern);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column - Regex Builder */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Regular Expression</CardTitle>
            <CardDescription>
              Enter your regex pattern and select flags
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegexInput
              pattern={pattern}
              onChange={setPattern}
              flags={flags}
              onFlagChange={handleFlagChange}
            />
          </CardContent>
        </Card>

        <Card>
          <Tabs defaultValue="explain" className="w-full">
            <CardHeader className="pb-3">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="explain">Explain</TabsTrigger>
                <TabsTrigger value="library">Library</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="explain" className="mt-0">
                <RegexExplanation pattern={debouncedPattern} />
              </TabsContent>
              <TabsContent value="library" className="mt-0">
                <PatternLibrary onSelectPattern={handleSelectPattern} />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>

      {/* Right Column - Test & Results */}
      <div className="space-y-6">
        <TestTextInput value={testText} onChange={setTestText} />

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>
              {matches.length > 0
                ? `Found ${matches.length} match${
                    matches.length === 1 ? "" : "es"
                  }`
                : "No matches found"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <>
                {matches.length > 0 && (
                  <>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Highlighted Text
                      </h4>
                      <HighlightedText text={testText} matches={matches} />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Match Details
                      </h4>
                      <MatchesList matches={matches} />
                    </div>
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
