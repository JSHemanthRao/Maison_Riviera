import { Watch } from "@/data/watches";
import WatchCard from "./WatchCard";

interface WatchGridProps {
  watches: Watch[];
  variant?: "grid" | "rail";
}

export default function WatchGrid({ watches, variant = "grid" }: WatchGridProps) {
  if (variant === "rail") {
    return (
      <div className="scrollbar-hide flex snap-x gap-6 overflow-x-auto pb-6">
        {watches.map((watch, index) => (
          <div key={watch.id} className="w-[84vw] shrink-0 snap-start sm:w-[420px]">
            <WatchCard watch={watch} index={index} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {watches.map((watch, index) => (
        <WatchCard key={watch.id} watch={watch} index={index} />
      ))}
    </div>
  );
}
