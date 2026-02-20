import { memo } from "react";
import type { MenuItem } from "@/types/menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";


function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([^&?/]+)/
  );
  return match?.[1] ?? null;
}

interface MenuPreviewDialogProps {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MenuPreviewDialog = memo(({ item, open, onOpenChange }: MenuPreviewDialogProps) => {
  if (!item) return null;

  const videoId = item.videoUrl ? extractYouTubeId(item.videoUrl) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
        {/* Video thumbnail or item image */}
        {videoId ? (
          <div className="w-full">
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                title={item.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-presentation"
              />
            </AspectRatio>
          </div>
        ) : item.image ? (
          <div className="w-full">
            <AspectRatio ratio={16 / 9}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
        ) : null}

        {/* Details */}
        <div className="p-6 pt-2">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <DialogTitle className="font-serif text-2xl font-semibold">
                {item.name}
              </DialogTitle>
              <span className="text-primary font-semibold text-xl shrink-0">
                {item.price}
              </span>
            </div>
            <DialogDescription className="text-muted-foreground leading-relaxed mt-2">
              {item.description}
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
});

MenuPreviewDialog.displayName = "MenuPreviewDialog";

export default MenuPreviewDialog;
