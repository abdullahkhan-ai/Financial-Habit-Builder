import Skeleton from "./Skeleton";

function HabitCardSkeleton() {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <Skeleton className="h-7 w-40" />

        <Skeleton className="h-10 w-10 rounded-xl" />

      </div>

      <div className="mt-6 space-y-4">

        <Skeleton className="h-4 w-full" />

        <Skeleton className="h-4 w-3/4" />

        <Skeleton className="h-3 w-full rounded-full" />

        <Skeleton className="h-4 w-24" />

      </div>

      <div className="mt-8 flex justify-between">

        <Skeleton className="h-10 w-24 rounded-xl" />

        <Skeleton className="h-10 w-24 rounded-xl" />

      </div>

    </div>
  );
}

export default HabitCardSkeleton;