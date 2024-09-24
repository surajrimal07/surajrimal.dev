export default function LoadingPage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-white opacity-85 dark:bg-gray-900"></div>
      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-red-500"></div>
    </div>
  );
}
