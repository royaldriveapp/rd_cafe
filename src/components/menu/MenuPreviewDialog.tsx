import { memo } from "react";
import type { MenuItem } from "@/types/menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
  const hasImage = Boolean(item.image);
  const hasVideo = Boolean(videoId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden border border-[#C49A3C]/30 bg-[#1C1008] p-0 text-[#F5ECD7] shadow-[0_30px_120px_rgba(28,16,8,0.45)] data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-[0.98] sm:max-w-3xl">
        {/* Hero media */}
        {hasImage ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#24140d]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,154,75,0.14),transparent_32%)]" />
            <div className="absolute inset-0">
              <img
                src={item.image}
                alt={item.name}
                className="block h-full w-full object-cover"
              />
            </div>
          </div>
        ) : hasVideo ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#24140d]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,154,75,0.16),transparent_30%),linear-gradient(135deg,#4a2414_0%,#24140d_100%)]" />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
              <span className="rounded-full border border-[#C49A3C]/35 bg-[#F5ECD7]/8 px-4 py-2 text-[0.78rem] font-medium tracking-[0.18em] text-[#F5ECD7]/82">
                PREPARATION FILM
              </span>
              <p className="mt-4 max-w-md font-serif text-4xl leading-none text-[#F5ECD7]">
                See how {item.name} is prepared.
              </p>
            </div>
          </div>
        ) : null}

        {/* Details */}
        <div className="p-7 pt-4 md:p-8 md:pt-5">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <DialogTitle className="font-serif text-3xl font-semibold text-[#F5ECD7]">
                {item.name}
              </DialogTitle>
              <span className="shrink-0 font-serif text-2xl text-[#C49A3C]">
                {item.price}
              </span>
            </div>
            <DialogDescription className="mt-3 leading-7 text-[#F5ECD7]/70">
              {item.description}
            </DialogDescription>
          </DialogHeader>
          {hasVideo && item.videoUrl ? (
            <a
              href={item.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-[#C49A3C]/45 px-5 text-sm font-medium tracking-[0.14em] text-[#F5ECD7] transition-colors duration-300 hover:bg-[#C49A3C] hover:text-[#1C1008]"
            >
              Watch Preparation
            </a>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
});

MenuPreviewDialog.displayName = "MenuPreviewDialog";

export default MenuPreviewDialog;
