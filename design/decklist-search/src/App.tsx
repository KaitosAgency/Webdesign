import { SiteHeader } from "@/components/layout/site-header"
import { SearchSection } from "@/components/sections/search-section"

function App() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <SiteHeader />
      <main>
        <SearchSection />
      </main>
    </div>
  )
}

export default App
