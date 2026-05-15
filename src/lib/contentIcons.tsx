import {
  Award,
  Ban,
  Calendar,
  Car,
  Clock,
  DoorOpen,
  Facebook,
  Heart,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Moon,
  Phone,
  ShieldCheck,
  Sparkles,
  Sunrise,
  Zap,
} from "lucide-react";

export const contentIconMap = {
  award: Award,
  ban: Ban,
  calendar: Calendar,
  car: Car,
  clock: Clock,
  doorOpen: DoorOpen,
  facebook: Facebook,
  heart: Heart,
  instagram: Instagram,
  leaf: Leaf,
  mail: Mail,
  mapPin: MapPin,
  moon: Moon,
  phone: Phone,
  shieldCheck: ShieldCheck,
  sparkles: Sparkles,
  sunrise: Sunrise,
  zap: Zap,
} as const;

export function getContentIcon(iconKey: string) {
  return contentIconMap[iconKey as keyof typeof contentIconMap] || MapPin;
}
