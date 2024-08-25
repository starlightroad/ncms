function Header() {
  return (
    <div className="mb-6 flex justify-end lg:justify-between">
      <div className="rounded-lg bg-card">
        <div className="hidden h-9 w-48 animate-pulse rounded-lg bg-card-foreground/10 lg:block"></div>
      </div>
      <div className="flex space-x-3">
        <div className="rounded-lg bg-card">
          <div className="h-9 w-20 animate-pulse rounded-lg bg-card-foreground/10"></div>
        </div>
        <div className="rounded-lg bg-card">
          <div className="h-9 w-20 animate-pulse rounded-lg bg-card-foreground/10"></div>
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="rounded-lg bg-card">
      <div className="col-span-1 h-80 animate-pulse rounded-lg bg-card-foreground/10"></div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="py-8 lg:py-16">
      <Header />
      <Card />
    </div>
  );
}
