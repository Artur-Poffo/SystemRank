import { TransitionWrapper } from "@/components/Navigation/Transition/Wrapper";
import { AboutSection } from "./sections/About";
import { HomeSection } from "./sections/Home";
import { RecentSystemsSection } from "./sections/RecentSystems";

export default function Home() {
  return (
    <TransitionWrapper>
      <HomeSection />
      <AboutSection />
      <RecentSystemsSection />
    </TransitionWrapper>
  )
}
