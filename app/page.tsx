import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { GlowDivider } from "@/components/ui/GlowDivider";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GlowDivider />
      <SkillsSection />
      <GlowDivider />
      <ProjectsSection />
      <GlowDivider />
      <CoursesSection />
      <GlowDivider />
      <TestimonialsSection />
      <GlowDivider />
      <ContactSection />
      <FooterSection />
    </>
  );
}
