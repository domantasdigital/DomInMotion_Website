import type { Metadata } from "next";
import Contact from "@/components/Contact/Contact";

export const metadata: Metadata = {
  title: "Contact | DOM IN MOTION",
  description:
    "Have a 3D animation, motion design, or video editing project in mind? Get in touch with Domantas by email, WhatsApp, LinkedIn, or Upwork.",
};

export default function ContactPage() {
  return (
    <main>
      <Contact standalone />
    </main>
  );
}
