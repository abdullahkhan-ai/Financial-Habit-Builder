import Skeleton from "./Skeleton";

function CardSkeleton() {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">

      <div className="space-y-4">

        <Skeleton className="h-5 w-36" />

        <Skeleton className="h-10 w-48" />

        <Skeleton className="h-4 w-28" />

      </div>

    </div>
  );
}

export default CardSkeleton;