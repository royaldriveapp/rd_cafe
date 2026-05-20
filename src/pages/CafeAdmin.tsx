import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sanityStudioUrl } from "@/lib/sanity";
import { ArrowRight, FileText, Image, Lock, PencilLine, ShieldCheck } from "lucide-react";

const studioPath = sanityStudioUrl || "/studio";

const accessItems = [
  {
    icon: PencilLine,
    title: "Content-only workspace",
    description: "Editors manage journal posts, menu images, gallery updates, contact details, and page copy inside the Studio.",
  },
  {
    icon: ShieldCheck,
    title: "Verified by Sanity sign-in",
    description: "Only invited Sanity users can continue into the content workspace and make changes after login.",
  },
  {
    icon: Lock,
    title: "Public site stays separate",
    description: "Your SEO team can work on content without getting codebase, deployment, or infrastructure access.",
  },
];

const editableAreas = [
  "Journal posts and article formatting",
  "Menu items, prices, and images",
  "Gallery visuals and captions",
  "Facilities and contact page content",
];

const CafeAdmin = () => {
  return (
    <Layout>
      <main className="bg-[#f8f3eb]">
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-36 md:px-8">
          <div className="max-w-3xl">
            <Badge
              variant="outline"
              className="border-[#C49A3C]/35 bg-[#fff8eb] px-4 py-1.5 font-sohne text-[0.68rem] uppercase tracking-[0.26em] text-[#9e6f1d]"
            >
              Content Studio Access
            </Badge>

            <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-[#2A140D] md:text-5xl">
              RD CAFE admin starts here, while the real editor login stays protected inside Sanity.
            </h1>

            <p className="mt-5 max-w-2xl font-display text-xl italic leading-relaxed text-[#7d6756]">
              This front door is for your invited content team. The Studio handles user verification, publishing,
              and role-based access once they continue inside.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="rounded-full bg-[#1C1008] px-7 py-6 font-sohne text-[0.78rem] uppercase tracking-[0.18em] text-[#F5ECD7] transition hover:bg-[#2d180d]"
              >
                <a href={studioPath}>
                  Continue to Studio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <p className="font-sohne text-sm tracking-[0.02em] text-[#8c7b6b]">
                Invited users will be asked to sign in with their Sanity account.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-5 md:grid-cols-3">
              {accessItems.map(({ icon: Icon, title, description }) => (
                <Card key={title} className="border-[#d9c8b7] bg-[#fffaf2] shadow-none">
                  <CardHeader className="pb-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f1e3c8] text-[#a77422]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="pt-4 font-serif text-xl text-[#2A140D]">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="font-sohne text-sm leading-7 text-[#705f51]">
                    {description}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-[#d9c8b7] bg-[#fffaf2] shadow-none">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-[#2A140D]">What editors can update</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {editableAreas.map((item, index) => {
                  const Icon = index % 2 === 0 ? FileText : Image;

                  return (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-[#eadccc] bg-white/70 px-4 py-4"
                    >
                      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#f4e6cb] text-[#a77422]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-sohne text-sm font-medium tracking-[0.02em] text-[#2A140D]">{item}</p>
                      </div>
                    </div>
                  );
                })}

                <div className="rounded-2xl border border-dashed border-[#C49A3C]/35 bg-[#fff8eb] px-4 py-4 font-sohne text-sm leading-7 text-[#7a6656]">
                  Sanity remains the secure layer here. If you want outside partners to edit content only, the safest
                  production setup is to invite them as Sanity editors rather than sharing site deployment access.
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default CafeAdmin;
