export default function FormStatusMessage({ message }: { message: string }) {
  return (
    <div className="rounded-md bg-destructive p-3">
      <p className="text-sm font-medium text-destructive-foreground">{message}</p>
    </div>
  );
}
