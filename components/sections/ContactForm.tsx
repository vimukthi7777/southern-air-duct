"use client";

import { Button } from "@/components/ui/Button";
import { siteInfo } from "@/data/site";

const input =
  "mt-2 w-full rounded-md border border-white/60 bg-transparent px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-white focus:outline-none";

export function ContactForm() {
  // No backend yet: opens the visitor's email client with the enquiry pre-filled.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = [
      `Name: ${d.get("first")} ${d.get("last")}`,
      `Phone: ${d.get("phone")}`,
      `Email: ${d.get("email")}`,
      "",
      `${d.get("message")}`,
    ].join("\n");
    window.location.href = `mailto:${siteInfo.email}?subject=${encodeURIComponent("Quote enquiry")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg bg-[#262626] p-6">
      <h3 className="text-base">Get a Free Quote</h3>
      <p className="mt-2 max-w-xs text-xs text-white/50">
        We&rsquo;re excited to connect with you! Fill out the form below, and let&rsquo;s embark on the journey of turning.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-xs">
          First name
          <input name="first" required placeholder="Name" autoComplete="given-name" className={input} />
        </label>
        <label className="text-xs">
          Last name
          <input name="last" placeholder="Name" autoComplete="family-name" className={input} />
        </label>
        <label className="text-xs">
          Phone number
          <input name="phone" type="tel" placeholder="+94 124-123" autoComplete="tel" className={input} />
        </label>
        <label className="text-xs">
          Email
          <input name="email" type="email" required placeholder="yourname@gmail.com" autoComplete="email" className={input} />
        </label>
        <label className="text-xs sm:col-span-2">
          Message
          <textarea name="message" rows={5} placeholder="Your message..." className={`${input} resize-none`} />
        </label>
      </div>

      <div className="mt-6">
        <Button type="submit">Submit Now</Button>
      </div>
    </form>
  );
}
