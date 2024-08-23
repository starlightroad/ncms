export function TableSkeleton() {
  return (
    <div className="rounded-xl bg-card">
      <div className="h-72 animate-pulse rounded-xl bg-card-foreground/5"></div>
    </div>
  );
}

export function DashboardCardsSkeleton() {
  return (
    <>
      <div className="col-span-4 row-span-1 rounded-lg bg-card lg:col-span-2">
        <div className="col-span-4 row-span-1 h-36 w-full animate-pulse rounded-lg bg-card-foreground/5 lg:col-span-2"></div>
      </div>
      <div className="col-span-4 row-span-1 rounded-lg bg-card lg:col-span-2">
        <div className="col-span-4 row-span-1 h-36 animate-pulse rounded-lg bg-card-foreground/5 lg:col-span-2"></div>
      </div>
      <div className="col-span-4 row-span-1 rounded-lg bg-card lg:col-span-2">
        <div className="col-span-4 row-span-1 h-36 animate-pulse rounded-lg bg-card-foreground/5 lg:col-span-2"></div>
      </div>
    </>
  );
}

export function DashboardSingleCardSkeleton() {
  return (
    <div className="col-span-4 row-span-2 h-72 animate-pulse rounded-lg bg-card-foreground/5 lg:col-span-3"></div>
  );
}
