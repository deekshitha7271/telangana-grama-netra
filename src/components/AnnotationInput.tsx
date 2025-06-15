
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  onSubmit: (text: string) => void;
}

const AnnotationInput: React.FC<Props> = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 bg-white/60 dark:bg-black/50 rounded-lg p-2 shadow-md">
      <Textarea
        minRows={1}
        maxRows={4}
        placeholder="Type what you observe here…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 resize-none bg-transparent border-0 focus:ring-0 text-base"
      />
      <Button type="submit" disabled={!text.trim()} className="h-10 text-base">
        Annotate
      </Button>
    </form>
  );
};

export default AnnotationInput;
