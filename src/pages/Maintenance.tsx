import { Clock3, Facebook, Instagram, Mail } from "lucide-react";
import { useEffect } from "react";
import cafeLogo from "@/assets/cafe-logo-cropped.png";
import cafeIllustration from "@/assets/maintenance-cafe-illustration.webp";

const Maintenance = () => {
  useEffect(() => {
    document.title = "RD CAFE | Brewing Something New";
  }, []);

  return (
    <main className="min-h-screen bg-[#F5E9DD] text-[#2A211B]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-12 xl:px-16">
        <header className="flex min-w-0 items-center gap-3 sm:gap-4">
          <img
            src={cafeLogo}
            alt="RD CAFE"
            className="h-12 w-12 shrink-0 rounded-md object-cover sm:h-14 sm:w-14"
          />
          <div className="min-w-0">
            <p className="font-display text-[1.35rem] font-semibold uppercase tracking-[0.12em] sm:text-[1.65rem] sm:tracking-[0.16em]">
              RD CAFE
            </p>
            <p className="mt-1 font-sohne text-[0.5rem] uppercase tracking-[0.1em] text-[#9B762F] sm:text-xs sm:tracking-[0.24em]">
              Premium cafe experience
            </p>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)] lg:gap-10 lg:py-6">
          <div className="max-w-[320px] sm:max-w-[620px] lg:py-12">
            <h1 className="max-w-[320px] font-display text-[3rem] italic leading-[0.9] tracking-normal text-[#2A211B] sm:max-w-[600px] sm:text-[4.25rem] sm:leading-[0.9]">
              <span className="block sm:inline">We&apos;re </span>
              <span className="block sm:inline">pulling a </span>
              <span className="block sm:inline">fresh shot.</span>
            </h1>

            <p className="mt-7 max-w-[285px] font-sohne text-xl font-semibold leading-8 sm:max-w-none sm:text-2xl">
              The website is taking a quick coffee break.
            </p>

            <p className="mt-4 max-w-[285px] font-sohne text-base leading-7 text-[#5F5148] sm:max-w-[560px] sm:text-lg sm:leading-8">
              We&apos;re tuning a few things behind the counter. The cafe is open,
              so come by and order in person.
            </p>

            <p className="mt-7 max-w-[285px] font-sohne text-base font-semibold text-[#9B762F] sm:max-w-none sm:text-lg">
              We&apos;ll be back online soon.
            </p>
          </div>

          <div className="flex min-h-[360px] items-center justify-center lg:min-h-0 lg:self-stretch">
            <img
              src={cafeIllustration}
              alt="A barista pulling an espresso while a cat naps by the cafe counter"
              className="h-auto max-h-[640px] w-full max-w-[680px] object-contain"
              loading="eager"
              decoding="async"
            />
          </div>
        </section>

        <footer className="flex flex-col gap-5 border-t border-[#2A211B]/20 pt-5 font-sohne sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 text-sm font-medium sm:flex-row sm:items-center sm:gap-7 sm:text-base">
            <span className="inline-flex items-center gap-2.5">
              <Clock3 className="h-[1.1rem] w-[1.1rem] text-[#9B762F]" aria-hidden="true" />
              Open daily 7 AM–2 AM
            </span>
            <a
              href="mailto:hi@rdcafe"
              className="inline-flex items-center gap-2.5 transition-colors hover:text-[#9B762F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A467] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5E9DD]"
            >
              <Mail className="h-[1.1rem] w-[1.1rem] text-[#9B762F]" aria-hidden="true" />
              hi@rdcafe
            </a>
          </div>

          <div className="flex items-center gap-4 text-[#2A211B]/70">
            <a
              href="https://www.instagram.com/royaldrivecafe/?hl=en"
              target="_blank"
              rel="noreferrer"
              aria-label="RD CAFE on Instagram"
              className="transition-colors hover:text-[#9B762F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A467]"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="https://www.facebook.com/royaldrivecafe/"
              target="_blank"
              rel="noreferrer"
              aria-label="RD CAFE on Facebook"
              className="transition-colors hover:text-[#9B762F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A467]"
            >
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Maintenance;
