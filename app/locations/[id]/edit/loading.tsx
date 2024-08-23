function Header() {
  return (
    <div className="mb-6 h-9 w-48 rounded-lg bg-card">
      <div className="h-9 w-48 animate-pulse rounded-lg bg-card-foreground/10"></div>
    </div>
  );
}

function Card() {
  return (
    <div className="rounded-lg bg-card">
      <div className="h-80 animate-pulse rounded-lg bg-card-foreground/10"></div>
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
