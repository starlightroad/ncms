export function TableSkeleton() {
  return (
    <div className="bg-white">
      <div className="h-72 animate-pulse rounded-xl bg-gray-100"></div>
    </div>
  );
}

export function DashboardCardsSkeleton() {
  return (
    <>
      <div className="col-span-4 row-span-1 bg-white lg:col-span-2">
        <div className="col-span-4 row-span-1 h-36 w-full animate-pulse rounded-lg bg-gray-100 lg:col-span-2"></div>
      </div>
      <div className="col-span-4 row-span-1 h-36 animate-pulse rounded-lg bg-gray-100 lg:col-span-2"></div>
      <div className="col-span-4 row-span-1 h-36 animate-pulse rounded-lg bg-gray-100 lg:col-span-2"></div>
    </>
  );
}

export function DashboardSingleCardSkeleton() {
  return (
    <div className="col-span-4 row-span-2 h-72 animate-pulse rounded-lg bg-gray-100 lg:col-span-3"></div>
  );
}
