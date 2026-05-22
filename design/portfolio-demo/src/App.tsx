import { AboutSection } from "@/components/sections/about-section"
import { HeroSection } from "@/components/sections/hero-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { TrustedSection } from "@/components/sections/trusted-section"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

function App() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <TrustedSection />
        <AboutSection />
        <ProjectsSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
