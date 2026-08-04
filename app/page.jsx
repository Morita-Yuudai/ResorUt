import { AgentPanel } from "@/src/features/ai-agent";
import { VideoGenHero } from "@/src/features/video-gen";

export default function HomePage() {
  return (
    <main>
      <VideoGenHero demoVideoSrc="/video-gen/demo-fallback.mp4" />
      <AgentPanel />
    </main>
  );
}
