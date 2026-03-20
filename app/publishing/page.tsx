import { PageIntro } from "@/components/page-intro";
import { PublishingBundleBuilder } from "@/components/publishing-bundle-builder";
import { SendToMenu } from "@/components/send-to-menu";

export default function PublishingPage() {
  return (
    <main className="space-y-4">
      <PageIntro title="Publishing Bundles" description="Create polished local publishing bundles for review, handoff, presentation, and archive delivery." />
      <SendToMenu source="publishing" />
      <PublishingBundleBuilder />
    </main>
  );
}
