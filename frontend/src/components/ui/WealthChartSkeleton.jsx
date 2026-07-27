import Skeleton from "./Skeleton";

function WealthChartSkeleton() {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">

      <Skeleton className="mb-6 h-7 w-48" />

      <Skeleton className="h-80 w-full rounded-2xl" />

    </div>
  );
}

export default WealthChartSkeleton;