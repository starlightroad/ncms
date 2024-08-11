export default function FormStatusMessage({ message }: { message: string }) {
  return (
    <div className="rounded-md bg-red-50 p-3">
      <p className="text-sm font-medium text-red-600">{message}</p>
    </div>
  );
}
