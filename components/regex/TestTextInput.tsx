"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TestTextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TestTextInput({ value, onChange }: TestTextInputProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Text</CardTitle>
        <CardDescription>
          Enter or paste text to test your regex pattern
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="test-text">Sample Text</Label>

          <Textarea
            id="test-text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter text to test against your regex..."
            className="min-h-[200px] font-mono text-sm"
          />

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Characters: {value.length} | Lines: {value.split("\n").length}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
