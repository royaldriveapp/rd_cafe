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
import { Play } from "lucide-react";

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
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
        {/* Video thumbnail or item image */}
        {videoId && thumbnailUrl ? (
          <a
            href={item.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full relative group/thumb"
          >
            <AspectRatio ratio={16 / 9}>
              <img
                src={thumbnailUrl}
                alt={`Watch ${item.name} video`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover/thumb:bg-black/40 transition-colors">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover/thumb:scale-110 transition-transform">
                  <Play size={28} className="text-white fill-white ml-1" />
                </div>
              </div>
            </AspectRatio>
          </a>
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
