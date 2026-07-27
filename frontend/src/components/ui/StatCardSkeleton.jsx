function StatCardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <div className="flex-1">

          <div className="h-4 w-24 rounded bg-slate-200"></div>

          <div className="mt-4 h-9 w-36 rounded bg-slate-200"></div>

        </div>

        <div className="h-14 w-14 rounded-2xl bg-slate-200"></div>

      </div>

      <div className="mt-6 h-4 w-32 rounded bg-slate-200"></div>

    </div>
  );
}

export default StatCardSkeleton;