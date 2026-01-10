import { motion } from "framer-motion";
import { DecorativeLine } from "@/components/illustrations/CafeLineArt";
import { viewportOnce } from "@/lib/animations";

interface SectionHeaderProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  showDecorativeLine?: boolean;
  className?: string;
  align?: "left" | "center";
}

const SectionHeader = ({
  label,
  title,
  titleHighlight,
  description,
  showDecorativeLine = false,
  className = "",
  align = "center",
}: SectionHeaderProps) => {
  const alignmentClasses = align === "center" ? "text-center mx-auto" : "text-left";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6 }}
      className={`max-w-2xl ${alignmentClasses} ${className}`}
    >
      {label && (
        <p className="text-sm tracking-[0.2em] uppercase text-gold mb-4">
          {label}
        </p>
      )}
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
        {title}
        {titleHighlight && (
          <span className="text-primary italic"> {titleHighlight}</span>
        )}
      </h2>
      {showDecorativeLine && (
        <DecorativeLine className="w-32 h-4 mx-auto text-gold/40 my-4" strokeWidth={1.5} />
      )}
      {description && (
        <p className="text-muted-foreground text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
