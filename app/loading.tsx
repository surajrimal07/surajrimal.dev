export default function LoadingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-white" />
      </div>
      <div className="flex-grow" />
    </div>
  );
}
