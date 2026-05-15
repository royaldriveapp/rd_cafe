import { useQuery } from "@tanstack/react-query";
import { getBlogPageContent, getBlogPosts, getContactPageContent, getFacilitiesPageContent, getGalleryPageContent, getSiteSettings } from "@/services/contentService";

export function useSiteSettings() {
  return useQuery({
    queryKey: ["content", "siteSettings"],
    queryFn: getSiteSettings,
  });
}

export function useFacilitiesPageContent() {
  return useQuery({
    queryKey: ["content", "facilitiesPage"],
    queryFn: getFacilitiesPageContent,
  });
}

export function useGalleryPageContent() {
  return useQuery({
    queryKey: ["content", "galleryPage"],
    queryFn: getGalleryPageContent,
  });
}

export function useContactPageContent() {
  return useQuery({
    queryKey: ["content", "contactPage"],
    queryFn: getContactPageContent,
  });
}

export function useBlogPageContent() {
  return useQuery({
    queryKey: ["content", "blogPage"],
    queryFn: getBlogPageContent,
  });
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ["content", "blogPosts"],
    queryFn: getBlogPosts,
  });
}
