
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChatEditor } from "./ChatEditor";

interface DraftCardProps {
  title: string;
  preview: string;
  lastEdited: string;
  id: string;
}

export const DraftCard = ({ title, preview, lastEdited, id }: DraftCardProps) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <Card className="w-[300px] flex-shrink-0">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{lastEdited}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground mb-4">{preview}</p>
        <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">Continue Editing</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-hidden p-0">
            <ChatEditor 
              initialContent={preview} 
              onClose={() => setIsEditorOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
