import { AboutSection } from "./sections/About";
import { HomeSection } from "./sections/Home";
import { RecentSystemsSection } from "./sections/RecentSystems";

export default function Home() {
  return (
    <>
      <HomeSection />
      <AboutSection />
      <RecentSystemsSection />
    </>
  )
}
