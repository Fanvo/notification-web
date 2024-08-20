import { HydrateClient } from "~/trpc/server";
import { NotificationPanel } from "./pages/notificationPanel";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="overflow-y-auto pb-8">
          <NotificationPanel />
        </div>
      </main>
    </HydrateClient>
  );
}
